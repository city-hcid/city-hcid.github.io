Vue.component('table-head', {
    props: ['head', 'view_id', 'dialogue'],
    template: `<span v-if="view_id"><a v-bind:href="'issue.html?view=' + view_id + '&dialogue=' + dialogue">{{ head }}</a></span>
    <span v-else class="align-top font-weight-normal border-0" width="10%">{{ head }}</span>`
})

Vue.component('author-details', {
    props: ['name', 'type', 'content'],
    template: `<div class="my-2">
    <div>
        <span class="font-weight-normal my-1">{{ name }}</span>
        <br>
    <span class="font-weight-light small">{{ content }}</span>:&nbsp;<span class="font-weight-light small"><a v-if="type=='Column'" v-bind:href="'https://airtable.com/shrTR908BwRWJ2Zap?prefill_Status=Pending&prefill_Type=Column&prefill_Title%20of%20text=' + encodeURIComponent(content) + '&prefill_Contact%20Author=' + encodeURIComponent(name)">submission form</a><a v-else-if="type=='Forum'" v-bind:href="'https://airtable.com/shry0gQP1LpJrIth3?prefill_Status=Pending&prefill_Type=Forum&prefill_Title%20of%20text=' + encodeURIComponent(content) + '%3A%20&prefill_Sub%20Editor=' + encodeURIComponent(name)">submission form</a><a v-else href="https://airtable.com/shr0sfqAldfNfkIs7?prefill_Status=Pending">general form</a></span>
    </div>`
})

Vue.component('author-deadlines', {
    props: ['months', 'content', 'deadline'],
    template: `<a data-toggle="popover" v-on:mouseover="popOver" data-placement="top" data-trigger="hover" title="{{ months }} + ' Issue'" data-content="{{content}} + ' due ' + {{deadline}}">
    <span class="oi oi-check" aria-hidden="true"></span>
</a>`
})

Vue.component('template-header', {
    props: ['subtitle', 'subtext'],
    template: `
    <header>
        <b-row align-h="center" cols-md="2" class="pt-sm-5">
            <b-col cols="12" md="3" order-md="5" align-self="center" class="my-5">
                <b-link href="https://interactions.acm.org" target="_blank">
                    <b-img right src="https://interactions.acm.org/images/logo.gif" alt="interactions magazine logo" width="160px"></b-img>
                </b-link>
            </b-col>
            <b-col cols="12" md="6" align-self="center" class="my-2">
                <h1 class="font-weight-bold" id="Title">interactions Magazine</h1>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col cols="12" md="9">
                <h2 class="font-weight-bold mt-md-5 mt-3" id="subtitle">{{ subtitle }}</h2>
                <p v-html="subtext"></p>
            </b-col>
        </b-row>
    </header>
    `
})

Vue.component('template-footer', {
    template: `
    <footer>
        <b-container fluid="sm">
            <b-row align-h="center">
                <b-col cols="12" md="9" class="py-5 mb-3">
                    <b-link href="https://interactions.acm.org" target="_blank">
                        <b-img left src="https://interactions.acm.org/images/logo.gif" alt="interactions magazine logo" width="160px"></b-img>
                    </b-link>
                </b-col>
            </b-row>
        </b-container>
    </footer>
    `
})