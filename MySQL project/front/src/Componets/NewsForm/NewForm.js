import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";

const NewsForm = ({onSubmit}) => {
    const [data, setData] = useState({
        title: "",
        content: "",
        image: "",
    });

    const submitForm = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));
        onSubmit(formData);
    };

    const inputChange = e => {
        const {name, value} = e.target;
        setData(prev => ({...prev, [name]: value}));
    };

    const fileChange = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setData(prev => ({...prev, [name]: file}));
    };

    return (
        <form onSubmit={submitForm}>

            <TextField
                fullWidth
                variant="outlined"
                label="title"
                style={{margin: '30px 0'}}
                name="title"
                value={data.title}
                onChange={inputChange}
            />

            <TextField
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                style={{margin: '30px 0'}}
                label="content"
                name="content"
                value={data.content}
                required
                onChange={inputChange}
            />

            <TextField
                type="file"
                name="image"
                style={{margin: '30px 0', display: 'block'}}
                onChange={fileChange}
            />

            <Button type="submit" color="primary" variant="contained">post</Button>

        </form>
    );
};

export default NewsForm;