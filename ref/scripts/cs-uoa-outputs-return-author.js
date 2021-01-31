
const apiToken = "keyAKLpRf8ec2XWH9",
    airTableApp = "appunQ0V4X7SQIIk7",
    airTableName = "tblDN6QUoVueC6fkg",
    airTableView = "viwzffT8UqpbHDAnS",
    config = {
        headers: {
            Authorization: "Bearer " + apiToken,
            Accept: "application/json",
        },
    };

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            headers: [{
                text: '',
                value: 'data-table-expand',
                width: '7%'
            }, {
                text: 'Authors',
                value: 'authors',
                width: '27%',
                sortable: false
            }, {
                text: 'Self',
                value: 'selfscore',
                align: 'center',
                width: '8%',
                sortable: false
            }, {
                text: 'External',
                value: 'reviewerscore',
                align: 'center',
                width: '8%',
                sortable: false
            }, {
                text: 'Output',
                value: 'output',
                width: '28%',
                sortable: false
            }, {
                text: "Citations",
                value: "crossref",
                align: 'center',
                width: '11%',
                sortable: false
            }, {
                text: "Source",
                value: "sourcescore",
                align: 'center',
                width: '11%',
                sortable: false
            }, {
                text: 'Edit',
                value: 'actions',
                align: 'center',
                width: '10%',
                sortable: false
            }],
            panel: [],
            loading: true,
            snack: false,
            snackColor: '',
            snackText: '',
            sortBy: 'reviewerScore',
            value: '',
            rules: {
                counter: value => {
                    const count = value.match(/\w+/g).length.toString()
                    return value.match(/\w+/g).length >= 100 || count + "/100"
                },
                max: value => value.match(/\w+/g).length <= 100 || "Max 100 words"
            },
            items: [],
            cites: "",
            typeSelect: ['Journal', 'Conference', 'Book', 'Part of book', 'Patent', 'Code'],
            dialog: false, // used to toggle the dialog
            editedItem: {}, // empty holder for edit output dialog
            index: 0,
            reviewers: [],
            overallReview: "",
            suitabilityReview: "",
            strongweakReview: "",
            hotosReview: "",
            hunderwordsReview: ""
        }
    },
    mounted() {
        this.loadItems()
    },
    methods: {
        dimensions(item) {
            setTimeout(function() {
                console.log("Doi: " + item);
                document.getElementById('dimensions_badge_' + item).innerHTML = '<span class="__dimensions_badge_embed__" data-doi="' + item + '" data-hide-zero-citations="true" data-style="small_circle"></span>';
                window.__dimensions_embed.addBadges();
            }, 500)
        },
        itemRowBackground(item) {
            return item.alex_steph_check == true || item.ed_check == true || item.george_check == true || item.ilir_check == true || item.jason_check == true || item.lorenzo_check == true ? 'style-orange' : 'style-reg'
        },
        showEditDialog(item) {
            this.editedItem = item || {};
            this.dialog = !this.dialog; /***** could delete? ****/
        },
        closeDialog() {
            this.dialog = false;
            this.close('Not saved');
        },
        loadItems() {
            let url = new URL(window.location.href);
            let authorid = url.searchParams.get("author");
            const fields = "fields%5B%5D=authorID&fields%5B%5D=authorName&fields%5B%5D=title&fields%5B%5D=firstName&fields%5B%5D=lastName&fields%5B%5D=year&fields%5B%5D=source&fields%5B%5D=authors&fields%5B%5D=type&fields%5B%5D=ref&fields%5B%5D=doi&fields%5B%5D=hundredWords&fields%5B%5D=specialism&fields%5B%5D=rank&fields%5B%5D=crossRef&fields%5B%5D=scopus&fields%5B%5D=refScore&fields%5B%5D=issn&fields%5B%5D=isbn&fields%5B%5D=citeScore&fields%5B%5D=sourceID&fields%5B%5D=sjr&fields%5B%5D=review&fields%5B%5D=reviewerScore&fields%5B%5D=Int%20rate&fields%5B%5D=textReview&fields%5B%5D=reviewerConfidence&fields%5B%5D=attachment&fields%5B%5D=reviewer",
                sort = "sort%5B2%5D%5Bfield%5D=year&sort%5B2%5D%5Bdirection%5D=asc",
                authorURL = `https://api.airtable.com/v0/${airTableApp}/${airTableName}?&view=${airTableView}&${sort}&filterByFormula=FIND(%22${authorid}%22%2CauthorID)`;
            axios.get(authorURL, config)
                .then((response) => {
                    this.items = response.data.records.map((item) => {
                        this.index += 1;
                        return {
                            id: item.id,
                            index: this.index,
                            ...item.fields
                        }
                    })

                    sessionStorage.clear(); // Forces citation check
                    if (!sessionStorage.loaded) {
                        for (let i = 0; i < this.items.length; i++) {
                            if (this.items[i].doi) {
                                this.getOutputMetaData(this.items[i])
                            }
                        }
                    }
                    this.loading = false; // Removes table loader graphic
                }).catch((error) => {
                    console.log(error)
                })
        },
        saveItem(item, key) {
            let data = item,
                method = "patch",
                id = item.id,
                url = `https://api.airtable.com/v0/${airTableApp}/${airTableName}/${id}`;

            if (key === "rank") {
                data = {
                    fields: {
                        rank: item.rank
                    }
                }
            } else if (key === "ref") {
                data = {
                    fields: {
                        review: item.ref
                    }
                }
            } else if (key === "review") {
                data = {
                    fields: {
                        review: item.review
                    }
                }
            } else if (key === "crossRef") {
                data = {
                    fields: {
                        crossRef: item.crossRef,
                        issn: item.issn
                    }
                }
            } else if (key === "scopus") {
                data = {
                    fields: {
                        scopus: item.scopus
                    }
                }
            } else if (key === "saveFormItem") {
                data = {
                    //fields: item
                    fields: {
                        title: item.title,
                        authors: item.authors,
                        source: item.source,
                        doi: item.doi,
                        type: item.type,
                        year: item.year,
                        rank: item.rank,
                        ref: item.ref,
                        hundredWords: item.hundredWords
                    }
                }
            } else if (key === "outputMetaData") {
                data = {
                    fields: item
                }
            } else {
                data = {
                    records: item
                }
                delete data.records.fields.id
            }
            axios[method](url,
                data, {
                    headers: {
                        Authorization: "Bearer " + apiToken,
                        "Content-Type": "application/json"
                    },
                    transformRequest: [(data) => {
                        if (data.fields.id) {
                            delete data.fields.id; // must remove id from the data for airtable patch to work
                            delete data.fields.index
                        }
                        if (key === "saveFormItem") {
                            delete data.fields.firstName; // must remove all computed fields if saving entire record
                            delete data.fields.lastName;
                            delete data.fields.authorName;
                            delete data.fields.authorID;
                            delete data.fields.Centre;
                            delete data.fields['output-url'];
                            delete data.fields['author-url']
                        }
                        return JSON.stringify(data);
                    }]
                }
            ).then(response => {
                if (response.data && response.data.id) {
                    this.editedItem.id = response.data.id
                    if (!id) {
                        this.items.push(this.editedItem)
                    }
                    this.editedItem = {}
                }
                if (key === "saveFormItem") {
                    this.dialog = !this.dialog;
                    setTimeout(function() {
                        location.reload();
                    }, 500)
                }
            }).catch(error => {
                console.log(error.response)
            })
        },
        save(msg) {
            this.snack = true;
            this.snackColor = 'success';
            this.snackText = msg || 'Change uploaded';
            this.sortBy = 'rank'
        },
        cancel(msg) {
            this.snack = true;
            this.snackColor = 'error';
            this.snackText = msg || 'Not uploaded';
            this.sortBy = 'rank'
        },
        open(msg) {
            this.snack = true;
            this.snackColor = 'info';
            this.snackText = msg || 'Dialog opened'
        },
        close(msg) {
            this.snack = true;
            this.snackColor = 'error';
            this.snackText = msg || 'Not uploaded';
            this.sortBy = 'rank'
        },
        getOutputMetaData(item) {
            sessionStorage.loaded = 1;
            const elsiverKey = "7f1899f42f07990cb442322cb322c588";

            let doi = item.doi,
                sourceid = item.sourceID,
                title = item.title,
                lastname = item.lastName,
                crossrefURL = `https://api.crossref.org/works/${item.doi}`,
                scopusURL = `https://api.elsevier.com/content/search/scopus?apiKey=${elsiverKey}&query=DOI(${item.doi})&field=citedby-count,source-id`,
                sourceIDURL = `https://api.elsevier.com/content/serial/title?apiKey=${elsiverKey}&source-id=${item.sourceID}`,
                scopusHeaders = `headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                        }`;
            var fields = {};

            if (doi) {

                fetchData();

                async function fetchData() {

                    let scopusResponse = await fetch(`https://api.elsevier.com/content/search/scopus?apiKey=${elsiverKey}&query=DOI(${doi})&field=citedby-count,source-id,eid`),
                        crossrefResponse = await fetch(`https://api.crossref.org/works/${doi}`),
                        sourceidResponse = await fetch(`https://api.elsevier.com/content/serial/title?apiKey=${elsiverKey}&source-id=${sourceid}`),
                        dimensionsResponse = await fetch(`https://metrics-api.dimensions.ai/doi/${doi}`);

                    let scopusData = await scopusResponse.json(),
                        crossrefData = await crossrefResponse.json(),
                        scourceidData = await sourceidResponse.json(),
                        dimensionData = await dimensionsResponse.json();

                    let scopusScore = await scopusData["search-results"].entry[0]["citedby-count"],
                        eid = await scopusData["search-results"].entry[0]["eid"].toString(),
                        crossrefScore = await crossrefData.message["is-referenced-by-count"].toString(),
                        dimensionsScore = await dimensionData['times_cited'],
                        dimensionsRelRatio = await dimensionData['relative_citation_ratio'],
                        dimensionsFieldRatio = await dimensionData['field_citation_ratio'];



                    if (!scopusData["search-results"].entry[0]["error"]) {
                        console.log("Update scopus cited-by count:" + scopusScore);
                        fields.scopus = parseInt(scopusScore);
                        fields.eid = eid;
                    }
                    if (scourceidData) {
                        if (!scourceidData['serial-metadata-response']['error']) {
                            if (scourceidData['serial-metadata-response']['entry'][0]['citeScoreYearInfoList']['citeScoreCurrentMetric']) {
                                let sourceidCiteScore = scourceidData['serial-metadata-response']['entry'][0]['citeScoreYearInfoList']['citeScoreCurrentMetric'];
                                fields.citeScore = sourceidCiteScore;
                            }
                            if (scourceidData['serial-metadata-response']['entry'][0]['SJRList']['SJR'][0]['$']) {
                                let sourceidsjr = scourceidData['serial-metadata-response']['entry'][0]['SJRList']['SJR'][0]['$'];
                                fields.sjr = sourceidsjr;
                            }
                        }
                    }
                    if (dimensionsScore) {
                        console.log("Update Dimensions times cited: " + dimensionsScore);
                        fields.dimensions = parseInt(dimensionsScore);
                        fields.relativeCitationRatio = Number(dimensionsRelRatio);
                        fields.fieldCitationRatio = Number(dimensionsFieldRatio);
                    }

                }
            } else if (title) {

                fetchData();

                async function fetchData() {
                    let scopusResponse = await fetch(`https://api.elsevier.com/content/search/scopus?apiKey=${elsiverKey}&query=title(${title})+AND+author-name(${lastname})&field=citedby-count,source-id,doi`);

                    let scopusData = await scopusResponse.json();

                    if (scopusData["search-results"]["opensearch:totalResults"] == 1) {
                        let scopusScore = scopusData["search-results"].entry[0]["citedby-count"],
                            eid = scopusData["search-results"].entry[0]["eid"],
                            doi = scopusData["search-results"].entry[0]["prism:doi"],
                            sourceid = scopusData["search-results"].entry[0]["source-id"];

                        if (scopusData) {
                            console.log("Scopus cited-by count from title:" + scopusScore);
                            fields.scopus = parseInt(scopusScore);
                            fields.eid = eid;
                            fields.doi = doi;
                            fields.eisourceIDd = sourceid;
                        }
                    } else {
                        console.log('Too many results');
                    }
                }
            } else {
                console.log("Can not retrieve scores");
            }

        }
    }
})