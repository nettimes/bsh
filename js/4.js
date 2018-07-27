
function rese() {
    var $height = $(window).height();
    $(".header_warp").css({height:$height*0.1+"px"})
    $(".nr_warp").css({height:$height*0.89+"px"})
}
rese();
window.onresize = rese;


$(".box_left").click(function () {
    if ($(".box_left").hasClass("now_left")){
        $(".box_left").css({left:"-32px"});
        $(".nr_left").animate({width:"25%"},300);
        $(".nr_right").animate({width:"75%"},300);
        $(".box_left").removeClass("now_left");
        return false;
    }
    $(".box_left").css({left:"-5px"});
    $(".nr_left").animate({width:"0"},300);
    $(".nr_right").animate({width:"99%"},300);
    $(".box_left").addClass("now_left");
});
var $nr_left = $(".nr_left")
var $left_box = $(".left_box")

$nr_left.mousemove(function () {
    var a = $nr_left.height();
    var b = $left_box.height();
    if (b > a){
        $nr_left.css({overflowY:"scroll"});
    }else{
        $nr_left.css({overflowY:"hidden"});
    }
});

function placeholder(el){

    function isPlaceholer(){
        var input = document.createElement("input");
        return "placeholder" in input;
    }

    var $el = $(el);
    if( isPlaceholer()==false && !('placeholder' in document.createElement('input')) ){

        $('input[placeholder],textarea[placeholder]').each(function(){
            var that = $(this),
                text= that.attr('placeholder');
            if(that.val()===""){
                if(that.attr("type") == "password"){
                    $el.html("请输入密码");
                }else {
                    that.val(text).addClass('placeholder');
                }
            }
            that.focus(function(){
                if($el.html() == text){
                    $el.html("");
                }
                if(that.val()===text) {
                    that.val("").removeClass('placeholder');

                }
            })
                .blur(function(){
                    if(that.val()==="") {
                        if (that.attr("type") == "password") {
                            $el.html("请输入密码");

                        }else {
                            that.val(text).addClass('placeholder');
                        }
                    }
                })
                .closest('form').submit(function(){
                if(that.val() === text){
                    that.val('');
                }
            });
        });
    }
}
$(document).ready(function() {
    placeholder(".pwd-place")
});
