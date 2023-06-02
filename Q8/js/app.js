$(function () {
  let page = 0;
  let lastSearchInput = "";

  //search-btnのクリックイベント
  $(".search-btn").on("click", function () {
    let currentSearchInput = $("#search-input").val();

  if(currentSearchInput === lastSearchInput) {
      page = 0
      $(".lists").empty();
  } else {
    page++;
  }

  //ajax通信
  $.ajax({url: "https://ci.nii.ac.jp/books/opensearch/search?title=" + currentSearchInput + "&format=json&p=" + page + "&count=20", method: "GET"})
    .done(function (data) {
      showResult(data["@graph"])
    })
    .fail(function (jqXhr) {
      showError(jqXhr)
    })
  });

  //通信成功処理
  function showResult(result) {
    $(".lists").empty();
    $(".message").remove();
    if(result[0]["opensearch:totalResults"] > 0) {
      $.each(result[0].items, function (index, item) {
        const title = item.title ? item.title : "不明";
        const creator = item['dc:creator'] ? item["dc:creator"] : "不明";
        const publisher = item["dc:publisher"] ? item["dc:publisher"][0] : "不明";
        let url = '</p><a href="' + (item.link["@id"] + '" target="_blank">書籍情報</a></div></li>');
        const htmlResult = '<li class="lists-item"><div class="list-inner"><p>タイトル：' + title + "</p><p>" + "著者：" + creator + "</p><p>" + "出版社：" + publisher + url;"</p>";

        $(".lists").prepend(htmlResult)
      })
    } else {
      page = 0
      $(".message").remove();
      $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索して下さい。</div>');
    }
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
    page = 0;
    lastSearchInput = "";
    $(".lists").empty();
    $(".message").remove();
    $("#search-input").val("");
  })
});