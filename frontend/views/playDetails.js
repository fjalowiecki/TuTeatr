import { Header } from "../components/header.js";
import { Card, CardHeader } from "../components/card.js";
import { PlayDetailsList } from "../components/list.js";

async function getPlay(id) {
    const res = await fetch(`/api/play/${id}`);
    const play = res.json();
    return play;
}

function showCommentForm(onSubmit) {
    const card = Card();
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Write a comment...';

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Add';

    card.appendChild(form);
    form.appendChild(input);
    form.appendChild(button);

    button.addEventListener('click', (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(input.value);
        input.value = '';
    });

    return card;
}

function showCommentsSection(play) {
    const section = document.createElement('section');
    const sectionHeader = document.createElement('h3');
    sectionHeader.textContent = 'Comments';
    sectionHeader.classList = ['ml-4'];
    section.appendChild(sectionHeader);

    if (play.comments && play.comments.length > 0) {
        play.comments.forEach(comment => {
            const commentCard = Card();
            commentCard.textContent = `${comment.content}`;
            section.appendChild(commentCard);
        });
    }
    return section;
}

export async function showPlayDetails(id, container) {
    container.innerHTML = '';
    const header = Header();
    const play = await getPlay(id);

    const playCard = Card();
    const cardHeader = CardHeader('Play details');

    const playDetailsList = PlayDetailsList(play);
    playCard.appendChild(cardHeader);
    playCard.appendChild(playDetailsList);

    const commentsSection = showCommentsSection(play);
    const commentForm = showCommentForm(async (content) => {
        await fetch(`/api/play/${play.id}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });
        location.reload();
    });

    container.appendChild(header);
    container.appendChild(playCard);
    container.appendChild(commentsSection);
    container.appendChild(commentForm);
}