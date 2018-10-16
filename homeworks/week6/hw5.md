## 請說明 SQL Injection 的攻擊原理以及防範方法
- 原理：攻擊者可以透過特殊字串拼接，順利執行惡意的 SQL 指令，讓資料庫的內容被更改或破壞。
- 例子：
    1. `"SELECT * FROM users WHERE name = '-name'`，若輸入 `'OR 1-1--`，SQL 指令拼接後成為 `"SELECT * FROM users WHERE name = ''OR 1-1--'`，可使攻擊者不用帳號密碼下仍順利登入。
    2. 加入 `；DROP TABLE users`，可刪除資料。
- 防範：
    1. 參數化查詢（先執行 SQL 指令才填入參數）
        ```php
        $stmt = $dbh->prepare("INSERT INTO REGISTRY (name, value) VALUES (:name, :value)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':value', $value);
        ```
    2. 限制權限：只有管理者才可以刪除資料等
    3. 檢核和驗證輸入的內容：例如拒絕特殊符號、二進位資料等

## 請說明 XSS 的攻擊原理以及防範方法
- Cross-Site Scripting（跨站腳本攻擊）
- 定理：網頁被置入經過設計的惡意代碼，若沒經過過濾，惡意代碼就可以被執行（瀏覽器無法分辨真偽）。
- 舉例：攻擊者可以改變網頁內容、取得用戶的資訊等。
- 來源：用戶輸入的內容、POST 參數、URL 參數、Referer、Cookie
- 解法：處理用戶輸入的值，例如用 escapeHTML() 轉換、也要注意連結，`更好的方式是用通用的轉義庫`
- 分類：
    1. 儲存型 XSS：將惡意 code 提交到數據庫，瀏覽器載入網頁就會執行惡意代碼。
    2. 反射型 XSS：將惡意 code 存在 URL，用戶打開連結就會執行惡意代碼。
    3. DOM 型 XSS：由 JavaScript 執行惡意代碼。
- 思考：
    在哪個階段過濾是需要考慮的，過早轉義（例如存入資料庫前），可能反而造成亂碼（通常是在輸出的時候才轉換）。
    可以從避免HTML被他方代碼注入考量，
    嚴謹的執行 JavaScript，避免執行惡意代碼
    及考量安全措施：限制輸入長度、禁止外部連結或內容等都可以減少被攻擊的風險

##### 參考
[【基本功】 前端安全系列之一：如何防止XSS攻击？](https://mp.weixin.qq.com/s/kWxnYcCTLAQp5CGFrw30mQ)


## 請說明 CSRF 的攻擊原理以及防範方法
> - Cross-Site Request Forgery 跨站偽造請求
> - 指不同的 domain 可以在真正的使用者處於`登入狀態`的時候取得使用者的身分，偽造出由本人發出的 request。
> - 例如使用者點選外部連結或者瀏覽網站，就觸發了新的請求，而這些請求會自動帶入使用者的資訊，讓惡意網站取得使用者的身分。
### 防禦方法
> CSRF 通常發生在第三方域名。（1, 5）
> CSRF 無法拿到真的 Cookie，只是冒用身分執行。（2, 3, 4）
> - 主要還是需要由 server 端檢查請求是否是同一個來源（增加驗證而不是只要瀏覽器帶入 sessionID 就信任其請求）
> 1. 檢查 Referer（由 request header 帶來的位址）。
> 2. 加上驗證碼 （其他網站無法得知真的密碼）。
> 3. 使用者帶入由 server 隨機產生的 token（不會存在 Cookie 內），server 檢查和自己資料庫內的是否一致。
> 4. Double Submit Cookie：由 Client 自己設定 cookie 及 token。（其他網站無法設定相同來源的cookie）。
> 5. SameSite Cookie：由瀏覽器提供的功能，會自動擋掉不是相同 domain 的請求。
> 6. 嚴格限制上傳的檔案類型，且不直接使用上傳的內容，而是經過轉存再重新顯示


## 請舉出三種不同的雜湊函數（hash function）
- 雜湊函數的功能是將任意內容轉換為固定位元的雜湊值（hash value），為單向轉換，無法從雜湊值推回原本的內容。
##### compare：加密可轉換回原本的內容
1. SHA 家族：160bits
2. MD5：128bits（32個16進位的數字）
3. BLAKE2：512bits

##### 參考：
[加密和雜湊有什麼不一樣？](https://blog.m157q.tw/posts/2017/12/25/differences-between-encryption-and-hashing/)

## 請去查什麼是 Session，以及 Session 跟 Cookie 的差別
### 1. Cookie
- 伺服器提供存取的空間，在規範下的網域下會自動在 request 中帶入使用者的資訊。

### 2. Session
- 可用大樓管理員給訪客通行證的例子來說明，server 會給訪客通行證（可以利用 cookie 存取），透過瀏覽器帶上資訊，伺服器確認身分，可以維持雙方（client 和 server）的連線狀態。透過檢查通行證保持連線的方式都可以算是 Session 機制。
##### Session 和 cookie 並非兩種方式，而是 Session 可以利用 Cookie 保存資訊的方式維持雙方連線（Session 是機制，cookie 是瀏覽器提供的工具）。
##### 有些比較會說 Session 是將資訊存在伺服器端， cookie 是由客戶端提供資訊，但是兩者似乎不是這樣比較的，舉 cookie-based session 為例，提供了將資訊由 cookie 帶入，減少伺服器的負擔，但本質還是要讓雙方連線的 session 機制。

##### 參考：
[Web 技術中的 Session 是什麼？](http://fred-zone.blogspot.com/2014/01/web-session.html)

## `include`、`require`、`include_once`、`require_once` 的差別
- 同：`include`和`require`都是把原本的檔案複製過來，有`_once`的可以確保不會重複引入。
|type|include|require|
|----|-------|-------|
|檔案不存在|繼續執行|停止執行|
|執行次數|要用到就讀取一次|只讀取一次，一次編譯完成後代換本身|
|用法|要用到的地方再寫|寫在 code 開頭|
|要判斷時|可用（有回傳值）|不可以用
|適用|函式庫、動態隨程式變動的類型|靜態內容

#####參考：
[php引用檔案的函數區別(require,require_once,include,include_once)](https://sanji0802.wordpress.com/2008/02/25/php%E5%BC%95%E7%94%A8%E6%AA%94%E6%A1%88%E7%9A%84%E5%87%BD%E6%95%B8%E5%8D%80%E5%88%A5requirerequire_onceincludeinclude_once/)
[【php】include、include_once、require、require_once的区别](https://blog.csdn.net/yongh701/article/details/47972483)
