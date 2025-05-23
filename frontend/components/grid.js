export function Grid() {
    const grid = document.createElement('div');
    grid.classList.add(
        'grid',
        'grid-cols-1',
        'lg:grid-cols-3',
        'gap-4',
    );
    return grid;
}