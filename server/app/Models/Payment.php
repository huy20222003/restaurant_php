<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Payment extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'payments';

    protected $fillable = [
        'sender',
        'description',
        'amount',
        'paymentMethod',
        'status',
        'userPayment',
    ];
}
