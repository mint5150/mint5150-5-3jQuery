$(function () {
  // .nav-itemをクリックすると
  $(".nav-item").on("click", function () {
    // 現在選択されているタブにis-hiddenクラスを付与(表示をリセット)
    $(".description li").addClass("is-hidden");
    // クリックされたタブからis-hiddenクラスを削除（表示）
    $(this).removeClass("is-hidden");
    // クリックされた要素が何番目か取得（クリックしたタブのインデックス番号を取得）
    const index = $(this).index();
    // クリックしたタブのインデックス番号と同じコンテンツを表示
    $(".is-hidden").hide().eq(index).fadeIn(0);
  });
});