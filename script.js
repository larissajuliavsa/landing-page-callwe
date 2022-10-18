const products = [
  {
    "name": "Produtos",
    "icon": "produtos.svg",
    "articles": ["01 Artigo", "02 Artigo", "03 Artigo"]
  },
  {
    "name": "Garantia",
    "icon": "garantia.svg",
    "articles": ["01 Artigo", "02 Artigo", "03 Artigo"]
  },
  {
    "name": "Assistência técnica autorizada",
    "icon": "assistencia.svg",
    "articles": ["01 Artigo", "02 Artigo", "03 Artigo"]
  },
  {
    "name": "Tecnologias",
    "icon": "tecnologias.svg",
    "articles": ["01 Artigo", "02 Artigo", "03 Artigo"]
  },
  {
    "name": "Trabalhe conosco",
    "icon": "trabalhe-conosco.svg",
    "articles": ["01 Artigo", "02 Artigo", "03 Artigo"]
  },
  {
    "name": "Projeto",
    "icon": "projeto.svg",
    "articles": ["01 Artigo", "02 Artigo", "03 Artigo"]
  },
  {
    "name": "Onde encontrar",
    "icon": "onde-encontrar.svg",
    "articles": ["01 Artigo", "02 Artigo", "03 Artigo"]
  },
  {
    "name": "Cadastro garantia toda vida",
    "icon": "cadastro.svg",
    "articles": ["01 Artigo", "02 Artigo", "03 Artigo"]
  },
]

const boardUl = document.querySelector('#board');

function createElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function createCards(products) {
  products.forEach(() => {
    const li = createElement('li', 'flip card');
    boardUl.appendChild(li);
  })
  return products;
}

createCards(products);

const listas = document.querySelectorAll('.card');

function createCardFront(products) {
  products.forEach((item, index) => {
    const cardFront = createElement('div', 'face front');
  
    const title = createElement('p', 'title');
    const icon = createElement('img', 'icon');
    const openArticle = createElement('p', 'openArticles');
  
    title.innerHTML = item.name;
    icon.setAttribute('src', `assets/images/${item.icon}`);
    openArticle.innerHTML = 'ver artigos <img src="assets/images/arrow-right.svg"/>';
  
    cardFront.appendChild(icon);
    cardFront.appendChild(title);
    cardFront.appendChild(openArticle);
  
    listas[index].appendChild(cardFront);
  })

  return products;
}

createCardFront(products);

function createCardBack(products) {
  products.forEach((item, index) => {
    const cardBack = createElement('div', 'face back');
  
    const article01 = createElement('p', 'article01');
    const article02 = createElement('p', 'article02');
    const article03 = createElement('p', 'article03');
    const closeArticle = createElement('p', 'closeArticles');
  
    article01.innerHTML = item.articles[0];
    article02.innerHTML = item.articles[1];
    article03.innerHTML = item.articles[2];
    closeArticle.innerHTML = '<img src="assets/images/arrow-left.svg"/>voltar';
  
    cardBack.appendChild(article01);
    cardBack.appendChild(article02);
    cardBack.appendChild(article03);

    cardBack.appendChild(closeArticle);
  
    listas[index].appendChild(cardBack);
  })

  return products;
}

createCardBack(products);

function flipCard(event) {
  if (event.target) {
    event.target.closest('.card').classList.toggle('flip');
  }
}

const openCard = document.querySelectorAll('.openArticles');
openCard.forEach(card => card.addEventListener('click', flipCard));

const closeCard = document.querySelectorAll('.closeArticles');
closeCard.forEach(card => card.addEventListener('click', flipCard));

const printAddress = (data) => {
  document.getElementById('address').value = data.logradouro;
  document.getElementById('city').value = data.localidade;
  document.getElementById('state').value = data.uf;
}

function validateCEP() {
  const cep = document.getElementById('cep').value.replace('-', '');
  const regex = /^[0-9]{8}$/;

  if(!regex.test(cep)) {
    alert("CEP incorreto");
  }
  return searchCEP(cep);
}

async function searchCEP(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  const response = await fetch(url);
  const data = await response.json();

  if(data.hasOwnProperty('erro')) {
    alert("CEP não encontrado");
  } else {
    return printAddress(data);
  }
}

const getAddress = document.getElementById('cep');
getAddress.addEventListener('focusout', validateCEP);

const track  = document.querySelector('.track');

function carouselNextCard() {
  const carouselWidth  = document.querySelector('.carousel-container').offsetWidth;
  const next = document.querySelector('.next');

  next.addEventListener('click', () => {
    track.style.transform = `translateX(-${carouselWidth}px)`;
  })
}

carouselNextCard()

function carouselPrevCard() {
  const prev  = document.querySelector('.prev');
  
  prev.addEventListener('click', () => {
    track.style.transform = `translateX(-${0}px)`;
  })
}

carouselPrevCard()

const burger = document.querySelector('.header-burger');
const header = document.querySelector('.header-navbar');
const headerLinks = document.querySelectorAll('.header-navbar li');

function menuHamburger() {
  burger.addEventListener('click', () => {
    header.classList.toggle('navbar-active');

    headerLinks.forEach((item, index) => {
      if (item.style.animation) {
        item.style.animation = '';
      } else {
        item.style.animation = `headerNavbarFade 0.5s ease forwards ${index / 8 + 0.5}s`;
      }
    });
    burger.classList.toggle('burger-toggle');
  })
}
menuHamburger()

