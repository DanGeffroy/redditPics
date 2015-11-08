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
    console.log(data);

    printPics(data,resolutions);
  }
  });
}
function printPics(data,resolutions){
  option = resolutions;
  cssAdaptator(resolutions);
  for(i = 0;i<100;i++){
  /*  console.log("<div class='image' id='img1'><img src='"+data.data.children[i].data.preview.images[0].resolutions[1]+"' alt='"+data.data.children[i].data.title+"'/><span>"+data.data.children[i].data.title+"</span></div>");*/
  if((typeof data.data.children[i].data.preview != "undefined")&&(typeof data.data.children[i].data.preview.images[0].resolutions[option] != "undefined")){
    $(".images").append("<div class='image' id='img" + i+"'><div class='imgcropper'><a href='"+data.data.children[i].data.preview.images[0].resolutions[option].url+"'><img src='"+data.data.children[i].data.preview.images[0].resolutions[option].url+"' alt='"+data.data.children[i].data.title+"'/></a></div><span>"+data.data.children[i].data.title+"</span></div>");
  }
  }
};

function cssAdaptator(resolutions){
  $(".images").css("visibility", "visible");
  value ="5";
  if(resolutions==="0"){
    value = 9;
  }

  else if(resolutions==="1"){
    value = 6;
  }
  else if(resolutions==="2"){
    value = 5;
  }
  else if(resolutions==="3"){
    value = 4;
  }
  else if(resolutions==="4"){
    value = 3;
  }
  else if(resolutions==="5"){
    value = 2;
  }
  else if(resolutions==="6"){
    value = 1;
  }
    $(".images").css("-moz-column-count:", value);
    $(".images").css("-moz-column-gap", value +"%");
    $(".images").css("-moz-column-width", value +"0%");
    $(".images").css("-webkit-column-count", value);
    $(".images").css("-webkit-column-gap", value +"%");
    $(".images").css("-webkit-column-width", value +"0%");
    $(".images").css("column-count", value);
    $(".images").css("column-gap", value +"%");
    $(".images").css("column-width", value +"0%");

}
