import React from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {apiUrl} from "../../config";

const CardNews = ({title, image, date, content}) => {
    return (
        <Card sx={{ margin: '20px', minWidth: '200px', }}>
            <CardActionArea>
                {image === null || image === 'null'
                    ? <div style={{minHeight: 200, width: 720}}></div>
                    : <CardMedia
                        component="img"
                        height="400"
                        style={{minHeight: 400, width: 720}}
                        image={`${apiUrl}/uploads/${image}`}
                    />
                }
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        <i>{date}</i>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardNews;