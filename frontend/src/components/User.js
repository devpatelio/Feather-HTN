

import React from 'react'
import Grid from '@material-ui/core/Grid';
import './UserProfile.css';

export const UserProfile = () => {
    return (
        <div style={{background:'#535353', borderRadius:'16px', height:'12vh', marginLeft:'5vw'}}>
            <Grid container>
                <img container style={{width:'4.5vw', height:'auto', marginLeft:'1vw', marginTop:'1vh'}} src="https://gyazo.com/ceeb6fcff9eaaef45e425ffe14f3fe52.png" alt="Profile"></img>
                <h1 style={{textAlign:'center', marginLeft:'2vw', marginTop:'2vh', lineHeight:'5vh', paddingTop:'1vh'}}>Kiera Kiera</h1>
            </Grid>
        </div>
    )
}

export default UserProfile;