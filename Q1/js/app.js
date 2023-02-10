//画面が読み込まれたら
$(window).on('load', function () {
//idにq1がついている要素（ボタン）のCSSの文字色をグリーンに変更
$("#q1").css("color","green");
});

////idにq2がついている要素（ボタン）がクリックされたら
$("#q2").on('click', function () {
//idにq2がついている要素（ボタン）のCSSの背景色をグレーに変更
$(this).css("background-color","gray");
});

////idにq3がついている要素（ボタン）がクリックされたら
$("#q3").on('click', function () {
//idにq3がついている要素（ボタン）を3000ミリ秒でフェードアウト
$("#q3").fadeOut(3000);
});

////idにq4がついている要素（ボタン）がクリックされたら
$("#q4").on('click', function () {
//idにq4がついている要素（ボタン）のpadding,width,font-sizeを変更
$("#q4").css({'padding': '50px', 'width': '300px', 'font-size': '20px'});
});

////idにq5がついている要素（ボタン）がクリックされたら
$("#q5").on('click', function () {
//idにq5がついている要素（ボタン）の前,中の前,中の後,後に追加
$("#q5").before("before").prepend("prepend").append("append").after("after");
});

////idにq6がついている要素（ボタン）がクリックされたら
$("#q6").on('click', function () {
//idにq6がついている要素（ボタン）のmargin-top,margin-leftを2000ミリ秒かけて変更
$("#q6").animate({
  'marginLeft': '100px',
  'marginTop': '100px'
  },2000)
});

////idにq7がついている要素（ボタン）がクリックされたら
$("#q7").on('click', function () {
  //idにq7がついている要素（ボタン）のid属性を取得して変数q7_idに格納
  let q7id = $(this).attr('id', 'text');
  //q7_idをコンソールに表示
  console.log(q7id[0]);
});


////idにq8がついている要素（ボタン）がホバーされたら
$("#q8").hover(function () {
  //idにq3がついている要素（ボタン）のpadding,width,font-sizeを変更
  $("#q8").css({'padding': '50px', 'width': '300px', 'font-size': '20px'});

}, function() {
  //色指定を空欄にすれば元の色に戻る
  $("#q8").css({'padding': '', 'width': '', 'font-size': ''});
});


////idにq9がついている要素（ボタン）のliがクリックされたら
$("#q9 li").on('click', function () {
//idにq9がついている要素（ボタン）のliの配列のindex番号を取得して定数indexに格納する
const index = $('#q9 li').index($(this));
//変数indexをアラート表示
alert(index);
});

////idにq10がついている要素（ボタン）のliがクリックされたら
$("#q10 li").on('click', function () {
//変数indexにクリックしたインデックス番号を格納
let index = $(this).index();
//#q11 liのクリックしたindex番号に対応する要素にlarge-textクラスを付与
$("#q11 li").eq(index).addClass("large-text");
});