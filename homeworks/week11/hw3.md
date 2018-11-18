## 什麼是 MVC？
有兩種說法，相同的都是把顯示畫面跟操作邏輯拆開，讓程式碼更清楚、乾淨、安全、好維護，但定義 Model、View、Controller 的責任有些不同。
#### 參考[這篇文章](http://blog.turn.tw/?p=1539)
#### 傳統（真）MVC：
- Model：接收 Controller 傳遞的參數後交給 View
- View：需要和 Model 連結，Model 改變 View 會自動更新 （View 有監視 Model 的功能）
- Controller：只負責接收請求與參數後轉交給 Model
#### Model 2：
- Model：負責處理邏輯
- View：負責顯示畫面
- Controller：負責控制路徑(?，將請求與參數交給 Model，再把結果交給 View
#### 
- 作業使用的 Express 框架和 Model 2 相似，路徑會交給 Controllers，向資料庫取資料是 Model，ejs 負責顯示畫面
#### Q：handler 就是 Model 的角色嗎，一開始混亂了一下，只是一個通常會使用的命名嗎?

## 什麼是 ORM？
- Object-Relational Mapping（物件關聯映射），是將傳統的關聯式資料庫轉化成物件結構(? 的使用方式，優點是去除了重複的資料庫指令，讓操作更直觀簡易，更換資料庫系統也不用改變指令。
#### Q: ORM 是用物件的方式操作原本的關聯式資料庫 vs. noSQL 是用物件的關係儲存資料，已經離開關聯式資料庫了？
