import { CircularProgress, Container, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CoinList, TrendingCoins } from '../config/api';
import { CryptoState } from '../Context';
import { createTheme } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';


const CoinsTable = () => {

    const [coins,setCoins] = useState([])

    const [search,setSearch] = useState("");

    const [loading,setLoading] = useState(true);

    const {currency,symbol} = CryptoState();

    const [page,setPage] = useState(1);

    const history = useNavigate();

    const darkTheme = createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark"
        }
    });


    const fetchCoinList = async () => {

        setLoading(true)

        const {data} = await axios.get(CoinList(currency))

        setCoins(data);

        setLoading(false);

    }

    useEffect(()=>{

        fetchCoinList();
   

    },[currency])

    const valuesHandle  = (e) => {

        setSearch(e.target.value);

        if(search != ""){

            setPage(1);
        }
      
    }

const handleSearch = () => {

 return coins.filter(coin => (coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)));

}

const useStyles = makeStyles(() => ({

    row:{
        transition: "all 0.3s",
        cursor:"pointer",
        "&:hover":{
            backgroundColor:"#F50057" 
        }  
    },
    pagination:{
        "&.MuiPaginationItem-root":{

            color:"#F50057",

        },
    },
}));

const classes = useStyles();

const PaginatedSearch = () => {

    return handleSearch().slice((page-1)*10, page*10)
} 



//TABLE UI STARTS HERE


    return ( <ThemeProvider theme={darkTheme}>
<Container style={{textAlign:"center"}}>
    <Typography varient="h4" style={{margin:20,fontFamily:"Montserrat",fontSize:40}}>- Trending Crypto Currency Prices By Market Cap -</Typography>
    <Typography variant='h6'>Created By Kevin Fernando</Typography> 
    <TextField onChange={valuesHandle} label="Search for Crypto Currency...." variant='outlined' style={{marginBottom:30,marginTop:30, width:'100%'}}/>
<TableContainer style={{marginTop:60}}>
    {loading? <CircularProgress color="secondary" /> :<Table> 
        <TableHead>
            <TableRow>
                {["Coin","Current Price","24H Change Percentage","Market Cap"].map(head => <TableCell key={head} align={head === "Coin"? "left": "right"} style={{color:"#F50057",fontWeight:"400",fontFamily:"Montserrat",fontSize:16}}>{head}</TableCell>)}
            </TableRow>
        </TableHead>
        <TableBody>
{PaginatedSearch().map(row => <TableRow className={classes.row} onClick={() => history(`/coins/${row.id}`,)}  key={row.name}><TableCell  component="th" scope='row' style={{display:"flex",gap:15}}><img src={row?.image} alt={row.name} height="50" style={{marginBottom:10}}/><div style={{display:"flex",flexDirection:"column"}}><span style={{textTransform:"uppercase",fontSize:22}}>{row.symbol}</span><span style={{color:"darkgrey"}}>{row.name}</span></div></TableCell>
<TableCell align='right'>{symbol}{row.current_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}</TableCell>
<TableCell align='right'style={{color:row.market_cap_change_percentage_24h > 0? "green":"red",fontWeight:"500"}}>{row.market_cap_change_percentage_24h > 0? "+":null}{row.market_cap_change_percentage_24h.toFixed(2)}%</TableCell> 
<TableCell align='right'>{symbol}{""}{row.market_cap.toString().slice(0,6).replace(/\B(?=(\d{3})+(?!\d))/g,",")}M</TableCell></TableRow> )} 
        </TableBody>
        </Table>}
        </TableContainer>
        <Pagination onChange={(_, value) => { setPage(value); window.scroll(0,450)}} className={classes.pagination} style={{padding:20,width:"100%",display:"flex",justifyContent:"center"}} count={(handleSearch()?.length/10).toFixed(0)}/>
</Container>
</ThemeProvider> );

}
 
export default CoinsTable;