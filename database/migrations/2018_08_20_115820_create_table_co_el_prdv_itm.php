<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCoElPrdvItm extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('co_el_prdv_itm', function (Blueprint $table) {
            $table->increments('id');
            $table->string('ItemID')->nullable();
            $table->string('RetailStoreID')->nullable();
            $table->integer('PriceDerivationRuleID')->nullable();
            $table->integer('StoreFinancialLedgerAccountID')->nullable();
            $table->integer('EventID')->nullable();
            $table->string('AccountingDispositionCode')->nullable();
            $table->decimal('ThresholdAmount', 13, 2)->nullable();
            $table->integer('ThresholdQuantity')->nullable();
            $table->decimal('QuantityLimit', 9, 2)->nullable();
            $table->decimal('AmountLimit', 13, 2)->nullable();
            $table->datetime('EffectiveDateTimestamp')->nullable();
            $table->datetime('ExpirationDateTimestamp')->nullable();
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
        Schema::dropIfExists('co_el_prdv_itm');
    }
}
