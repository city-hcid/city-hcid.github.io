Vue.component('template-header', {
    props: ['subhead', 'subtitle', 'menuhcid', 'menucharter', 'menumembers', 'menuprojects', 'menuresearch', 'menucalendar', 'menureading', 'menureadingCal', 'menuseminar', 'menuseminarspeakers', 'menuseminarcal'],
    template: `
    <header>
        <div class="navbar-fixed">
            <nav class="no-shadows">
                <div class="nav-wrapper white">
                    <a href="#" data-target="mobile-nav" class="sidenav-trigger hide-on-med-and-up"><i class="material-icons grey-text text-darken-2">menu</i></a>
                    <ul id="nav-mobile" class="left hide-on-small-and-down">
                        <li v-bind:class="{ active: menuhcid }"><a class="dropdown-trigger grey-text text-darken-2" href="#!" data-target="dropdown1">HCID</a></li>
                        <li v-bind:class="menucharter ? 'active' : ''"><a href="../centre/charter" class="grey-text text-darken-2">Charter</a></li>
                        <li v-bind:class="menumembers ? 'active' : ''"><a href="../centre/members" class="grey-text text-darken-2">Members</a></li>
                        <li v-bind:class="menuresearch ? 'active' : ''"><a href="../centre/research" class="grey-text text-darken-2">Research</a></li>
                        <li v-bind:class="menuprojects ? 'active' : ''"><a href="../centre/projects" class="grey-text text-darken-2">Projects</a></li>
                    </ul>
                    <a href="https://www.city.ac.uk" class="brand-logo right" style="opacity: 0;" aria-label="Image link to City University website"><img class="hide-on-small-and-down" src="https://www.city.ac.uk/__data/assets/git_bridge/0018/344007/main/i/logo/city-uol-logo-responsive-125.svg" alt="City University logo"></a>
                </div>
            </nav>
        </div>

        <!-- Side nav structure -->
        <ul class="sidenav" id="mobile-nav">
            <li v-bind:class="menuhcid ? 'active' : 'disable'"><a class="menu-header" href="./">HCID</a></li>
            <li v-bind:class="menucharter ? 'active' : ''"><a href="./centre/charter" class="menu-subheader">Charter</a></li>
            <li v-bind:class="menumembers ? 'active' : ''"><a href="./centre/members" class="menu-subheader">Members</a></li>
            <li v-bind:class="menuresearch ? 'active' : ''"><a href="./centre/research" class="menu-subheader">Research</a></li>
            <li v-bind:class="menuprojects ? 'active' : ''"><a href="./centre/projects" class="menu-subheader">Projects</a></li>
            <li v-bind:class="menucalendar ? 'active' : ''"><a href="./centre/calendar" class="menu-subheader">Calendar</a></li>
            <li class="divider" tabindex="-1"></li>
            <li v-bind:class="menureading ? 'active' : ''"><a class="menu-header" href="../centre/reading-group">Reading Group</a></li>
            <li v-bind:class="menureadingCal ? 'active' : ''"><a class="menu-subheader" href="../centre/reading-group-calendar">Calendar</a></li>
            <li class="divider" tabindex="-1"></li>
            <li v-bind:class="menuseminar ? 'active' : ''"><a class="menu-header" href="../seminar/">Seminar Series</a></li>
            <li v-bind:class="menuseminarspeakers ? 'active' : ''"><a class="menu-subheader" href="../seminar/speakers">Speakers</a></li>
            <li v-bind:class="menuseminarcal ? 'active' : ''"><a class="menu-subheader" href="../seminar/calendar">Calendar</a></li>
        </ul>

        <!-- HCID dropdown menu -->
        <ul id="dropdown1" class="dropdown-content">
            <li v-bind:class="menuhcid ? 'active' : ''"><a class="active menu-header menu-selection" href="../">HCID</a></li>
            <li v-bind:class="menucalendar ? 'active' : ''"><a class="menu-subheader" href="../centre/calendar">Calendar</a></li>
            <li class="divider" tabindex="-1"></li>
            <li v-bind:class="menureading ? 'active' : ''"><a class="menu-header" href="../centre/reading-group">Reading Group</a></li>
            <li v-bind:class="menureadingCal ? 'active' : ''"><a class="menu-subheader" href="../centre/reading-group-calendar">Calendar</a></li>
            <li class="divider" tabindex="-1"></li>
            <li v-bind:class="menuseminar ? 'active' : ''"><a class="menu-header" href="../seminar/">Seminar Series</a></li>
            <li v-bind:class="menuseminarspeakers ? 'active' : ''"><a class="menu-subheader" href="../seminar/speakers">Speakers</a></li>
            <li v-bind:class="menuseminarcal ? 'active' : ''"><a class="menu-subheader" href="../seminar/calendar">Calendar</a></li>
        </ul>

        <!-- Page title -->
        <div class="container py-5 my-5">
            <div class="row">
                <div class="col s6 l4">
                    <h1 class="page-title">
                        <a href="https://hcid.city">HCID</a>.<span class="fade-out-left" v-html="subhead"></span>
                    </h1>
                </div>
                <div class="col s12 m9 l10">
                    <h2 class="flow-text" v-html="subtitle"></h2>
                </div>
            </div>
        </div>
    </header>
    `
})

Vue.component('template-footer', {
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
                            <a class="grey-text text-lighten-1 link" href="https://hcid.city/visiting.html"><i class="material-icons md-14 pt-1">location_on</i>&nbsp;Visiting us...</a>
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
    `
})

Vue.component('template-listing', {
    props: ['theme', 'item', 'name', 'url'],
    template: `<span v-if="item.includes(theme)"><a v-bind:href="url" target="_blank">{{ name }}</a>, </span>`
})