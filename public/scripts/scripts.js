// JavaScript Document
$(window).load(function(){ 
	$('#navigation li').hover(function(){
		$(this).find('.navigation-dropdown').stop(true,true).slideDown(500);
	},function(){
		$(this).find('.navigation-dropdown').stop(true,true).slideUp(500); 
	});
    
	$('#media_icon').click(function(){ 
            if(!$('#navigation').hasClass('navigationActive')){
                $('#navigation').fadeIn(function(){
                $('#navigation').addClass('navigationActive'); 
                $('.whitSpan').addClass('whitSpanActive'); 
                $('#media_icon').addClass('media_iconActive'); 
                $("body").css({overflow:"hidden"});
            })
        
        }else{
            $('#navigation').removeClass('navigationActive');
            $('.whitSpan').removeClass('whitSpanActive');
            $('#media_icon').removeClass('media_iconActive');
            $("body").css({overflow:"auto"}); 
        }
    });	 
});

