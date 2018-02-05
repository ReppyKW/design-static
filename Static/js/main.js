function getImgContentWidth( widget ){
  var imgContentWidth = 2;
  widget.find(">img").each(function(){
    imgContentWidth += $(this).width() + 3;
  });
  return imgContentWidth;
}

function modImgLeftOffset( widget, delta ){
  var currentOffset = parseInt( widget.attr("data-img-left-offset") );
  var newOffset = Math.min( 
    0, 
    Math.max(
      -1*(getImgContentWidth( widget ) - widget.width()),
      currentOffset + delta 
    )
  );
  widget.attr("data-img-left-offset", newOffset);
  widget.find(">img").each(function(){
    $(this).css({
      left: newOffset + "px"
    });
  });
}

function showLightbox( img ){
  $("<div id='lightbox'></div>")
    .on("click", function(){
      $("#lightbox").remove();
    })
    .appendTo("body")
    .css({
      position:"fixed",
      top:0,
      left:0,
      right:0,
      bottom:0,
      zIndex:20,
      backgroundColor:"rgba(0,0,0,0.5)"
    })
    .append(
      $(img).clone()
      .css({
        position:"absolute",
        left:0,
        right:0,
        top:"50%",
        transform:"translateY(-50%)",
        height:"auto",
        width:"100%"
      })
    );
}

function showStep( step ){
  $(document).scrollTop( 0 );
  $(".schedule-steps li").each(function(){
    $(this).addClass("minimized");
  });
  step.removeClass("minimized");
}

$(function(){
  $(".schedule").css("min-height", $(window).height() - ($("body>header").height() + 2*$("body>footer").height()));
  $(window).resize(function(){
    $(".profile-images").each(function(){
      modImgLeftOffset( $(this), 0 );
    });  
    $(".schedule").css("min-height", $(window).height() - ($("body>header").height() + $("body>footer").height()));
  });
  $(".profile-images").each(function(){
    var widget = $(this);
    var forwardButton = widget.find("button.forward");
    var backButton = widget.find("button.back");
    var imgContentWidth = getImgContentWidth( widget );
    var movement = 0;
    widget.attr("data-img-left-offset", 0);
    backButton.on("mousedown", function(){
      movement = 10;
    });
    forwardButton.on("mousedown", function(){
      movement = -10;
    });
    $(document).on("mouseup", function(){
      movement = 0;
    });
    widget.on("click", ">img", function(event){
      var img = $(event.currentTarget);
      showLightbox( img );
    });
    setInterval(function(){
      if( movement !== 0 ){
        modImgLeftOffset( widget, movement );
      }
    }, 16.6);
  });
  var hasUnminimized = false;
  $(".schedule-steps>li").each(function(){
    var step = $(this);
    step.on("click", ".continue-button", function(event){
      var nextStepIndex = (1*step.attr("data-index"))+1;
      var selector = "[data-index="+nextStepIndex+"]";
      var nextStep = $(selector);
      showStep(nextStep);
    });
    step.on("click", "h5", function( event ){
      showStep(step)
    });
    if( !hasUnminimized ){
      hasUnminimized = true;
    }else{
      step.addClass("minimized");
    }
  });
});