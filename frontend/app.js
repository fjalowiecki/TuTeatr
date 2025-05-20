import { Header } from "./components/header.js";
import { Card, CardHeader } from "./components/card.js";
import { PlayList } from "./components/list.js";
import { showPlayDetails } from "./views/playDetails.js"

const app = document.getElementById('app');
const header = Header();

window.addEventListener('popstate', router);
window.addEventListener('load', router);

function router() {
    const path = window.location.pathname;
    if (path === '/' || path === '') {
        showPlayList();
    } else if (path.startsWith('/play/')) {
        const id = path.split('/')[2];
        showPlayDetails(id, app);
    } else {
        showNotFound();
    }
}

function handleLinkClick(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    history.pushState({}, '', href);
    router();
}

async function getPlays() {
    const res = await fetch('/api/plays');
    const plays = await res.json();
    return plays;
}

async function showPlayList() {
    app.innerHTML = '';
    const plays = await getPlays();
    const playsList = PlayList(plays, handleLinkClick);

    const card = Card();
    const cardHeader = CardHeader('Recently added plays');

    card.appendChild(cardHeader);
    card.appendChild(playsList);

    app.appendChild(header);
    app.appendChild(card);
}

function showNotFound() {
    app.innerHTML = '<p>Location not found. <a href="#/">Go back.</a></p>';
}