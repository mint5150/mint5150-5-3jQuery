$(function () {
  $('.btn').click(function() {
console.log('名字');
console.log($('#family__name').val());

console.log('名前');
console.log($('#given__name').val());

console.log('生年月日');
console.log($('.year').val() + '年' + $('.month').val() + '月' + $('.day').val() + '日');

console.log('性別');
console.log($('[name="gender"]:checked').val());

console.log('職業');
const occupation = $('.occupation option:selected').text();
console.log(occupation);

console.log('アカウント名');
console.log($('#account__name').val());

console.log('メールアドレス');
console.log($('#email').val());

console.log('パスワード');
console.log($('#password').val());

console.log('確認用パスワード');
console.log($('#duplication__password').val());

console.log('住所');
console.log($('#address').val());

console.log('電話番号');
console.log($('#tel').val());

console.log('購読情報');
    $('[name="subscription"]:checked').each(function() {
      console.log($(this).val());
    });
  })
});