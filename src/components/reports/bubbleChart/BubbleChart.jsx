import React from 'react';
import { Bubble  } from 'react-chartjs-2';
import './bubbleChart.css';

export default function BubbleChart(){
    const data = {
        datasets: [{
            label: 'Portfolio investments',
            data: [
                { x: 10, y: 20, r: 5 },  
                { x: 30, y: 15, r: 10 }, 
                { x: 500, y: 25, r: 15 },
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
    }
      return(
        <div className='bubbles-container'>
            <h2>Portfolio value by time</h2>
            <Bubble data={data}/>
        </div>
      )
}