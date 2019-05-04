/**
 * 自动调整宽度
 */

function my_resize()
{
  change_width();
}

function my_load()
{
  change_width();
}

function change_width() // 自动调整元素宽度
{
    var w_width = document.body.clientWidth;
    var b_padding = $(".mid_block").css("padding-left"); // padding转数字
    var b_margin = $(".mid_block").css("margin-left"); // margin转数字
    if (b_padding) // 主页/tag页
    {
        b_padding = (Number(b_padding.replace("px", "")));
        b_margin = (Number(b_margin.replace("px", "")));
        var b_offset = b_padding + b_margin;

        var rate = cal_rate(w_width);
        console.log(rate);

        if (w_width < 1200) { // 半页
          var b_width = w_width * rate;
          var b_left = (w_width - b_width) / 2;
          $(".mid_block").css("width", b_width + "px");
          $(".mid_block").css("left", b_left - b_offset + "px"); // 减去多余的padding
        } else { // 全页
          var b_width = w_width * rate;
          var b_left = (w_width - 2 * b_width) / 2;
          b_offset *= 2;
          $(".mid_block").css("width", b_width + "px");
          $(".mid_block").css("left", b_left - b_offset + "px"); // 减去多余的padding
        }
    }
}

function cal_rate (width)
{
  if (width < 800)
  {
    return 1 - 0.000125 * width;
  }
  else if (width < 1200)
  {
    return 1.5 - 0.00075 * width;
  }
  else
  {
    return 0.56 - 0.0001 * width;
  }
}

function getScrollTop() // 计算滚动条
{ 
  var scrollTop = 0; 
  if (document.documentElement && document.documentElement.scrollTop)
  { 
    scrollTop = document.documentElement.scrollTop; 
  }
  else if (document.body)
  { 
    scrollTop = document.body.scrollTop; 
  } 
  return scrollTop; 
}
