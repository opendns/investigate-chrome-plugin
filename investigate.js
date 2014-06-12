chrome.browserAction.onClicked.addListener(function(tab) {
    var current = strip(tab.url)
        // ipV4 right now :-(
      , ipRegex = RegExp('^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$','')
      , redirect = 'https://investigate.opendns.com/'
    ;

    if (current.length === 0) {
        return;
    }

    if (ipRegex.test(current)) {
        redirect = redirect + 'ip-view/' + encodeURIComponent(current);
    } else {
        redirect = redirect + 'domain-view/name/' + encodeURIComponent(current) + '/view';
    }

    // Create new tab with our new url
    chrome.tabs.create({ url: redirect });
});

function strip(url) {
    var matchBefore = '://'
      , matchAfter = '/'
      , index
    ;

    // First remove any http/https/ftp/etc
    index = url.indexOf(matchBefore);
    if (index >= 0) {
        url = url.substr(index + matchBefore.length);
    }

    // Then remove anything after first trailing slash
    index = url.indexOf(matchAfter);
    if (index >= 0) {
        // Select everything before the slash
        url = url.substr(0, index);
    }

    return url;
}
