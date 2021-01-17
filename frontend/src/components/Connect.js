import React from 'react'

export const Connect = () => {
    return (
        <div style={{background:'#535353', borderRadius:'16px', height:'100%', boxShadow:'0px 4px 10px 1px #F7921E', marginTop:'-0.6vw'}}>
            <h1 style={{textAlign:'center', padding: '20px'}}>Explore</h1>
            <div className="embed" style={{marginLeft:'2vw', marginRight:'1vw'}}>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/1ZYbU82GVz4" style={{width:'90%', height:'20vh', paddingBottom:'5vh'}} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
             <br/>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/WAfashFXkIs" style={{width:'90%', height:'20vh', paddingBottom:'0'}}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            
            <div style={{background:'#D3D1D1', borderRadius:'16px', height:'5vh', marginLeft:'2vw', marginRight:'2vw', lineHeight:'5vh', marginTop:'10vh'}} href="">
            <a className="nostyle" to="/call"> <h2 style={{textAlign:'center', color:'#262626', marginbottom:'5vw'}}>Connect</h2></a>
            </div>
        </div>
    )
}

export default Connect;