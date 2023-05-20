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
    console.log("2");
    let currentSearchInput = $("#search-input").val();
  if(currentSearchInput === lastSearchInput) {
    console.log("3");
      page = 0,
      $(".lists").empty();
      //lastSearchInput = currentSearchInput
  } else {
    console.log("4");
    page++;
  }

  //ajax通信
  $.ajax({url: "https://ci.nii.ac.jp/books/opensearch/search?title=" + currentSearchInput + "&format=json&p=" + page + "&count=20", method: "GET"})
    .done(function (data) {
      console.log("5");
      showResult(data["@graph"])
    })
    .fail(function (jqXhr) {
      console.log("6");
      showError(jqXhr)
    })
  });

  //通信成功処理
  function showResult(result) {
    console.log("7");
   /* $(".message").remove();　*/
    console.log("8");
    
    if(result[0].items.length > 0) {
      console.log("9");
      $.each(result[0].items, function (index, item) {
        let html = '<li class="lists-item"><div class="list-inner"><p>';
        console.log("10");
        if (item.title) {
          console.log("11");
          html += item.title;
        } else {
          console.log("12");
          html += "";
        }
        console.log("13");
        html += "</p><p>";

        let creator = item['dc:creator'] ? item["dc:creator"] : "";
        let publisher = item["dc:publisher"] ? item["dc:publisher"][0] : "";
        let url = '</p><a href="' + (item.link["@id"] + '" target="_blank">'+item.link["@id"]+'</a></div></li>');
        const htmlResult = html + "著者:" + creator + "</p><p>" + "出版社:" + publisher + url;"</p>";

        $(".lists").prepend(htmlResult)
        console.log("14");
      })

    } else {
      console.log("15");
      $(".lists").before('<div class="message"></div>');
    }

    console.log("16");
  };

  //通信失敗処理
  function showError(jqXhr) {
    console.log("17");
  $(".lists").empty();
  $(".message").remove();
  if (0 === jqXhr.status) {
    console.log("18");
      $(".lists").before('<div class="message">正常に通信できませんでした。<br>インターネットの接続の確認をしてください。</div>');
    } else {
      console.log("19");
      if (400 === jqXhr.status) {
        console.log("20");
        $(".lists").before('<div class="message">検索キーワードが有効ではありません。<br>1文字以上で検索して下さい。</div>');
      } else {
        console.log("21");
        $(".lists").before('<div class="message">予期せぬエラーが起きました。<br>再読み込みを行ってください。</div>');
      }
    }
  }
  console.log("22");
  //リセット処理
  $(".reset-btn").on("click", function () {
    console.log("23");
    page = 1;
    lastSearchInput = "";
    $(".lists").empty();
    $(".message").remove();
    $("#search-input").val("")
  })
});

console.log("24");