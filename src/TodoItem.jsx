// TodoItemという関数引数に（todo,index,onToggle,onRemove）を受ける。
// 分割代入「()の中に｛｝で包んで入れること」→届いた荷物（オブジェト、引数）を（）内の種類に分けて、いつでも出せるようにして包む。
function TodoItem({todo,index,onToggle,onRemove}){
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