import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";

const ComForm = ({onSubmit, id}) => {
    const [data, setData] = useState({
        author: "",
        comment: "",
    });

    const submitFormCom = e => {
        e.preventDefault();
        const formDataCom = new FormData();
        formDataCom.append('news_id', id);
        Object.keys(data).forEach(key => formDataCom.append(key, data[key]));
        onSubmit(formDataCom);
    };

    const inputChangeCom = e => {
        const {name, value} = e.target;
        setData(prev => ({...prev, [name]: value}));
    };

    return (
        <form onSubmit={submitFormCom}>

            <TextField
                fullWidth
                variant="outlined"
                label="author"
                style={{margin: '30px 0'}}
                name="author"
                value={data.author}
                onChange={inputChangeCom}
            />

            <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                style={{margin: '30px 0'}}
                label="comment"
                name="comment"
                value={data.comment}
                required
                onChange={inputChangeCom}
            />

            <Button type="submit" color="primary" variant="contained">comment</Button>

        </form>
    );
};

export default ComForm;