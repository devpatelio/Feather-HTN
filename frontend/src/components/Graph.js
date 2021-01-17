import React from 'react'
import {LineChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Line} from 'recharts';

export const Graph = (props) => {    
    return (
        <div>
            <LineChart
                width={500}
                height={400}
                data={props.data}
                >
                <Tooltip />
                <CartesianGrid stroke="#91278E" />
                <Line type="monotone" dataKey="Day" stroke="#ff7300" yAxisId={0} />
                <Line type="monotone" dataKey="Mood" stroke="#C8594B" yAxisId={1} />
                </LineChart>
        </div>
    )
}

export default Graph;