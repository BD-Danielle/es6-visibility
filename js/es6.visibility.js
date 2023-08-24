/*
 * ========================================================================
 * Visibility 1.3.1
 * The target was hidden or shown when window scroll to the specified area
 * YILING CHEN
 * Copyright 2023, MIT License
 * How to use it:
 * see README.md
 * ========================================================================
 */
var viewSelf = {};

class Visibility{
  constructor(id, arrObjs){
    viewSelf[id] = this;
    this.arrObjs = arrObjs;
  }
  
  get scrSize(){// Return the detailed size of user screen
    return {
      width: screen.width || screen.availWidth, 
      height: screen.height || screen.availHeight
    };
  }

  get winSize(){// Return the detailed size of user window
    return {
      innerWidth: window.innerWidth,    // width without scrollbar-x
      innerHeight: window.innerHeight,  // height without scrollbar-y
      outerWidth: window.outerWidth,    // width with scrollbar-x
      outerHeight: window.outerHeight   // height without scrollbar-y
    };
  }

  get docSize(){// Return the detailed size of user document
    const docElement = document.documentElement;
    const docBody = document.body;
    
    const docHeight = Math.max(
      docBody.scrollHeight || docBody.clientHeight,
      docElement.scrollHeight || docElement.clientHeight
    );

    const docScrollTop = docElement.scrollTop || document.scrollingElement.scrollTop;
    const docScrollBottom = docHeight - docScrollTop;

    return {
      docHeight,
      docScrollTop ,
      docScrollBottom
    };
  }
  q(str){
    const elements = document.querySelectorAll(str);
    if (elements.length === 1) {
      return elements[0];
    }
    return Array.from(elements);
  }
  getObjSize(str) {
    if (!str) return;
    const node = this.q(str);
  
    if (!node) return;
  
    let offsetLeft = 0;
    let offsetTop = 0;
    let currentNode = node;
  
    while (currentNode) {
      offsetLeft += currentNode.offsetLeft;
      offsetTop += currentNode.offsetTop;
      currentNode = currentNode.offsetParent;
    }
  
    const offsetHeight = node.offsetHeight;
    const offsetWidth = node.offsetWidth;
  
    return {
      offsetLeft,
      offsetTop,
      offsetHeight,
      offsetWidth
    };
  };
  getDOMRect(str) {
    if (!str) return;
    const node = this.q(str);
    if (!node) return;
    const {top, right, bottom, left, width, height, x, y} = node.getBoundingClientRect();
    return {top, right, bottom, left, width, height, x, y};
  }
  isHorizontal(elementRange) {
    const leftElementSize = this.getObjSize(elementRange[0]);
    const rightElementSize = this.getObjSize(elementRange[1]);
    const availableWidth = this.winSize.innerWidth - leftElementSize.offsetLeft + rightElementSize.offsetWidth;
  
    return this.winSize.innerWidth <= availableWidth;
  }
  isVertical(elementRange, offsetParent, offsetExtra, peekaboo) {
    const offsetTop = offsetParent ? this.getObjSize(offsetParent).offsetHeight + (offsetExtra ? offsetExtra : 0) : 0;
    const pointA = this.getObjSize(elementRange[0]).offsetTop - offsetTop;
    const pointB = this.docSize.docHeight - this.getObjSize(elementRange[1]).offsetTop + offsetTop - this.getObjSize(elementRange[1]).offsetHeight;
    
    const isAbovePointA = this.docSize.docScrollTop + (peekaboo ? offsetExtra : 0) >= pointA;
    const isBelowPointB = pointB <= (peekaboo ? this.docSize.docScrollBottom - this.winSize.innerHeight : this.docSize.docScrollBottom);
    
    return isAbovePointA && isBelowPointB;
  }
  updateVisibility(obj) {
    obj.arrVisible = [];
    obj.qSelector = this.q(obj.selector);
    obj.visible = false;
    obj.offsetTop = this.getObjSize(obj.areas[0][0]).offsetTop;
  
    obj.areas.forEach((area, index) => {
      obj.horizVisible = obj.horizontal && this.isHorizontal(area) ? false : true;
      if (this.isVertical(area, obj.selector, obj.offsetExtra, obj.peekaboo)) {
        obj.arrVisible[index] = true;
        obj.visible = true;
      } else {
        obj.arrVisible[index] = false;
        obj.visible = false;
      }
    });
  
    if (obj.areas.length >= obj.arrVisible.length && obj.arrVisible.some(visible => visible == true)) {
      obj.visible = true;
    }
    
    if (obj.areas.length >= obj.arrVisible.length && obj.arrVisible.every(visible => visible == false)) {
      obj.visible = false;
    }
    
    obj.callback && obj.callback();
  };
  
  forEachObj() {
    this.arrObjs.forEach(obj => {
      this.updateVisibility(obj);
    });
  };
  start(){
    ["DOMContentLoaded", "scroll", "resize"].forEach(c=>window.addEventListener(c, ()=>this.forEachObj()));
  }
  event(listener, condition, callback){
    if(Object.prototype.toString.call(this.arrObjs) !== "[object Array]") return;
    setTimeout(()=>{
      this.arrObjs.filter(condition).forEach(c1=>{
        c1.qSelector && c1.qSelector.addEventListener(listener,(event)=>{
          event.preventDefault();
          callback && callback.call(null, c1, this);
        })
      })
    }, 100)
  }
}
window.viewSelf = viewSelf;
window.Visibility = Visibility;