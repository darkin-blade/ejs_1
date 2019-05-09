/**
 * 手写html代码块高亮
 */

var highlight_1 = [
  "for", "while", "return", "switch", "case", "break", "do", "else", "if",
  "endif", "endfor", "endwhile",
  "const"
];

var highlight_2 = [
  "width", "height", "type", "data", "src", "href", "style", "rel",
  "onload", "onclick", "onscroll", "onmousemove", "onresize",
  "id", "class"
];

function dfs_c(my_node, found) {
  if (my_node.className != null)
  {
    if (my_node.className.match("highlight") != null)
    {
      found =  my_node.className.replace(/highlight /, "");
      my_node.className += " code_figure";
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
      detail_hilight(my_node, my_node.className, found)
    }
    if ((found != "")&&(my_node.className == "attribute"))// 属性
    {
      my_node.className += " code_attribute";
    }
    if ((found != "")&&(my_node.className == "attr"))// 属性(html)
    {
      detail_hilight(my_node, my_node.className, found)
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
    if ((found != "")&&(my_node.className == "selector-tag"))// css tag
    {
      my_node.className += " code_selector-tag";
    }
    if ((found != "")&&(my_node.className == "selector-class"))// css class
    {
      my_node.className += " code_selector-class";
    }
    if ((found != "")&&(my_node.className == "selector-id"))// css id
    {
      my_node.className += " code_selector-id";
    }
    if ((found != "")&&(my_node.className == "selector-pseudo"))// css 浏览器内置工具
    {
      my_node.className += " code_selector-pseudo";
    }
    if ((found != "")&&(my_node.className == "symbol"))// vimscript 按键
    {
      my_node.className += " code_symbol";
    }
    if ((found != "")&&(my_node.className == "section"))// makefile 命令
    {
      my_node.className += " code_section";
    }
    if ((found != "")&&(my_node.className == "variable"))// makefile 变量
    {
      my_node.className += " code_variable";
    }
    if ((found != "")&&(my_node.className == "strong"))// markdown 强调
    {
      my_node.className += " code_strong";
    }
    

    if ((found == "")&&(my_node.tagName == "TABLE"))// 普通表格,防止和code冲突
    {
      my_node.className = "normal_table"
    }
    if ((found != "")&&(my_node.tagName == "PRE"))// pre 强制单词换行
    {
      my_node.className = "code_pre";
    }

    // 删除<p>内部换行,使katex正确渲染
    if (document.temp_latex == 2)
    {
      if ((found == "")&&(my_node.tagName == "BR")&&(my_node.parentElement.tagName == "P"))
      {
        var temp_p = my_node.parentElement;
        temp_p.innerText = temp_p.innerText.replace(/\n/g, "");
        temp_p.innerText = temp_p.innerText.replace(/\$\$\$\$/g, "$$$$\n$$$$");
        temp_p.innerText = temp_p.innerText.replace(/\$\$\$/g, "$\n$$$$");
      }
    }
  }

  var my_child = my_node.childNodes.length;
  for (var i = 0; i < my_child; i ++)
  {
    // 防止未定义
    if (my_node.childNodes[i] != null) {
      dfs_c(my_node.childNodes[i], found);
    }
  }
}


function my_highlight_start() {
  dfs_c(document.body, "");
}

function detail_hilight(my_node, type, language) {// 细化
  if (type == "keyword") {
    for (var i = 0; i < highlight_1.length; i ++)
    {
      if (my_node.innerText == highlight_1[i])
      {
        my_node.className += " code_keyword1";
        return;
      }
    }
    my_node.className += " code_keyword";
    return;
  } else if (type == "attr") {
    for (var i = 0; i < highlight_2.length; i ++)
    {
      if (my_node.innerText == highlight_2[i])
      {
        my_node.className += " code_attr1";
        return;
      }
    }
    my_node.className += " code_attr";
  }
}