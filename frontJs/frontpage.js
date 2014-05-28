$(document).ready(function() {
  $("#nav li:has(ul)").hover(function(){
    $(this).find("ul").slideDown();
  }, function(){
    $(this).find("ul").hide();
  });
});