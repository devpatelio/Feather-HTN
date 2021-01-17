import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import axiosInstance from '../axiosInstance'
import qs from 'qs'
import './journal.css';

export const Journal = () => {

    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");

    const submit = (event, q1, q2, q3) => {
        event.preventDefault();
        axiosInstance
          .post('journal/', qs.stringify({
            feeling: q1,
            events: q2,
            goals: q3,
          }))
    }

    const onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;
        if (name === 'q1') {
          setQ1(value);
        } else if (name === 'q2') {
          setQ2(value);
        } else if (name === 'q3') {
            setQ3(value);
        }
      };
//<Button variant="contained" color="primary" style={{height:'5vh', marginLeft:'28vw', marginTop:'3.5vh'}} onClick={(event) => submit(event, q1, q2, q3)} >Save</Button>
    return (
        <div className="journal" style={{height:'100%', marginTop:'0.9vw', marginLeft:'2vw', marginRight:'2vw', background:'#535353', borderRadius:'16px', boxShadow:'0px 4px 10px 4px #C8594B'}}>
        <Grid container direction="column">
            <Grid item>
                <Grid container>
                <h1 className="questionnumber">Question 1</h1>
            
                </Grid>
                
                <p className="questions">How are you feeling today?</p>
                <textarea className="journaltext" value={q1} name="q1" onChange={(event) => onChangeHandler(event)}></textarea>
            </Grid>
            <Grid item>
                <h1 className="questionnumber">Question 2</h1>
                <p className="questions"> What events stuck out during the day?</p>
                <textarea className="journaltext" value={q2} name="q2" onChange={(event) => onChangeHandler(event)}></textarea>
            </Grid>
            <Grid item>
                <h1 className="questionnumber">Question 3</h1>
                <p className="questions">What are your goals for tomorrow?</p>
                <textarea className="journaltext" value={q3} name="q3" onChange={(event) => onChangeHandler(event)}></textarea>
            </Grid>

            <h2 className="mood">Predicted Mood: Neutral</h2>
        </Grid>
        <Button variant="contained" color="primary" style={{height:'5vh', marginLeft:'3.5vw', marginTop:'3.5vh'}} onClick={(event) => submit(event, q1, q2, q3)} >Save</Button>
        {/* <h1 className="mood">Mood: </h1> */}
        </div>
    )
}

export default Journal;