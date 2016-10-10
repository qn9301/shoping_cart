/**
 * Created by Administrator on 2016/7/18.
 */
var scale=config['chushi_scale'];
var can_scale = true;
var can_move = true;
var now_l=0;
var timmer;
var timmer_move;
var section_left=0;
var section_top = 0;
var new_top = 0;
var new_left = 0;
var is_move = false;
var now_goods;
var scale_left = Math.abs($(window).width()*(scale-1)/2);
var scale_top = Math.abs($(window).height()*(scale-1)/2);
// document.title = scale_left
// 效果层
$(document).on("mousewheel DOMMouseScroll", function (e) {
    can_move = false;
    clearTimeout(timmer);
    setTimeout(function(){
        can_move = true;
    })
    if(can_scale){
        bottomBoxHide()
        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
            (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
        if (delta > 0) {
            // 向上滚
            if(scale<config['scale_max']){
                scale+=0.01;
                $(".section")[0].style.webkitTransform = "scale("+scale+","+scale+")";
                $(".section")[0].style.mozTransform = "scale("+scale+","+scale+")";
                $(".section")[0].style.transform = "scale("+scale+","+scale+")";
            }
        } else if (delta < 0) {
            // 向下滚
            if(scale>1){
                scale-=0.01;
                $(".section")[0].style.webkitTransform = "scale("+scale+","+scale+")";
                $(".section")[0].style.mozTransform = "scale("+scale+","+scale+")";
                $(".section")[0].style.transform = "scale("+scale+","+scale+")";
            }
            clearTimeout(timmer_move);
            timmer_move = setTimeout(function(){
                // 判断左 ($(".section").offset().left >0)
                // 判断上 ($(".section").offset().top > 0)
                // 判断下 ($(".section").height()/scale+$(".section").offset().top < $(window).height())
                // 判断右 ($(".section").width()/scale+$(".section").offset().left<$(window).width())

                // 左上角
                if(($(".section").offset().left >0) && ($(".section").offset().top > 0)){
                    $(".section").stop().animate({left:scale_left+"px",top:scale_top+"px"})
                }
                else
                // 左下角
                if(($(".section").offset().left >0) && ($(".section").height()*scale+$(".section").offset().top < $(window).height())){
                    $(".section").stop().animate({left:scale_left+"px",top: $(window).height() -$(".section").height() - scale_top +"px"})
                }
                else
                // 右下角
                if(($(".section").width()*scale+$(".section").offset().left<$(window).width()) && ($(".section").height()*scale+$(".section").offset().top < $(window).height())){
                    $(".section").stop().animate({left:$(window).width()-$(".section").width()-scale_left+"px",top: $(window).height() -$(".section").height() - scale_top +"px"})
                }
                else
                // 右上
                if(($(".section").width()*scale+$(".section").offset().left<$(window).width()) && ($(".section").offset().top > 0)){
                    $(".section").stop().animate({left:$(window).width()-$(".section").width()-scale_left+"px",top:scale_top+"px"})
                }else

                // 左
                if($(".section").offset().left>0){
                    $(".section").stop().animate({left:scale_left+"px"})
                }
                else 

                // 右
                if($(".section").width()*scale+$(".section").offset().left<$(window).width()){
                    $(".section").stop().animate({left:$(window).width()-$(".section").width()-scale_left+"px"})
                }
                else
                
                // 上
                if($(".section").offset().top > 0){
                    $(".section").stop().animate({top:scale_top + "px"})
                }
                else 

                // 下
                if($(".section").height()*scale+$(".section").offset().top < $(window).height()){
                    $(".section").stop().animate({top: $(window).height() -$(".section").height() - scale_top +"px"})
                }
            },100)
        }
        scale_left = Math.abs($(".section").width()*(scale-1)/2);
        scale_top = Math.abs($(".section").height()*(scale-1)/2);
    }
});
$(".section").mousedown(function(e){
    var m_x = e.pageX;
    var m_y = e.pageY;
    new_top = 0;
    new_left = 0;
    if(can_move){
        $("body").mousemove(function(e){
            bottomBoxHide()
            is_move = true;
            new_left = section_left + e.pageX-m_x;
            new_top = section_top + e.pageY - m_y;
            if(new_top - scale_top >0){
                new_top = scale_top;
            }
            if(new_top + scale_top < $(window).height() - $(".section").height()){
                new_top = $(window).height()-$(".section").height() - scale_top;
            }
            $(".section").css("top",new_top + "px")

            if(new_left-scale_left>0){
                new_left=scale_left;
            }
            if(new_left+scale_left<$(window).width()-$(".section").width()){
                new_left=$(window).width()-$(".section").width()-scale_left
            }
            $(".section").css("left",new_left+"px")
        }).mouseup(function(e){
            if(is_move){
                section_left = parseInt(new_left);
                section_top = parseInt(new_top);
                is_move = false;
            }
            $("body").unbind("mousemove");
        })
    }
})

// 产品交互层

$(".goods[isdisabled!='true']").on("click",function(){
    var i = $(window).width();
    var j = $(window).height();
    can_move = false;
    can_scale = false;
    now_goods = $(this);
    $(this).css("zIndex",100);
    var l = $(".section").offset().left+$(".huojia")[0].offsetLeft;
    var t = $(".section").offset().top+$(".huojia")[0].offsetTop;
    showMask()
    if($(this).attr("isscale")==0){
        $(this).attr("isscale","1");
        var w = $(this).width();
        var h = $(this).height();

        $(this).animate({
            width:config["goods_scale"]*w/scale+"px",
            height:config["goods_scale"]*h/scale+"px",
            left:((i/2-config["goods_scale"]*w/scale/2) - $(".huojia").offset().left)/scale + (parseInt(config["image_left"])) +"px", // (1-Math.abs(1-scale)*2)
            top:((j/2 - config["goods_scale"]*h/scale/2) - $(".huojia").offset().top)/scale + (parseInt(config["image_top"])) +"px"
        },500)
    }
})
$(".mask").click(function(){
    $(this).hide();
    can_move = true;
    can_scale = true;
    if(now_goods){
        now_goods.stop().animate({
            width:now_goods.attr("width"),
            height:now_goods.attr("height"),
            top:now_goods.attr("top"),
            left:now_goods.attr("left"),
        },500,function(){
            now_goods.attr("isscale",0).css("zIndex",0);
        })
    }
})
$(".goods[isdisabled!='true']").click(function(){
    // 交互
    var goods_num = checkIsExists(now_goods.attr("goods-id"))
    if(goods_num){
        $(".costBox .num").text(goods_num)
    }else{
        $(".costBox .num").text(0)
    }

     // 更换头像
    $(".costBox .clips").attr("src",now_goods.attr("front-image"))

    // 更换商品名
    $(".costBox .goodIntro").text(now_goods.attr("goods-name"));

    // 更换商品价格
    $(".costBox .price .goods-price").text(formatPrice(now_goods.attr("goods-price"),config['price_format_num']));

    // 修改商品背面的img
    $(".costBox .goods-show .goodsShow-left img").attr("src",now_goods.attr("front-image"))
    $(".costBox .goods-show .goodsShow-right img").attr("src","./img/"+now_goods.attr("back-image"))

    $(".costBox").stop().animate({
        right:"0"
    },500)
    bottomBoxHide()
}).mouseover(function(){
    var name = $(this).attr("goods-name");
    var price = formatPrice($(this).attr("goods-price"),config['price_format_num']);
    $(".bottom-intro").html(name+" $"+ " " + price);
})
// 添加商品
$(".costBox .minus").click(function(){
    $(".costBox .num").text(goodsDes(now_goods));
})

$(".costBox .plus").add(".addtobasket").click(function(){
    $(".costBox .num").text(goodsIns(now_goods));
})

$(".close").add(".back").click(function(){
    $(".mask").trigger("click")
})
$(".mask").click(function(){
    slideInRight();
})

$(".btn-view").click(function(){
    bottomBoxHide();
    updateDetailList();
    showDetailList()
    $(".shopping-detail").css("display","none")
    showMask()
})

$(".btn-check").click(function(){
    $(".logo").hide();
    $(".mask").trigger("click")
    updateShoppingDetail();
    $(".shopping-detail").css("display","block").animate({opacity:1});
})

$(".continue").click(function(){
    $(".logo").show();
    $(".shopping-detail").animate({opacity:0},function(){
        $(this).css("display","none")
    })
    bottomBoxShow()
})

// 生成json字符串
$(".finish").click(function(){
    var gid = GetQueryString("GID");
    var list = GetQueryString("list");
    var state = GetQueryString("state");
    //var json=createJSON(cart);
    var json = createString(cart);
    alert(json)
    //addcookie("json",json,10);
    //alert(getcookie("json"));
    //window.location.href = "http://uk.focusvision.com/survey/selfserve/202d/160207?list="+list+"&GID="+gid+"&state="+state+"&data="+json
})