<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCOPRDVITM extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('co_prdv_itm', function (Blueprint $table) {
            $table->increments('id');
            $table->string('RetailStoreID')->nullable();
            $table->integer('PriceDerivationRuleID')->nullable();
            $table->decimal('ReductionAmount', 13, 2)->nullable();
            $table->decimal('ReductionPercent', 5, 2)->nullable();
            $table->decimal('DiscountPricePoint', 13, 2)->nullable();
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
        Schema::dropIfExists('co_prdv_itm');
    }
}
