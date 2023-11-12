<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Crypt;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllPayments()
    {
        try {
            $payments = Payment::orderBy('created_at', 'desc')->get();
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'payments' => $payments]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createPayment(Request $request)
    {
        try {
            $data = $request->only(['sender', 'description', 'amount', 'paymentMethod']);
            $data['userPayment'] = auth()->user()->id;
            $data['status'] = 'success';

            $payment = Payment::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Create payment successful',
                'payment' => $payment,
            ], 200);
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function getOnePayment(Payment $payment)
    {
        try {
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'payment' => $payment]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function createPaymentVNPay(Request $request)
    {
        $vnp_TxnRef = rand(1, 10000); //Mã giao dịch thanh toán tham chiếu của merchant
        $vnp_Amount = $request->amount; // Số tiền thanh toán
        $vnp_Locale = 'vn'; //Ngôn ngữ chuyển hướng thanh toán
        $vnp_BankCode = ''; //Mã phương thức thanh toán
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR']; //IP Khách hàng thanh toán
        $date = Carbon::now();
        $date->setTimezone('Asia/Ho_Chi_Minh');
        $expireDate = $date->addMinutes(10)->format('YmdHis');
        $createDate = $date->format('YmdHis');
        $vnpUrl = config('vnpay.vnp_url');

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" =>  config('vnpay.vnp_tmnCode'),
            "vnp_Amount" => $vnp_Amount * 100,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => $createDate,
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $request->orderInfo,
            "vnp_OrderType" => 100000,
            "vnp_ReturnUrl" => config('vnpay.vnp_returnUrl'),
            "vnp_TxnRef" => $vnp_TxnRef,
            "vnp_ExpireDate" => $expireDate
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }

        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnpUrl . "?" . $query;
        $vnpSecureHash =   hash_hmac('sha512', $hashdata, config('vnpay.vnp_secretKey')); //  
        $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        return response()->json([
            'success' => true,
            'message' => 'Create payment successful',
            'url' => $vnp_Url,
        ]);
    }

    public function vnpayIpn(Request $request)
    {
        $inputData = array();
        $returnData = array();
        foreach ($_GET as $key => $value) {
            if (substr($key, 0, 4) == "vnp_") {
                $inputData[$key] = $value;
            }
        }

        $vnp_SecureHash = $inputData['vnp_SecureHash'];
        unset($inputData['vnp_SecureHash']);
        ksort($inputData);
        $i = 0;
        $hashData = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData = $hashData . '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData = $hashData . urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
        }

        $secureHash = hash_hmac('sha512', $hashData, config('vnpay.vnp_secretKey'));
        $vnpTranId = $inputData['vnp_TransactionNo']; //Mã giao dịch tại VNPAY
        $vnp_BankCode = $inputData['vnp_BankCode']; //Ngân hàng thanh toán
        $vnp_Amount = $inputData['vnp_Amount'] / 100; // Số tiền thanh toán VNPAY phản hồi

        $Status = 0; // Là trạng thái thanh toán của giao dịch chưa có IPN lưu tại hệ thống của merchant chiều khởi tạo URL thanh toán.
        $orderId = $inputData['vnp_TxnRef'];

        try {
            //Check Orderid    
            //Kiểm tra checksum của dữ liệu
            if ($secureHash == $vnp_SecureHash) {
                //Lấy thông tin đơn hàng lưu trong Database và kiểm tra trạng thái của đơn hàng, mã đơn hàng là: $orderId            
                //Việc kiểm tra trạng thái của đơn hàng giúp hệ thống không xử lý trùng lặp, xử lý nhiều lần một giao dịch
                //Giả sử: $order = mysqli_fetch_assoc($result);   
                $orderInfo = $inputData['vnp_OrderInfo'];
                $data = explode(' ', $orderInfo);
                $orderId = $data[3];
                $paymentId = $data[6];
                $order = Order::with('orderDetails.product.imageProducts')->find($orderId);
                $payment = Payment::find($paymentId);
                $orderStatus = true;
                if ($order) {
                    if (intval($payment->amount) === $vnp_Amount) //Kiểm tra số tiền thanh toán của giao dịch: giả sử số tiền kiểm tra là đúng. //$order["Amount"] == $vnp_Amount
                    {
                        if ($orderStatus) {
                            if ($inputData['vnp_ResponseCode'] == '00' && $inputData['vnp_TransactionStatus'] == '00') {
                                $payment->status = 'success';
                                $payment->save();
                                $userCart = Cart::where('userId', $payment->userPayment)->first();
                        
                                foreach ($order->orderDetails as $orderDetail) {
                                    $userCartDetails = $userCart->cartDetails();
                                    $userCartDetails->where('productId', $orderDetail->productId)->delete();
                                }
                                $userCart->save();
                                $request->merge(['paymentId'=>$payment->id]);
                                return $this->donePayment($request);
                            } else {
                                $order->status = 'cancelled';
                                $order->save();

                                $payment->status = 'cancelled';
                                $payment->save();
                            }
                            $request->merge(['paymentId'=>$payment->id]);
                            return $this->donePayment($request);
                        } else {
                            $returnData['RspCode'] = '02';
                            $returnData['Message'] = 'Order already confirmed';
                        }
                    } else {
                        $returnData['RspCode'] = '04';
                        $returnData['Message'] = 'invalid amount';
                    }
                } else {
                    $returnData['RspCode'] = '01';
                    $returnData['Message'] = 'Order not found';
                }
            } else {
                $returnData['RspCode'] = '97';
                $returnData['Message'] = 'Invalid signature';
            }
        } catch (Exception $e) {
            $returnData['RspCode'] = '99';
            $returnData['Message'] = 'Unknow error';
        }
    }

    public function donePayment(Request $request)
    {
        try {
            $paymentId = $request->input('paymentId');
            $url = config('vnpay.payment_status');

            return redirect($url . '/' . $paymentId);
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }
}
