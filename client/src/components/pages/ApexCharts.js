import React, {} from 'react';
import RadialBar from '../ApexCharts/RadialBar'
import Donut from '../ApexCharts/Donut';
import Line from '../ApexCharts/Line';

function ApexCharts() {

 return (
    <div style={{display:'flex', flexFlow:'row wrap'}}>
        <div><Line /></div>
        <div><RadialBar /></div>
        <div><Donut /></div>
    </div>
 )
}

export default ApexCharts