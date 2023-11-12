<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Order extends Authenticatable
{

    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'orders';

    protected $fillable = [
        'fullName',
        'phoneNumber',
        'totalPrices',
        'shipAddress',
        'shippingFee',
        'shippingUnit',
        'userOrder',
        'paymentMethod',
        'status',
        'totalPrices',
    ];

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'orderId', 'id');
    }
}
