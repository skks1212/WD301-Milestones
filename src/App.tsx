import React, { useEffect, useState } from 'react';
import './App.css';
import AppRouter from './router/AppRouter';
import { User } from './types/UserTypes';
import { API } from './utils/api';
import { checkUser } from './utils/user';

function App() {

    const [userData, setUserData] = useState<User>({username : "", name : "", url : ""})

    useEffect(()=>{ 
       checkUser(setUserData);
    },[]);
    return <AppRouter currentUser = {userData}/>;
}

export default App;
