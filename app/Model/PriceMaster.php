<?php
namespace App\Model;
use Illuminate\Database\Eloquent\Model;

class PriceMaster extends Model
{
	protected $guarded = array('id');
	protected $table = 'Price_master';
}
