$(document).ready(function(){
  $("#button").click(function() {
    console.log("ici")
    var resolutions = $("#resolutions").val();
    var filter = $("#filter").val();
    console.log(resolutions + filter);
    $.ajax({
      url: "https://www.reddit.com/r/pics/new/.json?limit=30&sort="+filter,
      dataType: "json",
      jsonp: 'jsonp',
      success: function(data) {
      console.log(data);
      console.log(data.data.children[1].data.thumbnail);
      for(i = 0;i<30;i++){
        $(".images").css("visibility", "visible");
      /*  console.log("<div class='image' id='img1'><img src='"+data.data.children[i].data.preview.images[0].resolutions[1]+"' alt='"+data.data.children[i].data.title+"'/><span>"+data.data.children[i].data.title+"</span></div>");*/
        $(".images").prepend("<div class='image' id='img1'><img src='"+data.data.children[i].data.preview.images[0].source.url+"' alt='"+data.data.children[i].data.title+"'/><span>"+data.data.children[i].data.title+"</span></div>");
      }
      scrollToAnchor('anchor');
      }
    });





  });
});
function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
};

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
