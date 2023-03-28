import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "../AppToolbar/AppToolbar";

const Layout = ({children}) => {
    return (
        <>
            <CssBaseline/>
            <AppToolbar/>
            <main>
                <Container maxWidth="lg" sx={{marginTop: '90px'}}>
                    {children}
                </Container>
            </main>
        </>
    );
};

export default Layout;