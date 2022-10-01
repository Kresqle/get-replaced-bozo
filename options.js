function addReplacementInput(searched = "", replace = "") {
    function createSpan(text) {
        const span = document.createElement('span');
        span.classList.add("input-group-text");
        span.innerHTML = text;
        return span
    }

    function createInput(type, content) {
        const input = document.createElement('input');
        for (const c of ["form-control", type]) input.classList.add(c);
        input.type = "text";
        input.value = content;
        return input;
    }
    
    const div = document.createElement('div');
    for (const c of ["replacement", "input-group", "mb-3"]) div.classList.add(c);
    div.appendChild(createSpan("Search"));
    div.appendChild(createInput("search", searched))
    div.appendChild(createSpan("Replace with"));
    div.appendChild(createInput("replace", replace))

    document.getElementById('list').appendChild(div)
}

function save_options() {
    let replacements = []
    document.getElementById('list').querySelectorAll('.replacement').forEach((elem) => {
        let search = elem.querySelector('.search').value;
        let replace = elem.querySelector('.replace').value;
        if (search != "" && replace != "") {
            replacements.push({
                search: search,
                replace: replace
            });
        }
    });

    chrome.storage.sync.set({
        replacements: replacements
      }, function() {
        const status = document.querySelector('.status');
        status.innerHTML = 'Options saved.';
        setTimeout(function() {
          status.innerHTML = '';
        }, 750);
      });
}

function restore_options() {
    chrome.storage.sync.get({
        replacements: []
    }, function(items) {
        items.replacements.forEach((elem) => {
            addReplacementInput(elem.search, elem.replace)
        })
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('add').addEventListener('click', () => {addReplacementInput("", "")});
document.getElementById('save').addEventListener('click', save_options);