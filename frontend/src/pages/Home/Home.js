import React from 'react'
import Grid from '@material-ui/core/Grid';
import User from '../../components/User'
import Connect from '../../components/Connect'
import Journal from '../../components/Journal'
import Resource1 from '../../components/Resource1'
import Resource2 from '../../components/Resource2'
import Resource3 from '../../components/Resource3'
import {parseJWT, getFirstName} from "../../helpers";
import './Home.css';
import { useHistory } from 'react-router-dom';

export default function Home() {
    let history = useHistory();

    if (!parseJWT()) {
        history.push('/signin')
    }

    return (
        <Grid className="dashboard" container direction='column' style={{margin:'2vw'}}>
            <Grid container justify="center" style={{marginTop:'1vh'}}>
                <Grid item xs={1}>
                    <div className="dashboardlogo">
                        <img href="#" to="/home" src="https://cdn.discordapp.com/attachments/798613769063891008/800035738317488168/Asset_2.png" alt="Logo"/>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div style={{marginLeft:'10vw'}}>
                        <h1 style={{textAlign:'center', fontSize:'1vm'}}>Hello, {getFirstName()}</h1>
                    </div>
                </Grid>
                <Grid style={{cursor: 'pointer'}} item xs={3} onClick={() => history.push('/analytics')}>
                    <User/>
                </Grid>
            </Grid>
            
            <Grid container justify="center">
                <Grid item xs={2}>
                    <Connect/>
                </Grid>
                <Grid item xs={7}>
                    <Journal/>
                </Grid>
                <Grid container item direction='column' xs={3} style={{marginTop:'2vh'}}>
                    <Grid item>
                        <Resource1/>
                    </Grid>
                    <Grid item style={{marginTop:'4.5vh'}}>
                        <Resource2/>
                    </Grid>
                    <Grid item style={{marginTop:'4.5vh'}}>
                        <Resource3/>
                    </Grid>
                </Grid>
            </Grid>

            {/* <Grid container justify="center">
                <Grid item>
                    <a href="/analytics">
                    <img style={{width:'8vh', height:'auto', marginTop:'-0.8vh', marginRight:'10vw'}} src="https://gyazo.com/c735f5dd8860411645e7f00050cadf99.png"/> </a>
                </Grid>
                <Grid item>
                <img style={{width:'8.4vh', height:'auto', marginRight:'10vw'}} src="https://gyazo.com/b8244036d6377f2bfe48452bab31cfaa.png"/>
                </Grid>
                <Grid item>
                <img style={{width:'8.4vh', height:'auto', marginRight:'9vw'}} src="https://gyazo.com/7e3ae5d52e53885ff88e7d4604213086.png"/>
                </Grid>
            </Grid> */}
        </Grid>
    )
}
