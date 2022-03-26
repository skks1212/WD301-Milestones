import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import AppContainer from './AppContainer';
import { Home } from './components/Home';
import { Form } from './components/Form';

interface stateData {
    name : string,
    form : any
};

function App() {

    const initState : stateData = {
        name : "HOME",
        form : null
    }

    const [state, setState] = useState(initState);

    const SetHomeState = () => {
        setState(initState)
    }

    const SetFormState = (formID : number) => {
        setState({
            name : "FORM",
            form : formID
        });
    }

    return (
        <AppContainer>
            <Header title={"Form Builder"} />
            {
                state.name === 'HOME' ? (
                    <Home stateCB={SetFormState}/>
                    
                ) : (
                    <Form stateCB={SetHomeState} formState={state.form}/>
                )
            }
        </AppContainer>
    );
}

export default App;
