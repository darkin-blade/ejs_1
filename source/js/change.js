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
  var temp = (window.innerWidth - 600) / 1920 * 10;
  if (temp <= 0) temp = 0;
  $(".mid_container").css("margin-right", 2 + temp + "%");
  $(".mid_container").css("margin-left", 2 + temp + "%");
  console.log(temp);
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
