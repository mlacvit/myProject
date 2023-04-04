import React, {useEffect, useState} from 'react';
import {useRouteMatch} from "react-router-dom";
import {deleteNewsData, getNewsData, getOneNewsData, postNewsData} from "../../store/actions/newsAction";
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress, Fab} from "@mui/material";
import CardNews from "../CardNews/CardNews";
import {deleteCommentData, getCommentData, postCommentData} from "../../store/actions/commentAction";
import CommentCard from "../CardNews/CommentCard";
import AddIcon from "@mui/icons-material/Add";
import NewForm from "../NewsForm/NewForm";
import CommForm from "../NewsForm/CommForm";

const OneNews = () => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const one = useSelector(state => state.reducerOne.one);
    const comments = useSelector(state => state.reducerTwo.data);
    const loading = useSelector(state => state.reducerOne.loading);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(getOneNewsData(match.params.id));
        dispatch(getCommentData());
    }, [dispatch]);

    const onSubmitToServer = async data => {
        await dispatch(postCommentData(data));
        await dispatch(getOneNewsData(match.params.id));
        setShow(false);
    };
    const deleteComForever = async id => {
        await dispatch(deleteCommentData(id));
    };

    return (
        <div>
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
            {one !== null
                ? (
                    <div  key={one.id}>
                        <CardNews
                            title={one.title}
                            date={one.date}
                            image={one.image}
                            content={one.content}
                        />
                    </div>
                )
                : null
            }
            <h3>Comments:</h3>
            {comments !== null
                ? comments.map(com => {
                   if (com.news_id.toString() === match.params.id) {
                       return (
                           <CommentCard
                                key={com.id}
                                author={com.author}
                                comment={com.comment}
                                delClick={() => deleteComForever(com.id)}
                           />
                       )
                   }
                })
                : null
            }
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
                        <CommForm onSubmit={onSubmitToServer} id={match.params.id}/>
                    </div>
                    : null
                }
            </div>
        </div>
    );
};

export default OneNews;