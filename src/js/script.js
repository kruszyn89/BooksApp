/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';

  // start referencje

  const select = {
    
    containerOf: {
      list: '.books-list',
      image: '.book__image',
    },

    templateOf: {
      book: '#template-book',
    },

    bookData: {
      id: '.book.id',
      name: 'book.name',
      price: 'book.price',
      rating: 'book.rating',
      image: 'book.image',
    },

  };

  const templates = { 
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  // koniec referencje

  // start funkcji

  function render() {   
    //przechodzę po kazdym elemencie z 
    for(let book of dataSource.books) {
      // generowanie kod-u HTML
      const generateHTML = templates.book(book);
      // tworzenie elementu DOM
      const element = utils.createDOMFromHTML(generateHTML);
      // znajduje odpowiednie miejsce do umieszczenia kodu
      const bookContainer = document.querySelector(select.containerOf.list);
      // umieszcza odpowiednią pozycję ksiązki
      bookContainer.appendChild(element);
    }
  }

  function initActions() {
    // dodaję pustą tablicę wewnątrz funkcji initActions()
    const favoriteBooks = [];
    const selectedImage = document.querySelector(select.containerOf.image);
    console.log(selectedImage);


  }

  render();
  initActions();
}