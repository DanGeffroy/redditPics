var after = "";
$(document).ready(function(){

  searchAndPrint("hot","2","pics");

  $("#button").click(function() {
    after = "";
    loadPage();
  });
  $("#filter").change(function() {
    after = "";
    loadPage();
  });
  $("#resolutions").change(function() {
    after = "";
    loadPage();
  });
  $("#next-button").click(function() {
    loadPage();
  });
  $("#subreddit").keypress(function(e) {
    if(e.which==13){
        after = "";
        loadPage();
        return false;
    }
  });
});

function loadPage(){
  $(".images").empty();
  resolutions = $("#resolutions").val();
  filter = $("#filter").val();
  subreddit = $("#subreddit").val();
  searchAndPrint(filter,resolutions, subreddit);
  scrollToAnchor('anchor');
}
function scrollToAnchor(aid){
  var aTag = $("a[id='"+ aid +"']");
  $('html,body').animate({scrollTop: aTag.offset().top},'slow');
};
function searchAndPrint(filter,resolutions, subreddit){
  if(subreddit !=""){
    redditUrl = "https://www.reddit.com/r/"+subreddit+"/"+filter+"/.json?limit=100&after="+after;
  }
  else{
    redditUrl = "https://www.reddit.com/r/pics/"+filter+"/.json?limit=100&after="+after;
  }
  $.ajax({
    url: redditUrl,
    dataType: "json",
    error: function(){
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
  after = data.data.after
  console.log(after)
  for(i = 0;i<100;i++){
    if((typeof data.data.children[i].data.preview != "undefined")&&(typeof data.data.children[i].data.preview.images[0].resolutions[option] != "undefined")){
      preview = data.data.children[i].data.preview;
      image = data.data.children[i].data.preview.images[0].resolutions[option];
      title = data.data.children[i].data.title;
      permalink = "https://www.reddit.com" + data.data.children[i].data.permalink
      $(".images").append("<div class='tourImg'><div class='image imgSizeLon"+option+" imgSizeLar"+option+"' id='img" + i+"'><a href='"+permalink+"' target='_blank'><img class='imgSizeLon"+option+ "' src='"+image.url+"' alt='"+title+"'/></a></div><a href='"+permalink+"' target='_blank'><span>"+title+"</span></a></div>");
    }
  }
};
