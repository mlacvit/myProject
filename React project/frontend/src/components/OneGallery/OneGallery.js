import React from 'react';
import CardHeader from "@mui/material/CardHeader";
import {Button, MenuItem, Typography} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";

import Card from "@mui/material/Card";
import {apiUrl} from "../../config";
import IconButton from "@mui/material/IconButton";
import {getLinkGalleryData} from "../../store/actions/galleryActions";
import AddLinkIcon from "@mui/icons-material/AddLink";
import {useDispatch} from "react-redux";
import {Link, NavLink} from "react-router-dom";

const OneGallery = ({image, title, user, clicked, link, publish, id}) => {
    const dispatch = useDispatch();
    return (
        <Card
            sx={{ width: 800, height: 650, margin: '10px', background: 'transparent'}}
        >
            <div>
                <CardMedia
                    component="img"
                    image={apiUrl + '/' + image}
                    alt={title}
                />
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px'}}>
                <CardHeader
                    title={user.displayName}
                    subheader={title}
                />
                <CardActions>
                    <Button onClick={clicked}>Close</Button>
                    <Typography variant="body1" color="text.secondary" textAlign="center" fontSize="14px">
                        {link === null && publish === false
                            ? <IconButton onClick={() => {
                                dispatch(getLinkGalleryData(id))
                            }}>
                                <AddLinkIcon fontSize="large" color="primary"/>
                            </IconButton>
                            : null
                        }
                    </Typography>
                    {link && (
                        link.map(l => (
                            <div key={l._id}>
                                <NavLink to={'/my-link'}>{l.image}</NavLink>
                            </div>
                        ))
                    )}
                </CardActions>
            </div>


        </Card>
    );
};

export default OneGallery;