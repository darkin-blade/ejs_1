// 全局变量
document.h_index = 0;// change.js中也有用到
// 结构体
var h_struct = {
  rank: 0,// 1 for h1, 2 for h2 ...
  name: "" // innerText
};
var my_guide = new Array();

// 创建对象
function create_guide() {

  var right_block = document.getElementsByClassName("right_block")[0];

  var guide_title = document.createElement("a");// 跳转至标题
  guide_title.innerText = document.getElementById("post_name").innerText;
  guide_title.innerHTML = "<div id='guide_title'>" + guide_title.innerHTML + "</div>";

  dfs_h(document.body);// 搜索所有的1,2,3级标题
    
  var right_guide = document.createElement("div");
  right_guide.setAttribute("class", "right_guide");
  for (var i = 0; i < document.h_index; i ++)
  {// 设置序号和级数
    var temp_a = document.createElement("div");
    temp_a.id = "guide_" + i;
    temp_a.className = "guide_" + my_guide[i].rank;
    temp_a.innerHTML = "<a>" + my_guide[i].name.replace(/</g, "<&shy;") + "</a>";
    right_guide.appendChild(temp_a);
  }
  
  right_block.appendChild(guide_title);
  document.querySelector("#guide_title").onclick = function () {
    document.querySelector("#post_name").scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  };
  right_block.appendChild(right_guide);
  for (var i = 0; i < document.h_index; i ++)
  {
    document.querySelector("#guide_" + i).setAttribute("onclick", "add_scroll(" + i + ")");
  }
}

function add_scroll (i)// 注意i的值
{
  document.querySelector("#section_" + i).scrollIntoView({
    block: "start",
    behavior: "smooth"
  });
}

// 深度优先搜索
function dfs_h(my_node) {
  var temp = 0;
  if (my_node.tagName == 'H1')
  {
    temp = 1;
  }
  else if (my_node.tagName == 'H2')
  {
    temp = 2;
  }
  else if (my_node.tagName == 'H3')
  {
    temp = 3;
  }
  else if (my_node.tagName == 'H4')
  {
    temp = 4;
  }
  else if (my_node.tagName == 'H5')
  {
    temp = 5;
  }
  if (temp != 0)
  {
    my_node.innerHTML = "<div id='section_" + document.h_index + "' class='section_" + temp + "'>" + my_node.innerHTML + "</div>";// 给文章中的section增加id
    document.h_index ++;
    var t_struct = Object.create(h_struct);
    t_struct.rank = temp;
    t_struct.name = my_node.innerText;
    my_guide.push(t_struct);// 注意数组传参的方式
  }

  var my_child = my_node.childNodes.length;
  for (var i = 0; i < my_child; i ++)
  {
    dfs_h(my_node.childNodes[i]);
  }
}

create_guide();