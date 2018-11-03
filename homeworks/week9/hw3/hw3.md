- JavaScript 是單線程執行（single threaded）的程式語言，程式碼會以 stack 的順序被執行（只會執行 Call Stack 區 的任務）。
- 但為了實現不同步的事件需求，瀏覽器提供一個計時兼存放的 Web APIs，讓 callback function 可以排隊進入 Task queue 區。
- 瀏覽器會不斷檢查 Call Stack 區和 Task queue 區，但優先順序是 Call Stack 區都執行完畢後才會把 Task queue 區的任務移致 Call Stack 區執行。
- 這五個任務的執行順序：先執行位於 main() 面的 `console.log(1)`、`console.log(3)`、`console.log(5)`，再執行 `setTimeout()` 內的callback function。
#### 圖
1. 依照程式碼的順序放入 Call Stack，`setTimeout()`進入 Web APIs。
2. Web APIs 的任務會依照順序排入 Task queue （先 2 再 4），Call Stack 執行完 `console.log(1)` 後執行 `console.log(3)`。
3. Call Stack 全部執行完後依序執行 Task queue 區
4. Call Stack 全部執行完後依序執行 Task queue 區
5. 結束
#### 參考：[[筆記] 理解 JavaScript 中的事件循環、堆疊、佇列和併發模式（Learn event loop, stack, queue, and concurrency mode of JavaScript in depth）](https://pjchender.blogspot.com/2017/08/javascript-learn-event-loop-stack-queue.html)