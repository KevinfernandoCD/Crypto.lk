import React, {createContext, useContext, useEffect, useState } from 'react';

const Crypto = createContext();

export const Context = ({children}) => {

    const [currency, setCurrency] = useState("USD");
    const [symbol,setSymbol] = useState("$"); 

    useEffect(() => {

        if(currency === "usd") setSymbol("$")
        else if (currency === "lkr" ) setSymbol("LKR.")
    },[currency])


    return ( 
        <Crypto.Provider value={{currency, setCurrency, symbol}}>
            {children}
        </Crypto.Provider>
     );
}
 

export const CryptoState = () => {

    return useContext(Crypto);

}