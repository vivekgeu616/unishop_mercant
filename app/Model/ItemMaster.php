<?php
namespace App\Model;
use Illuminate\Database\Eloquent\Model;

class ItemMaster extends Model
{
	protected $guarded = array('id');
	protected $table = 'Item_master';
}
