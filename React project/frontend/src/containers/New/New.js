import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Container, Grid, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import CollectionsIcon from '@mui/icons-material/Collections';
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import FormInput from "../../components/UI/Form/FormInput/FormInput";
import FileInput from "../../components/UI/Form/FileInput/FileInput";
import {createGalleryData} from "../../store/actions/galleryActions";

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

const New = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);

    const [gallery, setGallery] = useState({
        title: '',
        image: '',
    });

    const inputChangeGallery = e => {
        const {name, value} = e.target;
        setGallery(prev => ({...prev, [name]: value}));
    };

    const submitFormGallery = e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(gallery).forEach(key => {
            formData.append(key, gallery[key]);
        });
        dispatch(createGalleryData(formData));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setGallery(prevState => ({...prevState, [name]: file}));
    };

    const getFieldErrorGallery = fieldName => {
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
                    <CollectionsIcon/>
                </Avatar>

                <Typography component="h1" variant="h6">
                    new gallery
                </Typography>

                <Grid
                    component="form"
                    onSubmit={submitFormGallery}
                    container
                    spacing={2}
                >
                    <FormInput
                        required={true}
                        label="Title"
                        name="title"
                        value={gallery.title}
                        error={getFieldErrorGallery('title')}
                        onChange={inputChangeGallery}
                    />
                    <Grid item>
                        <FileInput
                            required={true}
                            label="Image"
                            name="image"
                            onChange={fileChangeHandler}
                            error={getFieldErrorGallery('image')}
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
                            create
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default New;