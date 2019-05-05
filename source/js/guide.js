function dfs(my_node){
  if (my_node.tagName == 'H1')
  {
    console.log(my_node.innerHTML);
  }
  else if (my_node.tagName == 'H2')
  {
    console.log(my_node.innerHTML);    
  }
  else if (my_node.tagName == 'H3')
  {
    console.log(my_node.innerHTML);    
  }
  var my_child = my_node.childNodes.length;
  for (var i = 0; i < my_child; i ++)
  {
    dfs(my_node.childNodes[i]);
  }
}

dfs(document.body);