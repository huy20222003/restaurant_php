<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class CartDetail extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'cart_detail';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['cartId', 'productId', 'color', 'size', 'quantity'];


    public function product()
    {
        return $this->belongsTo(Product::class, 'productId', 'id');
    }
}
