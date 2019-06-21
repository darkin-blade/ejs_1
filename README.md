# 说明

使用ejs写的hexo主题,对字体及颜色等css做了更多限定

[最简版(较少css限定的)](https://github.com/hexo-simple-theme/ejs_sample)

# 功能

> 和最简版一样的就不放图了

1. sublime molokai风格代码块渲染

![](https://github.com/hexo-simple-theme/theme_demo/blob/master/molokai.png)

2. 本地搜索(需要`hexo-generator-search`npm包)

3. 高仿`bootstrap`附加导航

4. 可切换`mathjax`和`katex`数学公式渲染

5. 无限加载live2d canvas(可以调成无限,默认最多9个)

> 由于模型文件过大,请移步:[文件](https://github.com/hexo-simple-theme/hexo_live2d),[使用说明](https://github.com/darkin-blade/live2d_SDK_WebGL)

![](https://github.com/hexo-simple-theme/theme_demo/blob/master/live2d.png)

6. 可切换动态背景

![](https://github.com/hexo-simple-theme/theme_demo/blob/master/cloud.png)
![](https://github.com/hexo-simple-theme/theme_demo/blob/master/snow.png)

# 文件组织

> 和最简版一样的就不写了

```
/-+-layout/-+-partial/-+-live2d.ejs:加载live2d
  |
  +-source/-+-css/-+-snow.styl:snow动态背景样式
  |         |      |
  |         |      `-cloud.styl:cloud动态背景
  |         |
  |         `-js/-+-snow.js:snow动态背景
  |               |
  |               `-cloud.js:cloud动态背景
  |
  `-_config.yml:一些主题变量的声明(切换动态背景,开启live2d等)
```
