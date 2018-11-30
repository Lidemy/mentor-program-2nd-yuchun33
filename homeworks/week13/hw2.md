## React Router 背後的原理你猜是怎麼實作的？
> - Router 新增了一些標籤，透過標籤傳遞狀態，再透過 React 的特性，狀態改變就會更新 UI，好聰明的想法。
> - 如何傳遞狀態：在 <Link> 裡面會設路徑，這個路徑會進到 Router 內部存資訊的地方， Router 的內部會後觸發狀態改變，就會重新 render，而要 render 的內容由 <Route> 決定。
> - React Router 其實也是 React 元件，設定的 URLpath 就是在傳 props 改變 state。再把第一句話重新說就是：Router 新增了一些 標籤 **（元件）**，透過標籤傳遞狀態 **（傳 props）**，再透過 React 的特性，狀態 **（state 改變）** 改變就會更新 UI。
#### 參考：[react-router的实现原理](http://zhenhua-lee.github.io/react/history.html)

## SDK 與 API 的差別是什麼？
> - SDK（Software Development Kit） 軟體開發套件：內部運作
> - API（Application Programming Interface）應用程式介面：外部接口
> - 例如使用套件要用規定的語法，語法就是 API，套件就是 SDK。

## 在用 Ajax 的時候，預設是不會把 Cookie 帶上的，要怎麼樣才能把 Cookie 一起帶上？
> - request 的 header 要設定 `xhrFields: {withCredentials: true}`
> - server 端也要開權限 `Access-Control-Allow-Credentials`
#### 參考：[Ajax跨域請求，無法傳遞及接收cookie資訊](https://www.itread01.com/content/1542687266.html)