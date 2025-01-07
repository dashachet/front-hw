import Button from '@mui/material/Button';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import * as React from 'react';
import TextField from '@mui/material/TextField';

type Props = {
    addItem:(title: string)=>void

};

export const AddItemForm = ({addItem}: Props) => {
    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (itemTitle.trim() !== '') {
            addItem(itemTitle.trim())
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }
    const styles= {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px'}

    return (
        <div>
            <TextField
                error={!!error}
                id="outlined-basic"
                label={error ? "Title is required" : "Type smth..."}
                variant="outlined"
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
                value={itemTitle}
            size="small"/>

            <Button variant="contained" onClick={addItemHandler} size="small"  style={styles}>+</Button>

        </div>
    );
};