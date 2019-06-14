/**
 * 自动调整宽度
 */

// 窗口发生变化
function my_resize()
{
  change_width();
  change_height();
}

// 网页加载后执行的代码
function my_load()
{
  my_filter()
  change_width();
  change_height();
  my_highlight_start();// 手动代码高亮
  document.body.setAttribute("onscroll", "my_scroll()");// 防止报错
  my_scroll();
  setTimeout("auto_guide()", 500);
  // post_excerpt();
}

function auto_guide()
{
  var w_width = document.body.clientWidth;
  if (w_width > 1800)// 自动弹出左侧附加引导
  {
    var temp_tool = document.querySelector(".right_tool_3");
    if (temp_tool != null) temp_tool.click();
  }
}

function post_excerpt()// 清除文章摘要的格式
{
  for (var i = 0; 1; i ++)
  {
    var temp_post = document.querySelector("#post_" + i);
    if (temp_post == null) break;// 全部搜索完
    temp_post.innerHTML = temp_post.innerText;
  }
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

// 附加导航功能
function change_guide(direct)
{
  var w_top = $(window).scrollTop();
  var guide_1 = null; // 待修改的索引
  var guide_2 = null;
  var guide_3 = null;
  var guide_4 = null;
  var guide_5 = null;

  for (var i = 0; i < document.h_index; i ++)// h_index是section/guide的总数
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

  for (var i = 0; i < document.h_index; i ++)// 从上往下遍历
  {
    var this_section = document.getElementById("section_" + i);
    var temp_offset = $("#section_" + i).offset().top - w_top;
    // console.log(i, temp_offset);
    if (temp_offset > 5) break;// 未到达的section
    if (this_section.className.match("section_1") != null) { // 有可能会有其他class名,比如使用了mathjax
      guide_1 = document.getElementById("guide_" + i);// 注意id寻找
      guide_2 = null;
      guide_3 = null;
      guide_4 = null;
      guide_5 = null;
    } else if (this_section.className.match("section_2") != null) {
      guide_2 = document.getElementById("guide_" + i);
      guide_3 = null;
      guide_4 = null;
      guide_5 = null;
    } else if (this_section.className.match("section_3") != null) {
      guide_3 = document.getElementById("guide_" + i);
      guide_4 = null;
      guide_5 = null;
    } else if (this_section.className.match("section_4") != null) {
      guide_4 = document.getElementById("guide_" + i);
      guide_5 = null;
    } else if (this_section.className.match("section_5") != null) {
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
  var base_height = w_height * 0.25;// 第一个按钮距顶部距离
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

    if (w_width < 1200)
    { // 半页,1列
      var b_width = w_width * rate;
      var b_left = (w_width - b_width) / 2 - b_offset; // 减去多余的padding
      $(".mid_block").css("width", b_width + "px");
      $(".mid_block").css("left", b_left + "px");
    }
    else
    { // 全页,2列
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

    var b_width = w_width * rate - 2 * b_offset; // 减去多余的padding和margin,为了保证宽度不超
    var b_left = (w_width - b_width) / 2 - b_offset; // 减去padding/margin,为了对齐
    $(".main_block").css("width", b_width + "px");
    $(".main_block").css("left", b_left + "px");
  }

  // tag/category块宽度
  b_padding = $(".center_block").css("padding-left"); // padding转数字
  b_margin = $(".center_block").css("margin-left"); // margin转数字
  if (b_padding)
  {
    b_padding = (Number(b_padding.replace("px", "")));
    b_margin = (Number(b_margin.replace("px", "")));
    var b_offset = b_padding + b_margin;

    var b_width = w_width * rate - 2 * b_offset;
    var b_left = (w_width - b_width) / 2 - b_offset;
    $(".center_block").css("width", b_width + "px");
    $(".center_block").css("left", b_left + "px");
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

    var b_width = w_width * rate - 2 * b_offset;
    var b_left = (w_width - b_width) / 2 - b_offset;
    $(".top_block").css("width", b_width + "px");
    $(".top_block").css("left", b_left + "px");
  }

  // 文章tag/category块透明度
  rate = left_block_rate(w_width);
  $(".right_block").css("opacity", rate);
}

function main_block_rate (width) // 文章/category/tag页面的宽度
{
  if (width < 1000)
  {
    return 1 - 0.00001 * width;
  }
  else
  {
    return 1.51 - 0.00052 * width;
  }
}

function mid_block_rate (width) // 摘要块宽度函数
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

function left_block_rate (width) // 左侧附加导航的透明度计算
{
  if (width < 1000)
  {
    return 0.1;
  }
  else
  {
    return (- 0.46 + width * 0.00076);
  }
}