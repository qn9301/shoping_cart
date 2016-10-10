/**
 * Created by Administrator on 2016/7/17.
 */
function slideInRight(){
    var detailList_width = $(".detailList").innerWidth();
    $(".costBox").stop().animate({
        right:-detailList_width+"px"
    },500)
    $(".detailList").stop().animate({
        right:-detailList_width+"px"
    },500)
    $(".bottom-box").stop().animate({
        bottom:"0"
    },500)
}

// 购物车中的商品数量增加
function goodsIns(goods){
    var goods_id = goods.attr("goods-id");
    var store = goods.attr("goods-store");
    var num = checkIsExists(goods_id);
    if(num && num>0 && num<store){
        cart[goods_id]['num']++;
        itemCount++;
        priceCount+= +(cart[goods_id]['price'])
    }else if(num===false){
        // 添加到购物车中
        cart[goods_id] = [];
        cart[goods_id]['id'] = goods.attr("goods-id");
        cart[goods_id]['num'] = 1;
        cart[goods_id]['name'] = goods.attr("goods-name");
        cart[goods_id]['image'] = goods.find("img").attr("src");
        cart[goods_id]['price'] = goods.attr("goods-price");
        cart[goods_id]['store'] = goods.attr("goods-store");
        itemCount++;
        priceCount+= +(cart[goods_id]['price'])
    }
    upDateCostCount()
    return cart[goods_id]['num'];
}

// 购物车中的商品数量减少
function goodsDes(goods){
    var goods_id = goods.attr("goods-id");
    var store = goods.attr("goods-store");
    var num = checkIsExists(goods_id)
    if(num && num>1 && num<store){
        cart[goods_id]['num']--;
        itemCount--;
        priceCount-=  +(cart[goods_id]['price']);
    }else if(num && num<=1){
        // 从购物车删除商品
        priceCount-= (cart[goods_id]['price']);
        delCart(goods_id);
        itemCount--;
        upDateCostCount()
        return 0;
    }else{
        return 0;
    }
    upDateCostCount()
    return cart[goods_id]['num'];
}

function delCart(index){
    var arr = [];
    for(var i in cart){
        if(i != index){
            arr[i]=cart[i]
        }
    }
    cart = arr;
}

// 检查购物车中是否有这件商品，有的话返回商品数量，没有返回false
function checkIsExists(goods_id){
    for(var i in cart){
        if(i == goods_id){
            return cart[i]["num"];
        }
    }
    return false;
}


function upDateCostCount(){
    $(".itemCount").text(itemCount);
    $(".priceCount").text(formatPrice(priceCount,config["price_format_num"]));
}

// 底部隐藏
function bottomBoxHide(){
    $(".bottom-box").stop().animate({
        bottom:"-150px"
    },500)
}

function bottomBoxShow(){
    $(".bottom-box").stop().animate({
        bottom:"0px"
    },500)
}

function showMask(){
    $(".mask").show();
}

function showDetailList(){
    $(".detailList").css({"display":"block"}).animate({right:0})
}

function hideDetailList(){
    $(".detailList").stop().animate({
        right:"-300px"
    },500)
}

// 更新detailList想换的数据
function updateDetailList(){
    var str = "";
    for(var i in cart){
        str += '<div class="detailList-content">';
        str += '<div class="goodInfor clearfix little-margin">';
        str += '<div class="goodImg fl">';
        str += '<img src="'+ cart[i]['image'] +'" class="clips">';
        str += '</div>';
        str += '<div class="goodIntro fl clearfix">';
        str += cart[i]['name'] +'<span class="iconfont c-28 fr little-right del" goods-id="'+ i +'">&#xe62f;</span>';
        str += '</div>';
        str += '</div>';
        str += '<div class="addIn clearfix">';
        str += '<div class="minus bg-grey iconfont fl" goods-id="'+ i +'">&#xe61f;</div>';
        str += '<div class="num c-white fl">'+ cart[i]['num'] +'</div>';
        str += '<div class="plus bg-grey iconfont fl" goods-id="'+ i +'">&#xe628;</div>';
        str += '<div class="price c-white fr">$<span class="goods-price">'+formatPrice(cart[i]['price'],config['price_format_num'])+'</span></div>';
        str += '</div>';
        str += '</div>';
    }
    $(".detailList-next").html(str);
    $(".detailList-next").addScroll("black","gray","10",0.6);
    $(".detailList-next").find('.minus').on("click",function(){
        // 减少商品
        var goodsid = $(this).attr("goods-id");
        cart[goodsid]['num']--;
        itemCount--;
        priceCount -= cart[goodsid]['price'];
        if(cart[goodsid]['num']==0){
            delCart(goodsid);
            $(this).parent().parent().remove();
        }else{
            $(this).siblings(".num").text(cart[goodsid]['num']);
        }
        upDateCostCount()
    })
    $(".detailList-next").find('.plus').on("click",function(){
        // 增加商品
        var goodsid = $(this).attr("goods-id");
        cart[goodsid]['num']++;
        if(cart[goodsid]['num']>cart[goodsid]['store']){
            cart[goodsid]['num'] = cart[goodsid]['store'];
        }else{
            itemCount++;
            priceCount+= +(cart[goodsid]['price']);
        }
        $(this).siblings(".num").text(cart[goodsid]['num']);
        upDateCostCount();
    })
    $(".detailList-next").find('.del').on("click",function(){
        // 删除商品
        var goodsid = $(this).attr("goods-id");
        priceCount -= cart[goodsid]['num']*cart[goodsid]['price'];
        itemCount -= cart[goodsid]['num'];
        delCart(goodsid)
        upDateCostCount();
        $(this).parent().parent().parent().remove();
    })
}

// 更新ShoppingDetail
function updateShoppingDetail(){
    var str = "";
    for(var i in cart){
        str +='<div class="detail-infor clearfix">';
        str +='    <div class="detail-infor-left fl">';
        str +='    <div class="goodImg fl">';
        str +='   <img src="'+ cart[i]['image'] +'" class="clips">';
        str +='    </div>';
        str +='    <div class="goodIntro fl clearfix">';
        str +=     cart[i]['name'];
        str +='</div>';
        str +='</div>';
        str +='<div class="detail-diff-left fl">';
        str +='    <div class="addIn-diff clearfix">';
        str +='    <div class="minus bg-grey iconfont fl" goods-id="'+i+'">&#xe61f;</div>';
        str +='<div class="num c-white fl">'+cart[i]['num']+'</div>';
        str +='    <div class="plus bg-grey iconfont fl" goods-id="'+i+'">&#xe628;</div>';
        str +='</div>';
        str +='</div>';
        str +='<div class="detail-diff-right fl bit-margin">$<span class="price">'+formatPrice(cart[i]['price'],config['price_format_num'])+'</span></div>';
        str +='</div>';
    }
    $(".shopping-detail-box").html(str);
    $(".shopping-detail-box").addScroll("black","gray","10",0.6);
    $(".shopping-detail-box").find('.minus').on("click",function(){
        // 减少商品
        var goodsid = $(this).attr("goods-id");
        cart[goodsid]['num']--;
        itemCount--;
        priceCount -= cart[goodsid]['price'];
        if(cart[goodsid]['num']==0){
            delCart(goodsid);
            $(this).parent().parent().parent().remove();
        }else{
            $(this).siblings(".num").text(cart[goodsid]['num']);
        }
        upDateCostCount()
    })
    $(".shopping-detail-box").find('.plus').on("click",function(){
        // 增加商品
        var goodsid = $(this).attr("goods-id");
        cart[goodsid]['num']++;
        if(cart[goodsid]['num']>cart[goodsid]['store']){
            cart[goodsid]['num'] = cart[goodsid]['store'];
        }else{
            itemCount++
            priceCount+= +(cart[goodsid]['price']);
        }
        $(this).siblings(".num").text(cart[goodsid]['num']);
        upDateCostCount();
    })
}

function createJSON(arr){
    // 如果是数组
    var str = "";
    if($.isArray(arr)){
        str += "{";
        for(var i in arr){
            if($.isArray(arr[i])){
                str += '"'+i+'":'+"["+createJSON(arr[i])+"],";
            }else{
                // 此处添加了json数据的筛选
                if(i=="id" || i=="num")
                str += '"'+i+'"'+':"'+arr[i]+'",';
            }
        }
        var a = str.split("")
        a.pop();
        str = a.join("");
        str += "},"
    }
    var a = str.split("")
    a.pop();
    str = a.join("");
    return str;
}

function createString(arr){
    var str = "";
    if($.isArray(arr)) {
        for (var i in arr) {
            if ($.isArray(arr[i])) {
                for (var j in arr[i]) {
                    if(j == "id" || j == "num"){
                        str += arr[i][j]+":";
                    }
                }
                var a = str.split("")
                a.pop();
                str = a.join("");
                str+=";"
            }
        }
    }
    return str;
}



// 格式化金额
function formatPrice(price,num){
    var price = Math.round(price*Math.pow(10,num))/Math.pow(10,num);
    var price_str = price.toString();
    var price_len = price_str.length;
    var dote_index = price_str.indexOf(".");
    if(dote_index>0){
        var zero_num = num-(price_len-1-dote_index);
    }else{
        var zero_num = 2
        price_str+="."
    }
    for(var i=0;i<zero_num;i++){
        price_str+="0";
    }
    return price_str;
}

// 获取网页中get的参数
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}

function addcookie(name,value,expireHours){
    var cookieString=name+"="+escape(value)+"; path=/";
    //判断是否设置过期时间
    if(expireHours>0){
        var date=new Date();
        date.setTime(date.getTime()+expireHours*3600*1000);
        cookieString=cookieString+"; expires="+date.toGMTString();
    }
    document.cookie=cookieString;
}

function getcookie(name){
    var strcookie=document.cookie;
    var arrcookie=strcookie.split("; ");
    for(var i=0;i<arrcookie.length;i++){
        var arr=arrcookie[i].split("=");
        if(arr[0]==name)return unescape(arr[1]);
    }
    return "";
}

function delCookie(name){//删除cookie
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getcookie(name);
    if(cval!=null) document.cookie= name + "="+cval+"; path=/;expires="+exp.toGMTString();
}