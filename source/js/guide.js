// 全局变量
var h_index = 0;
// 结构体
var h_strut = {
  rank: 0,// 1 for h1, 2 for h2 ...
  name: "" // innerText
};
var my_guide = new Array();

// 创建对象
function create_guide() {

  var left_block = document.getElementsByClassName("left_block")[0];
  dfs(document.body);
  for (var i = 0; i < h_index; i ++)
  {
    console.log(my_guide[i].rank, my_guide[i].name);
  }
  
  var left_guide = document.createElement("div");
  left_guide.setAttribute("class", "left_guide");

  left_block.appendChild(left_guide);
}

// 深度优先搜索
function dfs(my_node) {
  var temp = 0;
  if (my_node.tagName == 'H1')
  {
    temp = 1;
    h_index ++;
  }
  else if (my_node.tagName == 'H2')
  {
    temp = 2;
    h_index ++;
  }
  else if (my_node.tagName == 'H3')
  {
    temp = 3;
    h_index ++;
  }
  if (temp != 0)
  {
    var t_struct = Object.create(h_strut);
    t_struct.rank = temp;
    t_struct.name = my_node.innerText;
    my_guide.push(t_struct);// 注意数组传参的方式
  }

  var my_child = my_node.childNodes.length;
  for (var i = 0; i < my_child; i ++)
  {
    dfs(my_node.childNodes[i]);
  }
}

create_guide();