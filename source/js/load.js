/**
 * 本地搜索器-load
 */

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  Symbian: function () {
    return navigator.userAgent.match(/Symbian/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() || isMobile.Symbian());
  }
};

//if ($('.local-search').size() && !isMobile.any()) {
  // 这个判断感觉没什么用
if (1) {// TODO
  $.getScript('/js/search.js', function () {
    searchFunc("/search.xml", 'local-search-input', 'local-search-result');// 路径,输入,输出
  });
}