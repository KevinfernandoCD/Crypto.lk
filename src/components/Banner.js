import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Caroucel from './Carousel';

const useStyles  = makeStyles(() => ({

    banner :{
        backgroundImage:"url(./banner.jpg)",
        objectFit:"contain",

    },
    bannerContent:{

        height:500,
        display:"flex",
        flexDirection:"column",
        paddingTop: 25,
        justifyContent:"space-around",

    },
    tagline:{

        display:"flex",
        height:"40%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center"

    }


}))


const Banner = () => {

    const classes  = useStyles();
    return ( <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography variant="h2" style={{fontWeight:"bold",margiBottom:15,fontFamily:"Montserrat",color:"white"}}>
                    Crypto.<label style={{color:"#007227"}}>L</label><label style={{color:"#F75E00"}}>K</label>
                </Typography>
                <Typography  variant="subtitle1" style={{margiBottom:15,fontFamily:"Montserrat",color:"#F0F8FF"}}>
                    It's All About Crypto
                </Typography>
            </div>
            <Caroucel/>
        </Container>
    </div>
         );
}
 
export default Banner;