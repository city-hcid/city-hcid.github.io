AOS.init();

$(function () {
	$(".dropdown-trigger").dropdown({
		hover: true,
	});
	$(".tabs").tabs();
	$(".sidenav").sidenav();
});

var app = new Vue({
	el: "#app",
	data: {
		liveItems: [],
		archiveItems: [],
	},
	mounted: function () {
		this.loadItems();
	},
	methods: {
		loadItems: function () {
			let url = "";
			if (
				location.hostname === "localhost" ||
				location.hostname === "127.0.0.1" ||
				location.hostname === "happy-galileo-a42c9d.netlify.app"
			) {
				url = "../.netlify/functions/hcidFn";
			} else {
				url = "https://happy-galileo-a42c9d.netlify.app/.netlify/functions/hcidFn";
			}
			var self = this;
			self.liveItems = [];
			self.archiveItems = [];
			axios
				.all([
					axios.get(url, {
						params: {
							table: encodeURI("projects"),
							view: encodeURI("live"),
							fields: encodeURI(
								"project-name,image-url,project-url,long-name,about,lead,lead-url,collaborators,collaborators-long,members,members-str,lead-str,research-theme,paper-doi,paper-citation"
							),
							sort: encodeURI('{"field":"project-name","direction":"asc"}'),
						},
					}),
					axios.get(url, {
						params: {
							table: encodeURI("projects"),
							view: encodeURI("archive"),
							fields: encodeURI(
								"project-name,image-url,project-url,long-name,about,lead,lead-url,collaborators,collaborators-long,members,members-str,lead-str,research-theme,paper-doi,paper-citation"
							),
							sort: encodeURI('{"field":"project-name","direction":"asc"}'),
						},
					}),
				])
				.then(function (response) {
					self.liveItems = response[0].data;
					self.archiveItems = response[1].data;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
	},
});

Vue.component("template-project", {
	props: ["item"],
	template: `
        <div v-bind:id="item['project-name']" v-if="item['project-name']" class="my-5">
            <a v-if="item['image-url']" v-bind:href="item['project-url']"><img class="responsive-img" v-bind:src="item['image-url']" v-bind:alt="item['project-name'] + ' icon'" style="max-height:8rem" /></a>
            <div>
                <h1 v-if="item['image-url'] == null" class="bold mb-3">
                    <span v-if="item['project-url']"><a v-bind:href="item['project-url']" class="black-text">{{ item['project-name'] }}</a></span>
                    <span v-else><a v-bind:href="'/centre/project?name=' + item['project-name']" class="black-text">{{ item['project-name'] }}</a></span>
                </h1>
                <span v-if="item['long-name']" class="lbr">{{ item['long-name'] }}</span>
                <p>
                    <strong>About: </strong>
                    <span v-if="item['about']" class="lbr grey-text text-darken-2">{{ item['about'] }}</span> 
                    <span v-if="item['paper-doi']" class="lbr grey-text text-darken-2">See <a v-bind:href="item['paper-doi']" target="_blank">{{ item['paper-citation'] }}</a>.</span> 
                    <span v-if="item['project-url']" class="lbr grey-text text-darken-2">See more <a v-bind:href="item['project-url']" target="_blank">here</a>.</span>
                </p>
                <p  v-if="item['lead']" class="pb-5">
                    <strong>Project members: </strong>
                    <span v-if="item['lead']" class="lbr grey-text text-darken-2"><a v-bind:href="item['lead-url']">{{ item['lead-str'] }}</a> (lead)</span><span v-if="item['members']" class="lbr grey-text text-darken-2">, {{ item['members-str'] }}</span><span v-if="item['collaborators-long']" class="lbr grey-text text-darken-2">, {{ item['collaborators-long'] }}</span><span v-else-if="item['collaborators']" class="lbr grey-text text-darken-2">, {{ item['collaborators'] }}</span><span v-else> </span>
                </p>
            </div>
        </div>
    `,
});
