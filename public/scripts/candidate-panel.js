$(document).ready(function()
{
    var base_url = window.location.origin;
    $('body').on('change',"#create-event-state", function()
    {
        var state = this.value;
        fetchData(state);
    });

    $('body').on('change',"#notify-state", function()
    {
        var state = this.value;
        fetchNotifydata(state);
    });

    $('body').on('change',"#create-event-mla", function()
    {
            var mla = $('#create-event-mla').val();
            fetchVillage(mla); 
   
    });

    $('body').on('change',"#notify-mla", function()
      {
            var mla = $('#notify-mla').val();
            fetchNotifyvillage(mla);
    });

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

    $('body').on('change',".time-dropdown", function()
    {            
        if($('#create-event-time-minute').val() =='' || $('#create-event-time-minute').val() ==0)
        {
            $('#create-event-time-minute').val('00');
        }
        $('#create-event-time').val($('#create-event-time-hour').val() + ':' + $('#create-event-time-minute').val());
    });

    $('body').on('click',"#save-event", function()
    {
        if($(this).hasClass('disabled'))
            return;

        var name =  $('#create-event-name').val();
        var description =  $('#create-event-description').val();
        var date =  $('#create-event-date').val();
        var time =  $('#create-event-time').val();
        var address =  $('#create-event-address').val();
        var state = $('#create-event-state').val();
        var district = $('#create-event-district').val();
        var mp = $('#create-event-mp').val();
        var mla = $('#create-event-mla').val();
        var village = $('#create-event-village').val();
        var event_type = $('#create-event-event_type').val();
        var priority = $('#create-event-priority').val();
        var action = $('#create-event-action').val();

        var location_radio = $('input[name=notify-people]:checked').val();
        var notify_state = $('#notify-state').val();
        var notify_district = $('#notify-district').val();
        var notify_mp = $('#notify-mp').val();
        var notify_mla = $('#notify-mla').val();
        var notify_village = $('#notify-village').val();

        var coordinator_number = $('#event-coordinator-number').val();
        var coordinator_name = $('#event-coordinator-name').val();
        var second_coordinator_number = $('#event-second-coordinator-number').val();
        var second_coordinator_name = $('#event-second-coordinator-name').val();

        if($('#create-event-notify').is(":checked"))
            var notify = 1;
        else
            var notify = 0;

        
        if(name == '')
        {
            $('#create-event-name-error').html('Please fill event name');
            return;
        }
        
                
        if(state == '')
        {
            $('#create-event-state-error').html('Please Select State');
            return;
        }

        if(description == '')
        {
            $('#create-event-description-error').html('Please fill event description');
            return;
        }

        if(date == '')
        {
            $('#create-event-date-error').html('Please fill event date');
            return;
        }
                

        if(event_type == '')
        {
            $('#create-event-event_type-error').html('Please Select Event Type');
            return;
        }

        if(coordinator_number != '' && coordinator_name == '')
        {
            $('#event-coordinator-name-error').html('Please Enter Coordinator Name');
            return;
        }

        if(second_coordinator_number != '' && second_coordinator_name == '')
        {
            $('#event-second-coordinator-name-error').html('Please Enter Coordinator Name');
            return;
        }

        $('#save-event').addClass('disabled');
        $('.save-span').removeClass('');
        $('.save-span').addClass('glyphicon-refresh spinning');
        $.ajax({
                url: '/create-event',
                type: "post",
                data:{
                        'c_number'                  : coordinator_number,
                        'c_name'                    : coordinator_name,
                        'sc_number'                 : second_coordinator_number,
                        'sc_name'                   : second_coordinator_name,
                        'name'                      : name,
                        'description'               : description,
                        'date'                      : date,
                        'time'                      : time,
                        'address'                   : address,
                        'notify'                    : notify,
                        'state'                     : state,
                        'district'                  : district,
                        'mp'                        : mp,
                        'mla'                       : mla,
                        'village'                   : village,
                        'event_type'                : event_type,
                        'priority'                  : priority,
                        'action'                    : action,
                        'type'                      : 'AllEvents',
                        'location_radio'            : location_radio,
                        'notify_state'              : notify_state,
                        'notify_district'           : notify_district,
                        'notify_mp'                 : notify_mp,
                        'notify_mla'                : notify_mla,
                        'notify_village'            : notify_village,
                },
                success:function(data)
                {
                    $('.save-span').removeClass('glyphicon-refresh spinning');
                    $('.save-span').addClass('');
                    $('#save-event').removeClass('disabled');
                    $('.issueInnerCont').html(data);
                    $('#create-event-modal').modal('hide');
                    $('#links-display-shown').html($('#links-display-hidden').html());
                    $('#links-display-hidden').html('');
                    $('#event-count').html($('#count-display-hidden').html());
                    $('#count-display-hidden').html('');
                    // $('#add_picture_modal').modal('show');
                    $('#create-event-modal').modal('hide');
                }
            });
    });

    $('body').on('click',"#save-note", function()
    {
        if($(this).hasClass('disabled'))
            return;

        var description =  $('#create-note-description').val();
        var date =  $('#create-note-date').val();
        var time =  $('#create-note-time').val();
        var contact = $('#create-note-contact').val();

         if(contact == 0)
        {
            $('#create-note-contact-error').html('Please Select Contact');
            return;
        }

        if(description == '')
        {
            $('#create-note-description-error').html('Please fill description');
            return;
        }

        if($('#create-note-reminder').is(":checked"))
        {
            var notify = 1;
            if(date == '')
            {
                $('#create-note-date-error').html('Please fill date');
                return;
            }

            if(time == '')
            {
                $('#create-note-time-error').html('Please fill time');
                return;
            }
        }
        else
        {
            var notify = 0;
        }
        
        $('#save-note').addClass('disabled');
        $('.save-span').removeClass('');
        $('.save-span').addClass('glyphicon-refresh spinning');
         $.ajax({
                url: '/create-note',
                type: "post",
                data:{
                        'message'       : description,
                        'date'          : date,
                        'time'          : time,
                        'reminder'      : notify,
                        'contact'       : contact,
                        'type'          : 'AllNotes'
                },
                success:function(data)
                {
                    $('.save-span').removeClass('glyphicon-refresh spinning');
                    $('.save-span').addClass('');
                    $('#save-note').removeClass('disabled');
                    $('.issueInnerCont').html(data);
                    $('#create-note-modal').modal('hide');
                    $('#links-display-shown').html($('#links-display-hidden').html());
                    $('#links-display-hidden').html('');
                    $('#note-count').html($('#count-display-hidden').html());
                    $('#count-display-hidden').html('');
                }
            });
    });
   
   $('body').on('change',".time-dropdown", function()
    {            
        $('#create-note-time').val($('#create-note-time-hour').val() + ':' + $('#create-note-time-minute').val());
    });

    $('body').on('change',"#create-issue-state", function()
    {
        var state = this.value;
        fetchDataissue(state);
    });

     $('body').on('change',"#edit-issue-state", function()
    {
        $.ajax({
                url: '/create-issue/' + this.value,
                type: "get",
                success:function(data)
                {
                    var district = data.districtArray;
                    var mla = data.mlaArray;
                    var mp = data.mpArray;
                    
                    $('#edit-issue-district').empty();
                    $('#edit-issue-mla').empty();
                    $('#edit-issue-mp').empty();
                    

                    // $('#edit-issue-district').append($('<option>').text('Select District').attr('value', ''));
                    // $('#edit-issue-mla').append($('<option>').text('Select MLA').attr('value', 0));
                    // $('#edit-issue-mp').append($('<option>').text('Select MP').attr('value', 0));

                    $.each(district, function(index, value)
                    {
                        $('#edit-issue-district').append($('<option>').text(value).attr('value', index));
                    });
                    $("#edit-issue-district").append($("#edit-issue-district option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                        }));
                    $('#edit-issue-district').prepend($('<option>').text('Select District').attr('value', ''));
                    $('#edit-issue-district').val('');

                    $.each(mla, function(index, value)
                    {
                        $('#edit-issue-mla').append($('<option>').text(value).attr('value', index));
                    });
                    $("#edit-issue-mla").append($("#edit-issue-mla option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                        }));
                    $('#edit-issue-mla').prepend($('<option>').text('Select MLA').attr('value', ''));
                    $('#edit-issue-mla').val('');

                    $.each(mp, function(index, value)
                    {
                        $('#edit-issue-mp').append($('<option>').text(value).attr('value', index));
                    });
                    $("#edit-issue-mp").append($("#edit-issue-mp option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                        }));
                    $('#edit-issue-mp').prepend($('<option>').text('Select MP').attr('value', ''));
                    $('#edit-issue-mp').val('');

                    
                }
            });
    });

   $('body').on('change',"#create-issue-mla", function()
    {
            var mla = $('#create-issue-mla').val();
            fetchIssuevillage(mla);
     
    });


    $('body').on('change',"#edit-issue-mla", function()
    {
            
     $.ajax({
            method:'post',
            url:base_url+'/villagelist',
            data:{
                'constituency_id' : $('#edit-issue-mla').val(),
            },
            success:function(data)
            { 
                var village = data.villageArray;
                $('#edit-issue-village').empty();
                //$('#edit-issue-village').append($('<option>').text('Select Village').attr('value', 0));
                $.each(village, function(index, value)
                        {
                            $('#edit-issue-village').append($('<option>').text(value).attr('value', index));
                        });
                $("#edit-issue-village").append($("#edit-issue-village option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                        }));
                    $('#edit-issue-village').prepend($('<option>').text('Select Village').attr('value', ''));
                    $('#edit-issue-village').val('');
            }
        });
    });

    $('body').on('click',"#save-issue", function()
    {
        if($(this).hasClass('disabled'))
            return;

        var name =  $('#create-issue-name').val();
        var description =  $('#create-issue-description').val();
        var state = $('#create-issue-state').val();
        var district = $('#create-issue-district').val();
        var mp = $('#create-issue-mp').val();
        var mla = $('#create-issue-mla').val();
        var village = $('#create-issue-village').val();
        var priority = $('#create-issue-priority').val();
        var action = $('#create-issue-action').val();
        var contact = $('#create-issue-contact').val();
        var contact_name = $('#create-issue-contact-name').val();
        var referencestate = $('#create-issue-referencestate').val();
        var referencedistrict = $('#create-issue-referencedistrict').val();
        var referencemp = $('#create-issue-referencemp').val();
        var referencemla = $('#create-issue-referencemla').val();
        var referencecontact = $('#create-issue-referencecontact').val();
        var referencecontact_name = $('#create-issue-contact-referencename').val();
        var reference_village = $('#create-issue-referencevillage').val();
        var value = $("input:checked").val();

        if(value)
            var reference = 1;
        else
           var reference = 0;

        if(contact == '')
        {
            $('#create-issue-contact-error').html('Please provide contact number');
            return;
        }

        if(isNaN(contact))
        {
            $('#create-issue-contact-error').html('Invalid Number');
            return;
        }

        var pattern = /^\d{10,12}$/;
        if (!pattern.test(contact)) {
            $('#create-issue-contact-error').html('Mobile Number between 10 to 12 digit');
            return ;
        }

        if(contact != '' && contact_name == '')
        {
            $('#create-issue-contact-name-error').html('Please provide conatct name');
            return;
        }

        if(state == '')
        {
            $('#create-issue-state-error').html('Please Select State');
            return;
        }

        if(name == '')
        {
            $('#create-issue-name-error').html('Please fill issue name');
            return;
        }

        if(description == '')
        {
            $('#create-issue-description-error').html('Please fill issue description');
            return;
        }
        
        if($('#create-issue-reference').is(":checked"))
        {
            if(contact == referencecontact)
            {
                $('#create-issue-referencecontact-error').html('Contact no. and reference no. are same');
                return;
            }
            if(referencecontact == '')
            {
                $('#create-issue-referencecontact-error').html('Please provide reference contact number');
                return;
            }

            if(isNaN(referencecontact))
            {
                $('#create-issue-referencecontact-error').html('Invalid Number');
                return;
            }
            if(referencecontact != '' && referencecontact_name == '')
            {
                $('#create-issue-contact-referencename-error').html('Please provide reference conatct name');
                return;
            }
            var pattern1 = /^\d{10,12}$/;
            if (!pattern1.test(referencecontact)) 
            {
            $('#create-issue-referencecontact-error').html('Mobile Number between 10 to 12 digit');
            return ;
            } 
        }

        $('#save-issue').addClass('disabled');
        $('.save-span').removeClass('');
        $('.save-span').addClass('glyphicon-refresh spinning');
        $.ajax({
                url: '/create-issue',
                type: "post",
                data:{
                        'name'          : name,
                        'description'   : description,
                        'state'         : state,
                        'district'      : district,
                        'mp'            : mp,
                        'mla'           : mla,
                        'village'       : village,
                        'priority'      : priority,
                        'action'        : action,
                        'type'          : 'AllIssues',
                        'contact'       : contact,
                        'contact_name'  : contact_name,
                        'reference'     : reference,
                        'referencestate' : referencestate,
                        'referencedistrict' : referencedistrict,
                        'referencemla' : referencemla,
                        'referencemp' : referencemp,
                        'referencecontact' : referencecontact,
                        'referencecontact_name' : referencecontact_name,
                        'reference_village'     : reference_village,
                },
                success:function(data)
                {
                    $('.save-span').removeClass('glyphicon-refresh spinning');
                    $('.save-span').addClass('');
                    $('#save-issue').removeClass('disabled');
                    $('.issueInnerCont').html(data);
                    $('#create-issue-modal').modal('hide');
                    $('#links-display-shown').html($('#links-display-hidden').html());
                    $('#links-display-hidden').html('');
                    $('#issue-count').html($('#count-display-hidden').html());
                    $('#count-display-hidden').html('');
                }
            });
    });

    $('body').on('change',"#create-contact-state", function()
    {
        var state = this.value;
        fetchDatacontact(state);        
    });

    $('body').on('change',"#create-contact-mla", function()
    {
            var mla = this.value;
            fetchContactvillage(mla);
   
    });

    $('body').on('change',".time-dropdown", function()
    {            
        $('#create-contact-time').val($('#create-contact-time-hour').val() + ':' + $('#create-contact-time-minute').val());
    });

    $('body').on('click',"#save-contact", function()
    {
        if($(this).hasClass('disabled'))
            return;

        var name =  $('#create-contact-name').val();
        var state = $('#create-contact-state').val();
        var district = $('#create-contact-district').val();
        var mp = $('#create-contact-mp').val();
        var mla = $('#create-contact-mla').val();
        var village = $('#create-contact-village').val();
        var contact_type = $('#create-contact-type').val();
        var contact1 = $('#create-contact-contact1').val();
        var contact2 = $('#create-contact-contact2').val();
        var contact3 = $('#create-contact-contact3').val();
        var party_position = $('#create-contact-position').val();
        var orientation = $('#create-contact-orientation').val();

        var contactId = $('#contact_id').val();

        var url = '/create-contact';
        if(contactId != '')
        {
            url = '/create-contact/' + contactId;
        }

        if(name == '')
        {
            $('#create-contact-name-error').html('Please fill contact name');
            return;
        }

        if(contact1 == '')
        {
            $('#create-contact-contact1-error').html('Please provide mobile number');
            return;
        }

        if(isNaN(contact1))
        {
            $('#create-contact-contact1-error').html('Invalid Number');
            return;
        }
        var pattern = /^\d{10,12}$/;
        if (!pattern.test(contact1)) {
            $('#create-contact-contact1-error').html('Mobile Number between 10 to 12 digit');
            return ;
        }
        if(contact_type == 0)
        {
            $('#create-contact-type-error').html('Please Select Contact Type');
            return;
        }

        if(contact_type == 4)
        {
            if(party_position == 0)
            {
                $('#create-contact-position-error').html('Please select party position');
                return;
            }
            
        }
                      
        if(state == '')
        {
            $('#create-contact-state-error').html('Please Select State');
            return;
        }
        
        $('#save-contact').addClass('disabled');
        $('.save-span').removeClass('');
        $('.save-span').addClass('glyphicon-refresh spinning');
        $.ajax({
                url: url,
                type: "post",
                data:{
                        'name'              : name,
                        'state'             : state,
                        'district'          : district,
                        'mp'                : mp,
                        'mla'               : mla,
                        'village'           : village,
                        'contact_type'      : contact_type,
                        'contact1'          : contact1,
                        'contact2'          : contact2,
                        'contact3'          : contact3,
                        'party_position'    : party_position,
                        'orientation'       : orientation,
                        //'contact_id'        : contact_id,
                        'type'              : 'AllContacts'
                },
                success:function(data)
                {
                    $('.save-span').removeClass('glyphicon-refresh spinning');
                    $('.save-span').addClass('');
                    $('#save-contact').removeClass('disabled');
                    $('.issueInnerCont').html(data);
                    $('#create-contact-modal').modal('hide');
                    $('#scrollbar1').show();
                    $('#links-display-shown').html($('#links-display-hidden').html());
                    $('#links-display-hidden').html('');
                    $('#contact-count').html($('#count-display-hidden').html());
                    $('#count-display-hidden').html('');
                    // $('#add_picture_modal').modal('show');
                    $('#create-contact-modal').modal('hide');
                }
        });
    });

    $('body').on('change',".time-dropdown", function()
    {            
        $('#edit-event-time').val($('#edit-event-time-hour').val() + ':' + $('#edit-event-time-minute').val());
    });


    $('body').on('click',"#save-editevent", function()
    {
        if($(this).hasClass('disabled'))
            return;

        var event_id =  $('#edit_event_id').val();
        var name =  $('#edit-event-name').val();
        var description =  $('#edit-event-description').val();
        var date =  $('#edit-event-date').val();
        var time =  $('#edit-event-time').val();
        var address =  $('#edit-event-address').val();
        var state = $('#edit-event-state').val();
        var district = $('#edit-event-district').val();
        var mp = $('#edit-event-mp').val();
        var mla = $('#edit-event-mla').val();
        var village = $('#edit-event-village').val();
        var event_type = $('#edit-event-event_type').val();
        var priority = $('#edit-event-priority').val();
        var action = $('#edit-event-action').val();
        var coordinator_number = $('#event-coordinator-number').val();
        var coordinator_name = $('#event-coordinator-name').val();
        var second_coordinator_number = $('#event-second-coordinator-number').val();
        var second_coordinator_name = $('#event-second-coordinator-name').val();

        if(coordinator_number != '' && coordinator_name == '')
        {
            $('#event-coordinator-name-error').html('Please Enter coordinator Name');
        }

        if(second_coordinator_number != '' && second_coordinator_name == '')
        {
            $('#event-second-coordinator-name-error').html('Please Enter Coordinator Number');
        }

        if(name == '')
        {
            $('#edit-event-name-error').html('Please fill event name');
            return;
        }
        
        if(date == '')
        {
            $('#edit-event-date-error').html('Please fill event date');
            return;
        }
        
        if(state == '')
        {
            $('#edit-event-state-error').html('Please Select State');
            return;
        }

        if(description == '')
        {
            $('#edit-event-description-error').html('Please fill event description');
            return;
        }
                

        if(event_type == '')
        {
            $('#edit-event-event_type-error').html('Please Select Event Type');
            return;
        }

        $('#save-editevent').addClass('disabled');
        $('.save-span').removeClass('');
        $('.save-span').addClass('glyphicon-refresh spinning');
        $.ajax({
                url: '/edit-event',
                type: "post",
                data:{
                        'event_id'                  : event_id,
                        'c_number'                  : coordinator_number,
                        'c_name'                    : coordinator_name,
                        'sc_number'                 : second_coordinator_number,
                        'sc_name'                   : second_coordinator_name,
                        'name'                      : name,
                        'description'               : description,
                        'date'                      : date,
                        'time'                      : time,
                        'address'                   : address,
                        'state'                     : state,
                        'district'                  : district,
                        'mp'                        : mp,
                        'mla'                       : mla,
                        'village'                   : village,
                        'event_type'                : event_type,
                        'priority'                  : priority,
                        'action'                    : action,
                        'type'                      : 'AllEvents',
                        
                },
                success:function(data)
                {
                    $('.save-span').removeClass('glyphicon-refresh spinning');
                    $('.save-span').addClass('');
                    $('#save-editevent').removeClass('disabled');
                    $('.issueInnerCont').html(data);
                    $('#edit-event-modal').modal('hide');
                    $('#links-display-shown').html($('#links-display-hidden').html());
                    $('#links-display-hidden').html('');
                    $('#event-count').html($('#count-display-hidden').html());
                    $('#count-display-hidden').html('');
                }
            });
    });

    var base_url = window.location.origin;
    $('body').on('change',"#edit-event-state", function()
    {
        var selected_state = this.value;
        $.ajax({
                url: '/create-event/' + selected_state,
                type: "get",
                success:function(data)
                {
                    var district = data.districtArray;
                    var mla = data.mlaArray;
                    var mp = data.mpArray;
                    // var village = data.villageArray;
                    $('#edit-event-district').empty();
                    $('#edit-event-mla').empty();
                    $('#edit-event-mp').empty();
                    // $('#edit-event-village').empty();

                    // $('#edit-event-district').append($('<option>').text('Select District').attr('value', ''));
                    // $('#edit-event-mla').append($('<option>').text('select MLA').attr('value', 0));
                    // $('#edit-event-mp').append($('<option>').text('Select MP').attr('value', 0));

                    $.each(district, function(index, value)
                    {
                        $('#edit-event-district').append($('<option>').text(value).attr('value', index));
                    });
                    $("#edit-event-district").append($("#edit-event-district option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                        }));
                    $('#edit-event-district').prepend($('<option>').text('Select District').attr('value', ''));
                    $('#edit-event-district').val('');

                    $.each(mla, function(index, value)
                    {
                        $('#edit-event-mla').append($('<option>').text(value).attr('value', index));
                    });
                    $("#edit-event-mla").append($("#edit-event-mla option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                        }));
                    $('#edit-event-mla').prepend($('<option>').text('Select MLA').attr('value', ''));
                    $('#edit-event-mla').val('');

                    $.each(mp, function(index, value)
                    {
                        $('#edit-event-mp').append($('<option>').text(value).attr('value', index));
                    });
                    $("#edit-event-mp").append($("#edit-event-mp option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                        }));
                    $('#edit-event-mp').prepend($('<option>').text('Select MP').attr('value', ''));
                    $('#edit-event-mp').val('');

                    // $.each(village, function(index, value)
                    // {
                    //     $('#edit-event-village').append($('<option>').text(value).attr('value', index));
                    // });

                 
                }
            });
    });

    $('body').on('change',"#edit-event-mla", function()
    {
            
     $.ajax({
            method:'post',
            url:base_url+'/villagelist',
            data:{
                'constituency_id' : $('#edit-event-mla').val(),
            },
            success:function(data)
            { 
                var village = data.villageArray;
                $('#edit-event-village').empty();
                //$('#edit-event-village').append($('<option>').text('Select Village').attr('value', 0));
                $.each(village, function(index, value)
                        {
                            $('#edit-event-village').append($('<option>').text(value).attr('value', index));
                        });
                $("#edit-event-village").append($("#edit-event-village option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                        }));
                    $('#edit-event-village').prepend($('<option>').text('Select Village').attr('value', ''));
                    $('#edit-event-village').val('');

            }
        });
    });


     $('body').on('change',"#edit-contact-state", function()
    {
        $.ajax({
                url: '/create-contact/' + this.value,
                type: "get",
                success:function(data)
                {
                    var district = data.districtArray;
                    var mla = data.mlaArray;
                    var mp = data.mpArray;
                    
                    $('#edit-contact-district').empty();
                    $('#edit-contact-mla').empty();
                    $('#edit-contact-mp').empty();
                    

                    // $('#edit-contact-district').append($('<option>').text('Select District').attr('value', ''));
                    // $('#edit-contact-mla').append($('<option>').text('Select MLA').attr('value', 0));
                    // $('#edit-contact-mp').append($('<option>').text('Select MP').attr('value', 0));

                    $.each(district, function(index, value)
                    {
                        $('#edit-contact-district').append($('<option>').text(value).attr('value', index));
                    });
                    $("#edit-contact-district").append($("#edit-contact-district option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                        }));
                    $('#edit-contact-district').prepend($('<option>').text('Select District').attr('value', ''));
                    $('#edit-contact-district').val('');

                    $.each(mla, function(index, value)
                    {
                        $('#edit-contact-mla').append($('<option>').text(value).attr('value', index));
                    });
                    $("#edit-contact-mla").append($("#edit-contact-mla option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                        }));
                    $('#edit-contact-mla').prepend($('<option>').text('Select MLA').attr('value', ''));
                    $('#edit-contact-mla').val('');

                    $.each(mp, function(index, value)
                    {
                        $('#edit-contact-mp').append($('<option>').text(value).attr('value', index));
                    });
                    $("#edit-contact-mp").append($("#edit-contact-mp option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                        }));
                    $('#edit-contact-mp').prepend($('<option>').text('Select MP').attr('value', ''));
                    $('#edit-contact-mp').val('');

                    
                }
            });
    });

     $('body').on('change',"#edit-contact-mla", function()
    {
            
     $.ajax({
            method:'post',
            url:base_url+'/villagelist',
            data:{
                'constituency_id' : $('#edit-contact-mla').val(),
            },
            success:function(data)
            { 
                var village = data.villageArray;
                $('#edit-contact-village').empty();
                //$('#edit-contact-village').append($('<option>').text('Select Village').attr('value', 0));
                $.each(village, function(index, value)
                        {
                            $('#edit-contact-village').append($('<option>').text(value).attr('value', index));
                        });
                $("#edit-contact-village").append($("#edit-contact-village option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                        }));
                    $('#edit-contact-village').prepend($('<option>').text('Select Village').attr('value', ''));
                    $('#edit-contact-village').val('');
            }
        });
    });

    $('body').on('click',"#save-editcontact", function()
    {
        if($(this).hasClass('disabled'))
            return;

        if(!$.isNumeric($('#edit-contact-contact1').val()))
        {
            alert('Please fill a Integer value');
            return;
        }

        var name =  $('#edit-contact-name').val();
        var state = $('#edit-contact-state').val();
        var district = $('#edit-contact-district').val();
        var mp = $('#edit-contact-mp').val();
        var mla = $('#edit-contact-mla').val();
        var village = $('#edit-contact-village').val();
        var contact_type = $('#edit-contact-type').val();
        var contact1 = $('#edit-contact-contact1').val();
        var contact2 = $('#edit-contact-contact2').val();
        var contact3 = $('#edit-contact-contact3').val();
        var party_position = $('#edit-contact-position').val();
        var orientation = $('#edit-contact-orientation').val();
        var contact_id = $('#edit_contact_id').val();

        if(name == '')
        {
            $('#edit-contact-name-error').html('Please fill contact name');
            return;
        }

        if(contact_type == 0)
        {
            $('#edit-contact-type-error').html('Please select contact type');
            return;
        }

        if(contact_type == 4 && party_position == 0)
        {
            $('#edit-contact-position-error').html('Please select Party Position for worker');
            return;
        }

        if(contact1 == '')
        {
            $('#edit-contact-contact1-error').html('Please provide mobile number');
            return;
        }

        if(isNaN(contact1))
            {
                $('#edit-contact-contact1-error').html('Invalid Number');
                return;
            }
                      
        if(state == '')
        {
            $('#edit-contact-state-error').html('Please Select State');
            return;
        }
        
        $('#save-editcontact').addClass('disabled');
        $('.save-span').removeClass('');
        $('.save-span').addClass('glyphicon-refresh spinning');
        $.ajax({
                url: '/edit-contact',
                type: "post",
                data:{
                        'contact_id'        : contact_id,
                        'name'              : name,
                        'state'             : state,
                        'district'          : district,
                        'mp'                : mp,
                        'mla'               : mla,
                        'village'           : village,
                        'contact_type'      : contact_type,
                        'contact1'          : contact1,
                        'contact2'          : contact2,
                        'contact3'          : contact3,
                        'party_position'    : party_position,
                        'orientation'       : orientation,
                        'type'              : 'AllContacts'
                },
                success:function(data)
                {
                    $('.save-span').removeClass('glyphicon-refresh spinning');
                    $('.save-span').addClass('');
                    $('#save-editcontact').removeClass('disabled');
                    $('.issueInnerCont').html(data);
                    $('#edit-contact-modal').modal('hide');
                    $('#scrollbar1').show();
                    $('#links-display-shown').html($('#links-display-hidden').html());
                    $('#links-display-hidden').html('');
                    $('#contact-count').html($('#count-display-hidden').html());
                    $('#count-display-hidden').html('');
                }
            });
    });


    $('body').on('change',"#add-other-number", function()
    {            
        if($('#add-other-number').is(":checked"))
            $('.secondary-contact').show();
        else
            $('.secondary-contact').hide();
    });

    $('body').on('change',".time-dropdown", function()
    {            
        $('#edit-note-time').val($('#edit-note-time-hour').val() + ':' + $('#edit-note-time-minute').val());
    });


    $('body').on('click',"#save-editnote", function()
    {
        if($(this).hasClass('disabled'))
            return;
        $('#edit-note-time').val($('#edit-note-time-hour').val() + ':' + $('#edit-note-time-minute').val());
        var description =  $('#edit-note-description').val();
        var date =  $('#edit-note-date').val();
        var time =  $('#edit-note-time').val();
        var contact = $('#edit-note-contact').val();
        var note_id = $('#edit_note_id').val();

         if(contact == 0)
        {
            $('#edit-note-contact-error').html('Please Select Contact');
            return;
        }

        if(description == '')
        {
            $('#edit-note-description-error').html('Please fill description');
            return;
        }

        if($('#edit-note-reminder').is(":checked"))
        {
            var notify = 1;
            if(date == '')
            {
                $('#edit-note-date-error').html('Please fill date');
                return;
            }

            if(time == '')
            {
                $('#edit-note-time-error').html('Please fill time');
                return;
            }
        }
        else
        {
            var notify = 0;
        }

        $('#save-editnote').addClass('disabled');
        $('.save-span').removeClass('');
        $('.save-span').addClass('glyphicon-refresh spinning');
         $.ajax({
                url: '/edit-note',
                type: "post",
                data:{
                        'message'       : description,
                        'note_id'       : note_id,
                        'date'          : date,
                        'time'          : time,
                        'reminder'      : notify,
                        'contact'       : contact,
                        'type'          : 'AllNotes'
                },
                success:function(data)
                {
                    if(data.message == 0)
                    {
                        alert("You can not edit this note");
                        return;
                    }
                    $('.save-span').removeClass('glyphicon-refresh spinning');
                    $('.save-span').addClass('');
                    $('#save-note').removeClass('disabled');
                    $('.issueInnerCont').html(data);
                    $('#edit-note-modal').modal('hide');
                    $('#links-display-shown').html($('#links-display-hidden').html());
                    $('#links-display-hidden').html('');
                    $('#note-count').html($('#count-display-hidden').html());
                    $('#count-display-hidden').html('');
                }
            });
    });

    $('body').on('click',"#save-editissue", function()
    {
        if($(this).hasClass('disabled'))
            return;

        var name =  $('#edit-issue-name').val();
        var issue_id =  $('#edit_issue_id').val();
        var description =  $('#edit-issue-description').val();
        var state = $('#edit-issue-state').val();
        var district = $('#edit-issue-district').val();
        var mp = $('#edit-issue-mp').val();
        var mla = $('#edit-issue-mla').val();
        var village = $('#edit-issue-village').val();
        var priority = $('#edit-issue-priority').val();
        var action = $('#edit-issue-action').val();
        var contact = $('#edit-issue-contact').val();
        var contact_name = $('#edit-issue-contact-name').val();
        var referencestate = $('#edit-issue-referencestate').val();
        var referencedistrict = $('#edit-issue-referencedistrict').val();
        var referencemp = $('#edit-issue-referencemp').val();
        var referencemla = $('#edit-issue-referencemla').val();
        var referencecontact = $('#edit-issue-referencecontact').val();
        var referencecontact_name = $('#edit-issue-contact-referencename').val();
        var value = $("input:checked").val();

        if(value)
            var reference = 1;
        else
           var reference = 0;

        if(contact == '')
        {
            $('#edit-issue-contact-error').html('Please provide conatct number');
            return;
        }

        if(contact != '' && contact_name == '')
        {
            $('#edit-issue-contact-name-error').html('Please provide conatct name');
            return;
        }

        if(name == '')
        {
            $('#edit-issue-name-error').html('Please fill issue name');
            return;
        }

        if(description == '')
        {
            $('#edit-issue-description-error').html('Please fill issue description');
            return;
        }
                
        if(state == '')
        {
            $('#edit-issue-state-error').html('Please Select State');
            return;
        }
        
        if(contact == referencecontact)
        {
            $('#edit-issue-referencecontact-error').html('Contact no. and reference no. are same');
            return;
        }

        $('#save-editissue').addClass('disabled');
        $('.save-span').removeClass('');
        $('.save-span').addClass('glyphicon-refresh spinning');
        $.ajax({
                url: '/edit-issue',
                type: "post",
                data:{
                        'issue_id'      : issue_id,
                        'name'          : name,
                        'description'   : description,
                        'state'         : state,
                        'district'      : district,
                        'mp'            : mp,
                        'mla'           : mla,
                        'village'       : village,
                        'priority'      : priority,
                        'action'        : action,
                        'type'          : 'AllIssues',
                        'contact'       : contact,
                        'contact_name'  : contact_name,
                        'reference'     : reference,
                        'referencestate' : referencestate,
                        'referencedistrict' : referencedistrict,
                        'referencemla' : referencemla,
                        'referencemp' : referencemp,
                        'referencecontact' : referencecontact,
                        'referencecontact_name' : referencecontact_name,
                },
                success:function(data)
                {
                    $('.save-span').removeClass('glyphicon-refresh spinning');
                    $('.save-span').addClass('');
                    $('#save-editissue').removeClass('disabled');
                    $('.issueInnerCont').html(data);
                    $('#edit-issue-modal').modal('show');
                    $('#links-display-shown').html($('#links-display-hidden').html());
                    $('#links-display-hidden').html('');
                    $('#issue-count').html($('#count-display-hidden').html());
                    $('#count-display-hidden').html('');
                }
            });
    });


});

function fetchData(state)
{
    var selected_state = state;
    //alert(candidateMLA);
    $.ajax({
        url: '/create-event/' + selected_state,
        type: "get",
        success:function(data)
        {
            var district = data.districtArray;
            var mla = data.mlaArray;
            var mp = data.mpArray;
            var village = data.villageArray;
            $('#create-event-district').empty();
            $('#create-event-mla').empty();
            $('#create-event-mp').empty();
            $('#create-event-village').empty();

            $('#notify-district').empty();
            $('#notify-mla').empty();
            $('#notify-mp').empty();
            // $('#notify-village').empty();
            //$('#notify-state').val(selected_state);

            $.each(district, function(index, value)
            {
                $('#create-event-district').append($('<option>').text(value).attr('value', index));
            });

            $("#create-event-district").append($("#create-event-district option").remove().sort(function(a, b) {
                var at = $(a).text(), bt = $(b).text();
                return (at > bt)?1:((at < bt)?-1:0);
            }));
            $('#create-event-district').prepend($('<option>').text('Select District').attr('value', ''));
            $('#create-event-district').val('');

            $.each(mla, function(index, value)
            {
                $('#create-event-mla').append($('<option>').text(value).attr('value', index));
            });

            
            $("#create-event-mla").append($("#create-event-mla option").remove().sort(function(a, b) {
                var at = $(a).text(), bt = $(b).text();
                return (at > bt)?1:((at < bt)?-1:0);
            }));
            $('#create-event-mla').val(candidateMLA);
            $('#create-event-mla').prepend($('<option>').text('Select Mla').attr('value', ''));
            
            // $('#create-event-mla').val('');
            if($('#create-event-mla').val() != 0)
            {
                var mla = $('#create-event-mla').val();
                fetchVillage(mla); 
            }
            


            $.each(mp, function(index, value)
            {
                $('#create-event-mp').append($('<option>').text(value).attr('value', index));
            });
            $("#create-event-mp").append($("#create-event-mp option").remove().sort(function(a, b) {
                var at = $(a).text(), bt = $(b).text();
                return (at > bt)?1:((at < bt)?-1:0);
            }));
            $('#create-event-mp').val(candidateMP);
            $('#create-event-mp').prepend($('<option>').text('Select MP').attr('value', ''));
            //$('#create-event-mp').val('');

            $.each(village, function(index, value)
            {
                $('#create-event-village').append($('<option>').text(value).attr('value', index));
            });
            $("#create-event-village").append($("#create-event-village option").remove().sort(function(a, b) {
                var at = $(a).text(), bt = $(b).text();
                return (at > bt)?1:((at < bt)?-1:0);
            }));
            $('#create-event-village').prepend($('<option>').text('Select Village').attr('value', ''));
            $('#create-event-village').val('');

            // $.each(district, function(index, value)
            // {
            //     $('#notify-district').append($('<option>').text(value).attr('value', index));
            // });
            // $("#notify-district").append($("#notify-district option").remove().sort(function(a, b) {
            //     var at = $(a).text(), bt = $(b).text();
            //     return (at > bt)?1:((at < bt)?-1:0);
            // }));
            // $('#notify-district').prepend($('<option>').text('Select District').attr('value', ''));
            // $('#notify-district').val('');

            // $.each(mla, function(index, value)
            // {
            //     $('#notify-mla').append($('<option>').text(value).attr('value', index));
            // });
            // $("#notify-mla").append($("#notify-mla option").remove().sort(function(a, b) {
            //     var at = $(a).text(), bt = $(b).text();
            //     return (at > bt)?1:((at < bt)?-1:0);
            // }));
            // $('#notify-mla').val(candidateMLA);
            // $('#notify-mla').prepend($('<option>').text('Select MLA').attr('value', ''));
            
            // // $('#notify-mla').val('');
            // if($('#notify-mla').val() != 0)
            // {
            //     var mla = $('#notify-mla').val();
            //     fetchNotifyvillage(mla); 
            // }

            // $.each(mp, function(index, value)
            // {
            //     $('#notify-mp').append($('<option>').text(value).attr('value', index));
            // });
            // $("#notify-mp").append($("#notify-mp option").remove().sort(function(a, b) {
            //     var at = $(a).text(), bt = $(b).text();
            //     return (at > bt)?1:((at < bt)?-1:0);
            //             }));
            //     $('#notify-mp').prepend($('<option>').text('Select MP').attr('value', ''));
            //     $('#notify-mp').val('');

            // $.each(village, function(index, value)
            // {
            //     $('#notify-village').append($('<option>').text(value).attr('value', index));
            // });
            // $("#notify-village").append($("#notify-village option").remove().sort(function(a, b) {
            //     var at = $(a).text(), bt = $(b).text();
            //     return (at > bt)?1:((at < bt)?-1:0);
            //             }));
            //     $('#notify-village').prepend($('<option>').text('Select Village').attr('value', ''));
            //     $('#notify-village').val('');
        }
    });
}

function fetchNotifydata(state)
{
    var selected_state = state;
        $.ajax({
                url: '/create-event/' + selected_state,
                type: "get",
                success:function(data)
                {
                    var district = data.districtArray;
                    var mla = data.mlaArray;
                    var mp = data.mpArray;
                    // var village = data.villageArray;

                    $('#notify-district').empty();
                    $('#notify-mla').empty();
                    $('#notify-mp').empty();
                    // $('#notify-village').empty();
                    //$('#notify-state').val(selected_state);

            $.each(district, function(index, value)
            {
                $('#notify-district').append($('<option>').text(value).attr('value', index));
            });
            $("#notify-district").append($("#notify-district option").remove().sort(function(a, b) {
                var at = $(a).text(), bt = $(b).text();
                return (at > bt)?1:((at < bt)?-1:0);
            }));
            $('#notify-district').prepend($('<option>').text('Select District').attr('value', ''));
            $('#notify-district').val('');

            $.each(mla, function(index, value)
            {
                $('#notify-mla').append($('<option>').text(value).attr('value', index));
            });
            $("#notify-mla").append($("#notify-mla option").remove().sort(function(a, b) {
                var at = $(a).text(), bt = $(b).text();
                return (at > bt)?1:((at < bt)?-1:0);
            }));
            $('#notify-mla').val(candidateMLA);
            $('#notify-mla').prepend($('<option>').text('Select MLA').attr('value', ''));
            
            if($('#notify-mla').val() != 0)
            {
                var mla = $('#notify-mla').val();
                fetchNotifyvillage(mla); 
            }

            $.each(mp, function(index, value)
            {
                $('#notify-mp').append($('<option>').text(value).attr('value', index));
            });
            $("#notify-mp").append($("#notify-mp option").remove().sort(function(a, b) {
                var at = $(a).text(), bt = $(b).text();
                return (at > bt)?1:((at < bt)?-1:0);
                        }));
                $('#notify-mp').prepend($('<option>').text('Select MP').attr('value', ''));
                $('#notify-mp').val('');

                }
            });
}

function fetchNotifyvillage(mla)
{
      var base_url = window.location.origin;
      var constituency = mla;
    $.ajax({
            method:'post',
            url:base_url+'/villagelist',
            data:{
                'constituency_id' : mla,
            },
            success:function(data)
            { 
                var village = data.villageArray;
                $('#notify-village').empty();
                //$('#notify-village').append($('<option>').text('Select Village').attr('value', 0));
                $.each(village, function(index, value)
                        {
                            $('#notify-village').append($('<option>').text(value).attr('value', index));
                        });
                $("#notify-village").append($("#notify-village option").remove().sort(function(a, b) {
                var at = $(a).text(), bt = $(b).text();
                return (at > bt)?1:((at < bt)?-1:0);
                        }));
                $('#notify-village').prepend($('<option>').text('Select Village').attr('value', ''));
                $('#notify-village').val('');
               
            }
        });
}

function fetchVillage(mla)
{
      var base_url = window.location.origin;
      var constituency = mla;
      //alert(mla);
      $.ajax({
            method:'post',
            url:base_url+'/villagelist',
            data:{
                'constituency_id' : mla,
            },
            success:function(data)
            { 
                var village = data.villageArray;
                $('#create-event-village').empty();
               // $('#create-event-village').append($('<option>').text('Select Village').attr('value', 0));
                $.each(village, function(index, value)
                        {
                            $('#create-event-village').append($('<option>').text(value).attr('value', index));
                        });
                $("#create-event-village").append($("#create-event-village option").remove().sort(function(a, b) {
                var at = $(a).text(), bt = $(b).text();
                return (at > bt)?1:((at < bt)?-1:0);
                        }));
                $('#create-event-village').prepend($('<option>').text('Select Village').attr('value', ''));
                $('#create-event-village').val('');
            }
        });
}

function fetchDatacontact(state)
{
    var selected_state = state;
    //alert(selected_state);
    $.ajax({
                url: '/create-contact/' + selected_state,
                type: "get",
                success:function(data)
                {
                    var district = data.districtArray;
                    var mla = data.mlaArray;
                    var mp = data.mpArray;
                    var village = data.villageArray;
                    $('#create-contact-district').empty();
                    $('#create-contact-mla').empty();
                    $('#create-contact-mp').empty();
                    $('#create-contact-village').empty();

                    $('#create-contact-district').append($('<option>').text('Select District').attr('value', ''));
                    $('#create-contact-mla').append($('<option>').text('Select MLA Constituency').attr('value', 0));
                    $('#create-contact-mp').append($('<option>').text('Select MP Constituency').attr('value', 0));
                    $('#create-contact-village').append($('<option>').text('Select Village').attr('value', 0));

                    $.each(district, function(index, value)
                    {
                        $('#create-contact-district').append($('<option>').text(value).attr('value', index));
                    });

                    $("#create-contact-district").append($("#create-contact-district option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                            }));
                    $('#create-contact-district').prepend($('<option>').text('Select district').attr('value', ''));
                    $('#create-contact-district').val('');

                    $.each(mla, function(index, value)
                    {
                        $('#create-contact-mla').append($('<option>').text(value).attr('value', index));
                    });
                    $("#create-contact-mla").append($("#create-contact-mla option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                            }));

                     $('#create-contact-mla').val(candidateMLA);
                     $('#create-contact-mla').prepend($('<option>').text('Select MLA Constituency').attr('value', ''));

                    $.each(mp, function(index, value)
                    {
                        $('#create-contact-mp').append($('<option>').text(value).attr('value', index));
                    });
                    $("#create-contact-mp").append($("#create-contact-mp option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                            }));
                     $('#create-contact-mp').val(candidateMP);
                     $('#create-contact-mp').prepend($('<option>').text('Select MP Constituency').attr('value', ''));

                    if($('#create-contact-mla').val() != 0)
                        {
                            var mla = $('#create-contact-mla').val();
                            fetchContactvillage(mla); 
                        }
                    $.each(village, function(index, value)
                    {
                        $('#create-contact-village').append($('<option>').text(value).attr('value', index));
                    });

                }
            });
}

function fetchContactvillage(mla)
{
    var base_url = window.location.origin;
    var constituency = mla;
      $.ajax({
            method:'post',
            url:base_url+'/villagelist',
            data:{
                'constituency_id' : $('#create-contact-mla').val(),
            },
            success:function(data)
            { 
                var village = data.villageArray;
                $('#create-contact-village').empty();
                //$('#create-contact-village').append($('<option>').text('Select Village').attr('value', 0));
                $.each(village, function(index, value)
                        {
                            $('#create-contact-village').append($('<option>').text(value).attr('value', index));
                        });
                $("#create-contact-village").append($("#create-contact-village option").remove().sort(function(a, b) {
                var at = $(a).text(), bt = $(b).text();
                return (at > bt)?1:((at < bt)?-1:0);
                        }));
                $('#create-contact-village').prepend($('<option>').text('Select Village').attr('value', ''));
                $('#create-contact-village').val('');
            }
        });
}

function fetchDataissue(state)
{
    var selected_state = state;
        $.ajax({
            url: '/create-issue/' + selected_state,
            type: "get",
            success:function(data)
            {
                var district = data.districtArray;
                var mla = data.mlaArray;
                var mp = data.mpArray;
                var village = data.villageArray;
                
                $('#create-issue-district').empty();
                $('#create-issue-mla').empty();
                $('#create-issue-mp').empty();
                $('#create-issue-village').empty();
                

                $.each(district, function(index, value)
                {
                    $('#create-issue-district').append($('<option>').text(value).attr('value', index));
                });
                $("#create-issue-district").append($("#create-issue-district option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                }));
                $('#create-issue-district').prepend($('<option>').text('Select District').attr('value', ''));
                $('#create-issue-district').val('');

                $.each(mla, function(index, value)
                {
                    $('#create-issue-mla').append($('<option>').text(value).attr('value', index));
                });
                $("#create-issue-mla").append($("#create-issue-mla option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                }));
                $('#create-issue-mla').val(candidateMLA);
                $('#create-issue-mla').prepend($('<option>').text('Select Mla').attr('value', ''));
                //$('#create-issue-mla').val('');
                if($('#create-issue-mla').val() != 0)
                {
                    var mla = $('#create-issue-mla').val();
                    fetchIssuevillage(mla); 
                }

                $.each(mp, function(index, value)
                {
                    $('#create-issue-mp').append($('<option>').text(value).attr('value', index));
                });
                $("#create-issue-mp").append($("#create-issue-mp option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                }));
                $('#create-issue-mp').val(candidateMP);
                $('#create-issue-mp').prepend($('<option>').text('Select MP').attr('value', ''));
                //$('#create-issue-mp').val('');

                 $.each(village, function(index, value)
                {
                    $('#create-issue-village').append($('<option>').text(value).attr('value', index));
                });
                $("#create-issue-village").append($("#create-issue-village option").remove().sort(function(a, b) {
                    var at = $(a).text(), bt = $(b).text();
                    return (at > bt)?1:((at < bt)?-1:0);
                }));
                $('#create-issue-village').prepend($('<option>').text('Select Village').attr('value', ''));
                $('#create-issue-village').val('');

               
            }
        });
}

function fetchIssuevillage(mla)
{
    var base_url = window.location.origin;
    var constituency = mla;
    $.ajax({
            method:'post',
            url:base_url+'/villagelist',
            data:{
                'constituency_id' : $('#create-issue-mla').val(),
            },
            success:function(data)
            { 
                var village = data.villageArray;
                $('#create-issue-village').empty();
                //$('#create-issue-village').append($('<option>').text('Select Village').attr('value', 0));
                $.each(village, function(index, value)
                        {
                            $('#create-issue-village').append($('<option>').text(value).attr('value', index));
                        });
                $("#create-issue-village").append($("#create-issue-village option").remove().sort(function(a, b) {
                var at = $(a).text(), bt = $(b).text();
                return (at > bt)?1:((at < bt)?-1:0);
                        }));
                $('#create-issue-village').prepend($('<option>').text('Select Village').attr('value', ''));
                $('#create-issue-village').val('');
            }
        });
}