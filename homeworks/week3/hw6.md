## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
- `<a href="" target=""></a>` 超連結，設定網址後可點擊至其他頁面。
- `<img src="" alt=""/>` 放圖片。
- `<form action="" method=""></form>` 表單，提交資料用。

## 請問什麼是盒模型（box modal）
- HTML 的元素可視為一方塊，此方塊的組成包含 content、padding、border、margin。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
|display    |inline          |block  |inline-block   |
|-----------|:---------------|:------|:--------------|
|height     |no              |yes    |yes            |
|width      |no              |yes    |yes            |
|padding    |yes             |yes    |yes            |
|line-break |no              |yes    |no             |
|margin     |left and right  |all    |all            |

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
- `static`：預設的位置。
- `relative`：用於設定與預設位置的偏移距離。
- `absolute`：定位點為上一層非 static 的元素（規定為找上層可被定位的元素，因為 static 不算可被定位，而 fixed 通常用於特殊狀況，所以才多設上層為 relative ），用於設定更新定位點後的位置。
- `fixed`：用於固定在頁面的某處（無論卷軸如何移動）。
