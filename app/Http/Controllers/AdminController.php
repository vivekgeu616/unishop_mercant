<?php
namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Middleware\adminuser;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Session;

use App\Model\CoPrdvItm;
use App\Model\TrItmPrdv;
use App\Model\ItemMaster;
use App\Model\PriceMaster;
use App\Model\CoElPrdvDpt;
use App\Model\CoeElPrdvItm;
use App\Model\CoElMrstPrdv;


use DB;
use App;
use Auth;
use View;
use Validator;
use Redirect;
use Response;

class AdminController extends Controller
{
    public function __construct()
    {
        
    }

    function BuildWhere($modifier = array())
    {
        if (isset($_REQUEST['filterscount']))
        {
            $filterscount = $_REQUEST['filterscount'];
            if ($filterscount > 0)
            {
                $where = " WHERE (";
                $tmpdatafield = "";
                $tmpfilteroperator = "";
                for ($i=0; $i < $filterscount; $i++)
                {
                    $filtervalue = addslashes($_REQUEST["filtervalue" . $i]);
                    if($filtervalue == 'true' or $filtervalue == 'false'){
                        $filtervalue = filter_var($filtervalue, FILTER_VALIDATE_BOOLEAN);
                    }

                    $filtercondition = $_REQUEST["filtercondition" . $i];
                    $filterdatafield = $_REQUEST["filterdatafield" . $i];

                    if(array_key_exists($filterdatafield, $modifier)){
                        $filterdatafield=$modifier[$filterdatafield];
                    }
                    
                    $filteroperator = $_REQUEST["filteroperator" . $i];
                    if ($tmpdatafield == "")
                    {
                        $tmpdatafield = $filterdatafield;      
                    }
                    else if($tmpdatafield <> $filterdatafield)
                    {
                        $where .= ")AND(";
                    }
                    else if ($tmpdatafield == $filterdatafield)
                    {
                        if($tmpfilteroperator == 0)
                            $where .= " AND ";
                        else
                            $where .= " OR ";  
                    }

                    switch($filtercondition)
                    {
                        case "CONTAINS":
                            $where .= " " . $filterdatafield . " LIKE '%" . $filtervalue ."%'";
                        break;

                        case "SECRET_EQUAL":
                            $where .= " id ='" . Common::getDecode_hash_id($filtervalue) . "' ";
                        break;

                        case "DOES_NOT_CONTAIN":
                            $where .= " " . $filterdatafield . " NOT LIKE '%" . $filtervalue ."%'";
                        break;

                        case "EQUAL":
                            $where .= " " . $filterdatafield . " = '" . $filtervalue ."'";
                        break;

                        case "NOT_EQUAL":
                            $where .= " " . $filterdatafield . " <> '" . $filtervalue ."'";
                        break;

                        case "GREATER_THAN":
                            $where .= " " . $filterdatafield . " > '" . $filtervalue ."'";
                        break;

                        case "LESS_THAN":
                            $where .= " " . $filterdatafield . " < '" . $filtervalue ."'";
                        break;

                        case "GREATER_THAN_OR_EQUAL":
                            $where .= " " . $filterdatafield . " >= '" . $filtervalue ."'";
                        break;

                        case "LESS_THAN_OR_EQUAL":
                            $where .= " " . $filterdatafield . " <= '" . $filtervalue ."'";
                        break;

                        case "STARTS_WITH":
                            $where .= " " . $filterdatafield . " LIKE '" . $filtervalue ."%'";
                        break;

                        case "ENDS_WITH":
                            $where .= " " . $filterdatafield . " LIKE '%" . $filtervalue ."'";
                        break;
                    }
                    if ($i == $filterscount - 1)
                    {
                        $where .= ")";
                    }

                    $tmpfilteroperator = $filteroperator;
                    $tmpdatafield = $filterdatafield;      
                }
                return $where;
            }
        }
    }

    public function getHome()
    {
       
        return view('admin.home');
    }

    public function getTable()
    {
        $dir = "/home/vivek/Downloads/demo/";
        $file = scandir($dir,0);
      
        $table_name = array();
        for($i=2;$i<count($file);$i++)
        {
            $table_name[$i] = rtrim($file[$i],".csv");
             
                  switch($table_name[$i])
                    {
                        case "Item_master":

                                $file_content = explode("\n",file_get_contents("/home/vivek/Downloads/demo/".$table_name[$i].".csv"));
                                foreach ($file_content as $key => $value) 
                                {
                                    $content[] = explode(",", $value);
                                    if($content[$key][0]=="\r")
                                    {
                                        continue;
                                    }
                                    if(isset($content[$key][1]))
                                    {
                                        $Item_master = new ItemMaster;
                                        $Item_master->store_code = $content[$key][0]; 
                                        $Item_master->item_code = $content[$key][1]; 
                                        $Item_master->item_name = $content[$key][2]; 
                                        $Item_master->mrp1 = $content[$key][3]; 
                                        $Item_master->selling_price = $content[$key][4]; 
                                        $Item_master->promo = $content[$key][5]; 
                                        $Item_master->weighted_flag = $content[$key][6]; 
                                        $Item_master->save();
                                    }
                                }
                            
                        break;

                        case "Price_master":
                                
                                unset($content);
                                $content = array();

                                $file_content = explode("\n",file_get_contents("/home/vivek/Downloads/demo/".$table_name[$i].".csv")); 
                                foreach ($file_content as $key => $value) 
                                {
                                    $content[] = explode(",", $value);
                                  
                                    if($content[$key][0]=="\r")
                                    {
                                        continue;
                                    }
                                    if(isset($content[$key][1]))
                                    {
                                        $Item_master = new PriceMaster;
                                        $Item_master->store_code = $content[$key][0]; 
                                        $Item_master->item_code = $content[$key][1]; 
                                        $Item_master->item_name = $content[$key][2]; 
                                        $Item_master->mrp1 = $content[$key][3];
                                        $Item_master->mrp2 = $content[$key][4];
                                        $Item_master->mrp3 = $content[$key][5]; 
                                        $Item_master->selling_price = $content[$key][6]; 
                                        $Item_master->promo = $content[$key][7]; 
                                        $Item_master->weighted_flag = $content[$key][8]; 
                                        $Item_master->save();
                                    }
                                    
                                }

                        break;

                        case "tr_itm_mxmh_prdv":
                                
                                unset($content);
                                $content = array();

                                $file_content = explode("\n",file_get_contents("/home/vivek/Downloads/demo/".$table_name[$i].".csv"));
                                foreach ($file_content as $key => $value) 
                                {
                                    $content[] = explode(",", $value);
                                    if($content[$key][0]=="\r")
                                    {
                                        continue;
                                    }
                                    if(isset($content[$key][1]))
                                    {
                                        $Item_master = new TrItmPrdv;
                                        $Item_master->PriceDerivationRuleID = $content[$key][0]; 
                                        $Item_master->RetailStoreID = $content[$key][1]; 
                                        $Item_master->PromotionalProductID = $content[$key][2]; 
                                        $Item_master->ReductionPercent = $content[$key][3]; 
                                        $Item_master->ReductionMonetaryAmount = $content[$key][4];
                                        $Item_master->ReductionPricePoint = $content[$key][5];
                                        $Item_master->MixAndMatchLimitCount = $content[$key][6]; 
                                        $Item_master->ComparisonBasisCode = $content[$key][7]; 
                                        $Item_master->save();
                                    }
                                    
                                }

                        break;

                        case "co_prdv_itm":
                                
                                unset($content);
                                $content = array();

                                $file_content = explode("\n",file_get_contents("/home/vivek/Downloads/demo/".$table_name[$i].".csv"));
                                foreach ($file_content as $key => $value) 
                                {
                                    $content[] = explode(",", $value);
                                    if($content[$key][0]=="\r")
                                    {
                                        continue;
                                    }
                                    if(isset($content[$key][1]))
                                    {
                                        $Item_master = new CoPrdvItm;
                                        $Item_master->RetailStoreID = $content[$key][0]; 
                                        $Item_master->PriceDerivationRuleID = $content[$key][1];
                                        $Item_master->ReductionAmount = $content[$key][2]; 
                                        $Item_master->ReductionPercent = $content[$key][3]; 
                                        $Item_master->DiscountPricePoint = $content[$key][4];
                                        $Item_master->save();
                                    }
                                   
                                }

                        break;

                        case "co_el_prdv_itm":
                                
                                unset($content);
                                $content = array();

                                $file_content = explode("\n",file_get_contents("/home/vivek/Downloads/demo/".$table_name[$i].".csv"));
                                foreach ($file_content as $key => $value) 
                                {
                                    $content[] = explode(",", $value);
                                    if($content[$key][0]=="\r")
                                    {
                                        continue;
                                    }
                                    if(isset($content[$key][1]))
                                    {
                                        $Item_master = new CoeElPrdvItm;
                                        $Item_master->ItemID = $content[$key][0]; 
                                        $Item_master->RetailStoreID = $content[$key][1]; 
                                        $Item_master->PriceDerivationRuleID = $content[$key][2]; 
                                        $Item_master->StoreFinancialLedgerAccountID = $content[$key][3]; 
                                        $Item_master->EventID = $content[$key][4];
                                        $Item_master->AccountingDispositionCode = $content[$key][5];
                                        $Item_master->ThresholdAmount = $content[$key][6]; 
                                        $Item_master->ThresholdQuantity = $content[$key][7]; 
                                        $Item_master->QuantityLimit = $content[$key][8]; 
                                        $Item_master->AmountLimit = $content[$key][9];
                                        $Item_master->EffectiveDateTimestamp = $content[$key][10]; 
                                        $Item_master->ExpirationDateTimestamp = $content[$key][11]; 
                                        $Item_master->save();
                                    }
                                    
                                }

                        break;

                        case "co_el_prdv_dpt":
                                
                                unset($content);
                                $content = array();

                                $file_content = explode("\n",file_get_contents("/home/vivek/Downloads/demo/".$table_name[$i].".csv"));
                                foreach ($file_content as $key => $value) 
                                {
                                    $content[] = explode(",", $value);
                                    if($content[$key][0]=="\r")
                                    {
                                        continue;
                                    }
                                    if(isset($content[$key][1]))
                                    {
                                        $Item_master = new CoElPrdvDpt;
                                        $Item_master->POSDepartmentID = $content[$key][0]; 
                                        $Item_master->PriceDerivationRuleID = $content[$key][1]; 
                                        $Item_master->RetailStoreID = $content[$key][2]; 
                                        $Item_master->StoreFinancialLedgerAccountID = $content[$key][3]; 
                                        $Item_master->EventID = $content[$key][4];
                                        $Item_master->AccountingDispositionCode = $content[$key][5];
                                        $Item_master->ThresholdAmount = $content[$key][6]; 
                                        $Item_master->ThresholdQuantity = $content[$key][7]; 
                                        $Item_master->LimitQuantity = $content[$key][8]; 
                                        $Item_master->LimitAmount = $content[$key][9];
                                        $Item_master->EffectiveTimestamp = $content[$key][10]; 
                                        $Item_master->ExpirationTimestamp = $content[$key][11]; 
                                        $Item_master->save();
                                    }
                                    
                                }

                        break;

                        case "co_el_mrst_prdv":
                                
                                unset($content);
                                $content = array();

                                $file_content = explode("\n",file_get_contents("/home/vivek/Downloads/demo/".$table_name[$i].".csv"));
                                foreach ($file_content as $key => $value) 
                                {
                                    $content[] = explode(",", $value);
                                    if($content[$key][0]=="\r")
                                    {
                                        continue;
                                    }
                                    if(isset($content[$key][1]))
                                    {
                                        $Item_master = new CoElMrstPrdv;
                                        $Item_master->PriceDerivationRuleID = $content[$key][0]; 
                                        $Item_master->RetailStoreID = $content[$key][1]; 
                                        $Item_master->MerchandiseClassificationCode = $content[$key][2]; 
                                        $Item_master->ThresholdAmount = $content[$key][3]; 
                                        $Item_master->EventID = $content[$key][4];
                                        $Item_master->StoreFinancialLedgerAccountID = $content[$key][5];
                                        $Item_master->EffectiveDateTimestamp = $content[$key][6]; 
                                        $Item_master->ExpirationDateTimestamp = $content[$key][7]; 
                                        $Item_master->AccountingDispositionCode = $content[$key][8]; 
                                        $Item_master->QuantityThreshold = $content[$key][9];
                                        $Item_master->AmountLimit = $content[$key][10]; 
                                        $Item_master->QuantityLimit = $content[$key][11]; 
                                        $Item_master->save();
                                    }
                                    
                                }

                        break;



                        default:
                        break;


                    }
             }
        
     }

}