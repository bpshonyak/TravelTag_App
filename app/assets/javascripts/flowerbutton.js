//My name's Alexandr, Gn0ume@ya.ru
window['val'] = 0;
$(document).ready(function() {
  var circleControl = new CircleControl({
      radius: 80,
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
    .appendTo('#container');
})
