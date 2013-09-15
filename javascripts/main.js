$(function(){
  	$(".tabs a").click(function(){
    	$(".active").removeClass();
    	$(this).parent().addClass("active");
    	$("#comment > div").hide();
    	$("#" + this.id + "-box").show();
  	});
});
