import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {ChangeEvent, useState} from "react";


// type Props = {
//     oldTitle: string
//     addItem:(title: string)=>void
// };
// export const EditableSpan = ({oldTitle,addItem}: Props) => {
//     const [edit, setEdit] = useState(false);
//     const [newTitle, setNewTitle] = useState(oldTitle)
//
//     const editHandler=()=>{
//         setEdit(!edit)
//         if(edit){
//             addItemHandler()
//         }
//
//     }
//
//     const onChangeHandler=(event: ChangeEvent<HTMLInputElement>) => {
//         setNewTitle(event.currentTarget.value)
//     }
//
//     const addItemHandler = () => {
//         addItem(newTitle)
//     }
//
//     return (
//         edit
//             ? <input
//             autoFocus={true}
//                 value={newTitle}
//                 onBlur={editHandler}
//                 onChange={onChangeHandler}
//             />
//             : <span onDoubleClick={editHandler}>{oldTitle}</span>
//
//     );
// };
 type Props = {
     title: string;
     addItem:(title: string)=>void
 }

export const EditableSpan = ({title, addItem}: Props) => {
    const [edit, setEdit] = useState(false);
    const [itemTitle, setItemTitle] = useState('')


    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }
    const onEditMode = () => setEdit(true);
    const offEditMode = () =>{
       addItem(itemTitle)
        setEdit(false)} ;
    return (  edit ? <input
    value={itemTitle}
    autoFocus
    onBlur={offEditMode}
    onChange={changeItemTitleHandler}/> : <span onDoubleClick={onEditMode}>{title}</span> )
}