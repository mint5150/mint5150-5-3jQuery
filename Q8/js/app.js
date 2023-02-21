
//関数を実行する
$(function () {
  //関数名a(引数e)
  //関数showResult(引数result)を実行する
  function showResult(result) {
    //.messageクラスのある要素を削除する
    $(".message").remove();
    //変数firstItemを定義する
    let firstItem;
    //変数messageLengthに0を代入する
    let messageLength = 0;
    //もしnull == (firstItem = result[0].items)がfalseなら
    if(null == (firstItem = result[0].items)) {
      //messageLengthにvoid 0を代入する＝Undefinedになる;
      messageLength = void 0;
    //もしnull == (firstItem = result[0].items)がfalseなら
    } else {
      //messageLengthにfirstItem.lengthを代入する
      messageLength = firstItem.length;
    }
    //もし0 < messageLengthなら
    if(0 < messageLength) {
      //$.each(result[0].items, function (index, item) {
      $.each(result[0].items, function (index, item) {
        //変数htmlに<li class="<li class="lists-item"><div class="list-inner"><p>\u30bf\u30a4\u30c8\u30eb\uff1aを代入する
        let html = '<li class="lists-item"><div class="list-inner"><p>\u30bf\u30a4\u30c8\u30eb\uff1a';
        //もしitem.titleなら
        if (item.title) {
          //html += item.title
          html += item.title;
        //もし0 < messageLengthでないなら
        } else {
          //html += "\u30bf\u30a4\u30c8\u30eb\u4e0d\u660e";
          html += "\u30bf\u30a4\u30c8\u30eb\u4e0d\u660e";
        }
        html += "</p><p>\u4f5c\u8005\uff1a";
        //もしitem['dc:creator']なら
        if (item['dc:creator']) {
          //html += item["dc:creator"];
          html += item["dc:creator"];
        //もしitem['dc:creator']でないなら
        } else {
          //html += "\u4f5c\u8005\u4e0d\u660e";
          html += "\u4f5c\u8005\u4e0d\u660e";
        }
        html += "</p><p>\u51fa\u7248\u793e\uff1a";
        //もしitem["dc:publisher"]なら
        if (item["dc:publisher"]) {
          //html += item["dc:publisher"][0];
          html += item["dc:publisher"][0];
        //もしitem["dc:publisher"]でないなら
        } else {
          //html += "\u51fa\u7248\u793e\u4e0d\u660e";
          html += "\u51fa\u7248\u793e\u4e0d\u660e";
        }
        html += '</p><a href="';
        + (item.link["@id"] +'" target="_blank">\u66f8\u7c4d\u60c5\u5831</a></div></li>');
        //.listsの最初の子要素の前に挿入する
        $(".lists").prepend(html)
      })
    //もし0 < messageLengthでないなら
    } else {
      //.listsの直前の要素に挿入する
      $(".lists").before('<div class="message">\u691c\u7d22\u7d50\u679c\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u3002<br>\u5225\u306e\u30ad\u30fc\u30ef\u30fc\u30c9\u3067\u691c\u7d22\u3057\u3066\u4e0b\u3055\u3044\u3002</div>');
    }
  };

    //変数pageに1を代入する、変数lastSearchInputに空の値を代入する
    let page = 1, lastSearchInput = "";
  //.search-btnがクリックされたらfunction () {var currentSearchInput = $("#search-input").val()を実行する
  $(".search-btn").on("click", function () {var currentSearchInput = $("#search-input").val();
  //もし変数currentSearchInputが変数lastSearchInputと同一でないなら
  if(currentSearchInput !== lastSearchInput) {
    //変数pageに1を代入する
    //$(".lists").empty()を実行する
    //変数lastSearchInputにcurrentSearchInputを代入する
    (page = 1, $(".lists").empty(), lastSearchInput = currentSearchInput);
  //もし変数currentSearchInputが変数lastSearchInputと同一なら
  } else {
    //変数pageに1を加える
    page++;
  }
  //Ajaxリクエストを送信するオプションをキーと値のペアで指定する
  //成功なら(function (data) { showResult(data["@graph"])
  //失敗ならfunction (jqXHR) {$(".lists").empty();
    $.ajax({url: "https://ci.nii.ac.jp/books/opensearch/search?title=" + currentSearchInput + "&format=json&p=" + page + "&count=20", method: "GET"}).done(function (data) { showResult(data["@graph"]) }).fail(function (jqXHR) {$(".lists").empty();
      //.messageクラスのある要素を削除する
      $(".message").remove();
      //もし0 完全一致 data.statusがtrueなら
      if (0 === data.status) {
        //$(".lists").before('<div～
        $(".lists").before('<div class="message">\u6b63\u5e38\u306b\u901a\u4fe1\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002<br>\u30a4\u30f3\u30bf\u30fc\u30cd\u30c3\u30c8\u306e\u63a5\u7d9a\u306e\u78ba\u8a8d\u3092\u3057\u3066\u304f\u3060\u3055\u3044\u3002</div>');
      //もし0 完全一致 data.statusがfalseなら
      } else {
        //もし400 完全一致 jqXHR.statusがtrueなら
        if (400 === jqXHR.status) {
          //$(".lists").before('<div～
          $(".lists").before('<div class="message">\u691c\u7d22\u30ad\u30fc\u30ef\u30fc\u30c9\u304c\u6709\u52b9\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002<br>1\u6587\u5b57\u4ee5\u4e0a\u3067\u691c\u7d22\u3057\u3066\u4e0b\u3055\u3044\u3002</div>');
        //もし400 完全一致 jqXHR.statusがfalseなら
        } else {
          //$(".lists").before('<div～
          $(".lists").before('<div class="message">\u4e88\u671f\u305b\u306c\u30a8\u30e9\u30fc\u304c\u8d77\u304d\u307e\u3057\u305f\u3002<br>\u518d\u8aad\u307f\u8fbc\u307f\u3092\u884c\u3063\u3066\u304f\u3060\u3055\u3044\u3002</div>');
        }
      }
    })
  });
  //.reset-btnが押されたらfunction () { を実行する
  $(".reset-btn").on("click", function () {
    //変数pageに1を代入する
    page = 1;
    //変数lastSearchInputに空の値を代入する
    lastSearchInput = "";
    //.listsの子要素を全て削除する
    $(".lists").empty();
    //.messageの要素を全て削除する
    $(".message").remove();
    //#search-inputの値を空にする
    $("#search-input").val("") })
});

//そもそもどうしてこういったコードになるのかは経験を積んだ操作設計のエンジニアの仕事
//現場での操作設計は別のエンジニアがやるのでとりあえずは困らない
//今は答えの解読ができればOK