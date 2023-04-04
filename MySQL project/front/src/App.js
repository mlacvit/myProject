import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from "./Componets/UI/Layout/Layout";
import Home from "./Componets/Home/Home";
import OneNews from "./Componets/OneNews/OneNews";

const App = () => {
  return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/:id" exact component={OneNews}/>
          <Route render={() => <h1>Not Found</h1>}/>
        </Switch>
      </Layout>
  )
};

export default App;

