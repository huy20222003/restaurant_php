<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Product extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'products';

    protected $fillable = [
        'name',
        'subDescription',
        'description',
        'price',
        'priceSale',
        'categoryId',
        'status',
        'size',
        'color',
        'quantity',
        'imageUrl',
        'rate',
    ];

    public function imageProducts()
    {
        return $this->hasMany(ImageProduct::class, 'productId');
    }
}
