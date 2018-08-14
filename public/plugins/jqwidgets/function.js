    var data = {};
var theme = 'metro';

$(document).ready(function() {
   //  //  $(".chosen-select").chosen({width: "50%"}); 
   // // $(".chosen-select").select2({width: "100%"});
   //  //select input fix could not type in search input in select2 in bootstrap modal
   //  $.fn.modal.Constructor.prototype.enforceFocus = function() {};
   //  $(".datepicker").datepicker({changeMonth:true,changeYear:true});
});


// empty all input fields by getting inputids from fieldsarray
function inputsEmpty(fieldsarray){
    $.each(fieldsarray, function( index, value ) {
        $("#" + value ).val('');
    });
}

// Fill form automatically by getting inputids from fieldsarray
function inputsFillData(fieldsarray,datarecord){
    $.each(fieldsarray, function( index, value ) {
       $("#" + value ).val(datarecord[value]);
    });
}

// generate datarecord array by getting inputids value from fieldsarray
var generaterow = function (fieldsarray) {
    var row = {};
    $.each(fieldsarray, function( index, value ) {
        row[value]= $("#" + value ).val();    
    });
    return row;
}


// JQXGRID FUNCTIONS START  ---------------------------------------------------
function ajax_grid(data,commit,rawurl){
    $.ajax({
        dataType: 'json',
        url: rawurl,
        data: data,
        cache: false,
      type: "POST",
        success: function (data, status, xhr) {
            // insert command is executed.
            //$("#jqxgrid").jqxGrid('updatebounddata');
            commit(true);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            commit(false);
        }
    });
}

function rebindGrid(jqxgridid,dataAdapter){
    $(document).ajaxSuccess(function(e) {
        $(jqxgridid).jqxGrid( {source: dataAdapter });
        $(document).unbind("ajaxSuccess");
    });
}

// Jqxgrid cell validation custom function just add eg. {text:'ID',validation:requiredvalidation }
var requiredvalidation = function (cell, value) {
    if (value == "") {
        return { result: false, message: "Must not be empty!" };
    }
    return true;
}


// Jqxgrid Bind delete event to btn just specify (jqxgrid id and delete button id)
// It will delete selected record automatically on delete button click
function deleteRecord(jqxgridid,deletebtnid){
    // delete row.
    $(deletebtnid).bind('click', function () {
        var selectedrowindex = $(jqxgridid).jqxGrid('getselectedrowindex');
        var rowscount = $(jqxgridid).jqxGrid('getdatainformation').rowscount;
        if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
            var id = $(jqxgridid).jqxGrid('getrowid', selectedrowindex);
            $(jqxgridid).jqxGrid('deleterow', id);
        }
    });
}

