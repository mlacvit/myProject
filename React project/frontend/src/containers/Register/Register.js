import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Container, Grid, Link, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {LockOutlined} from "@mui/icons-material";
import {clearRegisterErrors, registerUser} from "../../store/actions/usersActions";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import FormInput from "../../components/UI/Form/FormInput/FormInput";
import FileInput from "../../components/UI/Form/FileInput/FileInput";
import {Link as RouterLink} from "react-router-dom";
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
    }
}));

const Register = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);

    const [user, setUser] = useState({
        email: '',
        password: '',
        displayName: '',
        avatar: '',
    });

    useEffect(() => {
        return () => {
            dispatch(clearRegisterErrors());
        }
    }, [dispatch]);

    const inputChangeRegister = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    const submitFormRegister = e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(user).forEach(key => {
            formData.append(key, user[key]);
        });
        dispatch(registerUser(formData));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setUser(prevState => ({...prevState, [name]: file}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>

                <Typography component="h1" variant="h6">
                    Register
                </Typography>

                <Grid
                    component="form"
                    onSubmit={submitFormRegister}
                    container
                    spacing={2}
                >
                    <Grid item xs={12} sx={{marginTop: '10px'}}>
                        <FacebookLogin text="Login with facebook"/>
                    </Grid>

                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', color: ''}}>
                        or
                    </Grid>

                    <FormInput
                        required={true}
                        label="Email"
                        name="email"
                        value={user.email}
                        error={getFieldError('email')}
                        onChange={inputChangeRegister}
                    />
                    <FormInput
                        required={true}
                        type="password"
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={inputChangeRegister}
                        error={getFieldError('password')}
                    />
                    <FormInput
                        required={true}
                        label="Display Name"
                        name="displayName"
                        value={user.displayName}
                        error={getFieldError('displayName')}
                        onChange={inputChangeRegister}
                    />

                    <Grid item>
                        <FileInput
                            label="Avatar"
                            name="avatar"
                            onChange={fileChangeHandler}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            loading={loading}
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        >
                            Register
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </div>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link component={RouterLink} to="/login">
                        You're have an account? Sign In
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;