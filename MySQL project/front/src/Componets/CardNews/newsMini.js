import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {apiUrl} from "../../config";

const NewsMini = ({title, image, date, moreClick, delClick}) => {
    return (

        <Card sx={{ maxWidth: 345 }}>

            {image === 'null' || image === null
                ? <div style={{minHeight: 400, width: 720}}></div>
                : <CardMedia
                    component="img"
                    height="400"
                    style={{minHeight: 400, width: 720}}
                    image={apiUrl + '/uploads/'+ image}
                />
            }
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {date}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" color="success" onClick={moreClick}>Learn More</Button>
                <Button size="small" variant="contained" color="error" onClick={delClick}>delete</Button>
            </CardActions>
        </Card>
    );
};

export default NewsMini;