<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Table extends Authenticatable
{
    
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'tables';

    protected $fillable = [
        'name',
        'description',
    ];
}
