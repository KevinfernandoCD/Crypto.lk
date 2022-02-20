import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../Context';


const useStyles = makeStyles(() => ({

    title:{
        flex:1,
        fontSize:20,
        color:"white",
        fontFamily:"MontSerrat",
        fontWeight:"bold",
        cursor:"pointer"
    }

}))

const Header = () => {

    const classes = useStyles();

    const history = useNavigate();

    //USE THE CONTEXT STATE THAT WE CREATED USING USESTATE

    const {currency,setCurrency} = CryptoState();
  
    
    const darkTheme = createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark"
        }
    });

    return (
        <ThemeProvider theme={darkTheme}>
    <AppBar color='secondary' position='static'>
    <Container>
        <Toolbar>
<Typography variant='h6' className={classes.title} onClick={() => history("/",{replace:true})}>
    Crypto.<lable style={{color:"#007227"}}>L</lable><lable style={{color:"#F75E00"}}>K</lable>
</Typography>
<Select value={currency} onChange={(e) => setCurrency(e.target.value)} variant='outlined' style={{width:80,height:40,marginRight:15}}>
    <MenuItem  value={"usd"} >USD</MenuItem>
    <MenuItem value={"lkr"}>LKR</MenuItem>
</Select>
        </Toolbar>
    </Container>
    </AppBar>
    </ThemeProvider> 
     );
}
 
export default Header;