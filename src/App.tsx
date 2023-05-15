import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import {Container} from "@mui/material";

function App() {

    return (
        <div className="App">
            <Header/>
            <Container className="home-container" maxWidth="md">
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
