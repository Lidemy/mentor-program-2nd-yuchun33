## 為什麼我們需要 React？可以不用嗎？
> 讓操作畫面變得更直觀，React 連接了資料和畫面，當資料（state）改變，畫面就會自動改變。相較之前需要自己判斷後再新增或刪除標籤，可以交給 React 處理。 
> 可以不要用，例如單純的靜態網頁不需要用，或者是元件關係很單純的時候也不用使用，自己寫反而比較快；反之，如果需要在狀態改變後調整畫面的時候就很適合用。

## React 的思考模式跟以前的思考模式有什麼不一樣？
> React 神奇的讓資料跟畫面連結了，以前是先寫好大致的 html 架構，再透過 JS 判斷改變的資料要不要調整架構，要不斷觀察資料和結構的關係，React 也觀察資料，但可以想像是用資料是否存在來決定元件是否存在。以前的寫法是每個頁面獨立，React 是透過元件組成不同頁面。

## state 跟 props 的差別在哪裡？
> 元件之間可能需要溝通，但不同元件的 state 不能直接修改，因此需要透過 props 傳送資訊。
> props 可以是值，也可以是 function，例如可以直接透過 props 傳送值給下層，下層可以連接上層的 function 改變上層的 state。

## 請列出 React 的 lifecycle 以及其代表的意義
> #### Mounting
> 元件被創造及填入至 DOM 的狀態，會依照下列的順序執行
> 1. constructor()：初始化 state 或者 連接 event，換言之若不需要前述功能就不需要 construstor。
> 2. static getDerivedStateFromProps()
> 3. render()
> 4. componentDidMount()：真的填入 DOM tree 的時候（適合請求的時機）
> #### Updating
> 元件的 props 或 state 被改變的時候，會依照下列的順序執行
> 1. static getDerivedStateFromProps()
> 2. shouldComponentUpdate(prevProps, prevState)：React 用來判斷前後的差異的時機，可以拿來優化，例如無差異就 return false，接下來的行為（render（）、componentDidUpdate())就不會執行
> 3. render()
> 4. getSnapshotBeforeUpdate()
> 5. componentDidUpdate(prevProps, prevState, snapshot)：狀態改變的時候
> #### Unmounting
> 元件從 DOM 移除時
> 1. componentWillUnmount()：即將從 DOM 移除的時候，可以用來清除設定，但千萬不要在這時候 setState，因為再也沒機會改變
> #### Error Handling
> 出錯的時候
> 1. static getDerivedStateFromError()
> 2. componentDidCatch()
