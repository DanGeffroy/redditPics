$(document).ready(function(){

  searchAndPrint("hot","216");









  $("#button").click(function() {
    $(".images").empty();
    console.log("ici");
    resolutions = $("#resolutions").val();
    filter = $("#filter").val();
    console.log(resolutions + filter);
    searchAndPrint(filter,resolutions);
    scrollToAnchor('anchor');
  });
});
function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
};
function searchAndPrint(filter,resolutions){
  $.ajax({
    url: "https://www.reddit.com/r/pics/"+filter+"/.json?limit=30",
    dataType: "json",
    jsonp: 'jsonp',
    success: function(data) {
    console.log(data);

    printPics(data,resolutions);
    }
  });
}
function printPics(data,resolutions){
  option = cssAdaptator(resolutions);
  for(i = 0;i<30;i++){
  /*  console.log("<div class='image' id='img1'><img src='"+data.data.children[i].data.preview.images[0].resolutions[1]+"' alt='"+data.data.children[i].data.title+"'/><span>"+data.data.children[i].data.title+"</span></div>");*/
  if((typeof data.data.children[i].data.preview != "undefined")&&(typeof data.data.children[i].data.preview.images[0].resolutions[option] != "undefined")){
    $(".images").append("<div class='image' id='img" + i+"'><img src='"+data.data.children[i].data.preview.images[0].resolutions[option].url+"' alt='"+data.data.children[i].data.title+"'/><span>"+data.data.children[i].data.title+"</span></div>");
  }
  }
};

function cssAdaptator(resolutions){
  $(".images").css("visibility", "visible");
  $(".image").css("width", resolutions );
  $(".image img").css("width", resolutions);
  var option;
  if(resolutions === "108"){
    option = 0;
    $(".image").css("height", 81 );
    $(".image img").css("height", 81);
  }
  else if(resolutions === "216"){
    option = 1;
    $(".image").css("height", 162 );
    $(".image img").css("height", 162);
  }
  else if(resolutions === "320"){
    option = 2;
    $(".image").css("height", 240 );
    $(".image img").css("height", 240);
  }
  else if(resolutions === "640"){
    option = 3;
    $(".image").css("height", 480 );
    $(".image img").css("height", 480);
  }
  else if(resolutions === "960"){
    option = 4;
    $(".image").css("height", 720 );
    $(".image img").css("height", 720);
  }
  else if(resolutions === "1080"){
    option = 5;
    $(".image").css("height", 810 );
    $(".image img").css("height", 810);
  }
  return option;
}
/*
$.ajax({
    url: "http://www.reddit.com/comments/1gtyui/.json?limit=100&sort=top",
    dataType: "jsonp",
    jsonp: 'jsonp',
    success: function(data) {
    ... do stuff here ....
    }
});



<div class="image" id="img1">
  <img src="http://i.imgur.com/Nn1Vcnw.jpg" alt="Titre image"/>
  <span>Une belle description</span>
</div>
*/
