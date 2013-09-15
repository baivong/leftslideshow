$(function(){
  $(".tabs a").click(function(){
    $(".active").removeClass();
    $(this).parent().addClass("active");
    $("#box > div").hide();
    $("#" + this.id + "-box").show();
  });
});
