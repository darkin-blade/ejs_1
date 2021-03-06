/**
 * 本地搜索器-search
 */

var searchFunc = function (path, search_id, content_id) 
{
  var each_length = 200;// 每篇文章显示的长度,可能靠后的关键词显示不了
  var head_length = 10;// 每篇文章第一个关键字之前的长度
  $.ajax({
    url: path,
    dataType: "xml",
    success: function (xmlResponse) {// 获取search.xml(默认),在内部进行查找
      var datas = $("entry", xmlResponse).map(function () {
        return {// 只获取纯文本
          title: $("title", this).text(),
          content: $("content", this).text(),
          url: $("url", this).text()
        };
      }).get();

      var $input = document.getElementById(search_id);
      var $resultContent = document.getElementById(content_id);

      $input.addEventListener('input', function () {
        var str = '';
        var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);// 搜索的关键字(去除头尾空格),用`+`分割
        $resultContent.innerHTML = "";// 清空之前结果
        if (this.value.trim().length <= 0) {// 如果没有输入关键字
          return;
        }
        datas.forEach(function (data, index_data) {// 对每一篇文章进行匹配
          var isMatch = true;
          if (!data.title || data.title.trim() === '') {// 文章没有标题
            data.title = "Untitled";
          }
          var data_title = data.title.trim().toLowerCase();
          var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();// 文章内容
          if (index_data == 0) {
            // console.log("文章内容: " + data_content);
          }
          var data_url = data.url;
          var index_title = -1;
          var index_content = -1;
          var first_occur = -1;
          if (data_content !== '') {// 文章内容非空
            keywords.forEach(function (keyword, i) {// 对每个关键字查找第一次出现的位置, (当前元素, 索引, 正在操作的数组)
              index_title = data_title.indexOf(keyword);// 搜索关键字第一次出现的位置
              index_content = data_content.indexOf(keyword);

              if (index_title < 0 && index_content < 0) {// 关键字没有出现过
                console.log(data_title + ":[" + index_title + ", " + index_content + "]")
                isMatch = false;
              } else {
                if (index_content < 0) {
                  index_content = 0;
                }
                if (i == 0) {// 如果是第一次出现
                  first_occur = index_content;// 记录第一次出现的位置
                }
              }
            });
          } else {// 文章为空
            isMatch = false;
          }
          if (isMatch) {
            // 显示文章标题
            str += "<a class='search-result-title' href='" + unescape(decodeURI(data_url)) + "'>" + data_title + "</a>";
            var content = data.content.trim().replace(/<[^>]+>/g, "");
            if (first_occur >= 0) {
              var start = first_occur - head_length;
              var end = each_length;

              if (start < 0) {// 如果关键字在文章很前面
                start = 0;
              }

              if (end + each_length > content.length) {// 不能超过文章长度
                end = content.length - each_length;
              }

              var match_content = content.substr(start, end);

              keywords.forEach(function (keyword) {// 高亮关键字
                var regS = new RegExp(keyword, "gi");
                match_content = match_content.replace(regS, "<strong class='search-highlight'>" + keyword + "</strong>");
              });

              str += "<a class=\"search-result\" href='" + unescape(decodeURI(data_url)) + "'><p>" + match_content + "...</p></a>"
            }
            str += "";
          }
        });
        str += "";
        // console.log("搜所结果总长度" + str.length);
        if (str.length == 0) {// 判断有没有搜索结果
          return $resultContent.innerHTML = "<span class='search-result-title'>Not found<span>";
        }
        $resultContent.innerHTML = str;
      });
    }
  });
}