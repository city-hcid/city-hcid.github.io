Vue.component('bar-chart', {
    extends: VueChartJs.Bar,
    mounted() {
        this.renderChart({
            labels: levels,
            datasets: [{
                data: overallCityCS2014,
                backgroundColor: backgroundColorOverall,
                borderColor: borderColorOverall,
                borderWidth: 1
            }, {
                data: outputsCityCS2014,
                backgroundColor: backgroundColorOutputs,
                borderColor: borderColorOutputs,
                borderWidth: 1
            }, {
                data: impactCityCS2014,
                backgroundColor: backgroundColorImpact,
                borderColor: borderColorImpact,
                borderWidth: 1
            }, {
                data: environmentCityCS2014,
                backgroundColor: backgroundColorEnvironment,
                borderColor: borderColorEnvironment,
                borderWidth: 1
            }]
        }, {
            legend: false,
            tooltips: {
                displayColors: false
            },
            scales: {
                xAxes: [{
                    barPercentage: 13,
                    categoryPercentage: 1,
                    maxBarThickness: 14,
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        })
    }

})

var vm = new Vue({
    el: '.app-2',
    data: {
        message: 'Combined'
    }
})