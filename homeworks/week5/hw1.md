資料庫名稱：comments

| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
|  num  |    integer   | 留言序號|
|  id |   integer   | 留言 id     |
| content   | text | 留言內容  |
| timestamp | time | 留言時間  |
| parent    | interger | 若為第一層為0, 子留言的上層為num |
