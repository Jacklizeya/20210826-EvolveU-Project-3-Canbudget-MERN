import React, {useState, useEffect} from 'react';
import RadialBar from '../ApexCharts/RadialBar'
import Donut from '../ApexCharts/Doughnut';
import Line from '../ApexCharts/Line';
import AssetDashboard from '../ApexCharts/Dashboards/AssetDashboard';

function ApexCharts() {

 return (
    <div style={{display:'flex', flexFlow:'row wrap'}}>
        <div style={{display:'flex', flexFlow:'row wrap'}}>
            <AssetDashboard />
        </div>
        <div><Line /></div>
        <div><RadialBar /></div>
    </div>
 )
}

export default ApexCharts