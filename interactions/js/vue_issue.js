var app_id = "appgcGlPwTaZaBImL";
var app_key =
	"patvPexJrWRnaOZLE.aa5ff318e5b5b87c68a97b9aa8c1b6427eb3cc24e3a4048dfbc0403f7d08c67f";
new Vue({
	el: "#footer",
});
new Vue({
	el: "#header",
});
var issue_view;

var app = new Vue({
	el: "#app",
	data: {
		items: [],
		dialogue: "",
		fields: [
			{
				key: "index",
				label: "",
			},
			{
				key: "Type",
				label: "Type",
			},
			{
				key: "primaryContact",
				label: "Primary Author",
			},
			{
				key: "titleOfText",
				label: "Title",
			},
			"Status",
		],
		striped: true,
		bordered: true,
		small: true,
		hover: true,
		headVariant: "dark",
	},
	mounted: function () {
		this.loadItems();
	},
	methods: {
		loadItems: function () {
			let url = new URL(window.location.href);
			// Get issue view
			if (url.searchParams.get("view") == null) {
				issue_view = encodeURIComponent("May/Jun 2020");
			} else {
				issue_view = url.searchParams.get("view");
			}
			if (url.searchParams.get("dialogue") == null) {
				this.dialogue = null;
			} else {
				this.dialogue = url.searchParams.get("dialogue");
			}
			let submission_url =
				"https://api.airtable.com/v0/" +
				app_id +
				"/Content?view=" +
				issue_view +
				"&fields%5B%5D=Primary%20Contact&fields%5B%5D=Status&fields%5B%5D=Title%20of%20text&fields%5B%5D=Type&fields%5B%5D=Target%20Issue&fields%5B%5D=Target%20Year";
			let self = this;
			axios
				.get(submission_url, {
					headers: {
						Authorization: "Bearer " + app_key,
					},
				})
				.then(function (response) {
					//console.log(self.issue);
					self.items = response.data.records;
					console.log(self.items);
				})
				.catch(function (error) {
					console.log(error);
				});
		},
	},
});
