import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import {ToastContainer} from "react-toastify";
import {AppBar, Container, Grid, Toolbar, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles()(theme => ({
    appbar: {
        backgroundColor: "#666666",
        padding: '10px 0'
    },
    mainLink: {
        color: 'inherit',
        marginLeft: '10px',
        letterSpacing: '1px',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        },
    },
    staticToolbar: {
        marginBottom: theme.spacing(2)
    },
    logo: {
        width: '50px',
    },
}));

const AppToolbar = () => {
    const {classes} = useStyles();
    const user = useSelector(state => state.users.user);

    return (
        <>
            <AppBar position="fixed" className={classes.appbar}>
                <ToastContainer/>
                <Toolbar>
                    <Container>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="h4">
                                <Link to="/" className={classes.mainLink}>
                                    Cocktails
                                </Link>
                            </Typography>

                            <Grid item display="flex" alignItems="center">
                                {user ? <UserMenu user={user}/> : <Anonymous/>}
                            </Grid>
                        </Grid>
                    </Container>

                </Toolbar>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};

export default AppToolbar;