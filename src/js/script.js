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

    const favoriteBooks = [];
    const bookList = document.querySelector(select.containerOf.list);

    bookList.addEventListener('click', function(event) {
      event.preventDefault(render);
      const element = event.target.offsetParent;
      
      if(element.classList.contains('book__image')) {
        element.classList.toggle('favorite');
      
        const bookId = element.getAttribute('data-id');
        if(!favoriteBooks.includes(bookId)) {
          favoriteBooks.push(bookId);
        }       
        else {
          favoriteBooks.splice(favoriteBooks.indexOf,1);
        }
        console.log(favoriteBooks);
      }
    });






    // const favoriteBooks = [];
    // const booksList = document.querySelector(select.containerOf.list);
    // const bookImages = booksList.querySelectorAll(select.containerOf.image);
    
    // for (let image of bookImages) {
    //   image.addEventListener('click', function(event) {
    //     event.preventDefault();
    //     const bookID = event.target.getAttribute('data-id');
    //     favoriteBooks.push(bookID);
    //     if (favoriteBooks.includes(bookID)) {
    //       image.classList.toggle('favorite');
    //     }
    //   });


    // }
  }

  render();
  initActions();
}