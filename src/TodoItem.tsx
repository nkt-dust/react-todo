// Todo(オブジェクト)の中身のtext,done（プロパティ）の型を宣言(設計図)
interface Todo{
    text:string;
    done:boolean;
}
// TodoItemが受け取るprops(引数)の設計図
interface TodoItemProps{
    // todoオブジェクトはTodoと同じ型宣言（text,done）
    todo:Todo;
    // indexには数字が入るという型宣言
    index:number;
    // 「onToggle=App.tsxから借りてきた道具（関数）」引数indexは数字と型宣言。なにも返さない。
    onToggle:(index:number)=>void;
    // 「onREmove=App.tsxから借りてきた道具（関数）」引数indexは数字と型宣言。なにも返さない。
    onRemove:(index:number)=>void;
}
// TodoItemという関数引数に（todo,index,onToggle,onRemove）を受ける。
// 分割代入「()の中に｛｝で包んで入れること」→届いた荷物（オブジェト、引数）を（）内の種類に分けて、いつでも出せるようにして包む。
// 上のTodoItemProps設計図の型宣言が適用される
function TodoItem({todo,index,onToggle,onRemove}:TodoItemProps){
    // 以下のものを画面に写すように設計図を返す。
    return(
        // リストのテキストを表示する。
        <li
            // そのタスクの行がクリックされたら、(index)の追跡番号のタスクの状態(done)をtrueかfalseか切り替える。
            onClick={()=>onToggle(index)}
            // タスクの状態がtrueであれば、Cssの(textDecoration)を使ってタスクに打ち消し線を引く（完了の印）。falseなら線を引かない。
            // マウスのカーソルがタスクの行の上に乗ると、指の形になる。CSSのデザインを使う行。
            style={{textDecoration:todo.done ?"line-through" : "none",cursor:"pointer"}}
            >
                {/* todoのテキストを表示 */}
                {todo.text}
                {/* 削除ボタンをクリック（イベント＝e）されると、クリックの情報をボタン（子）が入っている親のタスクの行にまでいかないように止める。
                クリックされた削除ボタンの行のタスクを削除する。 */}
                <button onClick={(e)=>{e.stopPropagation();onRemove(index);}}>削除</button>
        </li>
    );
}
// TodoItemを他のファイルでも使えるようにする。
export default TodoItem;