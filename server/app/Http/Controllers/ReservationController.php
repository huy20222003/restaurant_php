<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllReservations()
    {
        try {
            $today = Carbon::now();

            $startDate = $today->copy()->startOfDay();
            $endDate = $today->copy()->endOfDay();

            $type = $today->hour > 12 && $today->hour <= 22 ? 'dinner' : 'lunch';

            $reservations = Reservation::whereBetween('reservationDate', [$startDate, $endDate])
                ->where('type', $type)
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Retrieve data successfully',
                'reservations' => $reservations,
            ], 200);
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }

    public function getAllReservationsById()
    {
        try {
            $user = Auth::user();

            $reservations = Reservation::where('userId', $user->id)->get();

            return response()->json([
                'success' => true,
                'message' => 'Retrieve data successfully',
                'reservations' => $reservations,
            ], 200);
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }

    public function createReservation(Request $request)
    {
        try {
            $requestData = $request->only('fullName', 'tableId', 'reservationDate', 'note');
            $user = auth()->user();

            // Kiểm tra các trường bắt buộc
            if (empty($requestData['fullName']) || empty($requestData['tableId']) || empty($requestData['reservationDate'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Required fields missing',
                ], 400);
            }

            $type = 'lunch';
            $date = Carbon::parse($requestData['reservationDate'])->subHour();
            $datetime = $date->toDateTimeString();
            $startDate = $date->copy()->startOfDay();
            $endDate = $date->copy()->endOfDay();

            if ($date->hour >= 8 && $date->hour <= 12) {
                $type = 'lunch';
            } elseif ($date->hour >= 16 && $date->hour <= 22) {
                $type = 'dinner';
            }

            // Kiểm tra xem bàn đã được đặt chỗ chưa
            $existingReservation = Reservation::where('type', $type)
                ->where('tableId', $requestData['tableId'])
                ->whereBetween('reservationDate', [$startDate, $endDate])
                ->first();

            if ($existingReservation) {
                return response()->json([
                    'success' => false,
                    'message' => 'The table has been booked',
                ], 400);
            }

            // Tạo đặt chỗ mới
            $newReservation = new Reservation([
                'fullName' => $requestData['fullName'],
                'tableId' => $requestData['tableId'],
                'userId' => $user->id,
                'note' => $requestData['note'] || null,
                'reservationDate' => $datetime,
                'type' => $type,
                'status' => 'ordered'
            ]);

            $newReservation->save();

            return response()->json([
                'success' => true,
                'message' => 'Retrieve data successfully',
                'reservation' => $newReservation,
            ], 200);
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }

    public function filterReservation(Request $request)
    {
        try {
            $requestData = $request->only('type', 'reservationDate');

            $date = Carbon::parse($requestData['reservationDate']);
            $startDate = $date->copy()->startOfDay();
            $endDate = $date->copy()->endOfDay();

            $reservations = Reservation::where('type', $requestData['type'])
                ->whereBetween('reservationDate', [$startDate, $endDate])
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Retrieve data successfully',
                'reservations' => $reservations,
            ], 200);
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }
}
