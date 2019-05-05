/**
 * 自动调整宽度
 */

function my_resize()
{
  change_width();
  change_height();
}

function my_load()
{
  change_width();
  change_height();
}

function change_height()
{
  var w_height = document.body.clientHeight;
  var base_height = w_height * 0.3;
  for (var i = 1; i <= 5; i ++)
  {
    $(".right_tool_" + i).css("top", (base_height + i * 60) + "px");
    $(".left_tool_" + i).css("top", (base_height + i * 60) + "px");
  }
}

function change_width() // 自动调整元素宽度
{
    var w_width = document.body.clientWidth;
    var b_padding = $(".mid_block").css("padding-left"); // padding转数字
    var b_margin = $(".mid_block").css("margin-left"); // margin转数字
    if (b_padding) // 摘要块
    {
        b_padding = (Number(b_padding.replace("px", "")));
        b_margin = (Number(b_margin.replace("px", "")));
        var b_offset = b_padding + b_margin;

        var rate = mid_block_rate(w_width);
        // console.log(rate);

        if (w_width < 1200) { // 半页,1列
          var b_width = w_width * rate;
          var b_left = (w_width - b_width) / 2 - b_offset; // 减去多余的padding
          $(".mid_block").css("width", b_width + "px");
          $(".mid_block").css("left", b_left + "px");
        } else { // 全页,2列
          b_offset *= 2;
          var b_width = w_width * rate;
          var b_left = (w_width - 2 * b_width) / 2 - b_offset; // 因为并排,所以要减去两个padding
          $(".mid_block").css("width", b_width + "px");
          $(".mid_block").css("left", b_left + "px");
        }
    }

    b_padding = $(".main_block").css("padding-left"); // padding转数字
    b_margin = $(".main_block").css("margin-left"); // margin转数字
    if (b_padding) // 文章块,不分列
    {
        b_padding = (Number(b_padding.replace("px", "")));
        b_margin = (Number(b_margin.replace("px", "")));
        var b_offset = b_padding + b_margin;
        console.log(b_offset);

        rate = main_block_rate(w_width);

        var b_width = w_width * rate;
        var b_left = (w_width - b_width) / 2 - b_offset;
        $(".main_block").css("width", b_width + "px");
        $(".main_block").css("left", b_left + "px"); // 减去多余的padding
    }

    b_padding = $(".center_block").css("padding-left"); // padding转数字
    b_margin = $(".center_block").css("margin-left"); // margin转数字
    if (b_padding) // 文章块,不分列
    {
        b_padding = (Number(b_padding.replace("px", "")));
        b_margin = (Number(b_margin.replace("px", "")));
        var b_offset = b_padding + b_margin;
        console.log(b_offset);

        rate = main_block_rate(w_width);

        var b_width = w_width * rate;
        var b_left = (w_width - b_width) / 2 - b_offset;
        $(".center_block").css("width", b_width + "px");
        $(".center_block").css("left", b_left + "px"); // 减去多余的padding
    }
}

function main_block_rate (width)
{
  if (width < 1000)
  {
    return 1 - 0.0001 * width;
  }
  else
  {
    return 1.33 - 0.00043 * width;
  }
}

function mid_block_rate (width)
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
    return 0.56 - 0.0001 * width; // 不要太小,否则会出现3列
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
