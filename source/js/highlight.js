/**
 * 手写html代码块高亮
 */

function dfs_c(my_node, found) {
  if (my_node.className != null)
  {
    if (my_node.className.match("highlight") != null)
    {
      found = 1;
      var temp_type = my_node.className.replace(/highlight /, "");
      // console.log(temp_type);
      my_highlight(my_node, temp_type);
    } // else
    if ((found)&&(my_node.className == "string"))// 字符串
    {
      my_node.className += " code_string";
    }
    if ((found)&&(my_node.className == "comment"))// 注释
    {
      my_node.className += " code_comment";
    }
    if ((found)&&(my_node.className == "keyword"))// 关键字
    {
      my_node.className += " code_keyword";
    }
    if ((found)&&(my_node.className == "attribute"))// 属性
    {
      my_node.className += " code_attribute";
    }
    if ((found)&&(my_node.className == "attr"))// 属性(html)
    {
      my_node.className += " code_attr";
    }
    if ((found)&&(my_node.className == "built_in"))// ???
    {
      my_node.className += " code_built_in";
    }
    if ((found)&&(my_node.className == "name"))// html标签
    {
      my_node.className += " code_name";
    }
    if ((found)&&(my_node.className == "number"))// 数字
    {
      my_node.className += " code_number";
    }
    if ((found)&&(my_node.className == "title"))// 函数
    {
      my_node.className += " code_title";
    }
    if ((found)&&(my_node.className == "params"))// 函数参数
    {
      my_node.className += " code_params";
    }
    if ((found)&&(my_node.className == "selector-tag"))// css属性
    {
      my_node.className += " code_selector-tag";
    }
    if ((found)&&(my_node.className == "regexp"))// 正则表达式
    {
      my_node.className += " code_regexp";
    }
  }

  var my_child = my_node.childNodes.length;
  for (var i = 0; i < my_child; i ++)
  {
    dfs_c(my_node.childNodes[i], found);
  }
}

function my_highlight(my_node, type) {
  my_node.className = my_node.className + " my_code";
  // console.log(my_node.innerText.replace(/\n/, ""));
}

function my_highlight_start() {
  dfs_c(document.body, 0);
}