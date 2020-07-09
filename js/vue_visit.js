AOS.init();
$(function() { // Shorthand for $( document ).ready()
    $('.dropdown-trigger').dropdown({
        hover: true
    });
    $('.sidenav').sidenav()
})

var appLive = new Vue({
    el: '#app',
    data: {
        items: []
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            var self = this
            this.items = []
            axios.get(
                "https://api.airtable.com/v0/" + app_id + "/accomodation?sortField=Name&sortDirection=asc", {
                    headers: {
                        Authorization: "Bearer " + app_key
                    }
                }
            ).then(function(response) {
                self.items = response.data.records
                console.log(self.items)
            }).catch(function(error) {
                console.log(error)
            })
        }
    }
})

Vue.component('template', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            props: ['item'],
            template: `
            <div :id="item['Name']" class="my-2">
                <div>
                    <strong>
                        <span v-if="item['url']"><a :href="item['url']" class="black-text">{{ item['Name'] }}</a></span>
                        <span v-else>{{ item['Name'] }}</span>
                    </strong>
                </div>
                <div>
                    <span v-if="item['Note']" class="lbr grey-text text-darken-2">{{ item['Note'] }}</span>
                </div>
            </div>
            `
        })
    }, 300)
})