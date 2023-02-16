
# ES6.Visibility
### 躲貓貓套件（延伸），頁面捲動時，可針對特定物件在某區段間的隱藏顯示。

## 開始使用：
```javascript
window.addEventListener('DOMContentLoaded', function () {
  var displayButton = function(){
    this.visible ? document.querySelector("#g").style.display = "flex": document.querySelector("#g").style.display = "none";
    this.visible ? document.querySelector(this.selector).style.backgroundColor = this.bgColor: 
    document.querySelector(this.selector).style.backgroundColor = "grey";

  }
  var changeBgColor = function(){
    this.visible ? document.querySelector(this.selector).style.backgroundColor = this.bgColor: 
    document.querySelector(this.selector).style.backgroundColor = "grey";
  }
  var arrObjs = [
    {selector: '#a', areas: [['#begin1', '#end1']], cb: changeBgColor, backgroundColor: "red"},
    {selector: '#b', areas: [['#begin2', '#end2']], cb: changeBgColor, backgroundColor: "orange"},
    {selector: '#c', areas: [['#begin3', '#end3']], cb: displayButton, backgroundColor: "yellow"},
    {selector: '#d', areas: [['#begin4', '#end4']], cb: changeBgColor, backgroundColor: "green"},
    {selector: '#e', areas: [['#begin5', '#end5']], cb: changeBgColor, backgroundColor: "blue"}
  ];
  var visibility = new Visibility(arrObjs);
  visibility.start();
  visibility.click(arrObjs);
})
```

## 參數配置：
### 如果頁面中，有多個特定物件 ( .class / #id )，建議在陣列裡新增物件，物件屬性必需包涵 `{selector: "#d", areas: [["#begin1", "#end1"]]}`，其餘屬性可自定義 `{selector: "#d", areas: [['#begin4', '#end4']], cb: changeBgColor, backgroundColor: "green"}`，每個區段都有起點與終點成對，如果起點與終點同時出現在 inner Window 其效果則會抵消。
