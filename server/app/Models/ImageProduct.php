<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class ImageProduct extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'image_product';

    protected $fillable = [
        'productId',
        'imageUrl',
    ];
}
