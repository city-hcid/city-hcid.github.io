const apiToken = "keyAKLpRf8ec2XWH9",
    airTableApp = "appunQ0V4X7SQIIk7",
    airTableName = "tblDN6QUoVueC6fkg",
    airTableView = "viwkwqfMShmHL2ySw",
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
            search: '',
            headers: [{
                text: '',
                value: 'data-table-expand'
            }, {
                text: 'Primary Author',
                value: 'author',
                width: '12%',
                sortable: false
            }, {
                text: 'Rank',
                value: 'rank',
                align: 'center',
                width: '10%',
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
                width: '25%',
                sortable: false
            }, {
                text: "Citations",
                value: "crossref",
                align: 'center',
                width: '10%',
                sortable: false
            }, {
                text: "Source",
                value: "sourcescore",
                align: 'center',
                width: '10%',
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
            sortBy: [],
            value: '',
            items: [],
            table_0: [],
            table_1: [],
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
            hunderwordsReview: "",
            form_alex_steph: '',
            form_ed: '',
            form_ilir: '',
            form_jason: '',
            form_george: '',
            form_lorenzo: ''
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
            if (item.submit == true && item.alex_steph_check != true && item.ed_check != true && item.george_check != true && item.ilir_check != true && item.jason_check != true && item.lorenzo_check != true) {
                return 'style-green'
            } else if (item.submit == true && (item.alex_steph_check == true || item.ed_check == true || item.george_check == true || item.ilir_check == true || item.jason_check == true || item.lorenzo_check == true)) {
                return 'style-orange'
            } else if (item.alex_steph_check == true || item.ed_check == true || item.george_check == true || item.ilir_check == true || item.jason_check == true || item.lorenzo_check == true) {
                return 'style-grey'
            } else {
                return 'style-reg'
            }
        },
        panels(item) {
            if (this.panel.includes(item)) {
                this.panel = [];
            } else {
                this.panel = [item];
            }
        },
        showEditDialog(item) {
            this.editedItem = item || {};
            this.dialog = !this.dialog; /***** could delete? ****/
        },
        closeDialog() {
            this.dialog = false;
            this.close('Not saved')
        },
        loadItems() {
            const sort = "sort%5B1%5D%5Bfield%5D=rank&sort%5B1%5D%5Bdirection%5D=asc&sort%5B2%5D%5Bfield%5D=lastName&sort%5B2%5D%5Bdirection%5D=asc",
                submitURL = `https://api.airtable.com/v0/${airTableApp}/${airTableName}?&view=${airTableView}&${sort}&filterByFormula=if(submit%3D1%2CTRUE()%2CFALSE())`,
                backupURL = `https://api.airtable.com/v0/${airTableApp}/${airTableName}?&view=${airTableView}&${sort}&filterByFormula=AND(if(rank%3E1.7%2CTRUE()%2CFALSE())%2Cif(rank%3C2.1%2CTRUE()%2CFALSE()))`;
            axios.all([
                axios.get(submitURL, config),
                axios.get(backupURL, config)
            ]).then((response) => {

                for (let i = 0; i < response.length; i++) {
                    this.items[i] = response[i].data.records.map((item) => {
                        this.index += 1;
                        if (item.fields.reviewer) {
                            this.reviewers.push(item.fields.reviewer[0]);
                        }
                        return {
                            id: item.id,
                            index: this.index,
                            ...item.fields
                        }
                    })
                }

                this.table_0 = this.items[0];
                this.table_1 = this.items[1];
                this.items = [this.table_0, this.table_1];

                this.reviewers = this.reviewers.filter(this.onlyUnique);

                this.loading = false; // Removes table loader graphic
                //this.getReviewers();
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
            } else if (key === "google") {
                data = {
                    fields: {
                        google: item.google
                    }
                }
            } else if (key === "msacademic") {
                data = {
                    fields: {
                        msAcademic: item.msAcademic
                    }
                }
            } else if (key === "wos") {
                data = {
                    fields: {
                        wos: item.wos
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
            } else if (key === "checkOutput") {
                data = {
                    fields: {
                        alex_steph_check: item.alex_steph_check,
                        ed_check: item.ed_check,
                        george_check: item.george_check,
                        ilir_check: item.ilir_check,
                        jason_check: item.jason_check,
                        lorenzo_check: item.lorenzo_check
                    }
                }
            } else if (key === "saveCommentForm") {
                data = {
                    fields: {
                        alex_steph: item.alex_steph,
                        ed: item.ed,
                        george: item.george,
                        ilir: item.ilir,
                        jason: item.jason,
                        lorenzo: item.lorenzo
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
        onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        },
        getReviewers(item) {
            const reviewerAirtableName = "tbl3wygJ0TChPwNrq";
            const reviewerAirtableView = "viw85HQDLZdkNKXRD";
            let submissionURL = `https://api.airtable.com/v0/${airTableApp}/${reviewerAirtableName}?&view=${reviewerAirtableView}&filterByFormula=FIND(%7BreviewerID%7D%2C%22${this.reviewers}%22)`;
            axios.get(submissionURL, {
                headers: {
                    Authorization: "Bearer " + apiToken
                }
            }).then((response) => {
                let reviews = response.data.records;
                for (let i = 0; i < reviews.length; i++) {
                    let rNo = i + 1;
                    if (reviews[i].fields.suitability) {
                        this.suitabilityReview = this.suitabilityReview + "<br><br>R" + rNo + ": " + reviews[i].fields.suitability;
                    }
                    if (reviews[i].fields.strongWeak) {
                        this.strongweakReview = this.strongweakReview + "<br><br>R" + rNo + ": " + reviews[i].fields.strongWeak;
                    }
                    if (reviews[i].fields.howTosReviews) {
                        this.hotosReview = this.hotosReview + "<br><br>R" + rNo + ": " + reviews[i].fields.howTosReviews;
                    }
                    if (reviews[i].fields.hundredWord) {
                        this.hunderwordsReview = this.hunderwordsReview + "<br><br>R" + rNo + ": " + reviews[i].fields.hundredWord;
                    }

                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
})