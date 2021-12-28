import React,{useRef} from 'react'
import { Line } from 'react-chartjs-2'
function ChartComponent(props) {
    const {list,chart} = props;
    const refChart = useRef(null);

    let arrColor = ['#3e95cd',"#8e5ea2","#3cba9f"]
    let dataset = [];
    let label = chart.times.map(i => i.hour+':00')

    Object.values(chart.items).map((i,index)=>{ 
        let objtemp = {};
        objtemp.data = i.map(j=>j.counter)
        objtemp.fill = false
        objtemp.borderColor = arrColor[index]

        // custom style point
        objtemp.pointRadius = 4;
        objtemp.pointHoverRadius = 5;
        objtemp.pointBorderWidth = 2
        objtemp.hoverBorderWidth = 3;
        objtemp.pointBorderColor = arrColor[index];
        objtemp.pointBackgroundColor = 'white';
        objtemp.pointHoverBackgroundColor = arrColor[index];
        objtemp.pointHoverBorderColor = 'white';
        dataset.push(objtemp)
        return i;
    })
    const customTooltip = (tooltip) => {
        if (!tooltip) {
            return;
        }
          // Tooltip Element
        let tooltipEl = document.getElementById("chartjs-tooltip");
        let caretEl = document.getElementById("caret-tooltip");

        if (!tooltipEl ) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chartjs-tooltip";
            document.getElementById('chartjs-wrapper').appendChild(tooltipEl);
        }
        if(!caretEl){
            caretEl = document.createElement("div");
            caretEl.id = "caret-tooltip";
            document.getElementById('chartjs-wrapper').appendChild(caretEl);
        }

          
          // Set caret Position
        tooltipEl.classList.remove("above", "below", "no-transform");
        caretEl.classList.remove("above", "below", "no-transform");

        if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
        } else {
        tooltipEl.classList.add("no-transform");
        }
        const getBody = (bodyItem) => bodyItem.lines;

        //Hide the tooltips when mouseout
        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = '1';
            caretEl.style.opacity = '1';
        return;
        }
    
        if (tooltip.body) {
            console.log(list);
            let index = tooltip.dataPoints[0].datasetIndex;
            let  bodyLines = tooltip.body.map(getBody);

            let innerHtml = "<div class='song-data'>";
            let labelSongLeft = `<div class="song-left"><img src=${list[index].thumbnail}></div>`
            let labelSongInfo = `<div class="song-info"><span class="song-title">${list[index].title}</span><span class="song-artists">${list[index].artistsNames}</span></div>`
            let labelSongRight = `<span class="song-right">${bodyLines}</span>`

            innerHtml +=labelSongLeft;
            innerHtml+=labelSongInfo;
            innerHtml+=labelSongRight;
            innerHtml+='</div>'
            tooltipEl.innerHTML = innerHtml;

        }
        let widthTooltip = tooltipEl.clientWidth;
        let widthCaret = 10;

        if(tooltip.caretX < 200){
            tooltipEl.style.left = tooltip.caretX - widthTooltip/4 + 15 + 'px';
            caretEl.style.left = tooltip.caretX -  widthCaret + 'px';
        }
        else if(tooltip.caretX > 200 && tooltip.caretX < 500){
            tooltipEl.style.left = tooltip.caretX - widthTooltip/2 + 'px';
            caretEl.style.left = tooltip.caretX - widthCaret + 'px';
        }
        else {
            tooltipEl.style.left = tooltip.caretX - widthTooltip/4*3 - 20 + 'px'; 
            caretEl.style.left = tooltip.caretX - widthCaret  + 'px'; 
        }

        tooltipEl.style.top = tooltip.caretY - 72 + 'px';
        caretEl.style.top = tooltip.caretY - 20  + 'px';
        tooltipEl.style.opacity = "1";
        caretEl.style.opacity = "1";
        tooltipEl.style.backgroundColor = tooltip.labelColors[0].borderColor;
        caretEl.style.borderColor = `${tooltip.labelColors[0].borderColor} transparent transparent`
    }

    const drawLineVertical = {
        afterDraw: function(chart) {
            if (chart && chart.tooltip && chart.tooltip._active && chart.tooltip._active.length) {
              const activePoint = chart.controller.tooltip._active[0];
              const ctx = chart.ctx;
              const x = activePoint.tooltipPosition().x;
              console.log(ctx);

              const topY = chart.scales['y-axis-0'].top;
              const bottomY = chart.scales['y-axis-0'].bottom;
             
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(x, topY);
              ctx.lineTo(x, bottomY);
              ctx.lineWidth = 1;
              ctx.strokeStyle = '#e23fa9';
              ctx.stroke();
              ctx.restore();
            }
        }
    }

  
    const datasetKeyProvider=()=>{ 
        return Math.random();
    } 
    
    return (
        <div id="chartjs-wrapper" style={{position: "relative"}}>
            <Line
                ref={refChart}
                datasetKeyProvider={datasetKeyProvider}
                // @ts-ignore
                id="chartjs"
                data={{
                    labels: label,
                    datasets: dataset,
                }}
                options={{
                    responsive: true,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false,
                        callbacks: {
                            label: function(tooltipItem,data) {
                                let arrTotal = data.datasets.map(i => i.data).map(i=> i[tooltipItem.index]); //get array value 
                                // @ts-ignore
                                let total =  arrTotal.reduce((accumulator,currentValue) => accumulator + currentValue ,0) //get sum from array
                                let currentValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                                // @ts-ignore
                                let percentage = Math.floor(((currentValue/total) * 100)+0.5);
                                return percentage + '%';
                            }
    
                        },
                        displayColors: false,  
                        custom: customTooltip,

                    },
                    scales: {  
                        yAxes: [{
                            display: false,
                        }]
                    }}
                }
                plugins={[drawLineVertical]}
            />
        </div>
    )
}

export default ChartComponent