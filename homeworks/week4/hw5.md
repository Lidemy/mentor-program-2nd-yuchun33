# 什麼是 DOM？
- DOM 為 Document Object Model 的縮寫。
- Document 的來源是瀏覽器解析的網頁內容，瀏覽器會將文件的結構轉換為 DOM tree。
- 瀏覽器提供一個介面(API)讓開發者可以用物件的方式操控 Document 的內容，例如 `querySelector()`、`innerHTML`。

# 什麼是 Ajax？
- Asynchronous JavaScript and XML
- 目的是讓網頁頁面不用重新渲染就可以修改畫面及內容。
- 原理：原本是所有的需求都要回到伺服器處理，但 Ajax 技術讓瀏覽器（例如：允許 JavaScript 在瀏覽器上執行）可以處理需求。
- 用 `XMLHttpRequest 物件` 和伺服器互動，達成擷取資料但不用刷新頁面的需求。

# HTTP method 有哪幾個？有什麼不一樣？
- HTTP 是 HyperText Transfer Protocol （超文本傳輸協定）的縮寫，其中的協定即代表連線應遵守一致的規則。
- HTTP 以統一介面提供 Web 元件之間傳輸與操作，藉此達到與資源的互動 [參考](https://notfalse.net/43/http-request-method)。
- method 為請求方法，Client 端針對不同的 `目的` 與 `期望結果` 發出不同的請求方法，任何資源都有相同的請求方法。
* * *
1. GET：取得資料。
2. HEAD：取的資料，但伺服器只回傳表頭。
3. OPTION：client 端可指定特定的通訊要求，例如指定的 URL。
4. TRACE： 沿著路徑 loop-back test ()。
###### 以上為安全方法，不會對伺服器造成危害或資源異常。
* * *
###### 以下為非安全方法，可改變、刪除資源。
1. POST：新增資料，會不斷增加相同的資料。
2. PUT：新增資料，但會覆蓋過去相同的。
7. PATCH：類似PUT，但允許只修改部分的資料。
8. DELETE：刪除資料。
9. CONNECT：可建立雙向通訊。

# GET 跟 POST 有哪些區別，可以試著舉幾個例子嗎？
|Method|GET|POST|
|:-----:|------|------|
參數傳遞方式|QueryString|POST Data|
用途|檢視|新增資料|
自動重送|會，若回應過常會重發請求|不會，請求發出後會一直等待|
安全性|參數是網址的一部分|較難破解|
參數大小限制|有|無|
瀏覽器歷史紀錄|參數會被記錄|參數不會被記錄|
加入書籤|參數會被記錄|參數不會被記錄|
重新載入|會從快取重新執行(?)|數據重新提交|
執行速度|比POST快
快取(快取什麼？)|瀏覽器會依據網址快取|瀏覽器不會快取|
適用|`<link href=''>`、`<img src=''>`、`<script src=''>`|`<form>`

### 參考：
[HTTP GET 與 POST 的比較及使用時機](https://jax-work-archive.blogspot.com/2014/02/http-get-post-compare-and-use-opportunity.html)

# 什麼是 RESTful API？
- REST 是 Representational State Transfer 縮寫，透過操作(動詞)不同的 URL(名詞) 達成不同的資料(表徵)呈現方式。
- RESTful 是指設計原則符合 REST 的理念。
- RESTful 善用 HTTP 的 method 顯示資源，將原本需要由開發者寫的函式或功能改為用 method 操作。
    /api/get_file/ ( 得到檔案 ) → GET /api/files/
    /api/upload_file/ ( 新增檔案 ) → POST /api/files/

### 參考：
[淺談 REST 軟體架構風格 (Part.I) - 從了解 REST 到設計 RESTful！](https://blog.toright.com/posts/725/representational-state-transfer-%E8%BB%9F%E9%AB%94%E6%9E%B6%E6%A7%8B%E9%A2%A8%E6%A0%BC%E4%BB%8B%E7%B4%B9-part-i-%E5%BE%9E%E4%BA%86%E8%A7%A3-rest-%E5%88%B0%E8%A8%AD%E8%A8%88-restful%EF%BC%81.html)
[認識 RESTful API](https://github.com/twtrubiks/django-rest-framework-tutorial/tree/master/RESTful-API-Tutorial)

### note：
看了很久還是不太懂，感覺是透過 method 可以讓網址變得單純(?)

# JSON 是什麼？
- 一種資料格式
- `key` 是字串

# JSONP 是什麼？
- 利用 `<script>` 可跨域的特性，使用者可以透過請求 `<script>` 可以拿到遠端寫在 JavaScript 內的資料。

# 要如何存取跨網域的 API？
- 設定跨來源資源共享(Cross-Origin Resource Sharing)，Server 端須在 Response 的 Header 加上 `access-control-allow-origin: *`。
- 或者需由使用者端提供特殊的標頭，若吻合 Server 端接受的 Request Header 或 Method 就可以拿到跨域的資源。
