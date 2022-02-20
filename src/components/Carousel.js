import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import axios from 'axios';
import { TrendingCoins } from '../config/api';
import { CryptoState } from '../Context';
import { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme)=>({

caroucel:{

    height:"50%",
    display:"flex",
    alignItems:"center"

},

caroucelItem : {
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    cursor:"pointer",
    textTransform:"uppercase",
    color:"white",

}

}))

const Caroucel = () => {

    const [trending, setTrending] = useState([]);

    const classes = useStyles();

    //IMPORTING THE CONTEXT CURRENCY

    const {currency,symbol}  = CryptoState();

    //FETCH THE TRENDING COINS

    const fetchTrendingCoins = async () => {


    const {data} = await axios.get(TrendingCoins(currency))

    setTrending(data); 
    
    };

    useEffect(()=>{
        fetchTrendingCoins();
    },[currency]);



    const profit = (price) =>{

        let sign = ""

        if(price >= 0){

            sign = "+"

        }

        return sign;

    }

    const numbersWithCommas = (price) => {
        //THIS IS A REGEX TO CONVERT STRING INTO DECIMAL COMMAS

        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");

    }

    const items = trending.map(coin => <Link className={classes.caroucelItem} to={`/coins/${coin.id}`}>
        <img src={coin?.image} alt={coin.name} height="80" style={{marginBottom:10}}/>
        <span>{coin?.symbol}
        &nbsp;
        <span style={{color: coin?.price_change_percentage_24h >= 0? "green":"red",fontWeight:"bold"}}>{profit(coin?.price_change_percentage_24h)}{coin?.price_change_percentage_24h.toFixed(2)}%</span> 
        </span>
        <span style={{fontSize:22, fontWeight:500,marginLeft:10}}>{symbol}{numbersWithCommas(coin?.current_price.toFixed(2))}</span>
    </Link>)

    //CREATING A RESPONSIVE ONBJECT TO SHOW ADD A VALUE TO THE RESPONSIVE PROP IN ALICE CAROUSEL

    const responsive ={
        0:{
            items:2
        },
        512:{
            items:4,
        }
    }

    return ( <div className={classes.caroucel}>
        <AliceCarousel  mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} disableDotsControls responsive={responsive} autoPlay items={items} disableButtonsControls />
    </div> );
}
 
export default Caroucel;