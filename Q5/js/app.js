$(function(){
  $('.dropdwn li').hover(function(){
      $("ul:not(:animated)", this).stop().slideDown();
  }, function(){
      $("ul.dropdwn_menu",this).stop().slideUp();
  });
});