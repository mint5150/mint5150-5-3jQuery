$(function () { 
  //セレクトボックスが変化したら関数を実行する
  $(".select-box").on("change", function () { 
  //変数bに$(this).val()＝セレクトボックスの中身を格納する
  //変数cに.food-list liを格納する
  let selectVal = $(this).val();
  let allfood = $(".food-list li");
  //？や：は条件演算子
  //each()メソッドは繰り返し処理
  //allが変数bと等しければ変数cを表示、等しくなければ変数cの中身を一括して処理する
  //eは使ってないが空欄に出来ないのでとりあえず指定している
  if("all" === selectVal){
      allfood.show();
    } else {
      $.each(allfood, function (e, foodli) {
        //変数dに変数aのデータ属性"category-type"を格納する
        let eachfood = $(foodli).data("category-type"); 
        //変数bが変数dと等しければ変数aを表示、等しくなければ非表示
        if(selectVal === eachfood){
          $(foodli).show();
        } else  {
          $(foodli).hide();
        }
      })
    }
  })
});
