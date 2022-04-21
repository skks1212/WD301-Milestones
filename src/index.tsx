import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import reportWebVitals from './reportWebVitals';

if(process.env.REACT_APP_SENTRY_DSN){
    Sentry.init({
        dsn: "https://610049c566044466bcf6eb2ae305fec3@o1213328.ingest.sentry.io/6352446",
        integrations: [new BrowserTracing()],
      
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}


ReactDOM.render(
    //Removed strict mode due to bugs.
    //<React.StrictMode>
        <App />
    //</React.StrictMode>,
    ,document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
