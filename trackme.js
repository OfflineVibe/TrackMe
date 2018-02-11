
var cevc = 0; // Cursor Event Counter
var drcr = 0; // Draw Count Reset
var cenr = []; // Cursor Entry Records
var atoc = 10 ;// Allowed tolerance calculated

function newEntry(cordx, cordy) {
    this.cordx = cordx;
    this.cordy = cordy;
}

cenr.push(new newEntry(0, 0));

function refresh(){
  var winh = document.body.clientHeight;
  var winw = document.body.clientWidth;
  var webh = Math.round($("html").height());
  var webw = Math.round($("html").width());
  var scrx = $("body").scrollLeft();
  var scry = $("body").scrollTop();

  $("#tm-winh").text(winh + "px");
  $("#tm-winw").text(winw + "px");
  $("#tm-webh").text(webh + "px");
  $("#tm-webw").text(webw + "px");
  $("#tm-scrx").text(scrx + "px");
  $("#tm-scry").text(scry + "px");
}

function refreshCursor(event){
  var offx = Math.round($("#tm-objects").offset().left);
  var offy = Math.round($("#tm-objects").offset().top);
  var curx = event.pageX - offx;
  var cury = event.pageY - offy;
  cevc = cevc + 1;
  $("#tm-curx").text(curx + "px");
  $("#tm-cury").text(cury + "px");
  $("#tm-cevc").text(cevc);
  $("#tm-offx").text(offx + "px");
  $("#tm-offy").text(offy + "px");
  if (drcr >= 5 ) {
    checkObject(curx, cury);
    drcr = 0;
  }
  else {
    drcr = drcr + 1;
  }
}
function checkObject(curx, cury){
  var comp = cenr[cenr.length - 1];
  var difx = Math.abs(comp.cordx - curx);
  var dify = Math.abs(comp.cordy - cury);
  var chck = difx + dify;
  if(chck >= atoc){
    drawObject(curx, cury);
  }
  else{
    $("#tm-results").append("<span class='entry false'>[" + curx + "; " + cury + "]</span><br>")
  }
  var cenc = cenr.length;
  var encr = Math.round((cenc/cevc) * 1000) / 10;

  $("#tm-cenc").text(cenc);
  $("#tm-encr").text(encr + "%");
}

function drawObject(curx, cury){
  cenr.push(new newEntry(curx, cury));
  $("#tm-objects").append("<div class='trackpoint' style='top:" + (cury - 2) + "; left:" + (curx - 2) + "; z-index:" + cevc + "' ></div>")
  $("#tm-results").append("<span class='entry'>[" + curx + "; " + cury + "], </span>")
}

window.onload = function(){
    refresh();
}
$(window).resize(function(){
    refresh();
});
$(window).scroll(function(){
    refresh();
});
$("#objects").mousemove(function(event) {
    refreshCursor(event);
});
