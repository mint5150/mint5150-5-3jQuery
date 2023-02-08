$('.drawer_button').on('click', function () { //ハンバーガーメニューボタンをクリックしたら
$('.drawer_bg').toggle(); // .drawer_bgの表示、非表示を切り替え
$('.drawer_button').toggleClass('active'); // .drawer_buttonにactiveクラスを付け外し
$('.drawer_nav_wrapper').toggleClass('open'); // .drawer_nav_wrapperにopenクラスを付け外し
});