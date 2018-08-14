<?php
namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Middleware\adminuser;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Session;

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


}