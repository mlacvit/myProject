import React from 'react';
import FacebookButton from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookIcon from '@mui/icons-material/Facebook';
import {Button} from "@mui/material";
import {FacebookId} from "../../config";
import {useDispatch} from "react-redux";
import {facebookLoginData} from "../../store/actions/usersActions";

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const responseFacebook = async response => {
        await dispatch(facebookLoginData(response));
    };

    return (
        <FacebookButton
            appId={FacebookId}
            fields="name,email,picture"
            callback={responseFacebook}
            render={props => (
                <Button
                    fullWidth
                    color="primary"
                    variant="outlined"
                    startIcon={<FacebookIcon/>}
                    onClick={props.onClick}
                >
                    Enter with Facebook
                </Button>
            )}
        />
    );
};

export default FacebookLogin;