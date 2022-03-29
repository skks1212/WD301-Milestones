import React, { useState } from 'react';
import './App.css';
import AppRouter from './router/AppRouter';

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

    return <AppRouter />;
}

export default App;
