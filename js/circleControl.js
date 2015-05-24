function replaceElems(/*object*/array,/*object*/replacer){
    for (var elem in replacer){
        array[elem] =  replacer[elem];
    }
}
jQuery.fn.getCircleControlObject = function(){
    var attr = this.attr('circleControlID');
    if(typeof attr !== typeof undefined){
        return circleControls[attr];
    }else
        return this;
}
jQuery(document).ready(function(){
    window['circleControls'] = new Array();
})
function CircleControl(/*object*/customSettings){
    customSettings = customSettings ? customSettings : new Object();
    this.settings= {
        animateType : 'flower',
        animationTime : 100,
        bodyClass : 'body',
        elementClass : 'element',
        headClass : 'head',
        objectCLass : 'circleControl',
        radius : 20,
        degOffset : 0,
        opened : false,
        selected : 0,
        openDelay : 200,
        activeElementClass : 'activeElement',
        elementsAnimationDelay : 0.03,
        openEvent : 'mousedown',
        onChange : function(){}
    };
    this.animateTypes = {flower : function(){}};
    this.id = circleControls.length;
    circleControls.push(this);
    replaceElems(this.settings,customSettings);
    this.elements = new Array();
    return this;
}

CircleControl.prototype.addItem = function(/*object*/assocCouple){
    this.elements.push(assocCouple);
    return this;
}

CircleControl.prototype.set = function(event,func){
    this.settings[event] = func;
    return this;
}

CircleControl.prototype.val = function(value){
    if(typeof value == typeof undefined) return this.settings.selected;
    this.settings.selected = value;
    var selectedJQ = this.elements[this.settings.selected].selector.clone();
    this.DOM.head.html(selectedJQ);
    this.settings.onChange(this);
}
CircleControl.prototype.prepareObj = function(){
    var obj = this;
    this.JQObject = jQuery('<div>')  .addClass(this.settings.objectCLass)
                                .attr({
                                    circleControlID : this.id
                                })
                                .bind(this.settings.openEvent,function(){
                                                obj.open();
                                                return false;
                                            });
                                jQuery(document).mouseup(function(){
                                                obj.close();
                                            });
    var head = jQuery('<div>')   .appendTo(this.JQObject)
                            .addClass(this.settings.headClass)
                            .mousedown(function(){

                            });
    var body = jQuery('<div>')   .appendTo(this.JQObject)
                            .addClass(this.settings.bodyClass);
    this.DOM = {
        head : head,
        body : body
    }
    this.val(this.settings.selected);
    return this;
}
CircleControl.prototype.prepareElements = function(){
	var obj = this;
    var elementsArray = new Array();
    for (var i = 0; i < this.elements.length; i++){
        var element = jQuery('<div>')    .appendTo(this.DOM.body)
                                    .attr({
                                        myIndex : i
                                    })
                                    .html(this.elements[i].selector)
                                    .addClass(this.settings.elementClass)
                                    .mouseenter(function(){
                                    	jQuery(this).addClass(obj.settings.activeElementClass);
                                    })
                                    .mouseleave(function(){
                                    	jQuery(this).removeClass(obj.settings.activeElementClass);
                                    })
                                    .mouseup(function(){
                                        var myIndex = jQuery(this).attr('myIndex');
                                        var myControlIndex = jQuery(this).parents("."+obj.settings.objectCLass).eq(0).attr('circlecontrolid');
                                        var control = circleControls[myControlIndex];
                                        control.val(myIndex);
                                    });
        elementsArray.push(element);
    }
    this.DOM['elements'] = elementsArray;
    return this;
}
CircleControl.prototype.DegToRad = function(Deg){
    return 0.0174532925*parseFloat(Deg);
}
CircleControl.prototype.open = function(){
    if(this.settings.opened) return false;
	clearTimeout(this.closeTimer);
    this.settings.opened = true;
    var obj = this;
    this.prepareElements();
    window.setTimeout(function(){obj.openAnimation();},this.settings.openDelay);
}

CircleControl.prototype.openAnimation = function(){
    this.JQObject.css('z-index','600');
    var deg360 = Math.PI*2;
    //var Matrix = new Matrix();
    var StartPoint =    [
                            [0],
                            [-this.settings.radius]
                        ];
    var curDeg = this.settings.degOffset;
    var step = 360/this.DOM.elements.length;
    var curentAnimationTimeOffset = this.settings.elementsAnimationDelay;
    for(var m = 0; m<this.DOM.elements.length; m++){
        var curRadAng = this.DegToRad(curDeg);
        var rotateMatrix =  [
                                [Math.cos(curRadAng),-Math.sin(curRadAng)],
                                [Math.sin(curRadAng),Math.cos(curRadAng)]
                            ];
        var res = MultiplyMatrix(rotateMatrix,StartPoint);
        var newX = parseFloat(res[0]);
        var newY = parseFloat(res[1]);
        var elemHalfWidth = 0;//parseFloat(this.DOM.elements[m].width());
        this.DOM.elements[m].css({
            top : newY+'px',
            left : (newX+elemHalfWidth)+'px',
            opacity : 1,
            'transition-delay' : curentAnimationTimeOffset+'s'
        })
        curDeg += step;
        curentAnimationTimeOffset += this.settings.elementsAnimationDelay;
    }
    return this;
}

CircleControl.prototype.close = function(){
    if(!this.settings.opened) return false;
    this.settings.opened = false;
    this.JQObject.css('z-index','500');
    var obj = this;
    var set = this.settings;
    for(var element in this.DOM.elements){
        this.DOM.elements[element].css({
            top : 0,
            left : 0,
            opacity : 0
        })
    }
    var timeout = set.elementsAnimationDelay*this.elements.length*1000+set.animationTime;
    this.closeTimer = window.setTimeout(function(){
        obj.DOM.body   .find('.element')
                                .remove();
    },timeout);
    return this;
}
CircleControl.prototype.getJQObject = function(){
    this.prepareObj();
    return this.JQObject;
}
