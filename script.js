function get() {
    chrome.storage.sync.get({
        replacements: []
    }, function(items) {
        update(items.replacements);
    });
}

function update(config) {
    const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, tp, caption, span, a')
    for (const replacement of config) {
        let search = replacement.search
        let replace = replacement.replace
        for (let j = 0; j < text.length; j++) {
            if (text[j].innerHTML.includes(search)) {
                text[j].innerHTML = text[j].innerHTML.replaceAll(search, replace)
            }
        }
    }
    return
}

window.onload = () => {
    get()
}