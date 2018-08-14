<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablePriceMaster extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Price_master', function (Blueprint $table) {
            $table->increments('id');
            $table->string('store_code')->nullable();
            $table->string('item_code')->nullable();
            $table->string('item_name')->nullable();
            $table->string('mrp1')->nullable();
            $table->string('mrp2')->nullable();
            $table->string('mrp3')->nullable();
            $table->string('selling_price')->nullable();
            $table->string('promo')->nullable();
            $table->string('weighted_flag')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Price_master');
    }
}
