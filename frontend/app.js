import { showMainPage } from "./views/mainPage.js";
import { showPlayDetails } from "./views/playDetails.js"
import { showNotFound } from "./views/notFound.js";
import { Header } from "./components/header.js";

document.body.classList.add(
    'w-full',
    'lg:w-2/3',
    'mx-auto',
);

const app = document.getElementById('app');
document.getElementById('header').appendChild(Header());

window.addEventListener('popstate', router);
window.addEventListener('load', router);

function router() {
    const path = window.location.pathname;
    if (path === '/' || path === '') {
        showMainPage(app);
    } else if (path.startsWith('/play/')) {
        const id = path.split('/')[2];
        showPlayDetails(id, app);
    } else {
        showNotFound(app);
    }
}

export function handleLinkClick(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    history.pushState({}, '', href);
    router();
}