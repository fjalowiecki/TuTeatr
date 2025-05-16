const app = document.getElementById('app');

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

function router() {
    const hash = window.location.hash;
    if (!hash || hash === '#/') {
        showPlayList();
    } else if (hash.startsWith('#/play/')) {
        const id = hash.split('/')[2];
        showPlayDetails(id);
    } else {
        showNotFound();
    }
}

function showPlayList() {
    fetch('/plays')
    .then(res => res.json())
    .then(plays => {
        app.innerHTML = `
        <h1>Plays</h1>
        <ul>
            ${plays.map(play => `<li><a href="#/play/${play.id}">${play.title}</a></li>`).join('')}
        </ul>
        `;
    });
}

function showPlayDetails(id) {
    fetch(`/play/${id}`)
    .then(res => {
        if(!res.ok) throw new Error('not found');
        return res.json();
    })
    .then(play => {
        app.innerHTML =  `
        <h1>Play details</h1>
        <ul>
            <li>title: ${play.title}</li>
            <li>premiere: ${play.premiere}</li>
            <li>director: ${play.director}</li>
        </ul>
        `;
    })
    .catch(() => showNotFound());
}

function showNotFound() {
    app.innerHTML = '<p>Location not found. <a href="#/">Go back.</a></p>';
}