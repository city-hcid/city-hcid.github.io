console.clear();

// sort with _createdTime ??
var airtable_read_endpoint = "https://api.airtable.com/v0/appaTssw36NjXo3tt/CID%20Individual%20Workbooks?fields%5B%5D=Name&fields%5B%5D=Individual+mark&fields%5B%5D=Group+mark&fields%5B%5D=Total+mark&view=full-list";

var airtable_write_endpoint = "https://api.airtable.com/v0/appaTssw36NjXo3tt/CID%20Individual%20Workbooks?api_key=keyC83ksN49wS10kX";

var pollData = {};
var chartData = [];

function getDataAndBuild() {

    // zero out data
    pollData = {
        "👯": 0,
        "🍑": 0,
        "💥": 0,
        "🍕": 0,
        "☠️": 0
    };
    emojis = ["👯", "🍑", "💥", "🍕", "☠️"];
    chartData = [0, 0, 0, 0, 0];

    console.log("Getting data");
    axios
        .get(airtable_read_endpoint)
        .then(function(result) {
            console.log("Got data (showing first record): ", result.data.records[0]);
            result.data.records.forEach(function(element, index) {
                pollData[element.fields["Emoji Choice"]]++;
            });
            console.log("Updated poll data: ", pollData);

            // Turn Object into Array (for chart)
            var i = 0;
            for (var prop in pollData) {
                chartData[i] = pollData[prop];
                i++;
            }
            console.log("Made chart data: ", chartData);

            buildChart(chartData);
        });
}

var app = new Vue({
    el: '#app',
    data: {
        items: []
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {

            // Init variables
            var self = this
            var app_id = "appaTssw36NjXo3tt";
            var app_key = "keyC83ksN49wS10kX";
            this.items = []
            axios.get(
                "https://api.airtable.com/v0/" + app_id + "/students?view=Grid%20view", {
                    headers: {
                        Authorization: "Bearer " + app_key
                    }
                }
            ).then(function(response) {
                self.items = response.data.records
            }).catch(function(error) {
                console.log(error)
            })
        }
    }
})

function buildChart(data) {
    console.log("Building chart with this data: ", data);

    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 400]);

    d3
        .select(".chart")
        .selectAll("div")
        .remove();

    // Wait a sec? Apparently d3 needs to catch its breath.
    setTimeout(function() {
        d3
            .select(".chart")
            .selectAll("div")
            .data(data)
            .enter()
            .append("div")
            .style("width", function(d) {
                return x(d) + "px";
            })
            .text(function(d, i) {
                return emojis[i] + " " + d;
            });
    }, 200);
}

// Kick things off!
getDataAndBuild();





var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: years,
        datasets: [{
            data: africa,
            label: "Africa"
        }]
    }
});