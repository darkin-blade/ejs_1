// cloud背景用 js

var sky_color = "";
var now = (new Date()).getHours();
// 根据时间修改天空颜色
if (now < 1 || now >= 23) {
  sky_color = "rgb(1,1,1)";
} else if (now < 3) {
  sky_color = "rgb(63,63,89)";
} else if (now < 5) {
  sky_color = "rgb(164,123,165)";
} else if (now < 7) {
  sky_color = "rgb(237,237,235)";
} else if (now < 9) {
  sky_color = "rgb(148,233,255)";
} else if (now < 11) {
  sky_color = "rgb(92,198,240)";
} else if (now < 13) {
  sky_color = "rgb(41,171,224)";
} else if (now < 15) {
  sky_color = "rgb(36,118,170)";
} else if (now < 17) {
  sky_color = "rgb(59,102,137)";
} else if (now < 19) {
  sky_color = "rgb(225,206,112)";
} else if (now < 21) {
  sky_color = "rgb(150,54,12)";
} else if (now < 23) {
  sky_color = "rgb(53,21,4)";
}

$(document).ready(function() {
  var cloud_num = 10;
  var cloud_sky = document.createElement("div");
  for (i = 0; i < cloud_num; i ++) {
    var cloud = document.createElement("div");
    var cloud_rate = my_random(5, 100) / 100;
    cloud.className = "clouds";
    cloud.style.width = (280 * cloud_rate) + "px";
    cloud.style.height = (96 * cloud_rate) + "px";
    cloud.style.borderRadius = (80 * cloud_rate) + "px";
    cloud.style.top = (my_random(2, 18) * 5) + "%";
    cloud.style.opacity = my_random(50, 100) / 100;
    cloud.style.animation = "moveclouds " + my_random(10, 40) + "s linear infinite";
    cloud_sky.appendChild(cloud);
  }
  cloud_sky.className = "cloud_sky";
  cloud_sky.style.position = "fixed";
  document.body.appendChild(cloud_sky);
  document.body.style.background = sky_color;
});

function my_random(low, up) {// 含low,含up
  if (up <= low) return -1;
  return Math.floor(Math.random() * (up - low + 1)) + low;
}