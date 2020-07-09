AOS.init();

$(function() { // Shorthand for $( document ).ready()
    $('.dropdown-trigger').dropdown({
        hover: true
    });
    $('.tabs').tabs();
    $('.sidenav').sidenav()
})

var app = new Vue({
    el: '#app',
    data: {
        items: [],
        supervisors: []
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            var self = this;
            this.items = [];
            axios.get(
                "https://api.airtable.com/v0/" + app_id + "/members?sort%5B0%5D%5Bfield%5D=last-name&sort%5B0%5D%5Bdirection%5D=asc", {
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

Vue.component('template-current', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            props: ['item'],
            template: `
            <div class="row mb-4">
                <div class="col m4 l3 center-align hide-on-small-only">
                    <div v-if="item['photo-url']">
                        <img class="head-shot responsive-img" v-bind:src="item['photo-url']" v-bind:alt="item['name'] + ' photo'" height="120px" />
                    </div>
                    <div v-else>
                        <i class="large material-icons roundedElement">assignment_ind</i>
                    </div>
                </div>
                <div class="col s4 mb-2 hide-on-med-and-up">
                    <div v-if="item['photo-url']">
                        <img class="head-shot responsive-img" v-bind:src="item['photo-url']" v-bind:alt="item['name'] + ' photo'" height="120px" />
                    </div>
                    <div v-else>
                        <i class="large material-icons roundedElement">assignment_ind</i>
                    </div>
                </div>
                <div class="col s12 m8 l9">
                    <span v-if="item['bio-url']">
                        <a class="link" v-bind:href="item['bio-url']"><strong>{{ item['name'] }}</strong></a><span v-if="item['post']">, {{ item['post'] }}.</span>
                    </span>
                    <span v-else>
                        <strong>{{ item['name'] }}</strong><span>, {{ item['post'] }}.</span>
                    </span>
                    <br />
                    <span class="small hide" v-if="item['supervisors']" v-for="(id,index) in item.supervisors"><span v-if="index>0">, </span>{{ id }}</span>
                    <span class="small" v-if="item['supvervisor-str']">
                        Supervisors: {{ item['supvervisor-str'] }}<br />
                    <span class="lbr grey-text text-darken-3" v-if="item['short-bio']">
                        {{ item['short-bio'] }}<br />
                    </span>
                </div>
            </div>
            `
        })
    }, 100)
})

Vue.component('template-past', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            props: ['item'],
            template: `
            <div class="col s10 offset-s2 my-2">
                <span v-if="item['bio-url']">
                    <a class="link" v-bind:href="item['bio-url']">
                        {{ item['name'] }}
                    </a>
                </span>
                <span v-else>
                    {{ item['name'] }}
                </span>
            </div>
            `
        })
    }, 600)
})