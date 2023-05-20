/*const origin = req.headers.origin;
if (
  origin === process.env.FRONTEND_ORIGIN
  || /^https:\/\/.+\.ci.nii.ac\.jp$/.test(origin)
) {
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS');
}*/

$(function () {
  let page = 0;
  let lastSearchInput = "";
  console.log("1");

  //search-btnのクリックイベント
  $(".search-btn").on("click", function () {
    let currentSearchInput = $("#search-input").val();
    console.log("2");

  if(currentSearchInput === lastSearchInput) {
      page = 0,
      $(".lists").empty();
      console.log("3");
  } else {
    page++;
    console.log("4");
  }

  //ajax通信
  $.ajax({url: "https://ci.nii.ac.jp/books/opensearch/search?title=" + currentSearchInput + "&format=json&p=" + page + "&count=20", method: "GET"})
    .done(function (data) {
      showResult(data["@graph"])
      console.log("5");
    })
    .fail(function (jqXhr) {
      showError(jqXhr)
      console.log("6");
    })
  });

  //通信成功処理
  function showResult(result) {
    console.log(result);
    if(result[0].items.length > 0) {
      console.log(result[0].items);
      $.each(result[0].items, function (index, item) {
        let html = '<li class="lists-item"><div class="list-inner"><p>タイトル：';
        if (item.title) {
          html += item.title;
          console.log("9");
        } else {
          html += "";
          console.log("10");
        }
        html += "</p><p>";
        console.log("11");

        let creator = item['dc:creator'] ? item["dc:creator"] : "不明";
        let publisher = item["dc:publisher"] ? item["dc:publisher"][0] : "不明";
        let url = '</p><a href="' + (item.link["@id"] + '" target="_blank">書籍情報</a></div></li>');
        const htmlResult = html + "著者：" + creator + "</p><p>" + "出版社：" + publisher + url;"</p>";

        $(".lists").prepend(htmlResult)
        console.log("12");
      })
    } else {
      alert("検索ヒットがありませんでした。");
      $(".lists").before('<div class="message">検索ヒットがありませんでした。</div>');
      console.log("13");
    }

    if(result[0].items = null){
      alert("検索ヒットがありませんでした。");
      console.log("14");
    }
    console.log("15");
  };

  //通信失敗処理
  function showError(jqXhr) {
  $(".lists").empty();
  $(".message").remove();
  if (0 === jqXhr.status) {
      $(".lists").before('<div class="message">正常に通信できませんでした。<br>インターネットの接続の確認をしてください。</div>');
    } else {
      if (400 === jqXhr.status) {
        $(".lists").before('<div class="message">検索キーワードが有効ではありません。<br>1文字以上で検索して下さい。</div>');
      } else {
        $(".lists").before('<div class="message">予期せぬエラーが起きました。<br>再読み込みを行ってください。</div>');
      }
    }
  }
  //リセット処理
  $(".reset-btn").on("click", function () {
    page = 1;
    lastSearchInput = "";
    $(".lists").empty();
    $(".message").remove();
    $("#search-input").val("")
  })
});