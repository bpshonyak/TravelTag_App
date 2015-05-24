window['val'] = 0;
var tagNumb = 0;
$(document).ready(function() {
  var buttonID;
  $(".imgpanel").click( function(event) {

    console.log("Clicked!");

    buttonID = 'tag'+tagNumb;

    var button = "<div id='" + buttonID +"'></div>";

    tagNumb++;

    $("#canvas").append(button);

    var circleControl = new CircleControl({
        radius: 90,
        selected: 1,
        degOffset: -36
          /* ===another default settings===
            animationTime : 100,
            bodyClass : 'body',
            elementClass : 'element',
            headClass : 'head',
            objectCLass : 'circleControl',
            opened : false,
            openDelay : 200,
            activeElementClass : 'activeElement',
            elementsAnimationDelay : 0.03,
            openEvent : 'mousedown',
            onChange : function(){}
          */
      })
      .addItem({
        selector: $('<div>').addClass('FB children'),
        value: 0
      })
      .addItem({
        selector: $('<div>').addClass('goo children'),
        value: 1
      })
      .addItem({
        selector: $('<div>').addClass('twit children'),
        value: 2
      })
      .addItem({
        selector: $('<div>').addClass('LIn children'),
        value: 3
      })
      .addItem({
        selector: $('<div>').addClass('p children'),
        value: 3
      });

    $("#"+buttonID).css({
      position: "absolute",
      top : event.pageY,
      left : event.pageX
    });


    //==========Demonstration code===========//
    window['flag'] = true;
    var interval = window.setInterval(function() {
      if (flag)
        circleControl.open();
      else
        circleControl.close();
      flag = !flag;
    }, 2000);
    circleControl.getJQObject()
      .one('mouseenter', function() {
        clearInterval(interval);
        circleControl.close();
        $('.panel').css('opacity', 1);
      })
      .appendTo("#"+buttonID);
  })
})
