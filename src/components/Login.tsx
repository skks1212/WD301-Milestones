import { navigate } from "raviger";
import React, { useState } from "react";
import { API } from "../utils/api";
import { input_style } from "./Form";

const defaulltcredentials = {
    username : "",
    password : ""
}

export default function Login () {
    
    const [credentialState, setCreds] = useState(defaulltcredentials);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = credentialState.username;
        const password = credentialState.password;
        try {
            const data = await API.user.login(username, password);
            localStorage.setItem('auth-token' , data.token);
            //navigate('/');
            window.location.href = '/';
        } catch (error) {
            console.log(error);
            setErrorMessage("Invalid Email / Password");
        }
    };

    return (
        <div className="w-[400px] ml-[calc(50%-200px)]">
            <h1 className="text-5xl font-bold" tabIndex={0}>
                Login
            </h1>
            <br/>
            <br/>

            <form onSubmit={(e)=>handleSubmit(e)}>
                {errorMessage && <div tabIndex={0}>{errorMessage}</div>}
                <input
                    type="text"
                    className={input_style}
                    onChange={e=>{
                        setCreds({
                            ...credentialState,
                            username : e.target.value
                        })
                    }}
                    name = "username"
                    placeholder = "Username"
                    value={credentialState.username}
                />
                <br/>
                <input
                    type="password"
                    className={input_style}
                    onChange={e=>{
                        setCreds({
                            ...credentialState,
                            password : e.target.value
                        })
                    }}
                    placeholder = "Password"
                    name = "password"
                    value={credentialState.password}
                />
                <br/>
                <button className="bg-blue-700 rounded-xl px-6 py-3 font-bold hover:bg-blue-800 transition hover:rounded-xl">
                <i className="far fa-arrow-right-to-arc"></i> Login
                </button>
            </form>
        </div>
    )
}