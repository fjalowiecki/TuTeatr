export function Card() {
    const card = document.createElement('div');
    card.classList.add(
        'border',
        'rounded-lg',
        'p-4',
        'shadow-sm',
        'bg-white',
        'flex',
        'flex-col',
        'm-4',
    );
    return card;
}

export function CardHeader(text) {
    const cardHeader = document.createElement('h2');
    cardHeader.classList.add(
        'text-lg',
        'font-semibold',
        'mb-2'
    );
    cardHeader.textContent = text;
    return cardHeader;
}