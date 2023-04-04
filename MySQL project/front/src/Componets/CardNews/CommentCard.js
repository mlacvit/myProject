import React from 'react';
import {Button, Card, CardContent, Typography} from "@mui/material";

const CommentCard = ({author, comment, delClick}) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {comment}
                </Typography>
                <Button size="small" variant="contained" color="error" onClick={delClick}>delete</Button>
            </CardContent>
        </Card>
    );
};

export default CommentCard;