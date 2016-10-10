// 放置产品
$(".logo").css({
	"position":"fixed",
	"left":config['logo_left']+"px",
	"top":config['logo_top']+"px",
	"zIndex":50000
}).attr("src",config["logo_src"])

var goods_str = "";
for(var i in all_goods){
	goods_str+='<li class="goods" isdisabled="'+ all_goods[i]['isdisabled'] +'" isscale="0" front-image="./img/'+ all_goods[i]['front-image'] +'" back-image="'+ all_goods[i]['back-image'] +'" goods-name="'+ all_goods[i]['name'] +'" goods-store="'+ all_goods[i]['store'] +'" goods-id="' + all_goods[i]['id'] + '" goods-price="' + all_goods[i]['price'] + '" goods-image="./img/'+ all_goods[i]['image']  +'"><div><img ondragstart="return false"></div></li>'
}

$(".huojia .rows").html(goods_str);


// 渲染界面
$(".section").css({
	"width":config["section_width"],
	"height":config["section_height"],
	"backgroundImage":"url("+config["section_bg"]+")",
	"backgroundSize":config["section_bg_size"]
})

$(".section").css({
	"width":$(".section").width(),
	"height":$(".section").height()
})

$(".huojia").css({
	"backgroundImage":"url("+config["huojia_image"]+")",
	"width":config["huojia_width"],
	"height":config["huojia_height"],
	"background-size":"auto "+config["huojia_height"],
	"left":config["huojia_left"],
	"bottom":config["huojia_bottom"],
	"paddingTop":config["huojia_padding_top"],
	"paddingLeft":config["huojia_padding_left"],
	"paddingBottom":config["huojia_padding_bottom"],
	"paddingRight":config["huojia_padding_right"],
	"backgroundSize":config["huojia_bg_size"]
})

$(".rows").css({
	"height":config["goods_height"]
})

$(".goods").css({
	"boxSizing":"borderBox",
	"height":config["goods_height"],
	"paddingTop":config["goods_padding_top"],
	"paddingLeft":config["goods_jianju"],
	"paddingRight":config["goods_jianju"]
})

$(".detailList").css({"display":"none",right:"-265px"})