AOS.init();

$(function() { // Shorthand for $( document ).ready()
    $('.dropdown-trigger').dropdown({
        hover: true
    });
    $('.tabs').tabs();
    $('.slider').slider({duration:1000});
    $('.sidenav').sidenav()
})

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
            let self = this;
            this.items = [];
            let url = '';
            if (location.hostname === "localhost" || location.hostname === "happy-galileo-a42c9d.netlify.app") {
                url = '../.netlify/functions/hcidFn/hcidFn.js'
            } else {
                url = 'https://happy-galileo-a42c9d.netlify.app/.netlify/functions/hcidFn/hcidFn.js'
            };
            axios.get(url, {
                params: {
                    table: encodeURI('members'),
                    view: encodeURI('phds'),
                    fields: encodeURI('name,first-name,last-name,status,bio-url,photo-url,post,short-bio,supervisors,supvervisor-str,phd_text'),
                    sort: encodeURI('{"field":"last-name","direction":"asc"}')
                }
            }).then(function(response) {
                self.items = response.data
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
                        Supervisors:&nbsp;<span v-for="(i,index) in item['supvervisor-str']"><span v-if="index>0">,&nbsp;</span>{{ i }}</span>
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
                <p v-if="item['phd_text']">
                    {{ item['phd_text'] }}
                </p>
            </div>
            `
        })
    }, 600)
})