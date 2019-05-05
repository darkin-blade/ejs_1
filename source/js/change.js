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
  document.body.setAttribute("onscroll", "my_scroll()");// 防止报错
  my_scroll();
  hljs.initHighlightingOnLoad();
}

function my_scroll()
{
  var e = window.event;
  var direct = 0;
  if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件             
      direct = e.wheelDelta;
  } else if (e.detail) {  //Firefox滑轮事件
      direct = e.detail;
  }
  change_guide(direct);
}

function change_guide(direct)
{
  var w_top = $(window).scrollTop();
  var guide_1 = null; // 待修改的索引
  var guide_2 = null;
  var guide_3 = null;
  var guide_4 = null;
  var guide_5 = null;

  for (var i = 0; i < h_index; i ++)// h_index是section/guide的总数
  {
    var this_guide = document.getElementById("guide_" + i);
    if ((this_guide.className != "guide_1")
    &&(this_guide.className != "guide_2")
    &&(this_guide.className != "guide_3")
    &&(this_guide.className != "guide_4")
    &&(this_guide.className != "guide_5"))
    {
      $(this_guide).toggleClass("guide_active");// 关闭active属性
    }
  }

  for (var i = 0; i < h_index; i ++)// 从上往下遍历
  {
    var this_section = document.getElementById("section_" + i);
    var temp_offset = $("#section_" + i).offset().top - w_top;
    // console.log(i, temp_offset);
    if (temp_offset > 5) break;// 未到达的section
    if (this_section.className == "section_1") {
      guide_1 = document.getElementById("guide_" + i);// 注意id寻找
      guide_2 = null;
      guide_3 = null;
      guide_4 = null;
      guide_5 = null;
    } else if (this_section.className == "section_2") {
      guide_2 = document.getElementById("guide_" + i);
      guide_3 = null;
      guide_4 = null;
      guide_5 = null;
    } else if (this_section.className == "section_3") {
      guide_3 = document.getElementById("guide_" + i);
      guide_4 = null;
      guide_5 = null;
    } else if (this_section.className == "section_4") {
      guide_4 = document.getElementById("guide_" + i);
      guide_5 = null;
    } else if (this_section.className == "section_5") {
      guide_5 = document.getElementById("guide_" + i);
    }
  }

  if (guide_1) {
    $(guide_1).toggleClass("guide_active");
  }
  if (guide_2) {
    $(guide_2).toggleClass("guide_active");
  }
  if (guide_3) {
    $(guide_3).toggleClass("guide_active");
  }
  if (guide_4) {
    $(guide_4).toggleClass("guide_active");
  }
  if (guide_5) {
    $(guide_5).toggleClass("guide_active");
  }
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

    // 摘要块宽度,考虑两行并列
    var b_padding = $(".mid_block").css("padding-left"); // padding转数字
    var b_margin = $(".mid_block").css("margin-left"); // margin转数字
    var rate = mid_block_rate(w_width);
    if (b_padding)
    {
        b_padding = (Number(b_padding.replace("px", "")));
        b_margin = (Number(b_margin.replace("px", "")));
        var b_offset = b_padding + b_margin;

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

    // 文章块宽度
    b_padding = $(".main_block").css("padding-left"); // padding转数字
    b_margin = $(".main_block").css("margin-left"); // margin转数字
    rate = main_block_rate(w_width);
    if (b_padding) // 不分列
    {
        b_padding = (Number(b_padding.replace("px", "")));
        b_margin = (Number(b_margin.replace("px", "")));
        var b_offset = b_padding + b_margin;

        var b_width = w_width * rate;
        var b_left = (w_width - b_width) / 2 - b_offset;
        $(".main_block").css("width", b_width + "px");
        $(".main_block").css("left", b_left + "px"); // 减去多余的padding
    }

    // tag/category块宽度
    b_padding = $(".center_block").css("padding-left"); // padding转数字
    b_margin = $(".center_block").css("margin-left"); // margin转数字
    if (b_padding)
    {
        b_padding = (Number(b_padding.replace("px", "")));
        b_margin = (Number(b_margin.replace("px", "")));
        var b_offset = b_padding + b_margin;

        var b_width = w_width * rate;
        var b_left = (w_width - b_width) / 2 - b_offset;
        $(".center_block").css("width", b_width + "px");
        $(".center_block").css("left", b_left + "px"); // 减去多余的padding
    }

    // 搜索块宽度
    b_padding = $(".top_block").css("padding-left"); // padding转数字
    b_margin = $(".top_block").css("margin-left"); // margin转数字
    rate = main_block_rate(w_width) * 0.9; // 比文章块略小
    if (b_padding)
    {
        b_padding = (Number(b_padding.replace("px", "")));
        b_margin = (Number(b_margin.replace("px", "")));
        var b_offset = b_padding + b_margin;

        var b_width = w_width * rate;
        var b_left = (w_width - b_width) / 2 - b_offset;
        $(".top_block").css("width", b_width + "px");
        $(".top_block").css("left", b_left + "px"); // 减去多余的padding
    }

    // 文章tag/category块透明度
    rate = left_block_rate(w_width);
    $(".left_block").css("opacity", rate);
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

function left_block_rate (width)
{
  if (width < 1000)
  {
    return 0.3;
  }
  else
  {
    return (- 0.46 + width * 0.00076);
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
