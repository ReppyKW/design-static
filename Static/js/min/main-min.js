function getImgContentWidth(t){var i=2;return t.find(">img").each(function(){i+=$(this).width()+3}),i}function modImgLeftOffset(t,i){var o=parseInt(t.attr("data-img-left-offset")),n=Math.min(0,Math.max(-1*(getImgContentWidth(t)-t.width()),o+i));t.attr("data-img-left-offset",n),t.find(">img").each(function(){$(this).css({left:n+"px"})})}function showLightbox(t){$("<div id='lightbox'></div>").on("click",function(){$("#lightbox").remove()}).appendTo("body").css({position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:20,backgroundColor:"rgba(0,0,0,0.5)"}).append($(t).clone().css({position:"absolute",left:0,right:0,top:"50%",transform:"translateY(-50%)",height:"auto",width:"100%"}))}function showStep(t){$(document).scrollTop(0),$(".schedule-steps li").each(function(){$(this).addClass("minimized")}),t.removeClass("minimized")}$(function(){$(".schedule").css("min-height",$(window).height()-($("body>header").height()+2*$("body>footer").height())),$(window).resize(function(){$(".profile-images").each(function(){modImgLeftOffset($(this),0)}),$(".schedule").css("min-height",$(window).height()-($("body>header").height()+$("body>footer").height()))}),$(".profile-images").each(function(){var t=$(this),i=t.find("button.forward"),o=t.find("button.back"),n=getImgContentWidth(t),e=0;t.attr("data-img-left-offset",0),o.on("mousedown",function(){e=10}),i.on("mousedown",function(){e=-10}),$(document).on("mouseup",function(){e=0}),t.on("click",">img",function(t){var i=$(t.currentTarget);showLightbox(i)}),setInterval(function(){0!==e&&modImgLeftOffset(t,e)},16.6)});var t=!1;$(".schedule-steps>li").each(function(){var i=$(this);i.on("click",".continue-button",function(t){var o=1*i.attr("data-index")+1,n="[data-index="+o+"]",e=$(n);showStep(e)}),i.on("click","h5",function(t){showStep(i)}),t?i.addClass("minimized"):t=!0})});