/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

'use strict';

// start referencje
{
  const select = {
    
    containerOf: {
      list: '.books-list',
      image: '.book__image'      
    },
    filters: '.filters',

    templateOf: {
      bookTemplate: '#template-book',
    },

  };

  const templates = { 
    book: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  const booksList = document.querySelector('.books-list');

  // koniec referencje

  // start funkcji

  function render() {   
    //przechodzę po kazdym elemencie z data
    for(let bookItem of dataSource.books) {
      // generowanie kod-u HTML
      const generateHTML = templates.book(bookItem);
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
      event.preventDefault();
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
      }
    });

    const filters = [];
    const filterForm = document.querySelector('.filters');
    
    filterForm.addEventListener('click', function(event) {
      const element = event.target;
      console.log(element);
      if(element.tagName == 'INPUT' && element.name == 'filter' && element.type == 'checkbox') {
        if(element.checked == true) {
          filters.push(element.value);
        }
        else {
          filters.splice(filters.indexOf(element.value), 1);
        }
        console.log(filters);
      }
      filterBooks();
    });
  }

  function filterBooks() {
    const filters = [];
    for(let book of dataSource.books) {
      let shouldBeHidden = false;
      for(const filter of filters) {
        console.log(book);
        if(!book.details[filter] == true) {
          shouldBeHidden = true;
          break;
        }
      }
      const bookImage = booksList.querySelector('.book__image[data-id="' + book.id + '"]');
      if (shouldBeHidden === true) {
        bookImage.classList.add('hidden');
      }
      if (shouldBeHidden === false) {
        bookImage.classList.remove('hidden');
      }
    }
  }
  render();
  initActions();
}

