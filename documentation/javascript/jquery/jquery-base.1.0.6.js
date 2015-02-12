/* version 1.0.5*/
(function($){
    $.fn.extend(
    {
        rSlide: function(options) 
        {
            //Settings list and the default values
            var defaults = 
            {
            	speed		: undefined,
		direction	: undefined,
		trim		: undefined,
		includeMargin	: undefined,
		easing		: undefined,
		endBack		: undefined,
		backSpeed	: undefined,
		goTo		: undefined,
		overview	: undefined,
		resetCounter	: undefined,
		arrows		: undefined,
		arrowRightClass	: undefined,
		arrowsLeftClass	: "arrowsLeftClass",
		arrowsRightClass: "arrowsRightClass",
		arrowsAddTo	: undefined,
		arrowsFade	: undefined,
		overviewClass	: "overviewUl",
		overviewLiClass	: "overviewLI",
		overviewLiSelectedClass	: "overviewLISelected",
		overviewAddTo	: undefined
            };
             
            var options = $.extend(defaults, options);
	    
            return this.each(function() 
            {
                var o 	= options;
                var obj = $(this);
		
		//helper function
		function arrowFade()
		{
		    if(obj.data("slideData").arrowsFade)
		    {
			var btnLeft =  obj.data("slideData").arrowLeft;
			var btnRight =  obj.data("slideData").arrowRight;
			
			if(obj.data("slideData").childrenLength>1)
			{
			    if(obj.data("slideData").counter == 0)
			    {
				btnLeft.fadeOut();
				if(btnRight.css("display")=="none")
				{
				    btnRight.fadeIn();
				}
			    }
			    else if(obj.data("slideData").counter == obj.data("slideData").childrenLength-1)
			    {
				btnRight.fadeOut();
				if(btnLeft.css("display")=="none")
				{
				    btnLeft.fadeIn();
				}
			    }
			    else
			    {
				if(btnLeft.css("display")=="none")
				{
				    btnLeft.fadeIn();
				}
				if(btnRight.css("display")=="none")
				{
				    btnRight.fadeIn();
				}
			    }
			}
		    }
		}
		//--------------
		
		switch(obj.data("slideData"))
		{
		    case undefined:
			obj.data(
				"slideData",
				{
				    counter:0,
				    childrenLength:obj.children().children().length,
				    speed: 400,
				    includeMargin: false,
				    easing: "swing",
				    backSpeed: 1000,
				    endBack: false,
				    overviewAddTo: obj
				});
			
			try
			{
			    TweenMax.killTweensOf(obj);
			    TweenMax.to(obj, 0, {scrollTo:{x:0}, ease: obj.data("slideData").easing});
			}
			catch(err)
			{
			    obj.stop().animate({scrollLeft: 0}, 0, obj.data("slideData").easing);
			}
		    default:
			
			var container 	= obj.children().children();
			var scroller	= obj.children();
			/*reset after dynamically added element plz*/
			if(o.resetCounter != undefined)
			{
			    obj.data("slideData").childrenLength=obj.children().children().length;
			}
			/*trim*/
			if(o.trim != undefined)
			{
			    var total_width=0;
			    container.each(function()
			    {
				total_width += $(this).outerWidth(true);
			    });
			    scroller.outerWidth(total_width);
			    obj.data("slideData").trim = true;
			}
			
			/*endBack*/
			if(o.endBack != undefined){
			    obj.data("slideData").endBack = o.endBack;
			}
			if(o.backSpeed != undefined){
			    obj.data("slideData").backSpeed = o.backSpeed;
			}
			
			/*overview*/
			if(o.overview != undefined)
			{
			    if(o.overview == true)
			    {
				var list = $(document.createElement('ul'));
			       
				list.attr("class",o.overviewClass).width(0);
				
				if(o.overviewAddTo != undefined)
				{
				    $(o.overviewAddTo).append(list);
				    obj.data("slideData").overviewAddTo = o.overviewAddTo;
				}
				else
				{
				    obj.parent().append(list);
				    obj.data("slideData").overviewAddTo = obj.parent();
				}
				
				$.each(container,function(key, element)
				{
				    listItem = $(document.createElement('li')).attr("class", o.overviewLiClass);
				    
				    if(key == obj.data("slideData").counter)
				    {
					listItem.addClass(o.overviewLiSelectedClass);
					obj.data("slideData").overviewLiSelectedClass = o.overviewLiSelectedClass;
				    }
				    
				    listItem.click(function(event){
					obj.rSlide({goTo:key});
				    });
				    
				    list.append(listItem);
				    list.width(list.width()+listItem.outerWidth(true));
				});
				
				obj.data("slideData").overviewClass = o.overviewClass;
			    }
			    else
			    {
				$(obj.data("slideData").overviewAddTo).find("."+obj.data("slideData").overviewClass).remove();
			    }
			}
			
			/*arrows*/
			if(o.arrows != undefined)
			{
			    if(o.arrows == true)
			    {
				var btnLeft = $(document.createElement('button'));
				var btnRight = $(document.createElement('button'));
				obj.data("slideData").arrowRight = btnRight;
				obj.data("slideData").arrowLeft  = btnLeft;
			       
				if(o.arrowsAddTo != undefined)
				{
				    $(o.arrowsAddTo).append(btnLeft);
				    $(o.arrowsAddTo).append(btnRight);
				    obj.data("slideData").arrowsAddTo = o.arrowsAddTo;
				}
				else
				{
				    var objParent = obj.parent();
				    objParent.append(btnLeft);
				    objParent.append(btnRight);
				    obj.data("slideData").arrowsAddTo = objParent;
				}
				
				//add classes
				obj.data("slideData").arrowsLeftClass	= o.arrowsLeftClass;
				obj.data("slideData").arrowsRightClass	= o.arrowsRightClass;
				btnLeft.addClass(o.arrowsLeftClass);
				btnRight.addClass(o.arrowsRightClass);
				//make sure parent is relative
				obj.data("slideData").arrowsAddTo.css("position", "relative");
				
				//bind buttons
				btnLeft.click(function(){
				    obj.rSlide({direction:"left"});
				});
				btnRight.click(function(){
				    obj.rSlide({direction:"right"});
				});
				
				if(o.arrowsFade != undefined)
				{
				    obj.data("slideData").arrowsFade = o.arrowsFade;
				    arrowFade();
				}
				
				obj.data("slideData").arrowsRight = o.arrowsRight;
				obj.data("slideData").arrowsLeft = o.arrowsLeft;
			    }
			    else
			    {
				$(obj.data("slideData").arrowsAddTo).find("."+obj.data("slideData").arrowsRightClass).remove().end()
								    .find("."+obj.data("slideData").arrowsLeftClass).remove();
				obj.data("slideData").arrowsFade = false;
			    }
			}
			/*easing*/
			if(o.easing != undefined)
			{
			    obj.data("slideData").easing = o.easing;
			}
			
			/*includeMargin*/
			if(o.includeMargin != undefined)
			{
			    obj.data("slideData").includeMargin = o.includeMargin;
			}
			
			/*speed*/
			if(o.speed != undefined)
			{
			    obj.data("slideData").speed = o.speed;
			}
			
			if(o.direction != undefined)
			{
			    if(o.direction == "left" && obj.data("slideData").counter>0)
			    {
				obj.data("slideData").counter--;
			    }
			    
			    if(o.direction == "right")
			    {
				if(obj.data("slideData").counter<obj.data("slideData").childrenLength-1)
				{
				    obj.data("slideData").counter++;
				}
				else
				{
				    //this should really go into o.goTo
				    if(obj.data("slideData").endBack)
				    {
					var speed = o.speed;
					obj.rSlide({goTo:0, speed: o.backspeed});
					obj.rSlide({speed: o.speed});
				    }
				}
			    }
			    
			    o.goTo = obj.data("slideData").counter;
			}
			if(o.goTo != undefined)
			{
			    //slideStart();
			    if(jQuery.type(o.goTo) === "number")
			    {
				obj.data("slideData").counter=o.goTo;
			    }
			    
			    var containerID = o.goTo;
			    
			    var containerObj = container.eq(containerID);
			    var containerLeft = containerObj.position().left;
			    
			    var containerWidth = containerObj.outerWidth(obj.data("slideData").includeMargin);
			    
			    var pos 	= containerLeft;
			    var posM	= obj.scrollLeft() - (obj.position().left+(obj.outerWidth()-obj.width()));
			    
			    try
			    {
				TweenMax.killTweensOf(obj);
				TweenMax.to(obj, obj.data("slideData").speed/1000, {scrollTo:{x:posM+pos}, ease: o.easing})
			    }
			    catch(err)
			    {
				obj.stop().animate({scrollLeft: posM+pos}, obj.data("slideData").speed, o.easing, function() {
				});
			    }
			    
			    //update overview to match slide, nothing to do with sliding per-se
			    if(obj.data("slideData").overviewClass != undefined)
			    {
				obj.data("slideData").overviewAddTo.children("."+obj.data("slideData").overviewClass)
				    .children("li").removeClass(obj.data("slideData").overviewLiSelectedClass);
				    
				obj.data("slideData").overviewAddTo.children("."+obj.data("slideData").overviewClass)
				    .children("li").eq(containerID).addClass(obj.data("slideData").overviewLiSelectedClass);
			    }
			    arrowFade();
			}
			
			
		    break;
		}
		/*
		function slideStart(){
		    $.event.trigger({
			type: "rSlideEvent",
			effect: "slideStart"
		    });
		}
		function slideEnd(){
		    $.event.trigger({
			type: "rSlideEvent",
			effect: "slideEnd"
		    });
		}*/
            });
        },
        tSlide: function(options) 
        {
            //Settings list and the default values
            var defaults = 
            {
            	speed		: undefined,
		vertical	: true,
		horizontal	: false,
		speed		: 1 //(not currently supported); let it stay at 1
            };
             
            var options = $.extend(defaults, options);
         
            return this.each(function() 
            {
                var o 		= options;
                var obj 	= $(this);
		obj.disableSelection();
		if(o.vertical != undefined && o.vertical)
		{

		    obj.mousedown(function(e)
		    {
			var mdPos = e.pageY;
			obj.bind('mousemove',function(e){
			    e.preventDefault();
			    
			    var newPos = obj.scrollTop()-(e.pageY-mdPos);
				newPos = Math.round(newPos/o.speed);
			    obj.scrollTop(newPos);
			    //$("#top_bar_name").html(obj.parent().scrollTop());
			});
		    });
		    $(document).mouseup(function(e){
			obj.unbind("mousemove");
		    });
		}		
            });
        },
        //create scrollbar, needs work, experimental
	/*
        sSlide: function(options) 
        {
            //Settings list and the default values
            var defaults = 
            {
		scrollClass: "scroller",
		scrollPaneClass: "scrollPane"
            };
             
            var options = $.extend(defaults, options);
         
            return this.each(function() 
            {
                var o 	= options;
                var obj = $(this);
		
                var scrollDifference = obj.children().children().outerHeight()-obj.children().outerHeight();
		
		if(scrollDifference > 0)
		{
		    var scroller = $(document.createElement("div")).attr("class", o.scrollClass);
		    var scrollPane = $(document.createElement("div")).attr("class", o.scrollPaneClass);
		    obj.append(scroller)
		    
		    var scrollMax = Math.abs(scrollDifference);
    
		    scroller.append(scrollPane);
		    scrollPane.data("slideData",{sliding:false});
		    
		    scrollPane.slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: scrollMax,
			value: 0,
			start: function( event, ui)
			{
			    scrollPane.data("slideData").sliding = true;
			    obj.children().scrollTop(scrollMax-scrollPane.slider( "value" ) );               
			},
			slide: function( event, ui )
			{
			    obj.children().scrollTop(scrollMax-scrollPane.slider( "value" ) );
			},
			stop: function( event, ui)
			{
			    scrollPane.data("slideData").sliding = false;                
			}
		    });
		    scrollPane.slider().height($(".scroller").height()).width($(".scroller").width());
		    //the start value needs to be set after the height change.
		    scrollPane.slider({"value":scrollMax})
		    
		    obj.children().scroll(function() {
			if(!scrollPane.data("slideData").sliding)
			{
			    scrollPane.slider({value: obj.children().scrollTop()})
			}
		    });
		}
            });
        },*/
	       //plugin name
        bauble: function(options) 
        {
            //Settings list and the default values
            var defaults = 
            {
            	objId		: undefined,
            	objClass	: undefined,
                x		: 0,
                y		: 0,
		z		: undefined,
		size 		: 13,
		align		: "bottom",
		align2		: undefined,
		direction	: "bottom",
		color		: $(this).css("backgroundColor"),
		flip		: undefined,		
                permanent	: true
            };

            var options = $.extend(defaults, options);
         
            return this.each(function() 
            {
                var o 	 = options;
                var obj = $(this);

		var arrow = $(document.createElement('div')).
			    css(
			    {
				width		: 0,
				height		: 0,
				borderColor	: "transparent",
				borderStyle	: "solid",
				borderWidth	: o.size,
				position	: "absolute"
			    });
		
		if(o.flip != undefined)
		{
		    o.flip = 0;
		}
		else
		{
		    o.flip = 1;
		}
		
		switch(o.align)
		{
		    case "top":
			arrow.css({top: o.y-o.size*o.flip});
			break;
		    case "right":
			arrow.css({right: o.x-o.size*o.flip});
			break;
		    case "bottom":
			arrow.css({bottom: o.y-o.size*o.flip});
			break;
		    case "left":
			arrow.css({left: o.x-o.size*o.flip});
			break;
		}
		
		if(o.align2 != undefined)
		{
		    switch(o.align2)
		    {
			case "top":
			    arrow.css({top: o.y-o.size*o.flip});
			    break;
			case "right":
			    arrow.css({right: o.x-o.size*o.flip});
			    break;
			case "bottom":
			    arrow.css({bottom: o.y-o.size*o.flip});
			    break;
			case "left":
			    arrow.css({left: o.x-o.size*o.flip});
			    break;
		    }
		}
		switch(o.direction)
		{
		    case "top":
			arrow.css({borderTopWidth: 0, borderBottomColor: o.color});
			break;
		    case "right":
			arrow.css({borderRightWidth: 0, borderLeftColor: o.color});
			break;
		    case "bottom":
			arrow.css({borderBottomWidth: 0, borderTopColor: o.color});
			break;
		    case "left":
			arrow.css({borderLeftWidth: 0, borderRightColor: o.color});
			break;
		}
		
		if(!o.permanent)
		{
		    arrow.css({opacity: 0});
		    obj.hover(
		    function () {
		      arrow.stop().animate({opacity: 1}, 400);
		    }, 
		    function () {
		      arrow.stop().animate({opacity: 0}, 400);
		    }
		  );
		}
		if(o.objId 	!= undefined){	arrow.attr("id",o.objId);	}
		if(o.objClass 	!= undefined){	arrow.addClass(o.objClass);	}
		if(o.z	 	!= undefined){	arrow.css("z-index", o.z);	}

		obj.css("position", "relative").
		    append(arrow);
            });
        }
        ,
        //dialogue
        createDialog: function(options) 
        {
 
            //Settings list and the default values
            var defaults = 
            {
            	title: "title",
            	content: undefined,
            	objId: undefined,
		objClass: undefined,
		alwaysOnTop: undefined
            };
             
            var options = $.extend(defaults, options);
         
            return this.each(function() 
            {
                var o =options;
                var obj = $(this);             
                
                dialogBox = $(document.createElement('div')).attr({'title': o.title}).append(o.content)
		
		if(o.alwaysOnTop!= undefined){	dialogBox.css("z-index", 1001);	}
		if(o.objId 	!= undefined){	dialogBox.attr("id",o.objId);	}
		if(o.objClass 	!= undefined){	dialogBox.addClass(o.objClass);	}
		
		dialogBox.dialog(
		{
			width:'auto',
			dragStart: 	function()	{ $(this).css("visibility","hidden"); $(this).parent().css("opacity","0.5");},
			dragStop: 	function()	{ $(this).css("visibility","visible"); $(this).parent().css("opacity","1"); }
		});
            });
        }
	,
        //create icon
        createIcon: function(options) 
        {
            //Settings list and the default values
            var defaults = 
            {
            	title: "file.misc",
            	objId: undefined,
            	objClass: undefined,
		imgDir: "images/icon/",
		customIcon: undefined
            };
             
            var options = $.extend(defaults, options);
         
            return this.each(function() 
            {
                var o 	= options;
                var obj = $(this);             
                var fileList = ["jpg","png","mp3","wav","txt","php","doc","docx"];
		
		var name	= o.title.split('.').shift();
		
		if(o.customIcon == undefined)
		{
		    var fileType 	= o.title.split('.');
		    
		    if(fileType.length==2)
		    {
			fileType 	= fileType.pop().toLowerCase();
			fileIndex	= jQuery.inArray(fileType,fileList);
			if(fileIndex==-1){fileType=="misc";}
		    }
		    else
		    {
			fileType = "folder";
		    }
		}
		else
		{
		    fileType = o.customIcon;
		}
		
		var description = $(document.createElement('div')).attr("class","icon-description").append(o.title.toString());
		var fileIcon	= $(document.createElement('div')).attr("class","icon-file");
		    fileIcon.css("background-image", "url("+o.imgDir+"icon-"+fileType+".png)");
		
		var wrapper	= $(document.createElement('div')).attr("class","icon-wrapper").append(fileIcon);
		    wrapper.append(description);
		
		wrapper.data(
			    "iconData",
			    {
				fType:fileType,
				fName: name
			    });

		if(o.objId 	!= undefined){	wrapper.attr("id",o.objId);	}
		if(o.objClass 	!= undefined){	wrapper.addClass(o.objClass);	}
		
		obj.append(wrapper);
		/*
		wrapper.bind('click', function()
		{
		    alert($(this).data("iconData").fName);
		});*/
		return wrapper;
            });
        },
        projectBox: function(options) 
        {
            //Settings list and the default values
            var defaults = 
            {
            	//title: undefined,
            	content: "content <br />content",
		image: undefined,
            	objId: undefined,
		objClass: undefined,
		width	: 179,
		height	: 205,
		barColor: "#aaa",
		barHeight: 15,
		titleColor: "#fff",
		contentFontSize: 14,
		bgColor: "#fff",
		contentColor: "#000"
            };
             
            var options = $.extend(defaults, options);
         
            return this.each(function() 
            {
                var o 	= options;
                var obj = $(this);
		
		var box = $(document.createElement('div')).addClass("projectBox").
			    css({
				    height: o.height,
				    width : o.width,
				    backgroundColor: o.bgColor
				});
		
		if(o.objId 	!= undefined){	box.attr("id",o.objId);		}
		if(o.objClass 	!= undefined){	box.addClass(o.objClass);	}
		
		var imageBox = $(document.createElement('div')).
				    addClass("projectBoxImage");
				    
		if(o.image != undefined)
		{
		    imageBox.css(
		    {
		        backgroundImage: 'url("'+o.image+'")',
			margin: "auto"
		    });
		}
		else
		{
		    imageBox.css(
		    {
		        backgroundImage: 'url(images/placeholder.png)',
			backgroundSize: "100%"
		    });
		}
		var titleBox = $(document.createElement('div')).
				    addClass("projectBoxTitle").
				    css(
					{
					    padding: 5,
					    height: o.barHeight,
					    backgroundColor: o.barColor,
					    color: o.titleColor
					});
		if(o.title != undefined)
		{
		    titleBox.append(o.title);
		}
		
		var contentBox = $(document.createElement('div')).
		    addClass("projectBoxContent").
		    append(o.content).
		    css(
			{
			    fontSize: o.contentFontSize,
			    color: o.contentColor
			});
		
		box.append(imageBox).append(titleBox).append(contentBox);
		
		obj.append(box);
            });
        },
        line: function(options) 
        {
            //Settings list and the default values
            var defaults = 
            {
            	speed		: 0,
		lineClass	: "line",
		delay		: 0,
		linestart	: undefined,
		eRot		: 45,
		length		: 40,
		thickness	: 2,
		posX		: 0,
		posY		: 0
            };
             
            var options = $.extend(defaults, options);
         
            return this.each(function() 
            {
                var o 	= options;
                var obj = $(this);
		
		
		var line  = $(document.createElement('div')).addClass(o.lineClass);
		    line.height(o.thickness);
		    line.width(0);
		obj.append(line);
		
		TweenMax.to(line,0, {css:{x:o.posX, y:o.posY, rotation: o.eRot, transformOrigin:"0px 0px"}});
		
		if(o.linestart!=undefined){
		    if(o.linestart)
		    {
			var circle  = $(document.createElement('div')).addClass("circle");
			    circle.height(o.thickness*2)
				  .width(o.thickness*2)
				  .css({borderWidth: o.thickness})
			line.append(circle);
			TweenMax.to(circle, 0, {css:{x:-circle.outerWidth(true), y:(-circle.outerHeight(true)/2)+1}});
		    }
		    else
		    {
			circle.remove();
		    }
		}
		
		TweenMax.to(line, o.speed, {delay:o.delay,css:{width: o.length}});
	    });
        }
    });
})(jQuery);








