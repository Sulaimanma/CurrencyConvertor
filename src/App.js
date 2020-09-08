import React, {useState} from 'react';

import './App.css';


import {userContext} from "./Component/Hook/userContext";

import Form from "./Component/FormHook/Form";
import CurrencyConventer from"./Component/Currency/CurrencyConverter"

function App() {
    const [state,setState]=useState("Shit happens sometime, but gone soon")

    return (
    <div className="App">
        {/*<userContext.Provider value={{state,setState}}>*/}
            <CurrencyConventer/>
        {/*</userContext.Provider>*/}
    </div>
  );
}

export default App;
