<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableTRITMMXMHPRDV extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tr_itm_mxmh_prdv', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('PriceDerivationRuleID')->nullable();
            $table->string('RetailStoreID')->nullable();
            $table->string('PromotionalProductID')->nullable();
            $table->decimal('ReductionPercent', 5, 2)->nullable();
            $table->decimal('ReductionMonetaryAmount', 13, 2)->nullable();
            $table->decimal('ReductionPricePoint', 13, 2)->nullable();
            $table->integer('MixAndMatchLimitCount')->nullable();
            $table->string('ComparisonBasisCode')->nullable();
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
        Schema::dropIfExists('tr_itm_mxmh_prdv');
    }
}
