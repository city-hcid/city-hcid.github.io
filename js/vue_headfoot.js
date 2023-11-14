Vue.component("template-header", {
	props: ["item", "subhead", "subtitle", "page"],
	data: function () {
		return {
			active: false,
			navLinkClass: "grey-text text-darken-2",
			dropDownLinkClass: "menu-header",
			dropDownSubLinkClass: "menu-subheader",
			navList: [
                { url: "https://hcid.city", name: "HCID" },
				{ url: "../centre/charter", name: "Charter" },
				{ url: "../centre/members", name: "Members" },
				{ url: "../centre/research", name: "Research Areas" },
				{ url: "../centre/phd-research", name: "PhD Research" },
				{ url: "../centre/projects", name: "Research Projects" },
			],
			/*dropDownCentre: [
                { url: "../centre/calendar", name: "Calendar", id: "dropDownCentre_Calendar" },
                { url: "../centre/phd-research", name: "PhD Research", id: "dropDownPhD_Research" }
            ],
            dropDownReading: [
                { url: "../centre/reading-group", name: "Reading Group", id: "dropDownReading_Group" },
                { url: "../centre/reading-group-calendar", name: "Calendar", id: "dropDownReadings_Calendar" }
            ],*/

            dropDownSeminar: [
				// { url: "../seminar/", name: "Seminar Series", id: "dropDownSeminar_Series" },
                //TEST TB
				// {
				// 	url: "../seminar/speakers",
				// 	name: "Speakers",
				// 	id: "dropDownSeminar_Speakers",
				// },
                //END TB
				//{ url: "../seminar/calendar", name: "Calendar", id: "dropDownSeminar_Calendar" }
			],
		};
	},
	mounted: function () {
		if (this.page == "Charter") {
			$("#navItem" + this.page).addClass("active hide-on-med-and-down");
		} else {
			$("#navItem" + this.page).addClass("active");
			$("#dropDown" + this.page).addClass("active");
			$("#sideNavItem" + this.page).addClass("active");
		}
	},
	template: `
    <header>
        <div class="navbar-fixed">
            <nav class="no-shadows">
                <div class="nav-wrapper white">
                    <a href="#" data-target="mobile-nav" class="sidenav-trigger hide-on-med-and-up"><i class="material-icons grey-text text-darken-2">menu</i></a>
                    <ul id="nav-mobile" class="left hide-on-small-and-down">
     <!--TEMP TB
                        <li @click="active = !active" :class="active" id="navItemHCID">
                            <a class="dropdown-trigger" :class="navLinkClass" href="#!" data-target="dropdown1">HCID3</a>
                        </li>
                -->
                        <li v-for="item in navList" @click="active = !active" :class="active" 
                        :id="'navItem' + item.name.replace(/ /g,'_')">
                            <a 
                            :href="item.url"
                            :class="navLinkClass"
                            :title="item.name">{{ item.name }}</a>
                        </li>
                    </ul>
                    <a v-if="page == 'HCID'" href="https://www.city.ac.uk" class="brand-logo right" style="opacity: 0.9;" aria-label="Image link to City University website"><img class="hide-on-small-and-down fade-out" data-aos data-aos-delay="2000" data-aos-easing="ease-in-out-quad" data-aos-duration="2000" src="https://www.city.ac.uk/__data/assets/git_bridge/0018/344007/main/i/logo/city-uol-logo-responsive.svg" alt="City University logo"></a>
                </div>
            </nav>
        </div>

        <!-- Side nav structure -->
        <ul class="sidenav" id="mobile-nav">
 <!--TEMP TB
        <li @click="active = !active" :class="active" id="navItemHCID">
                <a class="menu-header" href="https://hcid.city">HCID</a>
            </li>
        -->
            <li v-for="item in navList" @click="active = !active" :class="active" 
            :id="'sideNavItem' + item.name.replace(/ /g,'_')">
                <a 
                :href="item.url"
                :class="navLinkClass"
                :title="item.name">{{ item.name }}</a>
            </li>
            
            <li v-for="(item, index) in dropDownSeminar" @click="active = !active" :class="active" :id="item.id">
                <a v-if="index == 0"
                :href="item.url"
                :class="dropDownLinkClass"
                :title="item.name">{{ item.name }}</a>
                <a v-else
                :href="item.url"
                :class="dropDownSubLinkClass"
                :title="item.name">{{ item.name }}</a>
            </li>
        </ul>

        <!-- HCID dropdown menu -->
        <ul id="dropdown1" class="dropdown-content">
            <li  @click="active = !active" :class="active" id="navItemHCID">
                <a class="active menu-header menu-selection" href="https://hcid.city">HCID</a>
            </li>
            <li v-for="(item, index) in dropDownSeminar" @click="active = !active" :class="active" :id="item.id">
                <a v-if="index == 0"
                :href="item.url"
                :class="dropDownLinkClass"
                :title="item.name">{{ item.name }}</a>
                <a v-else
                :href="item.url"
                :class="dropDownSubLinkClass"
                :title="item.name">{{ item.name }}</a>
            </li>
        </ul>

        <!-- Page title -->
        <div class="container py-3 my-3">
            <div class="row">
                <div class="col s6 l12">
                    <h1 class="page-title">
                        <a href="https://hcid.city">HCID</a>.<span v-html="subhead"></span>
                    </h1>
                </div>
                <div class="col s12 m9 l10">
                    <h2 class="flow-text" v-html="subtitle"></h2>
                </div>
            </div>
        </div>
    </header>
    `,
});
new Vue({
	el: "#header",
});
Vue.component("template-footer", function (resolve, reject) {
	setTimeout(function () {
		resolve({
			template: `
            <footer class="page-footer grey lighten-5">
                <div class="container">
                    <div class="row">
                        <div class="col l6 s12" data-aos="fade-up" data-aos-delay="150" data-aos-anchor-placement="bottom-bottom" data-aos-easing="ease-in-out-quad" data-aos-once="true">
                            <h5 class="bold grey-text text-darken-4">
                                HCID
                            </h5>
                            <div>
                                <a class="link grey-text text-darken-4" href="https://hcid.city">Centre for Human-Computer Interaction Design</a>
                            </div>

                            
                            <div>
                                <a class="grey-text text-lighten-1 link" rel="me" href="https://twitter.com/cityuni_hcid">On Twitter</a>
                            </div>
                            <div>
                                <a class="grey-text text-lighten-1 link" rel="me" href="https://hci.social/@hcid">On Mastodon</a>
                            </div>
                        </div>
                        <div id="address" aria-label="Address" class="col l4 offset-l2 s12 mt-4">
                            <ul>
                                <li>
                                    <a class="grey-text text-darken-1" href="https://goo.gl/maps/QbdWpuT8ycp">City, University of London</a>
                                </li>
                                <li>
                                    <a class="grey-text text-darken-1" href="https://goo.gl/maps/QbdWpuT8ycp">College Building</a>
                                </li>
                                <li>
                                    <a class="grey-text text-darken-1" href="https://goo.gl/maps/QbdWpuT8ycp">276-284 St John Street</a>
                                </li>
                                <li>
                                    <a class="grey-text text-darken-1" href="https://goo.gl/maps/QbdWpuT8ycp">Clerkenwell</a>
                                </li>
                                <li>
                                    <a class="grey-text text-darken-1" href="https://goo.gl/maps/QbdWpuT8ycp">London, EC1V 4PB</a>
                                </li>
                                <li aria-label="Link to Visting page" class="mt-3">
                                    <a class="grey-text text-lighten-1 link" href="https://hcid.city/centre/visiting.html"><i class="material-icons md-14 pt-1">location_on</i>&nbsp;Visiting us...</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col 4">
                            <div class="footer-copyright grey lighten-5 grey-text text-lighten-2">
                                <a class="grey-text text-lighten-2" href="https://www.gnu.org/licenses/copyleft.en.html" title="What is Copyleft? - GNU Project - Free Software Foundation">Copyleft</a>&nbsp;<span class="copyleft">&copy;</span>&nbsp;
                                <script type="text/javascript">
                                    document.write(new Date().getFullYear());
                                </script>&nbsp;GNU&nbsp;<a class="grey-text text-lighten-2" href="https://www.gnu.org/licenses/gpl.html" title="The GNU General Public License v3.0 - GNU Project - Free Software Foundation">General Public License</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            `,
		});
	}, 500);
});
new Vue({
	el: "#footer",
});

var app_id = "appVrmQAGy96E1jEP";
var app_key = "key8l5YZtQ9FyUoxF";
