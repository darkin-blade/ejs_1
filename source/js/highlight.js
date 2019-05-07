/**
 * 手写html代码块高亮
 */

var highlight_1 = [
  "for", "while", "return", "switch", "case", "break", "do", "else",
  "endif", "endfor", "endwhile",
  "const"
];

function dfs_c(my_node, found) {
  if (my_node.className != null)
  {
    if (my_node.className.match("highlight") != null)
    {
      found =  my_node.className.replace(/highlight /, "");
      my_highlight(my_node, found);
    } // else
    if ((found != "")&&(my_node.className == "string"))// 字符串
    {
      my_node.className += " code_string";
    }
    if ((found != "")&&(my_node.className == "comment"))// 注释
    {
      my_node.className += " code_comment";
    }
    if ((found != "")&&(my_node.className == "keyword"))// 关键字,需要特判,包括:for const int void enum等
    {
      detail_hilight(my_node, found)
    }
    if ((found != "")&&(my_node.className == "attribute"))// 属性
    {
      my_node.className += " code_attribute";
    }
    if ((found != "")&&(my_node.className == "attr"))// 属性(html)
    {
      my_node.className += " code_attr";
    }
    if ((found != "")&&(my_node.className == "built_in"))// ???
    {
      my_node.className += " code_built_in";
    }
    if ((found != "")&&(my_node.className == "name"))// html标签
    {
      my_node.className += " code_name";
    }
    if ((found != "")&&(my_node.className == "number"))// 数字
    {
      my_node.className += " code_number";
    }
    if ((found != "")&&(my_node.className == "title"))// 函数
    {
      my_node.className += " code_title";
    }
    if ((found != "")&&(my_node.className == "params"))// 函数参数
    {
      my_node.className += " code_params";
    }
    if ((found != "")&&(my_node.className == "selector-tag"))// css属性
    {
      my_node.className += " code_selector-tag";
    }
    if ((found != "")&&(my_node.className == "regexp"))// 正则表达式
    {
      my_node.className += " code_regexp";
    }
    if ((found != "")&&(my_node.className == "meta-keyword"))// include
    {
      my_node.className += " code_meta-keyword";
    }
    if ((found != "")&&(my_node.className == "meta-string"))// <>
    {
      my_node.className += " code_meta-string";
    }

    if ((found == "")&&(my_node.tagName == "TABLE"))// 普通表格,防止和code冲突
    {
      my_node.className = "normal_table"
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
  dfs_c(document.body, "");
}

function detail_hilight(my_node, type) {// 细化
  for (var i = 0; i < highlight_1.length; i ++)
  {
    if (my_node.innerText == highlight_1[i])
    {
      my_node.className += " code_keyword1";
      return;
    }
  }
  my_node.className += " code_keyword";
}