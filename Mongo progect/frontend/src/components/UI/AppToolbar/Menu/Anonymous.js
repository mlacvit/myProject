import React from 'react';
import {Link} from "react-router-dom";
import {Button, Grid} from "@mui/material";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    authButton: {
        color: '#fff',
        transition: 'all 0.2s',
        ":last-child": {
            marginLeft: '10px'
        },
        '&:hover': {
            opacity: '0.8'
        }
    },
}));

const Anonymous = () => {
    const {classes} = useStyles();

    return (
        <Grid container display="flex" alignItems="center">
            <Button component={Link} to="/login" className={classes.authButton}>
                Sign In
            </Button>
            <Button component={Link} to="/register" className={classes.authButton}>
                Sign Up
            </Button>
        </Grid>
    );
};

export default Anonymous;