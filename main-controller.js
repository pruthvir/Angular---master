geneApp.controller("GeneCtrl", GeneCtrl);
GeneCtrl.$inject = ["GeneService"];

function GeneCtrl(GeneService) {
    this.variants = [];
    this.getVariants = function() {
        this.variants = GeneService.getVariants();
        console.log(this.variants);
        var counts = {};

        for (var i = 0; i < this.variants.length; i++) {
            var key = this.variants[i].consequence.term;
            if (counts[key]) {
                counts[key]++;
            } else {
                counts[key] = 1;
            }
        }
        console.log(counts);
        var labels = [],
            data = [],
            bgColor = [];
        for (var key in counts) {
            labels.push(key);
            data.push(counts[key]);
            bgColor.push('rgba(54, 162, 235, 0.2)');
        }
        this.getBarChartData(labels, data, bgColor);
    };

    this.getBarChartData = function(labels, data, bgColor) {
        var ctx = document.getElementById("barChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Chart Title',
                    data: data,
                    backgroundColor: bgColor,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Count'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Term'
                        }
                    }]
                }
            }
        });
    }
    this.getVariants();
}