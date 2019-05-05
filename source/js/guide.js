// 全局变量
var h_index = 0;// change.js中也有用到
// 结构体
var h_struct = {
  rank: 0,// 1 for h1, 2 for h2 ...
  name: "" // innerText
};
var my_guide = new Array();

// 创建对象
function create_guide() {

  var left_block = document.getElementsByClassName("left_block")[0];

  var guide_title = document.createElement("a");// 跳转至标题
  guide_title.id = "guide_title";
  guide_title.innerText = document.getElementById("post_name").innerText;

  dfs(document.body);// 搜索所有的1,2,3级标题
    
  var left_guide = document.createElement("div");
  left_guide.setAttribute("class", "left_guide");
  for (var i = 0; i < h_index; i ++)
  {
    var temp_a = document.createElement("a");
    temp_a.id = "guide_" + i;
    temp_a.setAttribute("class", "guide_" + my_guide[i].rank);
    temp_a.innerText = my_guide[i].name;
    temp_a.innerHTML += "<br>";
    left_guide.appendChild(temp_a);
  }
  
  left_block.appendChild(guide_title);
  document.querySelector("#guide_title").onclick = function () {
    document.querySelector("#post_name").scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  };
  left_block.appendChild(left_guide);
  for (var i = 0; i < h_index; i ++)
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
function dfs(my_node) {
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
  if (temp != 0)
  {
    my_node.innerHTML = "<div id='section_" + h_index + "'>" + my_node.innerHTML + "</div>";// 给文章中的section增加id
    h_index ++;
    var t_struct = Object.create(h_struct);
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