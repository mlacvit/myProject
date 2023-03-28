import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from "tss-react/mui";
import {Avatar, Container, Grid, Typography, Link, Alert} from "@mui/material";
import {LockOpenOutlined} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {clearLoginErrors, loginUserData} from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#535353 !important",
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: `${theme.spacing(2, 0)} !important`,
    },
    alert: {
        margin: theme.spacing(3, 0),
        width: '100%',
    }
}));

const Login = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.users.loginLoading);
    const error = useSelector(state => state.users.loginError);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        return () => {
            dispatch(clearLoginErrors());
        }
    }, [dispatch]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        dispatch(loginUserData({...user}));
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlined/>
                </Avatar>
                <Typography component="h1" variant="h6">
                    Sign In
                </Typography>

                {
                    error && (
                        <Alert severity="error" className={classes.alert}>
                            {error.error}
                        </Alert>
                    )
                }

                <Grid component="form" onSubmit={submitFormHandler} container spacing={2}>
                    <Grid item xs={12} sx={{marginTop: '10px'}}>
                        <FacebookLogin text="Login with facebook"/>
                    </Grid>

                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', color: ''}}>
                        or
                    </Grid>

                    <FormElement
                        required={true}
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={inputChangeHandler}
                    />

                    <FormElement
                        type="password"
                        required={true}
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                    />

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            loading={loading}
                            disabled={loading}
                        >
                            Sign In
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </div>

            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link component={RouterLink} to="/register">
                        You're dont have an account? Sign Up
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;