Vue.component('template-header', {
    props: ['subhead', 'subtitle', 'isActiveHCID', 'isActiveCharter', 'isActiveMembers', 'isActiveProjects', 'isActiveCalendar', 'isActiveRG', 'isActiveRGCal', 'isActiveSS', 'isActiveSSSpeakers', 'isActiveSSCal'],
    template: `
    <header>
        <div class="navbar-fixed">
            <nav class="no-shadows">
                <div class="nav-wrapper white">
                    <a href="#" data-target="mobile-nav" class="sidenav-trigger hide-on-med-and-up"><i class="material-icons grey-text text-darken-2">menu</i></a>
                    <ul id="nav-mobile" class="left hide-on-small-and-down">
                        <li class="active"><a class="dropdown-trigger grey-text text-darken-2" href="#!" data-target="dropdown1">HCID</a></li>
                        <li><a href="../centre/charter" class="grey-text text-darken-2">Charter</a></li>
                        <li><a href="../centre/members" class="grey-text text-darken-2">Members</a></li>
                        <li><a href="../centre/projects" class="grey-text text-darken-2">Projects</a></li>
                    </ul>
                    <a href="https://www.city.ac.uk" class="brand-logo right" style="opacity: 0;" aria-label="Image link to City University website"><img class="hide-on-small-and-down" src="https://www.city.ac.uk/__data/assets/git_bridge/0018/344007/main/i/logo/city-uol-logo-responsive-125.svg" alt="City University logo"></a>
                </div>
            </nav>
        </div>

        <!-- Side nav structure -->
        <ul class="sidenav" id="mobile-nav">
            <li v-bind:class="isActiveHCID ? 'active' : ''"><a class="menu-header" href="./">HCID</a></li>
            <li v-bind:class="isActiveCharter ? 'active' : ''"><a href="./centre/charter" class="menu-subheader">Charter</a></li>
            <li v-bind:class="isActiveMembers ? 'active' : ''"><a href="./centre/members" class="menu-subheader">Members</a></li>
            <li v-bind:class="isActiveProjects ? 'active' : ''"><a href="./centre/projects" class="menu-subheader">Projects</a></li>
            <li v-bind:class="isActiveCalendar ? 'active' : ''"><a href="./centre/calendar" class="menu-subheader">Calendar</a></li>
            <li class="divider" tabindex="-1"></li>
            <li v-bind:class="isActiveRG ? 'active' : ''"><a class="menu-header" href="../centre/reading-group">Reading Group</a></li>
            <li v-bind:class="isActiveRGCal ? 'active' : ''"><a class="menu-subheader" href="../centre/reading-group-calendar">Calendar</a></li>
            <li class="divider" tabindex="-1"></li>
            <li v-bind:class="isActiveSS ? 'active' : ''"><a class="menu-header" href="../seminar/">Seminar Series</a></li>
            <li v-bind:class="isActiveSSSpeakers ? 'active' : ''"><a class="menu-subheader" href="../seminar/speakers">Speakers</a></li>
            <li v-bind:class="isActiveSSCal ? 'active' : ''"><a class="menu-subheader" href="../seminar/calendar">Calendar</a></li>
        </ul>

        <!-- HCID dropdown menu -->
        <ul id="dropdown1" class="dropdown-content">
            <li v-bind:class="isActiveHCID ? 'active' : ''"><a class="active menu-header menu-selection" href="../">HCID</a></li>
            <li v-bind:class="isActiveCalendar ? 'active' : ''"><a class="menu-subheader" href="../centre/calendar">Calendar</a></li>
            <li class="divider" tabindex="-1"></li>
            <li v-bind:class="isActiveRG ? 'active' : ''"><a class="menu-header" href="../centre/reading-group">Reading Group</a></li>
            <li v-bind:class="isActiveRGCal ? 'active' : ''"><a class="menu-subheader" href="../centre/reading-group-calendar">Calendar</a></li>
            <li class="divider" tabindex="-1"></li>
            <li v-bind:class="isActiveSS ? 'active' : ''"><a class="menu-header" href="../seminar/">Seminar Series</a></li>
            <li v-bind:class="isActiveSSSpeakers ? 'active' : ''"><a class="menu-subheader" href="../seminar/speakers">Speakers</a></li>
            <li v-bind:class="isActiveSSCal ? 'active' : ''"><a class="menu-subheader" href="../seminar/calendar">Calendar</a></li>
        </ul>

        <!-- Page title -->
        <div class="container py-5 my-5">
            <div class="row">
                <div class="col s12 m9 l10">
                    <h1 class="page-title">
                        <a href="https://hcid.city">HCID</a>.{{ subhead }}
                    </h1>
                    <div>
                        {{ subtitle }}
                    </div>
                </div>
            </div>
        </div>
    </header>
    `
})

Vue.component('template-footer', {
    template: `
    <footer>
        <b-container fluid="sm">
            <b-row align-h="center">
                <b-col cols="12" md="10" class="py-5 mb-3">
                    <b-link href="https://interactions.acm.org" target="_blank">
                        <b-img left src="https://interactions.acm.org/images/logo.gif" alt="interactions magazine logo" width="160px"></b-img>
                    </b-link>
                </b-col>
            </b-row>
        </b-container>
    </footer>
    `
})