export function PlayList(objects, onClick) {
    const list = document.createElement('ul');
    objects.forEach(obj => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `/play/${obj.id}`;
        a.textContent = obj.title;
        a.addEventListener('click', onClick);
        li.appendChild(a);
        list.appendChild(li);
    });
    return list;
}

export function PlayDetailsList(object) {
    const list = document.createElement('ul');

    const title = document.createElement('li');
    title.textContent = `Title: ${object.title}`;

    const premiere = document.createElement('li');
    premiere.textContent = `Premiere: ${object.premiere}`;

    const director = document.createElement('li');
    director.textContent = `Director: ${object.director}`;

    list.appendChild(title);
    list.appendChild(premiere);
    list.appendChild(director);

    return list;
}