$(function () {
    var $nr_left = $(".nr_left");
    var $left_box = $(".left_box");
    var $nr_warp = $(".nr_warp");
    function rese() {
        var $height = $(window).height();

        $(".dl_warp").css({height:$height+"px"});

        $(".header_warp").css({height:$height*0.07+"px"});

        $nr_warp.css({height:$height*0.92+"px",marginTop:$height*0.01+"px"});

        $(".r3_title p").css({lineHeight:$(".r3_title").height()+"px"})
        $(".pp").css({lineHeight:($(".r3_title").height())*0.5+"px"})
        $(".lht").css({lineHeight:($(".right4").height())+"px"})
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
        $(".nr_right").animate({width:"100%"},300);
        $(".box_left").addClass("now_left");
    });


    $nr_left.mousemove(function () {
        var a = $nr_left.height();
        var b = $left_box.height();
        if (b > a){
            $nr_left.css({overflowY:"scroll"});
        }else{
            $nr_left.css({overflowY:"hidden"});
        }
    });


    $(".sjt").stop().click(function () {
        if ($(".right1").hasClass("xia")){
            $(".right1").stop().animate({height:"15%"});
            $(".sjt").animate({transform:"rotate(-180deg)"})
            $(".right5").animate({top:"95%"});
            $(".right1").removeClass("xia");
            $("#container").css({height:"650px"});
            return false;
        }else{
            $(".right1").stop().animate({height:"50px"});
            $(".sjt").animate({transform:"rotate(180deg)"})
            $(".right5").animate({top:"50px"});
            $(".right1").addClass("xia");
            $("#container").css({height:($('.nr_right').height())-110+"px"});
            mapfun(-1);
            return false;
        }

    });



    var $rjt = $(".rjt");
    var box_width = ($(".r3_box").width())*0.5;
    $rjt.click(function () {
        $(".right3,.r3_box").animate({scrollLeft: box_width}, 1000);
        $rjt.css({display:"none"});
        var s1 = setTimeout(function () {
        },1000)

    })

    $(".right3,.r3_box").scroll(function () {

        var left = $(".right3,.r3_box").scrollLeft();
        if (left > 0){
            $rjt.css({display:"none"})
        }
    })





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
    
    
    
    
    $(".num").click(function () {
        $(".xiaoyu").css({display:"block"});
        return false;
    })



    $("#polygon").click(function () {
        $("#polygon").addClass("sy");
    })


})
