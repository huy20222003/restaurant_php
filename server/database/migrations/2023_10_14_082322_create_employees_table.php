<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('roleId')->default(2);
            $table->string('fullName');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('phoneNumber');
            $table->string('address')->nullable();
            $table->double('salary');
            $table->string('avatar')->nullable();
            $table->string('password')->default(bcrypt('12345678'));
            $table->string('status')->default("Verified")->nullable();
            $table->foreign('roleId')->references('id')->on('roles');
        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
