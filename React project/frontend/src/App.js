import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Layout from "./components/UI/Layout/Layout";
import Home from "./containers/Home/Home";
import New from "./containers/New/New";
import MyGallery from "./containers/MyGallery/MyGallery";
import Private from "./containers/Private/Private";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props}/> :
        <Redirect to={redirectTo}/>
};

const App = () => {
    const user = useSelector(state => state.users.user);
    return (
        <Layout>
            <Switch>
                <Route path=" /my-link" component={Private}/>
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <ProtectedRoute
                    isAllowed={user}
                    redirectTo="/"
                    path="/new-gallery"
                    component={New}
                />
                <ProtectedRoute
                    isAllowed={user}
                    redirectTo="/"
                    path="/my-gallery"
                    component={MyGallery}
                />

                <Route path="/:id" exact component={Home}/>
            </Switch>
        </Layout>
    );
};

export default App;