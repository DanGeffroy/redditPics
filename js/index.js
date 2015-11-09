$(document).ready(function(){

  searchAndPrint("hot","2","pics");

  $("#button").click(function() {
    $(".images").empty();
    console.log("ici");
    resolutions = $("#resolutions").val();
    filter = $("#filter").val();
    subreddit = $("#subreddit").val();
    console.log(resolutions + filter + subreddit);
    searchAndPrint(filter,resolutions, subreddit);
    scrollToAnchor('anchor');
  });
});
function scrollToAnchor(aid){
  var aTag = $("a[name='"+ aid +"']");
  $('html,body').animate({scrollTop: aTag.offset().top},'slow');
};
function searchAndPrint(filter,resolutions, subreddit){
  if(subreddit !=""){
    redditUrl = "https://www.reddit.com/r/"+subreddit+"/"+filter+"/.json?limit=100";
  }
  else{
    redditUrl = "https://www.reddit.com/r/pics/"+filter+"/.json?limit=30";
  }
  $.ajax({
    url: redditUrl,
    dataType: "json",
    error: function(){
      console.log("fail");
      $("#subreddit").val("This subReddit doesn't exist :S");
    },
    jsonp: 'jsonp',
    success: function(data) {
      printPics(data,resolutions);
    }
  });
};
function printPics(data,resolutions){
  option = resolutions;
  cssAdaptator();
  for(i = 0;i<100;i++){
    preview = data.data.children[i].data.preview;
    image = data.data.children[i].data.preview.images[0].resolutions[option];
    title = data.data.children[i].data.title;
    if((preview != "undefined")&&(typeof image != "undefined")){
      $(".images").append("<div class='tourImg'><div class='image imgSizeLon"+option+" imgSizeLar"+option+"' id='img" + i+"'><a href='"+image.url+"'><img class='imgSizeLon"+option+ "' src='"+image.url+"' alt='"+title+"'/></a></div><span>"+title+"</span></div>");
    }
  }
};

function cssAdaptator(){
  $(".images").css("visibility", "visible");
}
