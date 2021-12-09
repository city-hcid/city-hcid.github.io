var app_id = "appgcGlPwTaZaBImL";
var app_key = "keyrU6WzTNqZimMI6";
new Vue({
    el: '#footer'
});
new Vue({
    el: '#header'
})

var submission_rec;
var author_rec;
var coauthor_recs = [];
var subeditor_rec;
var coauthorURLParams;
var subeditorURLParams;
var source;
cloudinary.setCloudName("ix-acm");
var cloudinaryURL;
var airtable_write_endpoint;
var fileName;

var app_sub = new Vue({
    el: '#app-sub',
    data: {
        items: [],
        graphics: [],
        fieldName: ''
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            let url = new URL(window.location.href);
            submission_rec = url.searchParams.get("id");
            author_rec = url.searchParams.get("aut");
            let submission_url = "https://api.airtable.com/v0/" + app_id + "/Content?filterByFormula=FIND(%22" + submission_rec + "%22%2CID)&maxRecords=1";
            let self = this;
            axios.get(
                submission_url, {
                    headers: {
                        Authorization: "Bearer " + app_key
                    }
                }
            ).then(function(response) {
                self.items = response.data.records;
                if (author_rec === null) {
                    author_rec = self.items[0].fields['Contact Author'];
                }
                if (self.items[0].fields['Coauthors']) {
                    coauthor_recs = self.items[0].fields['Coauthors'];
                    coauthorURLParams = encodeURI('filterByFormula=OR(RECORD_ID()="' + coauthor_recs.join('",RECORD_ID()="') + '")&maxRecords=' + coauthor_recs.length);
                } else {
                    coauthorURLParams = "maxRecords=0";
                }
                if (self.items[0].fields['Sub Editor']) {
                    subeditor_rec = self.items[0].fields['Sub Editor'];
                    subeditorURLParams = encodeURI('filterByFormula=FIND("' + subeditor_rec + '",ID)&maxRecords=1');
                } else {
                    subeditorURLParams = "maxRecords=0";
                }
                if (self.items[0].fields['Graphics']) {
                    self.graphics = self.items[0].fields['Graphics'];
                }
                var widget = cloudinary.createUploadWidget({
                        uploadPreset: "asbafw8w",
                        sources: ["local"],
                        showAdvancedOptions: false,
                        cropping: false,
                        multiple: false,
                        defaultSource: "local",
                        styles: {
                            palette: {
                                window: "#ffffff",
                                sourceBg: "#f4f4f5",
                                windowBorder: "#90a0b3",
                                tabIcon: "#000000",
                                inactiveTabIcon: "#555a5f",
                                menuIcons: "#555a5f",
                                link: "#0433ff",
                                action: "#339933",
                                inProgress: "#0433ff",
                                complete: "#339933",
                                error: "#cc0000",
                                textDark: "#000000",
                                textLight: "#fcfffd"
                            },
                            fonts: {
                                default: null,
                                "sans-serif": {
                                    url: null,
                                    active: true
                                }
                            }
                        }
                    },
                    (error, result) => {
                        if (!error && result.event == "success") {
                            cloudinaryURL = result.info.url;
                            console.log(cloudinaryURL);
                            // Get extension from uploaded file for filename
                            let extn = cloudinaryURL.slice((cloudinaryURL.lastIndexOf(".") - 1 >>> 0) + 2);
                            console.log(extn);
                            // Get the number of attachments
                            if (self.items[0].fields['' + self.fieldName + '']) {
                                var l = eval(self.items[0].fields['' + self.fieldName + ''].length);
                            } else {
                                var l = 0;
                            }
                            // Get the version number for filename
                            let v = l + 1;
                            console.log(l);
                            var uploadDate = new Date();
                            // Generate filename
                            fileName = self.items[0].fields['Primary Contact'] + "-" + self.items[0].fields['Title of text'] + "-v" + v + "_" + uploadDate.toDateString() + "." + extn;
                            fileName = fileName.replace(/ /g, "_");
                            console.log(fileName);
                            // Generate airtable endpoint
                            airtable_write_endpoint = "https://api.airtable.com/v0/" + app_id + "/Content/" + submission_rec + "/?api_key=" + app_key;
                            // Generate data for attachment field in airtable
                            if (self.items[0].fields['' + self.fieldName + '']) {
                                // Get existing attachment info if there are any attachmnents
                                let existingAttachments = self.items[0].fields['' + self.fieldName + ''];
                                existingAttachments = JSON.stringify(existingAttachments);
                                // Remove outer square brackets
                                existingAttachments = existingAttachments.substring(1, existingAttachments.length - 1);
                                // Generate updated data
                                var updateFieldData = '{ "fields": { "' + self.fieldName + '": [ ' + existingAttachments + ', { "url": "' + cloudinaryURL + '", "filename": "' + fileName + '"} ] } }';
                            } else {
                                // Or generate new data
                                var updateFieldData = '{ "fields": { "' + self.fieldName + '": [ { "url": "' + cloudinaryURL + '", "filename": "' + fileName + '"} ] } }';
                            }
                            updateFieldData = updateFieldData.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
                            console.log(updateFieldData);
                            updateFieldData = JSON.parse(updateFieldData);
                            // Upload to airtable
                            axios.patch(airtable_write_endpoint, updateFieldData);
                            // Reload frontend page
                            document.getElementById("reload-page").style.display = "block";
                            setTimeout(function() {
                                $(window).scrollTop(0);

                                location.reload();
                            }, 3000);
                        }
                    });
                setTimeout(() => {
                    $('.upload-widget').on('click', function() {
                        widget.open();
                    });
                    // onclick function with this.fileName and then run widget.open()
                    /* var el = document.getElementById('upload_widget');
                    el.addEventListener("click", function() {
                        widget.open();
                    }, false); */
                    console.log("Ready");
                }, 1000);
            }).catch(function(error) {
                console.log(error);
            })
        }
    }
});

var app_auth = new Vue({
    el: '#app-auth',
    data: {
        items: [],
        fieldName: '',
        airtableTable: ''
    },
    mounted: function() {
        this.loadItems();
    },
    methods: {
        loadItems: function() {
            let self = this;

            setTimeout(() => {
                let h = document.getElementById("coauthors");
                let k = document.getElementById("subeditor");
                let author_url = "https://api.airtable.com/v0/" + app_id + "/Editors%20%26%20Authors?filterByFormula=FIND(%22" + author_rec + "%22%2CID)&maxRecords=1";
                let coauthor_url = "https://api.airtable.com/v0/" + app_id + "/Editors%20%26%20Authors?" + coauthorURLParams;
                let subauthor_url = "https://api.airtable.com/v0/" + app_id + "/Editors%20%26%20Authors?" + subeditorURLParams;

                axios.all([
                        axios.get(author_url, {
                            headers: {
                                Authorization: "Bearer " + app_key
                            }
                        }),
                        axios.get(coauthor_url, {
                            headers: {
                                Authorization: "Bearer " + app_key
                            }
                        }),
                        axios.get(subauthor_url, {
                            headers: {
                                Authorization: "Bearer " + app_key
                            }
                        })
                    ])
                    .then(response => {
                        self.items = response[0].data.records;
                        let obj = response[1].data.records;
                        let objSub = response[2].data.records;
                        if (obj[0]) {
                            for (i in obj) {
                                h.insertAdjacentHTML("beforeend", '<p class="lbr my-2"><a href="author?aut=' + obj[i].fields.ID + '" target="_blank">' + obj[i].fields.Name + '</a></p>')
                            }
                        };
                        if (objSub[0]) {
                            k.insertAdjacentHTML("beforeend", '<p class="lbr my-2">' + objSub[0].fields.Name + '</p>')
                        }
                    }).catch(function(error) {
                        console.log(error);
                    })
            }, 1200);

        }
    }
});

$('#updateModal').add('#submissionModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    airtableField = button.data('field'); //.replace(/ /g, "_");
    source = button.data('source');
    var placeholder = button.data('placeholder');
    var modal = $(this);
    modal.find('.modal-title').text(source + ' update');
    modal.find('.form-control').attr('placeholder', placeholder)
});

function submitForm(form) {
    var updateFieldData;
    var updateFieldValue;
    var airtable_write_endpoint;

    if (source == 'Author') {
        airtable_write_endpoint = "https://api.airtable.com/v0/" + app_id + "/Editors%20%26%20Authors/" + author_rec + "/?api_key=" + app_key;
    } else if (source == 'Submission') {
        airtable_write_endpoint = "https://api.airtable.com/v0/" + app_id + "/Content/" + submission_rec + "/?api_key=" + app_key;
    }

    if (airtableField == 'Twitter') {
        updateFieldValue = "@" + form.updateInput.value;
    } else {
        updateFieldValue = form.updateInput.value;
        updateFieldValue = updateFieldValue.toString().replace(/["']/g, '\\"');
    }

    updateFieldData = '{"fields": { "' + airtableField + '": "' + updateFieldValue + '"} }';
    updateFieldData = updateFieldData.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
    updateFieldData = JSON.parse(updateFieldData);

    axios.patch(airtable_write_endpoint, updateFieldData);
    setTimeout(function() {
        $(window).scrollTop(0);
        document.getElementById("reload-page").style.display = "block";
        location.reload();
    }, 2000);
}