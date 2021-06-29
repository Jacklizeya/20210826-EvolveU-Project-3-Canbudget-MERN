import React, {useState, useEffect} from 'react';
import RadialBar from '../ApexCharts/RadialBar'
import Donut from '../ApexCharts/Doughnut';
import Line from '../ApexCharts/Line';

function ApexCharts() {

 return (
    <div style={{display:'flex', flexFlow:'row wrap'}}>
        <Donut />
        <Line />
        <RadialBar />
    </div>
 )
}

export default ApexCharts