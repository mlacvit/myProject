import React, {useState} from 'react';
import {Avatar, Button, Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../../../store/actions/usersActions";
import noPhoto from "../../../../assets/bg_template_01.png";
import {apiUrl} from "../../../../config";

const UserMenu = ({user}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    let cardImage = noPhoto;
    if (user.avatar) cardImage = user.avatar;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar alt={user.display_name} src={apiUrl + '/' + cardImage}/>

                <span className="userName" style={{color: 'white', margin: '0 10px', fontWeight: 'bolder'}}>
                        {user.displayName}
                    </span>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose} component={Link} to={'/new-gallery'}>Create gallery</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to={'/my-gallery'}>My gallery</MenuItem>
                <MenuItem onClick={() => dispatch(logoutUser())} component={Link} to={'/'}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;