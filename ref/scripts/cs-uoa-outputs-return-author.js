const apiToken = "keyAKLpRf8ec2XWH9",
    airTableApp = "appunQ0V4X7SQIIk7",
    airTableName = "tblDN6QUoVueC6fkg",
    airTableView = "viwxVgiASQcOzvIKf",
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
            loading: true,
            snack: false,
            snackColor: '',
            snackText: '',
            sortBy: 'year',
            value: '',
            rules: {
                counter: value => {
                    const count = value.match(/\w+/g).length.toString()
                    return value.match(/\w+/g).length >= 100 || count + "/100"
                },
                max: value => value.match(/\w+/g).length <= 100 || "Max 100 words"
            },
            items: [],
            typeSelect: ['Journal', 'Conference', 'Book', 'Part of book', 'Patent', 'Code'],
            allocation: [
                'Hardware',
                'Computer systems organization',
                'Embedded',
                'real-time and dependable systems',
                'Networks',
                'Software organization and properties',
                'Software notation and tools',
                'Software creation and management',
                'Models of computation and formal languages',
                'Computational complexity and cryptography',
                'Logic',
                'Design and analysis of algorithms',
                'Theory and algorithms for application domains',
                'Semantics and reasoning',
                'Discrete mathematics',
                'Probability and statistics',
                'Continuous mathematics, analysis, and software',
                'Data management systems',
                'Information storage systems',
                'Information systems applications',
                'World Wide Web',
                'Information Retrieval',
                'Cryptography',
                'Security and privacy',
                'Human computer interaction and interaction design',
                'Collaborative and social computing',
                'Ubiquitous and mobile computing',
                'Visualisation',
                'Accessibility',
                'Symbolic and algebraic manipulation',
                'Parallel computing methodologies',
                'Natural language processing',
                'Knowledge representation and reasoning',
                'Planning, search, control and distributed AI',
                'Computer vision',
                'Machine learning',
                'Modelling and simulation',
                'Computer graphics',
                'Distributed and concurrent computing',
                'Applied computing – business and enterprise',
                'Applied computing – physical sciences and engineering',
                'Applied computing – life and medical sciences',
                'Applied computing – law, forensics, social and behavioural sciences',
                'Applied computing – arts, humanities and other',
                'Applied computing – operations research',
                'Applied computing - education',
                'Applied computing - document management and text processing',
                'Other'
            ],
            acmClass: [{
                    allocation: 'Hardware',
                    information: 'Printed circuit boards; Communication hardware, interfaces and storage; Integrated circuits; Very large scale integration design; Power and energy; Electronic design automation; Hardware validation; Hardware test; Robustness; Emerging technologies.',
                },
                {
                    allocation: 'Computer systems organization',
                    information: 'Architectures; Serial architectures; Parallel architectures; Distributed architectures; Other architectures; Neural networks; Reconfigurable computing; Analog computers; Data flow architectures; Heterogeneous (hybrid) systems; Self-organizing autonomic computing; Optical computing; Quantum computing; Molecular computing; High-level language architectures; Special purpose systems.',
                },
                {
                    allocation: 'Embedded, real-time and dependable systems',
                    information: 'Embedded and cyber-physical systems; Sensor networks; Robotics; Sensors and actuators; System on a chip; Embedded systems; Real-time systems; Dependable and fault-tolerant systems and networks.',
                },
                {
                    allocation: 'Networks',
                    information: 'Network architectures; Software defined networks; Network protocols; Network components; Network algorithms; Network performance evaluation; Network properties; Network resilience; Network services; Network types.',
                },
                {
                    allocation: 'Software organization and properties',
                    information: 'Contextual software domains; E-commerce infrastructure; Software infrastructure; Operating systems; Virtual worlds software; Software system structures; Software functional properties; Correctness; Formal methods; Extra-functional properties; Interoperability; Software performance; Software reliability; Software fault tolerance; Software safety; Software usability.',
                },
                {
                    allocation: 'Software notation and tools',
                    information: 'General programming languages; Formal language definitions; Compilers; Context specific languages; System description languages; Development frameworks and environments; Software configuration management and version control systems; Software libraries and repositories; Software maintenance tools.',
                },
                {
                    allocation: 'Software creation and management',
                    information: 'Designing software; Software development process management; Software development methods; Risk management; Software development techniques; Software verification and validation; Software post-development issues; Software reverse engineering; Documentation; Backup procedures; Software evolution; Software version control; Maintaining software; System administration; Collaboration in software development.',
                },
                {
                    allocation: 'Models of computation and formal languages',
                    information: 'Models of computation; Computability; Probabilistic computation; Quantum computation theory; Interactive computation; Streaming models; Concurrency; Timed and hybrid models; Abstract machines; Formal languages and automata theory; Formalisms; Automata over infinite objects; Grammars and context-free languages; Tree languages; Automata extensions; Regular languages.',
                },
                {
                    allocation: 'Computational complexity and cryptography',
                    information: 'Complexity classes; Problems, reductions and completeness; Communication complexity; Circuit complexity; Oracles and decision trees; Algebraic complexity theory; Quantum complexity theory; Proof complexity; Interactive proof systems; Complexity theory and logic; Cryptographic primitives; Cryptographic protocols.',
                },
                {
                    allocation: 'Logic',
                    information: 'Logic and verification; Proof theory; Modal and temporal logics; Automated reasoning; Constraint and logic programming; Constructive mathematics; Description logics; Equational logic and rewriting; Finite Model Theory; Higher order logic; Linear logic; Programming logic; Abstraction; Verification by model checking; Type theory; Hoare logic; Separation logic.',
                },
                {
                    allocation: 'Design and analysis of algorithms',
                    information: 'Graph algorithms analysis; Approximation algorithms analysis; Mathematical optimization; Discrete optimization; Continuous optimization; Mixed discrete-continuous optimization; Data structures design and analysis; Online algorithms; Online learning algorithms; Caching and paging algorithms; K-server algorithms; Adversary models; Parameterized complexity and exact algorithms; Streaming, sublinear and near linear time algorithms; Parallel algorithms; Distributed algorithms; Algorithm design techniques; Concurrent algorithms; Randomness, geometry and discrete structures.',
                },
                {
                    allocation: 'Theory and algorithms for application domains',
                    information: 'Machine learning theory; Sample complexity and generalization bounds; Boolean function learning; Unsupervised learning and clustering; Kernel methods; Boosting; Bayesian analysis; Inductive inference; Online learning theory; Multi-agent learning; Models of learning; Query learning; Structured prediction; Reinforcement learning; Active learning; Semi-supervised learning; Markov decision processes; Regret bounds; Algorithmic game theory and mechanism design; Database theory.',
                },
                {
                    allocation: 'Semantics and reasoning',
                    information: 'Program constructs; Control primitives; Functional constructs; Object oriented constructs; Program schemes; Type structures; Program semantics; Program reasoning; Invariants; Program specifications; Pre- and post-conditions; Program verification; Program analysis; Assertions; Parsing; Abstraction.',
                },
                {
                    allocation: 'Discrete mathematics',
                    information: 'Combinatorics; Graph theory; Trees; Hypergraphs; Random graphs; Graph coloring; Paths and connectivity problems; Graph enumeration; Matchings and factors; Graphs and surfaces; Network flows; Spectra of graphs; Extremal graph theory; Matroids and greedoids; Graph algorithms; Approximation algorithms.',
                },
                {
                    allocation: 'Probability and statistics',
                    information: 'Probabilistic representations; Probabilistic inference problems; Probabilistic reasoning algorithms; Probabilistic algorithms; Statistical paradigms; Stochastic processes; Nonparametric statistics; Distribution functions; Multivariate statistics.',
                },
                {
                    allocation: 'Continuous mathematics, analysis, and software',
                    information: 'Mathematical software; Information theory; Mathematical analysis; Numerical analysis; Mathematical optimization; Discrete optimization; Continuous optimization; Mixed discrete-continuous optimization; Differential equations; Calculus; Functional analysis; Approximation; Integral equations; Nonlinear equations; Quadrature; Continuous mathematics; Calculus; Topology; Continuous functions.',
                },
                {
                    allocation: 'Data management systems',
                    information: 'Database design and models; Data model extensions; Semi-structured data; Data streams; Data provenance; Incomplete data; Temporal data; Uncertainty; Inconsistent data; Data structures; Data access methods; Data layout; Database management system engines; Query languages; Database administration; Information integration; Middleware for databases.',
                },
                {
                    allocation: 'Information storage systems',
                    information: 'Information storage technologies; Record storage systems; Record storage alternatives; Directory structures; Block / page strategies; Record layout alternatives; Relational storage; Storage replication; Storage architectures; Storage management.',
                },
                {
                    allocation: 'Information systems applications',
                    information: 'Enterprise information systems; Collaborative and social computing systems and tools; Spatial-temporal systems; Decision support systems; Mobile information processing systems; Process control systems; Multimedia information systems; Data mining; Digital libraries and archives; Computational advertising; Computing platforms.',
                },
                {
                    allocation: 'World Wide Web',
                    information: 'Web searching and information discovery; Online advertising; Web mining; Web applications; Internet communications tools; Social networks; Crowdsourcing; Electronic commerce; Web interfaces; Web services; Web data description languages; Semantic web description languages; Markup languages.',
                },
                {
                    allocation: 'Information Retrieval',
                    information: 'Document representation; Information retrieval query processing; Users and interactive retrieval; Retrieval models and ranking; Retrieval tasks and goals; Evaluation of retrieval results; Search engine architectures and scalability; Specialized information retrieval; Structure and multilingual text search; Multimedia and multimodal retrieval; Environment-specific retrieval; Empirical studies in information retrieval.',
                },
                {
                    allocation: 'Cryptography',
                    information: 'Cryptography; Key management; Public key (asymmetric) techniques; Symmetric cryptography and hash functions; Cryptanalysis and other attacks; Information-theoretic techniques; Mathematical foundations of cryptography.',
                },
                {
                    allocation: 'Security and privacy',
                    information: 'Formal methods and theory of security; Security services; Intrusion/anomaly detection and malware mitigation; Security in hardware; Systems security; Network security; Database and storage security; Software and application security; Human and societal aspects of security and privacy.',
                },
                {
                    allocation: 'Human computer interaction and interaction design',
                    information: 'Human computer interaction (HCI); HCI design and evaluation methods; Interaction paradigms; Interaction devices; HCI theory, concepts and models; Interaction techniques; Interactive systems and tools; Empirical studies in HCI; Interaction design; Interaction design process and methods; Interaction design theory, concepts and paradigms; Empirical studies in interaction design; Systems and tools for interaction design.',
                },
                {
                    allocation: 'Collaborative and social computing',
                    information: 'Collaborative and social computing theory, concepts and paradigms; Collaborative and social computing design and evaluation methods; Collaborative and social computing systems and tools; Empirical studies in collaborative and social computing; Collaborative and social computing devices.',
                },
                {
                    allocation: 'Ubiquitous and mobile computing',
                    information: 'Ubiquitous and mobile computing theory, concepts and paradigms; Ubiquitous and mobile computing systems and tools; Ubiquitous and mobile devices; Ubiquitous and mobile computing design and evaluation methods; Empirical studies in ubiquitous and mobile computing.',
                },
                {
                    allocation: 'Visualisation',
                    information: 'Visualization techniques; Visualization application domains; Scientific visualization; Visual analytics; Geographic visualization; Information visualization; Visualization systems and tools; Visualization theory, concepts and paradigms; Empirical studies in visualization; Visualization design and evaluation methods.',
                },
                {
                    allocation: 'Accessibility',
                    information: 'Accessibility theory, concepts and paradigms; Empirical studies in accessibility; Accessibility design and evaluation methods; Accessibility technologies; Accessibility systems and tools.',
                },
                {
                    allocation: 'Symbolic and algebraic manipulation',
                    information: 'Symbolic and algebraic algorithms; Combinatorial algorithms; Algebraic algorithms; Nonalgebraic algorithms; Symbolic calculus algorithms; Exact arithmetic algorithms; Hybrid symbolic-numeric methods; Discrete calculus algorithms; Number theory algorithms; Equation and inequality solving algorithms; Linear algebra algorithms; Theorem proving algorithms; Boolean algebra algorithms; Optimization algorithms; Computer algebra systems; Representation of mathematical objects.',
                },
                {
                    allocation: 'Parallel computing methodologies',
                    information: 'Parallel algorithms; MapReduce algorithms; Self-organization; Shared memory algorithms; Vector / streaming algorithms; Massively parallel algorithms; Parallel programming languages.',
                },
                {
                    allocation: 'Natural language processing',
                    information: 'Information extraction; Machine translation; Discourse, dialogue and pragmatics; Natural language generation; Speech recognition; Lexical semantics; Phonology / morphology; Language resources.',
                },
                {
                    allocation: 'Knowledge representation and reasoning',
                    information: 'Description logics; Semantic networks; Nonmonotonic, default reasoning and belief revision; Probabilistic reasoning; Vagueness and fuzzy logic; Causal reasoning and diagnostics; Temporal reasoning; Cognitive robotics; Ontology engineering; Logic programming and answer set programming; Spatial and physical reasoning; Reasoning about belief and knowledge.',
                },
                {
                    allocation: 'Planning, search, control and distributed AI',
                    information: 'Planning and scheduling; Search methodologies; Control methods; Robotic planning; Computational control theory; Motion path planning; Philosophical/theoretical foundations of artificial intelligence; Distributed artificial intelligence; Multi-agent systems; Intelligent agents; Mobile agents; Cooperation and coordination.',
                },
                {
                    allocation: 'Computer vision',
                    information: 'Computer vision tasks; Biometrics; Scene understanding; Activity recognition and understanding; Video summarization; Visual content-based indexing and retrieval; Visual inspection; Vision for robotics; Scene anomaly detection; Image and video acquisition; Computer vision representations; Computer vision problems; Interest point and salient region detections; Image segmentation; Video segmentation; Shape inference; Object detection; Object recognition; Object identification; Tracking; Reconstruction; Matching.',
                },
                {
                    allocation: 'Machine learning',
                    information: 'Learning paradigms; Supervised learning; Unsupervised learning; Reinforcement learning; Multi-task learning; Learning settings; Machine learning approaches; Machine learning algorithms; Cross-validation.',
                },
                {
                    allocation: 'Modelling and simulation',
                    information: 'Model development and analysis; Simulation theory; Simulation types and techniques; Simulation support systems; Simulation evaluation.',
                },
                {
                    allocation: 'Computer graphics',
                    information: 'Animation; Rendering; Image manipulation; Graphics systems and interfaces; Image compression; Shape modeling.',
                },
                {
                    allocation: 'Distributed and concurrent computing',
                    information: 'Distributed computing methodologies; Distributed algorithms; Distributed programming languages; Concurrent computing methodologies; Concurrent programming languages; Concurrent algorithms',
                },
                {
                    allocation: 'Applied computing – business and enterprise',
                    information: 'Electronic commerce; Enterprise computing; Enterprise information systems; Business process management; Enterprise architectures; Service-oriented architectures; Event-driven architectures; Business rules; Enterprise modeling; Enterprise ontologies, taxonomies and vocabularies; Enterprise data management; Reference models; Business-IT alignment; IT architectures; IT governance; Enterprise computing infrastructures; Enterprise interoperability.',
                },
                {
                    allocation: 'Applied computing – physical sciences and engineering',
                    information: 'Aerospace; Archaeology; Astronomy; Chemistry; Earth and atmospheric sciences; Environmental sciences; Engineering; Computer-aided design; Physics; Mathematics and statistics; Electronics; Telecommunications.',
                },
                {
                    allocation: 'Applied computing – life and medical sciences',
                    information: 'Computational biology; Imaging; Genomics; Systems biology; Consumer health; Health care information systems; Health informatics; Digital health; Health data analytics; Bioinformatics; Metabolomics / metabonomics; Genetics.',
                },
                {
                    allocation: 'Applied computing – law, forensics, social and behavioural sciences',
                    information: 'Law, social and behavioral sciences; Anthropology; Ethnography; Law; Psychology; Economics; Sociology; Computer forensics; Surveillance mechanisms; Investigation techniques; Evidence collection, storage and analysis; Network forensics; System forensics; Data recovery.',
                },
                {
                    allocation: 'Applied computing – arts, humanities and other',
                    information: 'Fine arts; Performing arts; Architecture (buildings); Language translation; Media arts; Sound and music computing; Computers in other domains; Digital libraries and archives; Publishing; Military; Cartography; Agriculture; Computing in government; Personal computers and PC applications.',
                },
                {
                    allocation: 'Applied computing – operations research',
                    information: 'Consumer products; Industry and manufacturing; Computer-aided manufacturing; Decision analysis; Transportation; Forecasting; Marketing.',
                },
                {
                    allocation: 'Applied computing - education',
                    information: 'Digital libraries and archives; Computer-assisted instruction; Interactive learning environments; Collaborative learning; Learning management systems; Distance learning; E-learning; Computer-managed instruction.',
                },
                {
                    allocation: 'Applied computing - document management and text processing',
                    information: 'Document searching; Document management; Document capture; Document analysis; Document scanning; Graphics recognition and interpretation; Optical character recognition; Online handwriting recognition; Document preparation; Markup languages; Annotation; Format and notation; Multi / mixed media creation; Image composition; Hypertext / hypermedia creation; Document scripting languages.',
                },
                {
                    allocation: 'Other',
                    information: 'Only use this category if you are certain that no other category provides a useful indication of the main topic of the output. In most cases it will be preferable to choose a research area that is close to the topic of the output, even if it is not an exact match, because that will help to ensure allocation to reviewers with the most appropriate expertise.',
                }
            ],
            dialog: false, // used to toggle the dialog
            editedItem: {}, // empty holder for edit output dialog
            index: 0,
            reviewers: [],
            overallReview: "",
            suitabilityReview: "",
            strongweakReview: "",
            hotosReview: "",
            hunderwordsReview: "",
            fullName: ""
        }
    },
    mounted() {
        this.loadItems()
    },
    methods: {
        dimensions(item) {
            setTimeout(function() {
                console.log("Inserting dimension's badge using DOI: " + item);
                document.getElementById('dimensions_badge_' + item).innerHTML = '<span class="__dimensions_badge_embed__" data-doi="' + item + '" data-hide-zero-citations="true" data-style="small_circle"></span>';
                window.__dimensions_embed.addBadges();
            }, 500)
        },
        itemRowBackground(item) {
            return item.ref != true ? 'style-grey' : 'style-reg'
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
                sort = "sort%5B0%5D%5Bfield%5D=ref&sort%5B0%5D%5Bdirection%5D=desc&sort%5B1%5D%5Bfield%5D=year&sort%5B1%5D%5Bdirection%5D=asc",
                outputURL = `https://api.airtable.com/v0/${airTableApp}/${airTableName}?&view=${airTableView}&${sort}&filterByFormula=FIND(%22${authorid}%22%2CARRAYJOIN(cityAuthorIDs%2C%22+%22))`,
                authorURL = `https://api.airtable.com/v0/${airTableApp}/city-staff/${authorid}`;
            axios.all([
                axios.get(outputURL, config),
                axios.get(authorURL, config)
            ]).then((response) => {
                this.fullName = response[1].data.fields.Name;
                this.items = response[0].data.records.map((item) => {

                    console.log(item.fields.cityAuthors);

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

            if (key === "crossRef") {
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
                        wos: parseInt(item.wos)
                    }
                }
            } else if (key === "classification") {
                console.log("classification set to: " + item.classification)
                data = {
                    fields: {
                        classification: item.classification,
                        allocation: [`${item.classification}`]
                    },
                    typecast: true
                }
            } else if (key === "hundredWords") {
                data = {
                    fields: {
                        hundredWords: item.hundredWords
                    }
                }
            } else if (key === "saveFormItem") {
                data = {
                    fields: {
                        title: item.title,
                        authors: item.authors,
                        source: item.source,
                        doi: item.doi,
                        type: item.type,
                        year: item.year,
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
            this.snackText = msg || 'Change uploaded'
        },
        cancel(msg) {
            this.snack = true;
            this.snackColor = 'error';
            this.snackText = msg || 'Not uploaded'
        },
        open(msg) {
            this.snack = true;
            this.snackColor = 'info';
            this.snackText = msg || 'Dialog opened'
        },
        close(msg) {
            this.snack = true;
            this.snackColor = 'error';
            this.snackText = msg || 'Not uploaded'
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