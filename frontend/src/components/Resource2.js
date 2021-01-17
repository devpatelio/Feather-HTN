import React from 'react'

export const Resource2 = () => {
    return (
        <div style={{background:'#535353', borderRadius:'16px', height:'20vh', boxShadow:'0px 4px 10px 4px #91278E'}}>
            <h1 style={{marginLeft:'2vh', paddingTop:'2vh', fontSize:'1.4vw'}}>Based on your interests</h1>
            {/* <h2 style={{marginLeft:'2vh', marginTop:'4vh'}}>Based on your interests...{}</h2> */}
                <ul>
                    <li style={{fontsize:'20px'}}><a href="https://www.nejm.org/doi/full/10.1056/NEJMp2008017" style={{color: '#cdcdcd'}}>Mental Health and COVID</a></li>
                    <li><a href="https://www.familycentre.org/about/news/post/45-activities-to-do-at-home-during-covid-19-restrictions" style={{color: '#cdcdcd'}}>Things to do during COVID</a></li>
                    <li><a href="https://nymag.com/strategist/article/new-hobbies-during-quarantine.html" style={{color: '#cdcdcd'}}>Quarantine Hobbies</a></li>
                    </ul>
        </div>
    )
}

export default Resource2;