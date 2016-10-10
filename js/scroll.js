/* *
 *  c1:外框的颜色
 *  c2:滚动条的颜色
 *  w1:外框的宽度
 *  percent:滚动条所占外框的比例
 *  调用方法（例如）：$(".section").addScroll("black","gray","10",0.6);
 */
$.fn.extend({
    addScroll:function(c1,c2,w1,percent){
        document.onselectstart = function(){return false;}
        return this.each(function(){
            var _this_position = $(this).css("position");
            var _this = $(this);
            if(_this_position!="absolute" && _this_position!="relative" && _this_position!="fixed"){
                $(this).css("position","relative")
            }
            var html_str = $(this).html()
            $(this).html("");
            $(this).append("<div class='scroll-container'></div>");
            $(this).find(".scroll-container").css({
                "position":"relative",
                "box-sizing":"border-box",
                "padding-right":w1+"px"

            }).html(html_str);
            setTimeout(function(){
                var max_h = _this.find(".scroll-container").height();
                var min_h = _this.height();
                if(max_h<=min_h){
                    return false;
                }

                _this.append("<div class='scroll-box'><div class='scroll-peace'></div></div>");
                _this.find(".scroll-box").css({
                    width:w1+"px",
                    height:"100%",
                    position:"absolute",
                    right:"0px",
                    top:"0px",
                    background:c1
                }).find(".scroll-peace").css({
                    width:percent*100+"%",
                    height:min_h/max_h*min_h+"px",
                    position:"absolute",
                    top:0,
                    left:"50%",
                    marginLeft:-w1*percent/2+"px",
                    background:c2
                }).mousedown(function(e){
                    var m_y = e.screenY;
                    var old_top = parseInt($(this).css("top"));
                    $("body").mousemove(function(e){
                            var new_t = e.screenY-m_y+old_top;
                            if(new_t<=0){
                                new_t = 0;
                            }else if(new_t>=_this.find(".scroll-box").height()-_this.find(".scroll-peace").height()){
                                new_t = _this.find(".scroll-box").height()-_this.find(".scroll-peace").height();
                            }
                            _this.find(".scroll-peace").css("top",new_t+"px");
                            _this.find(".scroll-container").css("top",-new_t/min_h * max_h+"px");
                        })
                        .mouseup(function(){
                            $(this).unbind("mousemove");
                        })
                })
            },100)
        })
    }
})