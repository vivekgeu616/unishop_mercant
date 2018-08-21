<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCoElMrstPrdv extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('co_el_mrst_prdv', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('PriceDerivationRuleID')->nullable();
            $table->string('RetailStoreID')->nullable();
            $table->string('MerchandiseClassificationCode')->nullable();
            $table->decimal('ThresholdAmount', 13, 2)->nullable();
            $table->integer('EventID')->nullable();
            $table->integer('StoreFinancialLedgerAccountID')->nullable();
            $table->datetime('EffectiveDateTimestamp')->nullable();
            $table->datetime('ExpirationDateTimestamp')->nullable();
            $table->string('AccountingDispositionCode')->nullable();
            $table->integer('QuantityThreshold')->nullable();
            $table->decimal('AmountLimit', 13, 2)->nullable();
            $table->decimal('QuantityLimit', 9, 2)->nullable();
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
        Schema::dropIfExists('co_el_mrst_prdv');
    }
}
