## CSS 預處理器是什麼？我們可以不用它嗎？
- 讓 CSS 可以用更像程式的方式編寫，例如用變數存常用的設定值、用階層的方式定義類別、用函數的設定樣式等等。但這樣的寫法需要透過 CSS 預處理器編譯成 CSS 檔案才可以使用。
- 可以不要用，但用了通常會比較方便也比較好維護。

## 請舉出任何一個跟 HTTP Cache 有關的 Header 並說明其作用。
> 1. `expire:2019-01-01`：若時間沒有超過 2019-01-01 就不會發 request。
> 2. `cache-control:max-age=31536000`：若距離上次的 request 沒有超過一年就不會發 request。
> 3. `cache-control:no-store`：不要任何快取，每次都要發新的 request。
> 4. `cache-control:no-cache`：若請求的內容沒有更改就不要發 request，但有更改就要更新。
#### Q：這樣看起來直接選擇用 no-cache，可以發送最少的請求但又可以保證內容最新，滿完美的(?，會有不符合這個需求的狀況需要設定別種 cache-control 嗎？
(忘了存檔改過的)

## Stack 跟 Queue 的差別是什麼？
- Stack：執行的順序是後進先出，例如 JavaScript 的 Call Stack 是用 Stack 的順序執行。
- Queue：執行的順序是先進先出，例如 JavaScript 的 Task Queue 是用 Queue 的順序執行。

## 請去查詢資料並解釋 CSS Selector 的權重是如何計算的（不要複製貼上，請自己思考過一遍再自己寫出來）
#### 會計算每一個條件所符合的 abcd 個數

類別|內容
:------:|----
a| 基本元素（`div`、`li`、`span` 等等）<br>預設元素（pseudo element，例如：`::after`、`::before`、`::first-letter`、`::first-line`）
b|`class`<br>屬性<br>預設選擇器（pseudo-selectors，例如：`::first-child`、`::active`、`::hover`）
c| `ID`
d| inline style
例外|`!Important` 會蓋過一切<br>*+>~沒有分數  
計算方式|**轉換成 dcba**<br>例如 1 個 `class` 和一個 `div` 的分數是 0011，1 個 `ID` 加上 2 個 `class` 的分數是 0120，後者會比前者分數高  

#### 參考：
> [強烈推薦收藏好物 – CSS Specificity (CSS 權重一覽)](http://muki.tw/tech/css-specificity-document/)
> [CSS Specificity 權重說明](https://shunnien.github.io/2017/05/31/css-specificity/)