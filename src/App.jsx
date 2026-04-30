// 「TodoItem」という関数を「TodoItem」というファイルから借りてくる。
import TodoItem from "./TodoItem";
// useStateを使うためにreactから借りてくる。
import { useState } from "react";
// Appという部品を作る。
function App(){
  // 「todos=現在のToDoリスト(配列)＜現在の引き出しの中身＞」、「setTodos=リストを書き換えるためのスイッチ」
  // 最初は、usestateの記憶の引き出しの中に（牛乳を買う）、（勉強する）が入っている。
  const [todos,setTodos]=useState([
    // 名前（text）と状態（done）を持たせる
    {text:"牛乳を買う", done:false},
    {text:"勉強する",   done:false}
  ]);
  // 「input=今の入力欄」「setInput=入力欄を自動で切り替えるリモコン」「useState("")=記憶の引き出しが空白の状態からスタート」
  const [input,setInput]=useState("");
    // addTodoというタスクを追加する関数。追加ボタンを押されると実行される。
    function addTodo(){
    // もしも入力欄が空白なら、以下の関数は実行しない
    if(input==="") return;
    // 「...todos=今のTODOリストをばらばらに展開（スプレッド構文）」「input=新しいタスク」
    // 今までのタスクに新しいタスクを追加して、(setTodos)で画面の自動更新をする。
    // 入力欄の文字を名前(text)として保存。状態（done）を最初はfalseで保存し、タスクを追加。
    setTodos([...todos,{ text:input, done:false}]);
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
    // 選択されたタスクの追跡番号から、状態（done）を切り替える関数。
    function toggleTodo(index){
      // タスクから一つずつ出して、todoという名札と番号（i）のラベルをつける。それらをnewTodosの箱へ入れる。
      // クリックされたタスクか、番号（iとindex）を基にチェック。クリックされたタスクは、一度出して、状態（done）だけ変えて新しい箱に入れる。
      const newTodos=todos.map((todo,i)=>{
        // .mapで貼った番号ラベルの数字がクリックされたタスクの番号と同じかチェック。
        if(i===index){
          // 箱（todo）から一度textとdoneを机の上に出して、doneを変えて（falseかtrueか）、新しい箱に入れて返す。
          return{ ...todo, done: !todo.done};
        }
        // チェックに引っかからなかったほかのタスクはそのまま返す。
        return todo;
      });
      // 状態を変更した新しいリストをreactへ送る（自動的に画面を更新する）。
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
        {/* 現在のToDoリスト（todos）から一つずつ取り出して、todo（名札）とindex（番号）のラベルを張り付けていく。（繰り返し処理）
        「todo=オブジェクト（データ）」→「todo(text,done),index」を張り付ける加工を.mapがtodos（現在のToDoリスト）すべてに一つずつおこなう。 */}
          {todos.map((todo, index)=>(
            // 一行分の部品。一行の　以下がpropsの中身。荷物の一覧。「props=AppからTodoItemへの贈り物の荷物（材料や道具）たち」
            // AppからTodoItemへ材料や道具を送っている。右がApp.jsxの材料。左がTodoItemで受け取る箱（場所）。
            <TodoItem
            // 番号を(key)という箱に入れて送る。key=Reactが見失わないための追跡番号。indexの番号は変わる（追跡番号ではない。順番の方が近い？）
            key={index}
            // todoというデータ(text,done)をTodoItemへ送る。
            todo={todo}
            // タスクについた番号をTodoItemへ知らせる。
            index={index}
            // toggleTodo関数を、TodoItemのonToggleという道具で呼び出せるようにする
            onToggle={toggleTodo}
            // remove関数を、TodoItemのonRemoveという道具で呼び出せるようにする
            onRemove={removeTodo}
            />
          ))}
      </ul>
    </div>
  );
}
// APPという部品をほかのファイルでも使えるようにする公開設定。
export default App;
// Reactは何回関数を実行したか分かっている。関数を実行して表示したテキストへ、削除や変更を感知できるように一時的な追跡番号をつけ、
// 関数が実行されるたび、違いをすぐ感知して、変わった部分のみ変更する。

// React難しい。JSのコードを短縮・省略・効率化しているように感じる。

