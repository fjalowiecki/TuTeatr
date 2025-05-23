import { Card, CardHeader } from "../components/card.js";
import { PlayList } from "../components/list.js";
import { Grid } from "../components/grid.js";

import { handleLinkClick } from "../app.js";

async function getPlays() {
    const res = await fetch('/api/plays');
    const plays = await res.json();
    return plays;
}

export async function showMainPage(container) {
    container.innerHTML = '';
    const plays = await getPlays();
    const playsList = PlayList(plays, handleLinkClick);

    const grid = Grid();
    const card = Card('Repertuar w okolicy: Kraków');
    card.body.appendChild(playsList);

    const leftCol = document.createElement('div');
    leftCol.classList.add('lg:col-span-2', 'flex', 'flex-col', 'gap-6');
    
    const rightCol = document.createElement('div');
    rightCol.classList.add('lg:col-span-1', 'flex', 'flex-col', 'gap-6');
    
    leftCol.appendChild(showIntroSection());
    leftCol.appendChild(card.wrapper);
    leftCol.appendChild(showPremieresSection());
    
    rightCol.appendChild(showCommentsSection());
    rightCol.appendChild(showFeaturedPlaySection());
    
    grid.appendChild(leftCol);
    grid.appendChild(rightCol);
    
    container.appendChild(grid);
}

function showIntroSection() {
    const intro = document.createElement('div');
    intro.classList.add(
        'space-y-3',
        'm-8',
    );
    const introPrimary = document.createElement('h1');
    introPrimary.classList.add(
        'text-2xl',
        'font-bold',
    );
    introPrimary.textContent = "Szybko i łatwo sprawdź repertuar teatrów w okolicy wraz z\u00A0opiniami widzów o\u00A0spektaklu.";
    const introSecondary = document.createElement('h2');
    introSecondary.classList.add(
        'text-xl',
    );
    introSecondary.textContent = "Masz swoją opinię? Podziel się nią!";

    intro.appendChild(introPrimary);
    intro.appendChild(introSecondary);

    return intro;
}

function DummyContent(height = 200) {
    const box = document.createElement('div');
    box.classList.add(
        'w-full',
    )
    box.style.height = `${height}px`;
    return box;
}

function showPremieresSection() {
    const card = Card('Premiery');
    card.body.appendChild(DummyContent(400));
    return card.wrapper;
}

function showCommentsSection() {
    const card = Card('Najnowsze opinie');
    card.body.appendChild(DummyContent(400));
    return card.wrapper;
}

function showFeaturedPlaySection() {
    const card = Card('Wyróżniony spektakl');
    card.body.appendChild(DummyContent(150));
    return card.wrapper;
}