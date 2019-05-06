/**
 * 手写html代码块高亮
 */

function dfs_c(my_node) {
  if (my_node.className != null)
  {
    if (my_node.className.match("highlight") != null)
    {
      var temp_type = my_node.className.replace(/highlight /, "");
      console.log(temp_type);
      my_highlight(my_node, temp_type);
    }
  }

  var my_child = my_node.childNodes.length;
  for (var i = 0; i < my_child; i ++)
  {
    dfs_c(my_node.childNodes[i]);
  }
}

function my_highlight(my_node, type) {
  my_node.className = my_node.className + " my_code";
}

function my_highlight_start() {
  dfs_c(document.body);
}