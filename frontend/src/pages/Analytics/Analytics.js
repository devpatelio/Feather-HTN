import React from 'react'
import Graph from '../../components/Graph'
import Grid from '@material-ui/core/Grid';
import WordCloud from '../../components/WordCloud'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom';

const Feedback = (props) => {
    const {data} = props;
    if(data[data.length-1].Mood > data[0].Mood){
        return (<h1 style={{color:'black', textAlign:'center'}}>Good job on the improvement!</h1>)
    } else if(data[data.length-1].Mood < data[0].Mood){
        return (<h1 style={{color:'black', textAlign:'center'}}>Seems like a rough week, would you like to talk to someone?</h1>)
    } else {
        return (<h1 style={{color:'black', textAlign:'center'}}>Steady week!</h1>)
    }
}

export const Analytics = () => {
    const data = [
        {'Day': 'Monday', 'Mood': 1},
        {'Day': 'Tuesday', 'Mood': 2},
        {'Day': 'Wednesday', 'Mood': 3},
        {'Day': 'Thursday', 'Mood': 4},
        {'Day': 'Friday', 'Mood': 2},
        {'Day': 'Saturday', 'Mood': 3},
        {'Day': 'Sunday', 'Mood': 2},
    ];

    let history = useHistory();

    return (
        <div style={{width:'100%', height:'100%', marginTop:'20vh', marginLeft:'2vw', marginRight:'2vw'}}>
            <Grid container style={{marginTop:'-8vh'}}>
                <Grid item xs={2}>
            <div onClick={() => history.push('home')} style={{height:'6vh', background:'#F7921E', boxShadow:'0px 4px 10px 4px #91278E', borderRadius:'16px', width:'14vw', cursor:'pointer'}}>
                <h1 style={{color:'white', textAlign:'center', marginTop:'1vh', paddingTop:'1.7vh'}}>Back Home</h1>
            </div>
            </Grid>
            <Grid item xs={8}></Grid>
            <Grid item><a className="nostyle" href="localhost:3001">
            <div onClick={() => history.push('call/')} style={{marginLeft:'1.5vw', height:'6vh', background:'#F7921E', boxShadow:'0px 4px 10px 4px #91278E', borderRadius:'16px', width:'14vw', cursor:'pointer'}}>
                <h1 style={{color:'white', textAlign:'center', marginTop:'1vh', paddingTop:'1.7vh'}}>Connect</h1>
            </div>
            </a>
            </Grid>
            </Grid>
            
            <Grid container justify='center' spacing={5}>
                <Grid item xs={3}>
                    <div alignItems="center" style={{borderRadius:'16px', background:'#d3d3d3', height:'100%', boxShadow:'0px 4px 10px 1px #F7921E'}}>
                        <h1 style={{color:'black', textAlign:'center', paddingTop:'0.5vh'}}>Insights</h1>
                        <h2 style={{color:'black', textAlign:'center', marginTop:'8vh', marginBottom:'-3vh'}}>Frequent Words:</h2>
                        <WordCloud style={{paddingTop:'-10vh'}}/>
                        <h2 style={{color:'black', textAlign:'center'}}>Words written in Journal:</h2>
                        <h2 style={{color:'black', textAlign:'center', fontSize:'2vw', marginBottom:'-3vh'}}><span style={{color:'#F7921E'}}>4</span><span style={{color:'#C8594B'}}>0</span><span style={{color:'#91278E'}}>2</span></h2>

                    </div>
                </Grid>
                <Grid container item xs={6} justify='center' alignItems='center' direction='column' style={{borderRadius:'16px', background:'#d3d3d3', marginTop:'5.5vh', boxShadow:'0px 4px 10px 1px #C8594B'}}>
                    <Grid item style={{marginTop:'-5vh'}}>
                    <h1 style={{color:'black', textAlign:'center'}}>Your moods this past week:</h1>
                    </Grid>
                    <Grid item>
                    <Graph data={data}/>
                    </Grid>
                    <Grid item>
                    <Feedback data={data}/>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <div alignItems="center" style={{borderRadius:'16px', background:'#d3d3d3', height:'100%', boxShadow:'0px 4px 10px 4px #91278E'}}>
                        <h1 style={{color:'black', textAlign:'center', paddingTop:'0.5vh'}}>Profile</h1>
                        <img container style={{width:'10vw', height:'auto', display: 'block', marginLeft:'auto', marginRight:'auto', marginTop:'1vh'}} src="https://gyazo.com/6a0830d0e05fcbf4df2acaf983194702.png" alt="Profile"></img>
                        <h2 style={{textAlign:'center'}}>Welcome Kiera</h2>
                        <h2 style={{textAlign:'center', fontSize:'1.3vw'}}>You have spend <span style={{color:'#F7921E'}}>1</span><span style={{color:'#C8594B'}}>1</span><span style={{color:'#91278E'}}>2</span> lightweight hours with Feather.</h2>
                        <h2 style={{textAlign:'center', fontSize:'1.3vw'}}>Consecutively Written Journals:</h2>
                        <h2 style={{textAlign:'center', marginTop:'-1vh', fontSize:'2vw'}}><span style={{color:'#F7921E'}}>2</span><span style={{color:'#91278E'}}>7</span></h2>
                        <Grid container direction="column" style={{marginTop:'4vh'}}>
                            <Button variant="contained" color="primary" style={{width:'10vw', display:'block', marginLeft:'auto', marginRight:'auto'}}>Log Out</Button>
                            <Button variant="contained" color="secondary" style={{width:'10vw', display:'block', marginLeft:'auto', marginRight:'auto', marginTop:'1vh'}}>Delete Account</Button>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Analytics;