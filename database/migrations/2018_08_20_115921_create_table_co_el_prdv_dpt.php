<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCoElPrdvDpt extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('co_el_prdv_dpt', function (Blueprint $table) {
            $table->increments('id');
            $table->string('POSDepartmentID')->nullable();
            $table->integer('PriceDerivationRuleID')->nullable();
            $table->string('RetailStoreID')->nullable();
            $table->integer('StoreFinancialLedgerAccountID')->nullable();
            $table->integer('EventID')->nullable();
            $table->string('AccountingDispositionCode')->nullable();
            $table->decimal('ThresholdAmount', 13, 2)->nullable();
            $table->integer('ThresholdQuantity')->nullable();
            $table->decimal('LimitQuantity', 9, 2)->nullable();
            $table->decimal('LimitAmount', 13, 2)->nullable();
            $table->datetime('EffectiveTimestamp')->nullable();
            $table->datetime('ExpirationTimestamp')->nullable();
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
        Schema::dropIfExists('co_el_prdv_dpt');
    }
}
