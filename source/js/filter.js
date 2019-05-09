function my_filter()
{
  document.querySelectorAll(".main_block div table").forEach(function(my_node) // 普通表格,防止和code冲突
  {
    if (my_node.parentElement.tagName.match("FIGURE") == null)
    {
      my_node.className = "normal_table"
    }
  });
  document.querySelectorAll(".code pre").forEach(function(my_node) // pre 强制单词换行
  {
    my_node.className = "code_pre";
  });
}