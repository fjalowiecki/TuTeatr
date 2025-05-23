export function Header() {
  const header = document.createElement('header');
  header.classList.add(
    'p-4',
    'flex',
    'justify-between',
    'items-center',
    'mb-4',
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

  const link1 = Link('Zaloguj', '#/');
  link1.classList.add('text-blue-400');
  const link2 = Link('Zarejestruj', '#/');
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