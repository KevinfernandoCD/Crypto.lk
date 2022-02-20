import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../Context';

const Coin = () => {

 const {id} = useParams();
 
 const[coin, setCoin] = useState([]);

 const {currency,symbol} = CryptoState();

 const fetchSigleCoin = async () => {

    const {data} =  await axios.get(SingleCoin(id));

    setCoin(data);
 }


 const useStyles = makeStyles((theme)=>({

    container:{
        display:"flex",
        [theme.breakpoints.down("md")]:{
            flexDirection:"column",
            alignItems:"center",
        },
    },

    sidebar:{
        width:"30%",
        [theme.breakpoints.down("md")]:{
            width:"100%",
        },
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        marginTop:150,
        borderRight:"2px solid grey"
    },
    heading:{
        fontWeight:"bold",
        marginBottom:20,
        fontFamily:"Montserrat"
    },
    description: {
        width: "100%",
        fontFamily: "Montserrat",
        padding: 30,
        paddingBottom: 15,
        paddingTop: 10,
        textAlign: "justify",
    },
    marketData:{

        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        [theme.breakpoints.down("md")]: {
          display: "flex",
          justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
          alignItems: "start",
        },
    },
    
    load:{

        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"Translate(-50%,-50%)",

    }

 }))

 const classes = useStyles();

 useEffect(() => {
    fetchSigleCoin();
},[])

if(coin.length === 0) return <div className={classes.load}><CircularProgress color="secondary" /></div>
    return (<div className={classes.container}>
        <div className={classes.sidebar}>
        <img src={coin?.image?.large} alt={coin?.id} height="200"style={{marginBottom:20}}/>
        <Typography variant='h3' className={classes.heading}>{coin?.id}</Typography>
        <React.Fragment><Typography className={classes.description}>{coin?.description?.en.split(". ")[0]}</Typography></React.Fragment>
        <div className={classes.marketData}>
            <span style={{display:"flex"}}>
                <Typography variant='h5' className={classes.heading}>Rank : </Typography>&nbsp; &nbsp;
                <Typography variant='h5' style={{fontFamily:"Montserrat",}}>{coin?.market_cap_rank}</Typography>
            </span>
            <span style={{display:"flex"}}>
                <Typography variant='h5' className={classes.heading}>Current Price : </Typography>&nbsp; &nbsp;
                <Typography variant='h5' style={{fontFamily:"Montserrat",}}>{coin?.market_data?.current_price[currency]==null? "Select a currency":`${symbol} ${coin?.market_data?.current_price[currency].toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}`}</Typography>
            </span>
            <span style={{display:"flex"}}>
                <Typography variant='h5' className={classes.heading}>Market Cap : </Typography>&nbsp; &nbsp;
                <Typography variant='h5' style={{fontFamily:"Montserrat",}}>{coin?.market_data?.market_cap[currency] === undefined? "Select a currency":`${symbol} ${coin?.market_data?.market_cap[currency].toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}`}</Typography>
            </span>
        </div>
        </div>
        <div>
            <CoinInfo coin={coin}/>
        </div>
    </div> );
}
 
export default Coin;