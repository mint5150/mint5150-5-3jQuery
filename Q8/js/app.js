const origin = req.headers.origin;
if (
  origin === process.env.FRONTEND_ORIGIN
  || /^https:\/\/.+\.front-end\.com$/.test(origin)
) {
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS');
}

$(function () {
  let page = 1;
  let lastSearchInput = "";

  //search-btnのクリックイベント
  $(".search-btn").on("click", function () {
    let currentSearchInput = $("#search-input").val();
  if(currentSearchInput === lastSearchInput) {
      page = 1,
      $(".lists").empty();
      //lastSearchInput = currentSearchInput
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
    $(".message").remove();
    if(result[0].items.length > 0) {
      $.each(result[0].items, function (index, item) {
        let html = '<li class="lists-item"><div class="list-inner"><p>';
        if (item.title) {
          html += item.title;
        } else {
          html += "";
        }

        html += "</p><p>";

        let creator = item['dc:creator'] ? item["dc:creator"] : "";
        let publisher = item["dc:publisher"] ? item["dc:publisher"][0] : "";
        let url = '</p><a href="' + (item.link["@id"] + '" target="_blank">'+item.link["@id"]+'</a></div></li>');
        let htmlResult = html + creator + "</p><p>" + publisher + url;

        /*
        if (item['dc:creator']) {
          html += item["dc:creator"];
        } else {
          html += "";
        }

        html += "</p><p>";
        if (item["dc:publisher"]) {
          html += item["dc:publisher"][0];
        } else {
          html += "";
        }

        html += '</p><a href="';
        + (item.link["@id"] +'" target="_blank"></a></div></li>');
        */
        $(".lists").prepend(htmlResult)
      })

    } else {
      $(".lists").before('<div class="message"></div>');
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
    console.log("jqXHR:" + jqXhr.status);
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