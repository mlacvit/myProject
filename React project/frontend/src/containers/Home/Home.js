import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchGalleriesData, fetchGalleryByIdData} from "../../store/actions/galleryActions";
import {Box, Grid, LinearProgress} from "@mui/material";
import GalleriesCard from "../../components/GalleriesCard/GalleriesCard";
import Modal from "../../components/UI/Modal/Modal";
import OneGallery from "../../components/OneGallery/OneGallery";

const Home = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.galleries.fetchGalleriesLoading);
    const galleries = useSelector(state => state.galleries.galleries);
    const gallery = useSelector(state => state.galleries.gallery);
    const user = useSelector(state => state.users.user);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(fetchGalleriesData());
    }, [dispatch]);

    const getModalInfo = id => {
        setShow(true);
        dispatch(fetchGalleryByIdData(id));
    };

    const closeModal = () => {
      setShow(false);
    };

    return loading ? <LinearProgress color="secondary" />: (
        <Box>
            <Grid container direction="column" spacing={2}>
                {loading
                    ? <Box sx={{textAlign: 'center'}}>Loading ...</Box>
                    : <Grid item container sx={{marginLeft:'10px'}} spacing={3}>
                        {galleries &&
                            (galleries.map(gallery => (
                            <GalleriesCard
                                key={gallery._id}
                                id={gallery._id}
                                title={gallery.title}
                                publish={gallery.publish}
                                image={gallery.image}
                                user={gallery.user}
                                login={user}
                                clicked={() => getModalInfo(gallery._id)}
                            />
                        )))}
                    </Grid>
                }
            </Grid>
            <Modal show={show} clicked={closeModal}>
                {gallery && (
                    <OneGallery
                        key={gallery._id}
                        image={gallery.image}
                        user={gallery.user}
                        title={gallery.title}
                        clicked={closeModal}
                    />
                )}
            </Modal>
        </Box>
    );
};

export default Home;