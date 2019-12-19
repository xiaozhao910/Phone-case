var getElem = function(selector){
 return document.querySelector(selector);
}
var getAllElem = function(selector){
 return document.querySelectorAll(selector);
}
var getCls = function(element){
	return element.getAttribute('class');
}
var setCls = function(element,cls){
	return element.setAttribute('class',cls);
}

var addCls = function(element,cls){
	var baseCls = getCls(element);
	if(baseCls.indexOf(cls) === -1){
		setCls(element,baseCls+' '+cls);
	}
}
var delCls = function(element,cls){
	var baseCls = getCls(element);
	if(baseCls.indexOf(cls) != -1){
		setCls( element,baseCls.split(cls).join(' ').replace(/\s+/g,' ') );
  }
}
var screenAnimateElements = {
	'.screen-1':[
    '.screen-1__heading',
    '.screen-1__phone',
    '.screen-1__shadow',
	],
	'.screen-2' : [
    '.screen-2__heading',
    '.screen-2__subheading',
    '.screen-2__phone',
    '.screen-2__point_i_1',
    '.screen-2__point_i_2',
    '.screen-2__point_i_3',
  ],
  '.screen-3' : [
    '.screen-3__heading',
    '.screen-3__subheading',
    '.screen-3__phone',
    '.screen-3__features',
  ],
  '.screen-4' : [
    '.screen-4__heading',
    '.screen-4__subheading',
    '.screen-4__type__item_i_1',
    '.screen-4__type__item_i_2',
    '.screen-4__type__item_i_3',
    '.screen-4__type__item_i_4',

  ],
  '.screen-5' : [
    '.screen-5__heading',
    '.screen-5__subheading',
    '.screen-5_bg',
  ]
};
function setScreenAnimateInit(screenCls) {
    var screen = document.querySelector(screenCls); // 获取当前屏的元素
    var animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素
    for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
    }
}
function playScreenAnimateDone(screenCls){
    var screen = document.querySelector(screenCls); // 获取当前屏的元素
    var animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素
    for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));    
    }
}


window.onload = function(){
	console.log('onload');
for(k in screenAnimateElements){
	if(k=== '.screen-1'){
       continue;
	}
	setScreenAnimateInit(k);
 }
}

var navItems = getAllElem('.header__nav-item');
var outLineItems = getAllElem('.outline__item');

var switchNavItemsActive = function(idx){
	for(var i=0;i<navItems.length;i++){
     delCls(navItems[i],'header__nav-item_status_active' );
  }
     addCls(navItems[idx],'header__nav-item_status_active' );

     for(var i=0;i<outLineItems.length;i++){
     delCls(outLineItems[i],'outline__item_status_active' );
  }
  addCls(outLineItems[idx],'outline__item_status_active' );
}
switchNavItemsActive(0);
window.onscroll = function () {

  var top  = document.body.scrollTop || document.documentElement.scrollTop;

	if( top > 80 ){
      addCls( getElem('.header'),'header_status_back' );
      addCls( getElem('.outline'),'outline_status_in' );
  }else{
      delCls( getElem('.header'),'header_status_back' );
      delCls( getElem('.outline'),'outline_status_in' )
      switchNavItemsActive(0)
  }

	if(top > 1){
		playScreenAnimateDone('.screen-1');
		
	}
	if(top > 800*1 - 100){
		playScreenAnimateDone('.screen-2');
		switchNavItemsActive(1)
	}
	if(top > 800*2 - 100){
		playScreenAnimateDone('.screen-3');
		switchNavItemsActive(2)
	}
	if(top > 800*3 - 100){
		playScreenAnimateDone('.screen-4');
		switchNavItemsActive(3)
	}
	if(top > 800*4 - 100){
		playScreenAnimateDone('.screen-5');
		switchNavItemsActive(4)
	}
}



var setNavJump = function(i,lib){
    var item = lib[i];
    item.onclick = function(){
    	 document.body.scrollTop = i*800;
    	 document.documentElement.scrollTop = i*800;
    }
}
  for(var i=0;i<navItems.length;i++){
  	setNavJump(i,navItems);
  }

  for(var i=0;i<outLineItems.length;i++){
  	setNavJump(i,outLineItems);
  }

var navTip = getElem('.header__nav-tip');
var setTip = function(idx,lib){
    lib[idx].onmouseover = function(){
    	console.log(this,idx);
    	navTip.style.left = (idx * 110) + 'px';
    }
    var activeIdx = 0;
    lib[idx].onmouseout = function(){
    	console.log(this,idx);
    	for(var i=0;i<lib.length;i++){
  	    if(getCls(lib[i]).indexOf('header__nav-item_status_active')> -1){
          activeIdx = i;
          break;
        }
    }
    console.log(activeIdx);
    navTip.style.left = ( activeIdx * 110)+'px';
  	  
  }
}
 
 for(var i=0;i<navItems.length;i++){
  	setTip(i,navItems);
  }


 setTimeout(function(){}
  	,200)
playScreenAnimateDone('.screen-1');