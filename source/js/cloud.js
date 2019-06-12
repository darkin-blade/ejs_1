// cloud背景用 js

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
    cloud.style.animation = "moveclouds " + my_random(7, 30) + "s linear infinite";
    cloud_sky.appendChild(cloud);
  }
  cloud_sky.className = "cloud_sky";
  cloud_sky.style.position = "fixed";
  document.body.appendChild(cloud_sky);
});

function my_random(low, up) {// 含low,含up
  if (up <= low) return -1;
  return Math.floor(Math.random() * (up - low + 1)) + low;
}