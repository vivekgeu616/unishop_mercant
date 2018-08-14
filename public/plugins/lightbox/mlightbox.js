/**
 * mlightbox v1.2.1
 * author: miskith
 **/

$.lgbx = {
    //Define global variables
    darrows:true,
    dclose:true,
    ddesc:true,
    img_fold:"images/",

    init:function(){
        $(document).on("click","[data-image]",function(){$.lgbx.open($(this).attr("data-image"))});
        $(document).on("click","#lgbx_bcg,#lgbx_close",function(){$.lgbx.close()});
        $(window).resize(function(){if ($("#lgbx").size()) $.lgbx.resize()});
        $(document).on("click","#lgbx .img",function(e){$.lgbx.click(e)});
        $(document).on("mouseenter","#lgbx .img",function(e){$.lgbx.enter(e)});
        $(document).on("mouseleave","#lgbx *",function(e){$.lgbx.leave(e)});
        $(document).on("mousemove","#lgbx .img",function(e){$.lgbx.move(e)});
        $(document).on("click","#lgbx_next",function(){$.lgbx.next("next")});
        $(document).on("click","#lgbx_prev",function(){$.lgbx.next("prev")});
    },

    //Open lightbox
    open:function(img)
    {
        if (!$("#lgbx").size())
            $("body").append("<div id='lgbx_bcg'></div><div id='lgbx' style='display: none; top: "+(($(window).height()-10)/2)+"px; left: "+(($(window).width()-10)/2)+"px'><img src='"+this.img_fold+"close.png' alt='close' title='' id='lgbx_close'><img src='"+this.img_fold+"next.png' alt='next' title='' id='lgbx_next'><img src='"+this.img_fold+"prev.png' alt='prev' title='' id='lgbx_prev'><div id='lgbx_desc'></div></div>");
        $("#lgbx").append("<img src='"+img+"' alt='img' title='' style='display: none; max-width: "+($(window).width()-100)+"px; max-height: "+($(window).height()-100)+"px' class='img'>");
        this.vars();
        this.loading = setInterval(function(){
            if ($("#lgbx .img:last-child")[0].complete)
            {
                clearInterval($.lgbx.loading);
                $("#lgbx").show();
                if ($("#lgbx .img").size()!=1)
                    $("#lgbx .img:eq(0)").fadeOut(200, function(){$(this).remove(); $.lgbx.show()});
                else
                    $.lgbx.show();
            }
        }, 100);
    },

    //Show image
    show:function()
    {
        this.resize(function(){$("#lgbx .img").fadeIn(200)});
        if ($(this.selector+":eq("+this.index+")").attr("data-desc"))
            $("#lgbx_desc").text($(this.selector+":eq("+this.index+")").attr("data-desc"));
        else if ($(this.selector+":eq("+this.index+")").attr("title"))
            $("#lgbx_desc").text($(this.selector+":eq("+this.index+")").attr("title"));
        else if (this.size!=1)
            $("#lgbx_desc").text("Image "+(this.index+1)+"/"+this.size);
    },

    //Close lightbox
    close:function()
    {
        delete this.selector;
        delete this.index;
        delete this.size;
        $("#lgbx,#lgbx_bcg").fadeOut(250, function(){$(this).remove()});
    },

    //Resize lightbox window
    resize:function(callback)
    {
        if (callback==null)
        {
            $("#lgbx .img").css({maxWidth: ($(window).width()-100),maxHeight: ($(window).height()-100)});
            $("#lgbx").css({width: $("#lgbx .img").width(), height: $("#lgbx .img").height(), top: (($(window).height()-$("#lgbx .img").height()-10)/2),left: (($(window).width()-$("#lgbx .img").width()-10)/2)});
        }
        else
        {
            $("#lgbx .img").css({maxWidth: ($(window).width()-100),maxHeight: ($(window).height()-100)});
            $("#lgbx").animate({width: $("#lgbx .img").width(), height: $("#lgbx .img").height(), top: (($(window).height()-$("#lgbx .img").height()-10)/2),left: (($(window).width()-$("#lgbx .img").width()-10)/2)}, 300, function(){callback()});
        }
    },

    //Click event
    click:function(e)
    {
        var o = $("#lgbx .img").offset();
        var pos = ((e.clientX-o.left)/$("#lgbx .img").width());
        if (pos<0.5)
            this.next("prev");
        else
            this.next("next");
    },

    //Next image
    next:function(di)
    {
        if (this.size==1 || !this.selector)
            return false;
        if (di=="next")
            var next = (!$(this.selector+":eq("+(this.index+1)+")").size() ? "0" : (this.index+1));
        else
            var next = (this.index==0 || !$(this.selector+":eq("+(this.index-1)+")").size() ? ($(this.selector).size()-1) : (this.index-1));
        this.index = parseFloat(next);
        this.open($(this.selector+":eq("+next+")").attr("data-image"));
    },

    //Mouse enter event
    enter:function(e)
    {
        if (this.dclose) $("#lgbx_close").fadeIn(100);
        if (this.ddesc && $("#lgbx_desc").text()!="") $("#lgbx_desc").fadeIn(100);
    },

    //Mouse leave event
    leave:function(e)
    {
        if (!$(e.relatedTarget).is("#lgbx_close,#lgbx_desc,#lgbx_next,#lgbx_prev"))
            $("#lgbx_close,#lgbx_desc,#lgbx_next,#lgbx_prev").fadeOut(100);
    },

    //Mouse move event
    move:function(e)
    {
        if (!this.darrows || this.size==1)
            return true;
        var o = $("#lgbx .img").offset();
        var pos = ((e.clientX-o.left)/$("#lgbx .img").width());
        if (pos<0.5)
        {
            $("#lgbx_next").fadeOut(50);
            $("#lgbx_prev").fadeIn(50);
        }
        else
        {
            $("#lgbx_next").fadeIn(50);
            $("#lgbx_prev").fadeOut(50);
        }
    },

    //Define local vars
    vars:function()
    {
        if (this.selector==null)
        {
            var gal = $("[data-image=\""+$("#lgbx .img").attr("src")+"\"]").attr("data-gallery");
            this.selector = (gal ? "[data-gallery=\""+gal+"\"]" : false);
        }
        if (!this.selector)
        {
            this.index=0;
            this.size=1;
        }
        else
        {
            if (this.index==null)
                this.index = parseFloat($(this.selector).index($("[data-image=\""+$("#lgbx .img").attr("src")+"\"]")));
            this.size = $(this.selector).size();
        }
    }
};

jQuery(document).ready(function(){$.lgbx.init()});
