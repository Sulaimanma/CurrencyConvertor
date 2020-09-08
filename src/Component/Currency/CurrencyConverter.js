import React, {useEffect, useState} from "react";
import "./ConverterCSS.css"
import CurrencyRow from "./CurrencyRow";
import useAxios from "axios-hooks";
import axios from "axios";

function CurrencyConventer() {
    const BASE_URL="https://api.exchangeratesapi.io/latest"

    const[{data,loading,error,response,res},refetch]=useAxios({method:'GET',url:{BASE_URL},})
    const [currencyOptions,setCurrencyOptions]=useState([])
    const [fromCurrency,setFromCurrency]=useState()
    const [toCurrency,setToCurrency]=useState()
    const [amount,setAmount]=useState(1)
    const [fromFlag,setFromFlag]=useState(true)
    const [exchangeRate,setExchangeRate]=useState()
    const RATE_URL=`${BASE_URL}?base=${fromCurrency}&symbol=${toCurrency}`
    console.log(exchangeRate)

    let fromAmount,toAmount
    if(fromFlag){
        fromAmount=amount
        toAmount=amount*exchangeRate
    }
    else {
        toAmount=amount
        fromAmount=amount/exchangeRate

    }
    useEffect(()=>{
        // axios.get(`https://api.exchangeratesapi.io/latest`)
        //     .then(res=> {
        //         console.log(res.data.base)
        //         console.log(res.data.rates)
        //     })
        refetch(BASE_URL)
            .then(res=>{
                setCurrencyOptions([res.data.base,...Object.keys(res.data.rates)])
                setFromCurrency(res.data.base)
                setToCurrency(Object.keys(res.data.rates)[0])
                setExchangeRate(res.data.rates[Object.keys(res.data.rates)[0]])
            })
    },[])

    useEffect(()=>{
        if(fromCurrency!=null && toCurrency!=null){
            refetch(RATE_URL)
                .then(res=>{
                    if(toCurrency==='EUR'){
                        setExchangeRate(1)
                    }
                    else{
                        setExchangeRate(res.data.rates[toCurrency])
                    }

                })
        }


    },[fromCurrency,toCurrency])

    function handleChangeFromAmount(e){
        setFromFlag(true)
        setAmount(e.target.value)
    }
    function handleChangeToAmount(e){
        setFromFlag(false)
        setAmount(e.target.value)
    }
    return (
        <>
            {loading&&<p>Loading...</p>}
            {error&& <p>{error}</p>}
            <h1>Converter</h1>
            <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={(e)=>setFromCurrency(e.target.value)}
               onChangeAmount={handleChangeFromAmount}
                amount={fromAmount}
            />
            <div className={"equal"}>=</div>
            <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={(e)=>setToCurrency(e.target.value)}
                onChangeAmount={handleChangeToAmount}
                amount={toAmount}
            />

        </>
    );
}

export default CurrencyConventer;
