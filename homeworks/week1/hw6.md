## 請解釋後端與前端的差異。
- **前端** 瀏覽器上使用者可看到的一切畫面，例如：排版、設計、動畫、表單等
- **後端** 處理、決定瀏覽器上顯示的畫面所需要的資料，例如：驗證資料、透過邏輯演算決定顯示的內容、連接資料庫、優化效能等

## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。
#### 瀏覽器的功能；向服務端發出請求，在瀏覽器上顯示選擇的資源
1. 瀏覽器接收 URL(Uniform Resource Locator)
    - 瀏覽器檢查 URL
    - 判斷協議類型
    - URL 安全檢查
2. 瀏覽器向本地網卡發送數據
    - 查詢 IP
    - 向 IP 位址發送數據
3. 數據從本機網卡傳送到服務端(server)
4. 服務端(server)收到數據
    - 判斷負載均衡、防止攻擊等
    - 進入網頁服務器(web server)
    - web server 用後端語言處理請求
    - 連接資料庫
5. 服務端處理完請求後透過網路將資源發回給瀏覽器
6. 瀏覽器顯示傳回的資源

#### 參考資料
- [从输入 URL 到页面加载完成的过程中都发生了什么事情？](http://fex.baidu.com/blog/2014/05/what-happen/)
- [How Browsers Work: Behind the scenes of modern web browsers](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#The_browser_main_functionality)


## 請列舉出 5 個 command line 指令並且說明功用
1. **ls** 列出該目錄下的所有檔案
2. **cd + 資料夾** 移動到新的目錄
3. **touch + 檔名** 開新檔案/修改檔案時間
4. **pwd** 現在的位置
5. **rm + 檔名** 刪除檔案 