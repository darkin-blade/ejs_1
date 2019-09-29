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

(function() {
  var snow_num = 0;
  if (isMobile.any()) {
    snow_num = 20;// 手机端影响性能
  } else {
    snow_num = 30;
  }
  var snow_sky = document.createElement("div");
  for (i = 0; i < snow_num; i ++) {
    var snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    var snow_rate = my_random(10, 20) / 100;
    for (j = 0; j < 6; j ++) {
      var snow = document.createElement("div");
      snow.className = "snow";
      snow.style.width = (10 * snow_rate) + "px";
      snow.style.height = (150 * snow_rate) + "px";
      snowflake.appendChild(snow);
    }
    snowflake.style.left = my_random(0, 100) + "%";
    snowflake.style.opacity = my_random(20, 100) / 100;
    snowflake.style.animation = "snow_fall " + my_random(10, 50) + "s linear infinite";
    snow_sky.appendChild(snowflake);
  }
  snow_sky.className = "snow_sky";
  snow_sky.style.position = "fixed";
  document.body.appendChild(snow_sky);
  document.body.style.background = "black";
}());

function my_random(low, up) {// 含low,含up
  if (up <= low) return -1;
  return Math.floor(Math.random() * (up - low + 1)) + low;
}