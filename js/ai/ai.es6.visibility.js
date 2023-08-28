/*
 * ========================================================================
 * Visibility 1.3.1
 * The target was hidden or shown when window scroll to the specified area
 * YILING CHEN
 * Copyright 2023, ISC License
 * How to use it:
 * see README.md
 * ========================================================================
 */
var viewSelf = {};
class Visibility {
  constructor(id, arrObjs) {
    viewSelf[id] = this;
    this.arrObjs = arrObjs;
    this.init();
  }

  init() {
    this.startListening();
    this.forEachObj();
  }

  get scrSize() {
    const { width, height, availWidth, availHeight } = screen;
    return {
      width: width || availWidth,
      height: height || availHeight,
    };
  }

  get winSize() {
    const { innerWidth, innerHeight, outerWidth, outerHeight } = window;
    return {
      innerWidth,
      innerHeight,
      outerWidth,
      outerHeight,
    };
  }

  get docSize() {
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
      docScrollTop,
      docScrollBottom,
    };
  }

  q(str) {
    const elements = document.querySelectorAll(str);
    return elements.length === 1 ? elements[0] : Array.from(elements);
  }

  getObjSize(str) {
    if (!str) return;
    const node = this.q(str);
    if (!node) return null;

    let offsetLeft = 0;
    let offsetTop = 0;
    let currentNode = node;

    while (currentNode) {
      offsetLeft += currentNode.offsetLeft;
      offsetTop += currentNode.offsetTop;
      currentNode = currentNode.offsetParent;
    }

    const { offsetHeight, offsetWidth } = node;

    return {
      offsetLeft,
      offsetTop,
      offsetHeight,
      offsetWidth,
    };
  }

  getDOMRect(str) {
    if (!str) return;
    const node = this.q(str);
    if (!node) return null;
    const { top, right, bottom, left, width, height, x, y } = node.getBoundingClientRect();
    return { top, right, bottom, left, width, height, x, y };
  }

  isHorizontal(leftElementSize, rightElementSize) {
    const availableWidth = this.winSize.innerWidth - leftElementSize.offsetLeft + rightElementSize.offsetWidth;
    return this.winSize.innerWidth <= availableWidth;
  }

  isVertical(pointA, pointB, offsetTop, offsetExtra, peekaboo) {
    const isAbovePointA = this.docSize.docScrollTop + (peekaboo ? offsetExtra : 0) >= pointA;
    const isBelowPointB = pointB <= (peekaboo ? this.docSize.docScrollBottom - this.winSize.innerHeight : this.docSize.docScrollBottom);
    return isAbovePointA && isBelowPointB;
  }

  updateVisibility(obj) {
    obj.arrVisible = [];
    obj.qSelector = this.q(obj.selector);
    obj.visible = false;
    obj.offsetTop = this.getObjSize(obj.areas[0][0]).offsetTop;
    obj.arrVisible = obj.areas.map((area) => {
      const pointA = this.getObjSize(area[0]).offsetTop - (obj.selector ? this.getObjSize(obj.selector).offsetHeight + (obj.offsetExtra || 0) : 0);
      const pointB = this.docSize.docHeight - this.getObjSize(area[1]).offsetTop + (obj.selector ? this.getObjSize(obj.selector).offsetHeight + (obj.offsetExtra || 0) : 0) - this.getObjSize(area[1]).offsetHeight;

      const vertVisible = this.isVertical(pointA, pointB, obj.selector ? this.getObjSize(obj.selector).offsetHeight : 0, obj.offsetExtra, obj.peekaboo);
      const horizVisible = !obj.horizontal || !this.isHorizontal(this.getObjSize(area[0]), this.getObjSize(area[1]));

      return vertVisible && horizVisible;
    });

    obj.visible = obj.arrVisible.some((visible) => visible);
    obj.callback && obj.callback();
  }

  forEachObj() {
    this.arrObjs.forEach((obj) => {
      this.updateVisibility(obj);
    });
  }

  startListening() {
    ["DOMContentLoaded", "scroll", "resize"].forEach((eventType) => window.addEventListener(eventType, () => this.forEachObj()));
  }

  event(listener, condition, callback) {
    if (!Array.isArray(this.arrObjs)) return;

    setTimeout(() => {
      this.arrObjs
        .filter(condition)
        .forEach((arrObj) => {
          if (arrObj.qSelector) {
            arrObj.qSelector.addEventListener(listener, (event) => {
              event.preventDefault();
              callback && callback.call(null, arrObj, this);
            });
          }
        });
    }, 100);
  }
}
window.viewSelf = viewSelf;
window.Visibility = Visibility;