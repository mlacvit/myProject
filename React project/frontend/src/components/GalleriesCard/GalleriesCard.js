import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddLinkIcon from '@mui/icons-material/AddLink';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteIcon from '@mui/icons-material/Delete';
import {CardActionArea, Link, Typography} from "@mui/material";
import {apiUrl} from "../../config";
import {useDispatch} from "react-redux";
import {
    deleteGalleryData,
    publishGalleryData
} from "../../store/actions/galleryActions";

const GalleriesCard = ({user, image, title, publish, clicked, login, id}) => {
    const dispatch = useDispatch();

    return (
        <Card sx={{ maxWidth: 345, margin: '10px'}}>
            <CardActionArea onClick={login !== null ? clicked : null}>
                <div style={{display: 'flex', alignItems: 'center', margin: '10px'}}>
                    <Avatar alt={user.displayName} src={apiUrl + '/' + user.avatar} variant="rounded"/>
                    <CardHeader
                        title={user.displayName}
                        subheader={title}
                    />
                </div>
                <CardMedia
                    component="img"
                    height="194"
                    image={apiUrl + '/' + image}
                    alt={title}
                />
            </CardActionArea>
            {login?.role === 'admin'
                    ? <CardActions disableSpacing>

                        <IconButton onClick={() => {
                            dispatch(deleteGalleryData(id))
                        }}>
                            <DeleteIcon fontSize="large" sx={{color: 'red'}}/>
                        </IconButton>
                        {publish === true
                            ? null
                            : <IconButton onClick={() => {
                                dispatch(publishGalleryData(id))
                            }}>
                                <PublishIcon fontSize="large" color="primary"/>
                            </IconButton>
                        }
                        <Typography variant="body1" color="text.secondary" textAlign="center" fontSize="14px">
                            {publish ? 'published' : 'unpublished'}
                        </Typography>
                      </CardActions>
                    : null
            }
        </Card>
    );
};

export default GalleriesCard;