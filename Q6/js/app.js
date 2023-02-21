$(function () {
  //セレクトボックスが変化したら関数を実行する
  $(".select-box").on("change", function () {
  //変数bに$(this).val()＝セレクトボックスの中身を格納する
  //変数cに.food-list liを格納する
  const selectVal = $(this).val();
  const allFood = $(".food-list li");
  //？や：は条件演算子
  //each()メソッドは繰り返し処理
  //allが変数selectValと等しければ変数allFoodを表示、等しくなければ変数allFoodの中身を一括して処理する
  //eは使ってないが空欄に出来ないのでとりあえず指定している
    if("all" === selectVal){
      allFood.show();
    } else {
      $.each(allFood, function (e, foodList) {
        //変数dに変数foodListのデータ属性"category-type"を格納する
        let eachFoodList = $(foodList).data("category-type");
        //変数bが変数dと等しければ変数aを表示、等しくなければ非表示
        if(selectVal === eachFoodList){
          $(foodList).show();
        } else  {
          $(foodList).hide();
        }
      })
    }
  })
});
