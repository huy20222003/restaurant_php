<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Reservation extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'reservations';

    protected $fillable = [
        'fullName',
        'tableId',
        'reservationDate',
        'userId',
        'note',
        'status',
        'type',
    ];
}
