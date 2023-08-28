(()=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,i){for(var o=0;o<i.length;o++){var r=i[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,n=function(e,i){if("object"!==t(e)||null===e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var r=o.call(e,"string");if("object"!==t(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===t(n)?n:String(n)),r)}var n}var i={},o=function(){function t(e,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),i[e]=this,this.arrObjs=o,this.init()}var o,r;return o=t,(r=[{key:"init",value:function(){this.startListening(),this.forEachObj()}},{key:"scrSize",get:function(){var t=screen,e=t.width,i=t.height,o=t.availWidth,r=t.availHeight;return{width:e||o,height:i||r}}},{key:"winSize",get:function(){var t=window;return{innerWidth:t.innerWidth,innerHeight:t.innerHeight,outerWidth:t.outerWidth,outerHeight:t.outerHeight}}},{key:"docSize",get:function(){var t=document.documentElement,e=document.body,i=Math.max(e.scrollHeight||e.clientHeight,t.scrollHeight||t.clientHeight),o=t.scrollTop||document.scrollingElement.scrollTop;return{docHeight:i,docScrollTop:o,docScrollBottom:i-o}}},{key:"q",value:function(t){var e=document.querySelectorAll(t);return 1===e.length?e[0]:Array.from(e)}},{key:"getObjSize",value:function(t){if(t){var e=this.q(t);if(!e)return null;for(var i=0,o=0,r=e;r;)i+=r.offsetLeft,o+=r.offsetTop,r=r.offsetParent;return{offsetLeft:i,offsetTop:o,offsetHeight:e.offsetHeight,offsetWidth:e.offsetWidth}}}},{key:"getDOMRect",value:function(t){if(t){var e=this.q(t);if(!e)return null;var i=e.getBoundingClientRect();return{top:i.top,right:i.right,bottom:i.bottom,left:i.left,width:i.width,height:i.height,x:i.x,y:i.y}}}},{key:"isHorizontal",value:function(t,e){var i=this.winSize.innerWidth-t.offsetLeft+e.offsetWidth;return this.winSize.innerWidth<=i}},{key:"isVertical",value:function(t,e,i,o,r){var n=this.docSize.docScrollTop+(r?o:0)>=t,f=e<=(r?this.docSize.docScrollBottom-this.winSize.innerHeight:this.docSize.docScrollBottom);return n&&f}},{key:"updateVisibility",value:function(t){var e=this;t.arrVisible=[],t.qSelector=this.q(t.selector),t.visible=!1,t.offsetTop=this.getObjSize(t.areas[0][0]).offsetTop,t.arrVisible=t.areas.map((function(i){var o=e.getObjSize(i[0]).offsetTop-(t.selector?e.getObjSize(t.selector).offsetHeight+(t.offsetExtra||0):0),r=e.docSize.docHeight-e.getObjSize(i[1]).offsetTop+(t.selector?e.getObjSize(t.selector).offsetHeight+(t.offsetExtra||0):0)-e.getObjSize(i[1]).offsetHeight,n=e.isVertical(o,r,t.selector?e.getObjSize(t.selector).offsetHeight:0,t.offsetExtra,t.peekaboo),f=!t.horizontal||!e.isHorizontal(e.getObjSize(i[0]),e.getObjSize(i[1]));return n&&f})),t.visible=t.arrVisible.some((function(t){return t})),t.callback&&t.callback()}},{key:"forEachObj",value:function(){var t=this;this.arrObjs.forEach((function(e){t.updateVisibility(e)}))}},{key:"startListening",value:function(){var t=this;["DOMContentLoaded","scroll","resize"].forEach((function(e){return window.addEventListener(e,(function(){return t.forEachObj()}))}))}},{key:"event",value:function(t,e,i){var o=this;Array.isArray(this.arrObjs)&&setTimeout((function(){o.arrObjs.filter(e).forEach((function(e){e.qSelector&&e.qSelector.addEventListener(t,(function(t){t.preventDefault(),i&&i.call(null,e,o)}))}))}),100)}}])&&e(o.prototype,r),Object.defineProperty(o,"prototype",{writable:!1}),t}();window.viewSelf=i,window.Visibility=o})();