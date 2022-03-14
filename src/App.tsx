import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import AppContainer from './AppContainer';
import { Home } from './components/Home';
import { Form } from './components/Form';

function App() {

    const [state, setState] = useState("HOME");

    const SetHomeState = () => {
        setState("HOME")
    }

    const SetFormState = () => {
        setState("FORM")
    }

    return (
        <AppContainer>
            <Header title={"My React x Typescript abomination!"} />
            {
                state === 'HOME' ? (
                    <Home stateCB={SetFormState}/>
                    
                ) : (
                    <Form stateCB={SetHomeState}/>
                )
            }
        </AppContainer>
    );
}

export default App;
