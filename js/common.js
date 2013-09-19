$(document).ready(function(){
    
    init();
    
    //logo position
    if($(window).width()<=1415)
    {
        var k = $(window).width()/975;
        $('.menu > li').css({'margin': '0 '+(k*16)+'px'});
    }
    //social buttons style
    if($(window).width()<=1240)
    {
        $(".decor_soc ul").addClass('short');
    }
    
    $( "#bd, #wi, #rep-from, #rep-to" ).datepicker({
        dayNames: [ "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье" ],
        dayNamesMin: [ "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс" ],
        monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декбрь" ],
        showOn: "button",
        buttonImage: "/img/calendar.jpg",
        buttonImageOnly: true
    });
    
    //hover menu
    $('.menu > li').hover(
		function(){$(this).find('ul').stop(true,true).slideDown(100);}, 
		function(){$(this).find('ul').stop(true,true).slideUp(100);});

    
    //current menu item
    $('.menu > li').each(function () {    
        var location = window.location.search 
        var link = $(this).find('a').attr('href');                

        if(link == location ) {               
            $(this).addClass('current');   
        }
    });
    
    //init index slider
    $("#slider_index").jCarouselLite({
        btnNext: ".slider_index_block .next",
        btnPrev: ".slider_index_block .prev"
    });
    
    //hover info graphic
    $('.info_graph div').hover(
        function(){$('.info_graph div').not(this).stop(false,false).fadeTo(200,0.4);},
        function(){$('.info_graph div').stop(true,true).fadeTo(200,1);});
    
    
        
    $('.calculator input').click(function(){
        $(this).select();
    })
    
    $('#time').change(function(){
        $(this).val( $(this).val()+' мес.');
    });
    
    $('#rate').change(function(){
        $(this).val( $(this).val()+'%');
    });
    
    $('#delay').change(function(){
        $(this).val( $(this).val()+' мес.');
    });
    
    
    //init text slider
    $("#text_slider .effectContainer").fadeTransition({
        pauseTime: 4000,
        transitionTime: 500,
        delayStart: 0,
        pauseOnMouseOver: true,
        createNavButtons: true
    });
                                                    
    $('.ask_next').click(function(){ask_slide(true);});
    $('.ask_prev').click(function(){ask_slide(false);});
    
    //randon colors     
    color = new Array   
    color[1] = '#d8212b';
    color[2] = '#f05423';
    color[3] = '#faaa35';
    color[4] = '#5ebb46';
    color[5] = '#00a5e7';
    color[6] = '#d3268b';
    color[7] = '#f280b3';
  
    $(".btn_inv").mouseover(invColor);
    $(".btn_deb").mouseover(debColor);
    
    //стилизация елементов форм
    $('input[type="checkbox"], input[type="radio"], select').form_style();
    
    //face widget
    $(".face-widget .agent-item").click(function(){
        $(".face-widget .agent-item").removeClass('selected');
        $(this).addClass('selected');
    }); 
    
    $(".face-widget .agent-add").click(function(){
        
        var agent = $(".face-widget .agent-item.selected");
    
        if(agent.hasClass('selected'))
            $(".face-widget-agent").html(agent.html()).find('img').attr({width:43, height:43});
        else
            alert("Выберите Агента!");
    });
    // end face widget
    
    // view table actions
    $(".view-table tr:not(.detal-view):even").addClass('even');
    
    $(".view-table tr:not(.detal-view) td > a").click(function(){
        $(this).parent().parent().next('.detal-view').children().toggle();
        decor();
        return false;
    });


    $('.purse-btn.ballance').click(function(){
        $(this).toggleClass('active');
        $('#vaiants').toggle();;
    });

});

/**********************************************************************************************************************************/
/* FUNCTIONS
/**********************************************************************************************************************************/

//--------------------------------------------------------------/
function init()
{
    $(".scroll").mCustomScrollbar({
        scrollInertia:0
    });


    if($('.ta-scroll').length > 0)
        textarea_scroll_init();

}

//--------------------------------------------------------------/
function scroll_update(obj)
{
    obj.mCustomScrollbar("update");
}

//--------------------------------------------------------------/
//swtch ask slider
function ask_slide(dim)
{
    var sl = $('#ask_slider');
    index  = sl.find('div.current').index();
    sl.children().removeClass('current').hide();    
    
    //increment
    if(dim) {
        index++;
        if(index > sl.children().length-1) index = 0;  
    }
    //decrement
    else {
        index--;
        if(index < 0) index = sl.children().length-1;
    }
    sl.find('div:eq('+index+')').addClass('current').fadeIn(200);
}
//--------------------------------------------------------------/
//color functions
function invColor()
{
    var currColor = $(".btn_deb").css('background-color');
    currColor = rgb2hex(currColor);
    
    newColor = color[rand(7)];
    if(newColor == currColor) invColor();
    $('.btn_inv, .btn_inv span').css('background', newColor);
}
function debColor()
{
    var currColor = $(".btn_inv").css('background-color');
    currColor = rgb2hex(currColor);
    
    newColor = color[rand(7)];
    if(newColor == currColor) debColor();
    $(this).css('background', newColor);
}
function rand(k)
{
    return Math.floor((Math.random()*k)+1);
} 

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

//--------------------------------------------------------------/
//--------------------------------------------------------------/
decor_b3 = null;

function decor()
{
    if(decor_b3 == null)
        decor_b3 = $('.decor_b3').clone();
        
    var block_3 = $('.block_3');
    
	$('.decor_b4').css({height: block_3.height()});
    $('body').append(decor_b3);
    decor_b3.top = block_3.offset().top + block_3.height()+2;
    decor_b3.css({top: decor_b3.top, left:0, width:'100%', height: ($('.footer').offset().top-decor_b3.top)});
}
function decor2()
{
    var t = 126+$('.block_2').height();

    $('.decor_b1, .decor_b2').hide();
    $('.decor_b3').css({top: 126, height:$('.block_2').height()});
    $('.decor_b4').css({top: t, height: $('.footer').offset().top-t});
}

//-----------------------------------------------------------------/
function textarea_scroll_init()
{
    //var textArea=$("textarea");
    $("textarea").each(function(i){
        textArea = $(this);
        textArea.wrap("<div class='textarea-wrapper'/>");
        var textAreaWrapper=textArea.parent(".textarea-wrapper");
        textAreaWrapper.mCustomScrollbar({
            scrollInertia:0,
            advanced:{autoScrollOnFocus:false}
        });
        textAreaWrapper.css('height', textArea.height()+10);
        var hiddenDiv=$(document.createElement("div")),
            content=null;
        hiddenDiv.addClass("hiddendiv").css('min-height', textArea.height());
        $("body").prepend(hiddenDiv);
        textArea.bind("keyup",function(e){
            content=$(this).val();
            var clength=content.length;
            var cursorPosition=textArea.getCursorPosition();
            content="<span>"+content.substr(0,cursorPosition)+"</span>"+content.substr(cursorPosition,content.length);
            content=content.replace(/\n/g,"<br />");
            hiddenDiv.html(content+"<br />");
            $(this).css("height",hiddenDiv.height());
            textAreaWrapper.mCustomScrollbar("update");
            var hiddenDivSpan=hiddenDiv.children("span"),
                hiddenDivSpanOffset=0,
                viewLimitBottom=(parseInt(hiddenDiv.css("min-height")))-hiddenDivSpanOffset,
                viewLimitTop=hiddenDivSpanOffset,
                viewRatio=Math.round(hiddenDivSpan.height()+textAreaWrapper.find(".mCSB_container").position().top);
            if(viewRatio>viewLimitBottom || viewRatio<viewLimitTop){
                if((hiddenDivSpan.height()-hiddenDivSpanOffset)>0){
                    textAreaWrapper.mCustomScrollbar("scrollTo",hiddenDivSpan.height()-hiddenDivSpanOffset);
                }else{
                    textAreaWrapper.mCustomScrollbar("scrollTo","top");
                }
            }
        });

    });

    $.fn.getCursorPosition=function(){
        var el=$(this).get(0),
            pos=0;
        if("selectionStart" in el){
            pos=el.selectionStart;
        }else if("selection" in document){
            el.focus();
            var sel=document.selection.createRange(),
                selLength=document.selection.createRange().text.length;
            sel.moveStart("character",-el.value.length);
            pos=sel.text.length-selLength;
        }
        return pos;
    }
}