<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class OrderDetail extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'order_detail';

    protected $fillable = [
        'productId',
        'orderId',
        'quantity',
        'color',
        'size',
    ];

    public function product() {
        return $this->belongsTo(Product::class, 'productId','id');
    }
}
