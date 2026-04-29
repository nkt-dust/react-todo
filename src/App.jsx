// useStateを使うためにreactから借りてくる。
import { useState } from "react";
// Appという部品を作る。
function App(){
  // 「todos=現在のToDoリスト(配列)＜現在の引き出しの中身＞」、「setTodos=リストを書き換えるためのスイッチ」
  // 最初は、usestateの記憶の引き出しの中に（牛乳を買う）、（勉強する）が入っている。
  const [todos,setTodos]=useState(["牛乳を買う","勉強する"]);
  // 「input=今の入力欄」「setInput=入力欄を自動で切り替えるリモコン」「useState("")=記憶の引き出しが空白の状態からスタート」
  const [input,setInput]=useState("");
    // addTodoというタスクを追加する関数。追加ボタンを押されると実行される。
    function addTodo(){
    // もしも入力欄が空白なら、以下の関数は実行しない
    if(input==="") return;
    // 「...todos=今のTODOリストをばらばらに展開（スプレッド構文）」「input=新しいタスク」
    // 今までのタスクに新しいタスクを追加して、(setTodos)で画面の自動更新をする。
    setTodos([...todos,input]);
    // 入力欄を空白で上書き。（入力欄のリセット）
    setInput("")
    }
    // (index)の追跡番号のタスクを削除する関数。削除ボタンを押されると実行。
    function removeTodo(index){
      // 今のタスク（todos）の中から、一つずつふるいにかけて条件に合うかチェックしていく。条件に合うもの以外の新しいリスト（newTodos）を作成する。
      // タスクを一つとって、タスクの番号（i）がindex(今回削除の対象の番号)ではない（!==）場合newTodosに入れる。
      // 「_」は本当はなにかデータが入る場所だが、今回はなにも入らないという意味（今回は番号だけのフィルターなので、タスクの内容は不要なため）。
      // 「i=indexの略、数字が入る」「!==は（～ではない）という意味」
      const newTodos=todos.filter((_,i) =>i !==index);
      // 「newTodos=削除したタスク以外のタスクのリスト」setTodosでReactへ送り、画面の更新をする。
      setTodos(newTodos);
    }
  {/* <div>以下の設計図を画面に返す（表示する）。関数が実行されるたびに最新のデータをもとに、設計図をつくる。
  Reactはその設計図を前回のものと比較し、変化のある部分だけ変更して表示する。 */}
  return(
    // 全体を包む箱。次の｛｝までHTML。
    <div>
      {/* タイトル（画面に文字が表示） */}
      <h1>ToDoリスト</h1>
      {/* 箇条書きリストの開始 */}
      {/* 入力欄の作成 */}
      <input
      // 「input=現在のタスク」「value=入力欄の中に今表示されているテキスト」
      // 入力欄が変化する度に（追加ボタンが押されなくても）stateに記憶して、入力欄に表示。
        value={input}
        // 「onChange」＝入力欄の内容が変化したら｛｝内を実行する。「e=イベント」
        // （e.target.value）=イベントが起きた、入力欄の最新の文字（value）をstateとして画面を更新（setInput）
        onChange={e=>setInput(e.target.value)}
        />
        {/* 追加ボタンがクリックされると、「addTodo」関数が実行される。タスクの追加。 */}
        <button onClick={addTodo}>追加</button>
      <ul>
        {/* {}内はJS。「todos.map(...)=」todos（配列）から中身を一つずつ取り出して加工
        （todoという名札をつけて、追跡ラベル＜何回目に実行された中身かの番号＞を貼る）
        するという命令。.map=全自動コピー機*/}
        {/* （todo,index）=todo：中身、index：その中身の追跡番号。一時的な管理番号。mapへの加工の指示*/}
        {/* 「=>」＝アロー関数。下の行の形に変形させる。 */}
        {/* <li>HTMLのリストへの表示の指示。（JSの中にHTMLのコードがある。）「key={index}」=Reactへと伝える管理番号（追跡番号）。
        indexの番号のtodoがテキストとしてリストに表示される。
        todoの名札が貼られた中身の中から、適する追跡番号を貼られたテキストを表示。 */}
        {todos.map((todo,index)=>(
          // index(タスクの追跡番号)に対応するタスクがリストに表示される。
          <li key={index}>
            {todo}
            {/* 削除ボタンがクリックされると、indexの番号に応じたタスクが削除される（removeTodoの実行）。 */}
            <button onClick={()=>removeTodo(index)}>削除</button>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
// Reactは何回関数を実行したか分かっている。関数を実行して表示したテキストへ、削除や変更を感知できるように一時的な追跡番号をつけ、
// 関数が実行されるたび、違いをすぐ感知して、変わった部分のみ変更する。

