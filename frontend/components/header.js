export function Header() {
  const header = document.createElement('header');
  header.classList.add(
    'bg-blue-700',
    'text-white',
    'p-4',
    'flex',
    'justify-between',
    'items-center',
    'shadow',
  );

  const logo = Logo();
  const nav = Navigation();
  header.appendChild(logo);
  header.appendChild(nav);

  return header;
}

function Logo() {
  const logo = document.createElement('div');
  logo.classList.add(
    'text-2xl',
    'font-bold',
    'tracking-wide',
  );
  logo.innerText = 'TuTeatr';
  return logo;
}

function Navigation() {
  const nav = document.createElement('nav');

  const link1 = Link('link1', '#/');
  const link2 = Link('link2', '#/');
  nav.appendChild(link1);
  nav.appendChild(link2);

  return nav;
}

function Link(text, href) {
  const link = document.createElement('a');
  link.classList.add(
    'mx-2',
    'hover:underline',
  );
  link.href = href;
  link.textContent = text;
  return link;
}