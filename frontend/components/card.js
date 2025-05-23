export function Card(text) {
    const wrapper = document.createElement('div');
    wrapper.classList.add(
        'flex',
        'flex-col',
    );
    const body = CardBody();
    const cardHeader = CardHeader(text);
    wrapper.appendChild(cardHeader);
    wrapper.appendChild(body);
    return { wrapper, body, cardHeader };
}

function CardBody() {
    const body = document.createElement('div');
    body.classList.add(
        'space-y-6',
        'border-2',
        'border-blue-400',
        'rounded-lg',
        'p-2',
        'bg-white',
        'flex',
        'flex-col',
        'ml-4',
    );
    return body;
}

export function CardHeader(text) {
    const cardHeader = document.createElement('h2');
    cardHeader.classList.add(
        'ml-8',
        'mb-1',
    );
    cardHeader.textContent = text;
    return cardHeader;
}