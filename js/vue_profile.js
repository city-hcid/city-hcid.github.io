AOS.init();

$(function() {
    $('.dropdown-trigger').dropdown({
        hover: true
    });
    $('.sidenav').sidenav()
})

var app = new Vue({
    el: '#profile',
    data: {
        items: []
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            let name = new URL(window.location.href).searchParams.get("name");
            let self = this;
            //let fields = "fields%5B%5D=name&fields%5B%5D=twitter&fields%5B%5D=scholar&fields%5B%5D=orcid&fields%5B%5D=status&fields%5B%5D=photo-url&fields%5B%5D=short-bio&fields%5B%5D=url&fields%5B%5D=post";
            this.items = [];
            let url = '';
            if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "happy-galileo-a42c9d.netlify.app") {
                url = '../.netlify/functions/hcidRecFn/hcidRecFn.js'
            } else {
                url = 'https://happy-galileo-a42c9d.netlify.app/.netlify/functions/hcidRecFn/hcidRecFn.js'
            };
            axios.get(url, {
                params: {
                    table: encodeURI('members'),
                    view: encodeURI('Grid view'),
                    filter: encodeURI('({name-id}="' + name + '")'),
                    fields: encodeURI('name,first-name,last-name,status,bio-url,photo-url,post,short-bio,twitter,scholar,orcid')
                }
            }).then(function(response) {
                self.items = response.data;
                console.log(self.items)
            }).catch(function(error) {
                console.log(error)
            })
        }
    }
})

Vue.component('template-profile', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            props: ['item'],
            template: `
            <div class="container">
                <div class="row">
                    <div class="col s12 m9 l10" id="name">
                        <img v-if="item['photo-url']" class="my-3" class="roundedElement responsive-img" v-bind:src="item['photo-url']" v-bind:alt="item['name']" />
                        <h1 class="bold">
                            {{ item['name'] }}
                        </h1>
                        <h2 v-if="item['post']" class="mb-1 bold">
                            {{ item['post'] }}
                        </h2>
                        <p>
                            <span v-if="item['twitter']">
                                <strong>Twitter: </strong><a v-bind:href= "'https://twitter.com/' + item['twitter']" target="_new">{{ item['twitter'] }}</a><br>
                            </span>
                            <span v-if="item['scholar']">
                                <strong>Academic record: </strong><a v-bind:href="item['scholar']" target="_new">Google Scholar</a><br>
                            </span>
                            <span v-if="item['url']">
                                <strong>Webpage: </strong><a v-bind:href="item['url']" target="_new">URL</a><br>
                            </span>
                            <div v-if="item['orcid']" itemscope itemtype="https://schema.org/Person">
                                <a itemprop="sameAs" v-bind:content="'https://orcid.org/' + item['orcid']" v-bind:href="'https://orcid.org/' + item['orcid']" rel="noopener noreferrer" style="vertical-align:top;"><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" style="width:1em;margin-right:.5em;" alt="ORCID iD icon">https://orcid.org/{{ item['orcid'] }}</a>
                            </div>
                        </p>
                        <p v-if="item['long-bio']" class="lbr">{{ item['long-bio'] }}</p>
                        <p v-else class="lbr">{{ item['short-bio'] }}</p>
                    </div>
                </div>
            </div>
            `
        })
    }, 100)
})