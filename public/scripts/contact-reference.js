$(document).ready(function()
{
    var base_url = window.location.origin;

    $('body').on('change',"#create-event-notify", function()
    {            
        if($('#create-event-notify').is(":checked"))
            $('.notify-location-radio').show();
        else
            $('.notify-location-radio').hide();

        if($('.notify-location-radio').val() == 'selected')
            $('.notify-location').show();
        else
            $('.notify-location').hide();
    });

    $('body').on('change',".notify-location-radio", function()
    {
        if(this.value == 'selected')
            $('.notify-location').show();
        else
            $('.notify-location').hide();
    });

    $('body').on('change',"#notify_selected", function()
    {            
        if($('#notify_selected').is(":checked"))
            $('.notify-location').show();
        else
            $('.notify-location').hide();
    });

    $('body').on('keyup','.create-issue-contact', function()
    {
        var length = this.value.length;
        
        if(length >= 10)
        {
            $('.num-span').addClass('glyphicon-refresh spinning');
            $("#create-issue-contact-name").prop("disabled", true);
            $("#create-issue-state").prop("disabled", true);
            $("#create-issue-district").prop("disabled", true);
            $("#create-issue-mla").prop("disabled", true);
            $("#create-issue-mp").prop("disabled", true);
            $("#create-issue-village").prop("disabled", true);
            $.ajax({
                url: base_url + '/contact-details/' + this.value,
                type: "get",
                success:function(data)
                {
                    $('.num-span').removeClass('glyphicon-refresh spinning');
                    $("#create-issue-contact-name").removeAttr('disabled');
                    $("#create-issue-state").removeAttr('disabled');
                    $("#create-issue-district").removeAttr('disabled');
                    $("#create-issue-mla").removeAttr('disabled');
                    $("#create-issue-mp").removeAttr('disabled');
                    $("#create-issue-village").removeAttr('disabled');
                    $('#create-issue-contact-name').val(data.name);
                    if(data.state != null)
                    {
                        $('#create-issue-state').val(data.state);
                        sbowSelected(data,'coordinator');
                    }
                    else
                    {
                        $("#create-issue-contact-name").removeAttr('disabled');
                        $("#create-issue-state").removeAttr('disabled');
                        $("#create-issue-district").removeAttr('disabled');
                        $("#create-issue-mla").removeAttr('disabled');
                        $("#create-issue-mp").removeAttr('disabled');
                        $("#create-issue-village").removeAttr('disabled');
                    }
                }
            });
        }
    });

    $('body').on('keyup','#event-coordinator-number', function()
    {
        var length = this.value.length;
        if(length >= 10)
        {
            $.ajax({
                url: base_url + '/contact-details/' + this.value,
                type: "get",
                success:function(data)
                {
                    if(data.name != null)
                    {
                        $('#event-coordinator-name').val(data.name);
                        $("#event-coordinator-name").prop('disabled', true);
                    }
                    else
                    {
                        $("#event-coordinator-name").removeAttr('disabled');
                        $("#event-coordinator-name").val('');
                    }
                }
            });
        }
        else
        {
            $("#event-coordinator-name").removeAttr('disabled');
        }
    });

    $('body').on('keyup','#event-second-coordinator-number', function()
    {
        var length = this.value.length;
        if(length >= 10)
        {
            $.ajax({
                url: base_url + '/contact-details/' + this.value,
                type: "get",
                success:function(data)
                {
                    if(data.name != null)
                    {
                        $('#event-second-coordinator-name').val(data.name);
                        $("#event-second-coordinator-name").prop('disabled', true);
                    }
                    else
                    {
                        $("#event-second-coordinator-name").removeAttr('disabled');
                        $("#event-second-coordinator-name").val('');
                    }
                }
            });
        }
        else
        {
            $("#event-second-coordinator-name").removeAttr('disabled');
        }
    });


    $('body').on('change',"#create-issue-referencestate", function()
    {
         var state = this.value;
         fetchReferenceissue(state);
        
    });

    $('body').on('change',"#create-issue-referencemla", function()
    {
            var mla = $('#create-issue-referencemla').val();
            fetchReferencevillage(mla);
     
    });

    $('body').on('keyup','.create-issue-referencecontact', function()
    {
        var length = this.value.length;
        if(length >= 10)
        {
            $('.num1-span').addClass('glyphicon-refresh spinning');
            $("#create-issue-contact-name").prop("disabled", true);
            $("#create-issue-state").prop("disabled", true);
            $("#create-issue-district").prop("disabled", true);
            $("#create-issue-mla").prop("disabled", true);
            $("#create-issue-mp").prop("disabled", true);
            $("#create-issue-village").prop("disabled", true);

            $.ajax({
                url: base_url + '/contact-details/' + this.value,
                type: "get",
                success:function(data)
                {
                    $('.num1-span').removeClass('glyphicon-refresh spinning');
                    $("#create-issue-contact-referencename").prop("disabled", true);
                    $("#create-issue-referencestate").prop("disabled", true);
                    $("#create-issue-referencedistrict").prop("disabled", true);
                    $("#create-issue-referencemla").prop("disabled", true);
                    $("#create-issue-referencemp").prop("disabled", true);
                    $("#create-issue-referencevillage").prop("disabled", true);
                    $('#create-issue-contact-referencename').val(data.name);
                    if(data.state != null)
                    {
                        $('#create-issue-referencestate').val(data.state);
                        sbowSelected(data,'reference');
                    }
                    else
                    {
                        $("#create-issue-contact-referencename").removeAttr('disabled');
                        $("#create-issue-referencestate").removeAttr('disabled');
                        $("#create-issue-referencedistrict").removeAttr('disabled');
                        $("#create-issue-referencemla").removeAttr('disabled');
                        $("#create-issue-referencemp").removeAttr('disabled');
                        $("#create-issue-referencevillage").removeAttr('disabled');
                    }
                }
            });
        }
    });

    function sbowSelected(data, type)
    {
        $.ajax({
            url: '/statewise',
            type: "post",
            data:{
                    'state'   : data.state,
                },
            success:function(data1)
            {
                var district = data1.districtArray;
                var mla = data1.mlaArray;
                var mp = data1.mpArray;
                var village = data1.villageArray;

                if(type == 'coordinator')
                {
                    $('#create-issue-district').empty();
                    $('#create-issue-mla').empty();
                    $('#create-issue-mp').empty();
                    $('#create-issue-village').empty();

                    $.each(district, function(index, value)
                    {
                        $('#create-issue-district').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(mla, function(index, value)
                    {
                        $('#create-issue-mla').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(mp, function(index, value)
                    {
                        $('#create-issue-mp').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(village, function(index, value)
                    {
                        $('#create-issue-village').append($('<option>').text(value).attr('value', index));
                    });

                    if(data.district != null)
                        $('#create-issue-district').val(data.district);

                    if(data.mla != null)
                        $('#create-issue-mla').val(data.mla);

                    if(data.mp != null)
                        $('#create-issue-mp').val(data.mp);

                    if(data.village != null)
                        $('#create-issue-village').val(data.village);

                    $("#create-issue-contact-name").prop("disabled", true);
                    $("#create-issue-state").prop("disabled", true);
                    $("#create-issue-district").prop("disabled", true);
                    $("#create-issue-mla").prop("disabled", true);
                    $("#create-issue-mp").prop("disabled", true);
                    $("#create-issue-village").prop("disabled", true);
                }
                else if(type == 'reference')
                {
                    $('#create-issue-referencedistrict').empty();
                    $('#create-issue-referencemla').empty();
                    $('#create-issue-referencemp').empty();
                    $('#create-issue-referencevillage').empty();

                    $.each(district, function(index, value)
                    {
                        $('#create-issue-referencedistrict').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(mla, function(index, value)
                    {
                        $('#create-issue-referencemla').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(mp, function(index, value)
                    {
                        $('#create-issue-referencemp').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(village, function(index, value)
                    {
                        $('#create-issue-referencevillage').append($('<option>').text(value).attr('value', index));
                    });

                    if(data.district != null)
                        $('#create-issue-referencedistrict').val(data.district);

                    if(data.mla != null)
                        $('#create-issue-referencemla').val(data.mla);

                    if(data.mp != null)
                        $('#create-issue-referencemp').val(data.mp);

                    if(data.village != null)
                        $('#create-issue-referencevillage').val(data.village);

                    $("#create-issue-contact-referencename").prop("disabled", true);
                    $("#create-issue-referencestate").prop("disabled", true);
                    $("#create-issue-referencedistrict").prop("disabled", true);
                    $("#create-issue-referencemla").prop("disabled", true);
                    $("#create-issue-referencemp").prop("disabled", true);
                    $("#create-issue-referencevillage").prop("disabled", true);
                }
            }
        });
    }

    $('body').on('change','#create-issue-reference',function()
    {
        if($('#create-issue-reference').is(":checked"))
        {

            $('.issue-reference').show();
            if($('#create-issue-referencestate').val() != 0)
                {
                    var state = $('#create-issue-referencestate').val();
                    fetchReferenceissue(state); 
                }
        }
        else
        {
            $('.issue-reference').hide();
        }
    });

    $('body').on('change','#edit-issue-reference',function()
    {
        if($('#edit-issue-reference').is(":checked"))
            $('.issue-reference').show();
        else
            $('.issue-reference').hide();
    });

    $('body').on('change',"#add-other-number", function()
    {            
        if($('#add-other-number').is(":checked"))
            $('.secondary-contact').show();
        else
            $('.secondary-contact').hide();
    });

    $('body').on('change',"#edit-issue-referencestate", function()
    {
        $.ajax({
                url: '/statewise',
                type: "post",
                data : {
                'state'   :$('#edit-issue-referencestate').val(),
            },
                success:function(data)
                {
                    var district = data.districtArray;
                    var mla = data.mlaArray;
                    var mp = data.mpArray;
                    var village = data.villageArray;
                    $('#edit-issue-referencedistrict').empty();
                    $('#edit-issue-referencemla').empty();
                    $('#edit-issue-referencemp').empty();
                    $('#edit-issue-referencevillage').empty();

                    $('#edit-issue-referencedistrict').append($('<option>').text('Select District').attr('value', ''));
                    $('#edit-issue-referencemla').append($('<option>').text('Select MLA').attr('value', 0));
                    $('#edit-issue-referencemp').append($('<option>').text('Select MP').attr('value', 0));

                    $.each(district, function(index, value)
                    {
                        $('#edit-issue-referencedistrict').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(mla, function(index, value)
                    {
                        $('#edit-issue-referencemla').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(mp, function(index, value)
                    {
                        $('#edit-issue-referencemp').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(village, function(index, value)
                    {
                        $('#edit-issue-referencevillage').append($('<option>').text(value).attr('value', index));
                    });
                }
            });
    });
    $('body').on('keyup','.edit-issue-referencecontact', function()
    {
        var length = this.value.length;
        if(length >= 10)
        {
            $('.num1-span').addClass('glyphicon-refresh spinning');
            $('#edit-issue-contact-referencename').prop("disabled", true);
            $("#edit-issue-referencestate").prop("disabled", true);
            $("#edit-issue-referencedistrict").prop("disabled", true);
            $("#edit-issue-referencemla").prop("disabled", true);
            $("#edit-issue-referencemp").prop("disabled", true);
            $("#edit-issue-referencevillage").prop("disabled", true);
            
            $.ajax({
                url: base_url + '/contact-details/' + this.value,
                type: "get",
                success:function(data)
                {
                    $('.num1-span').removeClass('glyphicon-refresh spinning');
                    $('#edit-issue-contact-referencename').removeAttr('disabled');
                    $("#edit-issue-referencestate").removeAttr('disabled');
                    $("#edit-issue-referencedistrict").removeAttr('disabled');
                    $("#edit-issue-referencemla").removeAttr('disabled');
                    $("#edit-issue-referencemp").removeAttr('disabled');
                    $("#edit-issue-referencevillage").removeAttr('disabled');
                    $('#edit-issue-contact-referencename').val(data.name);
                    if(data.state != null)
                    {
                        $('#edit-issue-referencestate').val(data.state);
                        editsbowSelected(data,'reference');
                    }
                    else
                    {
                        $('#edit-issue-contact-referencename').removeAttr('disabled');
                        $("#edit-issue-referencestate").removeAttr('disabled');
                        $("#edit-issue-referencedistrict").removeAttr('disabled');
                        $("#edit-issue-referencemla").removeAttr('disabled');
                        $("#edit-issue-referencemp").removeAttr('disabled');
                        $("#edit-issue-referencevillage").removeAttr('disabled');
                    }
                }
            });
        }
    });

    function editsbowSelected(data, type)
    {
        $.ajax({
            url: '/statewise',
            type: "post",
            data:{
                    'state'   : data.state,
                },
            success:function(data1)
            {
                var district = data1.districtArray;
                var mla = data1.mlaArray;
                var mp = data1.mpArray;
                var village = data1.villageArray;

                if(type == 'coordinator')
                {
                    $('#edit-issue-district').empty();
                    $('#edit-issue-mla').empty();
                    $('#edit-issue-mp').empty();
                    $('#edit-issue-village').empty();

                    $.each(district, function(index, value)
                    {
                        $('#edit-issue-district').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(mla, function(index, value)
                    {
                        $('#edit-issue-mla').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(mp, function(index, value)
                    {
                        $('#edit-issue-mp').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(village, function(index, value)
                    {
                        $('#edit-issue-village').append($('<option>').text(value).attr('value', index));
                    });

                    if(data.district != null)
                        $('#edit-issue-district').val(data.district);

                    if(data.mla != null)
                        $('#edit-issue-mla').val(data.mla);

                    if(data.mp != null)
                        $('#edit-issue-mp').val(data.mp);

                    if(data.village != null)
                        $('#edit-issue-village').val(data.village);

                    $('#edit-issue-contact-name').prop("disabled", true);
                    $("#edit-issue-state").prop("disabled", true);
                    $("#edit-issue-district").prop("disabled", true);
                    $("#edit-issue-mla").prop("disabled", true);
                    $("#edit-issue-mp").prop("disabled", true);
                    $("#edit-issue-village").prop("disabled", true);
                }
                else if(type == 'reference')
                {
                    $('#edit-issue-referencedistrict').empty();
                    $('#edit-issue-referencemla').empty();
                    $('#edit-issue-referencemp').empty();
                    $('#edit-issue-referencevillage').empty();

                    $.each(district, function(index, value)
                    {
                        $('#edit-issue-referencedistrict').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(mla, function(index, value)
                    {
                        $('#edit-issue-referencemla').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(mp, function(index, value)
                    {
                        $('#edit-issue-referencemp').append($('<option>').text(value).attr('value', index));
                    });

                    $.each(village, function(index, value)
                    {
                        $('#edit-issue-referencevillage').append($('<option>').text(value).attr('value', index));
                    });

                    if(data.district != null)
                        $('#edit-issue-referencedistrict').val(data.district);

                    if(data.mla != null)
                        $('#edit-issue-referencemla').val(data.mla);

                    if(data.mp != null)
                        $('#edit-issue-referencemp').val(data.mp);

                    if(data.village != null)
                        $('#edit-issue-referencevillage').val(data.village);

                    
                    $('#edit-issue-contact-referencename').prop("disabled", true);
                    $("#edit-issue-referencestate").prop("disabled", true);
                    $("#edit-issue-referencedistrict").prop("disabled", true);
                    $("#edit-issue-referencemla").prop("disabled", true);
                    $("#edit-issue-referencemp").prop("disabled", true);
                    $("#edit-issue-referencevillage").prop("disabled", true);
                }
            }
        });
    }

     $('body').on('keyup','.edit-issue-contact', function()
    {
        var length = this.value.length;
        if(length >= 10)
        {
            $('.num-span').addClass('glyphicon-refresh spinning');
            $('#edit-issue-contact-name').prop("disabled", true);
            $("#edit-issue-state").prop("disabled", true);
            $("#edit-issue-district").prop("disabled", true);
            $("#edit-issue-mla").prop("disabled", true);
            $("#edit-issue-mp").prop("disabled", true);
            $("#edit-issue-village").prop("disabled", true);
            $.ajax({
                url: base_url + '/contact-details/' + this.value,
                type: "get",
                success:function(data)
                {
                    $('.num-span').removeClass('glyphicon-refresh spinning');
                    $('#edit-issue-contact-name').removeAttr('disabled');
                    $("#edit-issue-state").removeAttr('disabled');
                    $("#edit-issue-district").removeAttr('disabled');
                    $("#edit-issue-mla").removeAttr('disabled');
                    $("#edit-issue-mp").removeAttr('disabled');
                    $("#edit-issue-village").removeAttr('disabled');
                    $('#edit-issue-contact-name').val(data.name);
                    if(data.state != null)
                    {
                        $('#edit-issue-state').val(data.state);
                        editsbowSelected(data,'coordinator');
                    }
                    else
                    {
                        $('#edit-issue-contact-name').removeAttr('disabled');
                        $("#edit-issue-state").removeAttr('disabled');
                        $("#edit-issue-district").removeAttr('disabled');
                        $("#edit-issue-mla").removeAttr('disabled');
                        $("#edit-issue-mp").removeAttr('disabled');
                        $("#edit-issue-village").removeAttr('disabled');
                    }
                }
            });
        }
    });


});

function fetchReferenceissue(state)
{
    var selected_state = state;
    $.ajax({
                url: '/statewise',
                type: "post",
                data : {
                'state'   :selected_state,
            },
                success:function(data)
                {
                    var district = data.districtArray;
                    var mla = data.mlaArray;
                    var mp = data.mpArray;
                    var village = data.villageArray;
                    $('#create-issue-referencedistrict').empty();
                    $('#create-issue-referencemla').empty();
                    $('#create-issue-referencemp').empty();
                    $('#create-issue-referencevillage').empty();

                    // $('#create-issue-referencedistrict').append($('<option>').text('Select District').attr('value', ''));
                    // $('#create-issue-referencemla').append($('<option>').text('Select MLA').attr('value', 0));
                    // $('#create-issue-referencemp').append($('<option>').text('Select MP').attr('value', 0));

                    $.each(district, function(index, value)
                    {
                        $('#create-issue-referencedistrict').append($('<option>').text(value).attr('value', index));
                    });
                    $("#create-issue-referencedistrict").append($("#create-issue-referencedistrict option").remove().sort(function(a, b) {
                        var at = $(a).text(), bt = $(b).text();
                        return (at > bt)?1:((at < bt)?-1:0);
                    }));
                    $('#create-issue-referencedistrict').prepend($('<option>').text('Select District').attr('value', ''));
                    $('#create-issue-referencedistrict').val('');

                    $.each(mla, function(index, value)
                    {
                        $('#create-issue-referencemla').append($('<option>').text(value).attr('value', index));
                    });
                    $("#create-issue-referencemla").append($("#create-issue-referencemla option").remove().sort(function(a, b) {
                        var at = $(a).text(), bt = $(b).text();
                        return (at > bt)?1:((at < bt)?-1:0);
                    }));
                    $('#create-issue-referencemla').val(candidateMLA);
                    $('#create-issue-referencemla').prepend($('<option>').text('Select MLA').attr('value', ''));
                    //$('#create-issue-referencemla').val('');
                     if($('#create-issue-referencemla').val() == 0)
                    {
                        var mla = $('#create-issue-referencemla').val();
                        fetchReferencevillage(mla); 
                    }

                    $.each(mp, function(index, value)
                    {
                        $('#create-issue-referencemp').append($('<option>').text(value).attr('value', index));
                    });
                    $("#create-issue-referencemp").append($("#create-issue-referencemp option").remove().sort(function(a, b) {
                        var at = $(a).text(), bt = $(b).text();
                        return (at > bt)?1:((at < bt)?-1:0);
                    }));
                    $('#create-issue-referencemp').val(candidateMP);
                    $('#create-issue-referencemp').prepend($('<option>').text('Select MP').attr('value', ''));
                    //$('#create-issue-referencemp').val('');

                    $.each(village, function(index, value)
                    {
                        $('#create-issue-referencevillage').append($('<option>').text(value).attr('value', index));
                    });
                    $("#create-issue-referencevillage").append($("#create-issue-referencevillage option").remove().sort(function(a, b) {
                        var at = $(a).text(), bt = $(b).text();
                        return (at > bt)?1:((at < bt)?-1:0);
                    }));
                    $('#create-issue-referencevillage').prepend($('<option>').text('Select Village').attr('value', ''));
                    $('#create-issue-referencevillage').val('');
                }
            });
}

function fetchReferencevillage(mla)
{
    var base_url = window.location.origin;
    var constituency = mla;
    $.ajax({
            method:'post',
            url:base_url+'/villagelist',
            data:{
                'constituency_id' : $('#create-issue-referencemla').val(),
            },
            success:function(data)
            { 
                var village = data.villageArray;
                $('#create-issue-referencevillage').empty();
                //$('#create-issue-referencevillage').append($('<option>').text('Select Village').attr('value', 0));
                $.each(village, function(index, value)
                        {
                            $('#create-issue-referencevillage').append($('<option>').text(value).attr('value', index));
                        });
                $("#create-issue-referencevillage").append($("#create-issue-referencevillage option").remove().sort(function(a, b) {
                        var at = $(a).text(), bt = $(b).text();
                        return (at > bt)?1:((at < bt)?-1:0);
                    }));
                    $('#create-issue-referencevillage').prepend($('<option>').text('Select Village').attr('value', ''));
                    $('#create-issue-referencevillage').val('');
            }
        });
}