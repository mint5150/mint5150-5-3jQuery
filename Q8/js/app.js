$(function () {
  let page = 1;
  let lastSearchInput = "";

  //search-btnのクリックイベント
  $(".search-btn").on("click", function () {
    let currentSearchInput = $("#search-input").val();
  if(currentSearchInput !== lastSearchInput) {
    (
      page = 1,
      $(".lists").empty(),
      lastSearchInput = currentSearchInput
    );
  } else {
    page++;
  }

  //ajax通信
  $.ajax({url: "https://ci.nii.ac.jp/books/opensearch/search?title=" + currentSearchInput + "&format=json&p=" + page + "&count=20", method: "GET"})
    .done(function (data) {
      showResult(data["@graph"])
    })
    .fail(function (jqXHR) {
      showError(jqXHR)
    })
  });

  //通信成功処理
  function showResult(result) {
    $(".message").remove();
    if(null === (result[0].items)) {
      void 0;
    } else {
      result[0].items.length;
    }
    if(0 < result[0].items.length) {
      $.each(result[0].items, function (index, item) {
        let html = '<li class="lists-item"><div class="list-inner"><p>\u30bf\u30a4\u30c8\u30eb\uff1a';
        if (item.title) {
          html += item.title;
        } else {
          html += "\u30bf\u30a4\u30c8\u30eb\u4e0d\u660e";
        }
        html += "</p><p>\u4f5c\u8005\uff1a";
        if (item['dc:creator']) {
          html += item["dc:creator"];
        } else {
          html += "\u4f5c\u8005\u4e0d\u660e";
        }
        html += "</p><p>\u51fa\u7248\u793e\uff1a";
        if (item["dc:publisher"]) {
          html += item["dc:publisher"][0];
        } else {
          html += "\u51fa\u7248\u793e\u4e0d\u660e";
        }
        html += '</p><a href="';
        + (item.link["@id"] +'" target="_blank">\u66f8\u7c4d\u60c5\u5831</a></div></li>');
        $(".lists").prepend(html)
      })
    } else {
      $(".lists").before('<div class="message">\u691c\u7d22\u7d50\u679c\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u3002<br>\u5225\u306e\u30ad\u30fc\u30ef\u30fc\u30c9\u3067\u691c\u7d22\u3057\u3066\u4e0b\u3055\u3044\u3002</div>');
    }
  };

  //通信失敗処理
  function showError(jqXHR) {
  $(".lists").empty();
  $(".message").remove();
  if (0 === jqXHR.status) {
      $(".lists").before('<div class="message">正常に通信できませんでした。<br>インターネットの接続の確認をしてください。</div>');
    } else {
      if (400 === jqXHR.status) {
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