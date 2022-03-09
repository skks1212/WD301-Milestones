import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import AppContainer from './AppContainer';

const formFields = [
    {
        label : "First Name",
        type : "text"
    },
    {
        label : "Last Name",
        type : "text"
    },
    {
        label : "Email",
        type : "email"
    },
    {
        label : "Phone Number",
        type : "number"
    },
    {
        label : "Date of Birth",
        type : "date"
    }
]

function App() {
    return (
        <AppContainer>
            <Header title={"Welcome to Lesson 5 of $react-typescript with #tailwindcss"} />
            {
                formFields.map((field,i) => 
                    (
                        <div key = {i} className="box-border">
                            <label htmlFor={"input_"+field.label} className="m-2 mb-2 block">{field.label}</label>
                            <input type={field.type} name={field.label} id={"input_"+field.label} className='border-2 border-gray-200 rounded-lg p-2 m-2 mt-0 w-[calc(100%-1rem)]' />
                        </div>
                    )
                )
            }
            <input type="submit" className='cursor-pointer p-2 m-2 bg-blue-500 text-white rounded-lg'/>
        </AppContainer>
    );
}

export default App;
