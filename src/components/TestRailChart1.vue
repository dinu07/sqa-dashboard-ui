
<script>

import { HorizontalBar, mixins } from 'vue-chartjs'

const { reactiveProp } = mixins
// const horizonalLinePlugin = {
//   id: 'horizontalLine',
//   afterDraw: function(chartInstance) {

//     var yValue;
//     var yScale = chartInstance.scales["y-axis-0"];
//     var canvas = chartInstance.chart;
//     var ctx = canvas.ctx;
//     var index;
//     var line;
//     var style;

//     if (chartInstance.options.horizontalLine) {

//       for (index = 0; index < chartInstance.options.horizontalLine.length; index++) {
//         line = chartInstance.options.horizontalLine[index];

//         if (!line.style) {
//           style = "#080808";
//         } else {
//           style = line.style;
//         }

//         if (line.y) {
//           yValue = yScale.getPixelForValue(line.y);
//         } else {
//           yValue = 0;
//         }
//         ctx.lineWidth = 3;

//         if (yValue) {
//           window.chart = chartInstance;
//           ctx.beginPath();
//           ctx.moveTo(0, yValue);
//           ctx.lineTo(canvas.width, yValue);
//           ctx.strokeStyle = style;
//           ctx.stroke();
//         }

//         if (line.text) {
//           ctx.fillStyle = style;
//           ctx.fillText(line.text, 0, yValue + ctx.lineWidth);
//         }
//       }
//       return;
//     }
//   }
// }

const DEFAULT_OPTIONS = {
        title: {
          display: false,
          text: 'Milestone'
        },
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              autoSkip: false
            }
          }],
          xAxes: [ {
            stacked: true,
            categoryPercentage: 5,
            barPercentage: 1,
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        aspectRatio: 2,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
                // footer: function(tooltipItem) {
                //     console.log('tooltipItem', tooltipItem[tooltipItem[0].datasetIndex])
                //     // return tooltipItem[tooltipItem[0].datasetIndex].label + '!!!'
                //     return null;
                // }
          }
        }
      }

export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  name: 'testrail-bar-chart',
  props: ['options'],
  beforeMount () {
    // this.addPlugin(horizonalLinePlugin)
  },
  mounted () {
    // console.log('!!!!!!!!!!')
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData,DEFAULT_OPTIONS);
  }
}
</script>