import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteNewsData, getNewsData, postNewsData} from "../../store/actions/newsAction";
import {CircularProgress, Fab} from "@mui/material";
import {useHistory} from "react-router-dom";
import NewsMini from "../CardNews/newsMini";
import AddIcon from '@mui/icons-material/Add';
import NewForm from "../NewsForm/NewForm";

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const newsData = useSelector(state => state.reducerOne.data);
    const loading = useSelector(state => state.reducerOne.loading);
    const error = useSelector(state => state.reducerOne.error);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(getNewsData(''));
    }, [dispatch]);

    const showMoreInformation = id => {
        history.replace('/' + id)
    };

    const onSubmitToServer = async data => {
        await dispatch(postNewsData(data));
        await dispatch(getNewsData());
        setShow(false);
    };

    const deleteNewsForever = async id => {
        await dispatch(deleteNewsData(id));
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '30px',
                    flexDirection: 'column'
                }}
            >
                <Fab color="primary" aria-label="add" onClick={() => setShow(!show)}>
                    <AddIcon/>
                </Fab>
                {show
                    ? <div style={{width: '30%'}}>
                        <NewForm onSubmit={onSubmitToServer}/>
                    </div>
                    : null
                }
            </div>
            {loading === true
                ? <CircularProgress
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%'
                    }}
                />
                : null
            }
            {newsData !== null
                ? newsData.map(news => (
                        <div  key={news.id}>
                            <NewsMini
                                title={news.title}
                                date={news.date}
                                image={news.image}
                                moreClick={() => showMoreInformation(news.id)}
                                delClick={() => deleteNewsForever(news.id)}
                            />
                        </div>
                    ))
                : null
            }
        </div>
    );
};

export default Home;