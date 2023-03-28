import React from 'react';
import {useRouteMatch} from "react-router-dom/cjs/react-router-dom";
import Modal from "../../components/UI/Modal/Modal";

const Private = () => {
    const match = useRouteMatch();
    console.log(match)
    return (
        <Modal show={true}>
            <img src={`http://localhost:3000/${match.params.id}`} alt={`${match.params.id}`}/>
        </Modal>
    );
};

export default Private;