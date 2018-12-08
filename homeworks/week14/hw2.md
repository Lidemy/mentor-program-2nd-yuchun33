## 為什麼我們需要 Redux？
> - 有一個共用的資料庫可以使用，解決 props drilling 的問題，而增加的 container、action、reducer 等更多規範可以讓程式更嚴謹。

## Redux 是什麼？
> - 一個 library，提供了一種程式設計規範，讓資料可以存在一個定義好的 store 內，使用者可以用定義好的 connect()、actiontype，（簡化/複雜化）要注意的細節。
> - 不一定要和 react 一起使用，但一起用滿合適的（背後的原理是把一切再包在一個大　component 裡面？）

## Single Page Application 是什麼？有哪些頁面一定要用這個架構去設計嗎？
> - 頁面變化不會重新 request，只是畫面在變。
> - 想要服務不中斷的網站就需要 SPA，例如音樂網站。

## Redux 如何解決非同步（例如說 call API 拿資料）的問題
> - 用 middleware