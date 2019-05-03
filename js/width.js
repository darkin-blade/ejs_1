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

function change_width()
{
  var temp = (window.innerWidth - 600) / 1920 * 10;
  if (temp <= 0) temp = 0;
  $(".absolute_page").css("width", 59 - temp + "%");
  $(".absolute_page").css("margin-left", 2 + temp + "%");
  $(".float_page").css("width", 37 - temp + "%");
  $(".float_page").css("margin-right", 2 + temp + "%");
}

function getScrollTop()
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
