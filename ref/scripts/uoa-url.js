var url_string = window.location.href;
var url = new URL(url_string);
var uoa = url.searchParams.get("uoa");
if (uoa == null) {
    uoa = "cs";
};
var instTop = url.searchParams.get("inst");
if (instTop == null) {
    instTop = "City";
};