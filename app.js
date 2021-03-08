//Book class
class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    read = "false"
  ) {
    this.title = title;
    this.author = author;
    this.read = read
  }
}

const container = document.querySelector('.container');

let myLibrary = [];

function addToLibrary(newBook) {
  if(myLibrary.some(book => book.title === newBook.title)) return false;
  myLibrary.push(newBook);
  saveLocal();
  return true
}

function removeFromLibrary(bookTitle) {
  myLibrary = myLibrary.filter(book => book.title !== bookTitle)
  saveLocal()
}

function getBook(bookTitle) {
  for (let book of myLibrary) {
    if(book.title === bookTitle){
      return book
    }
  }
  return null
}

//POP UPS
const addButton = document.querySelector('.plus-btn')
const popUp = document.querySelector('[data-pop]')
const overLay = document.querySelector('[data-overlay]')

addButton.addEventListener('click', openPopUp)
container.addEventListener('click', deleteItem)
overLay.addEventListener('click', closePopUp)
window.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closePopUp();
})

function openPopUp() {
  form.reset()
  popUp.classList.add('active')
  overLay.classList.add('active')
}

function closePopUp() {
  popUp.classList.remove('active')
  overLay.classList.remove('active')
}


//SUBMIT FORM

const form = document.querySelector('.pop-up-form')
form.addEventListener('submit', addBook)

function addBook(e) {
  e.preventDefault()
  if(addToLibrary(getBookFromInput())) {
    updateBooksGrid()
    closePopUp()
  }
  else {
    alert('Book Already exist')
  }
}


//GETTING INFOS FROM THE INPUTS
function getBookFromInput(book) {
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const read = document.querySelector('#is-read').checked
  return new Book(title, author, read)
}

//DELETE ITEM FROM LISTS
function deleteItem(e) {
  const item = e.target.parentElement.parentElement
  const button = e.target.classList
// DELETE THE CURRENT BOOK
  if (button.contains('trash-btn')) {
    const book = item
    removeFromLibrary(e.target.parentNode.parentNode.firstChild.innerHTML);
    book.classList.add('fall')
    book.addEventListener('transitionend', () => book.remove())
//CHANGE THE COLOR OF READ BUTTON 
  } else if(button.contains('read-button')) {
    if(e.target.innerHTML === `Read <i class="fas fa-check"></i>`){
        getBook(e.target.parentNode.parentNode.firstChild.innerHTML).read = false
        e.target.innerHTML = 'Read'
        e.target.classList.remove('button-check-read')
        e.target.classList.add('button-check-btn')
        saveLocal()
      } else {
        getBook(e.target.parentNode.parentNode.firstChild.innerHTML).read = true
        e.target.innerHTML = `Read <i class="fas fa-check"></i>`
        e.target.classList.remove('button-check-btn')
        e.target.classList.add('button-check-read')
        saveLocal()
      }
    }
  }

// CREATE NEW BOOK
function createBook (book) {

  const bookItemsDiv = document.createElement('DIV') 
  const title = document.createElement('H2') 
  const author = document.createElement('H3') 
  const checkBtn = document.createElement('button') 
  const trashBtn = document.createElement('button')
  const buttonDiv = document.createElement('div')

  bookItemsDiv.classList.add('book-items')
  buttonDiv.classList.add('buttons')
  checkBtn.classList.add('button')
  checkBtn.classList.add('read-button')
  trashBtn.classList.add('button')
  trashBtn.classList.add('trash-btn')


  title.innerText = book.title
  author.innerText = book.author
  trashBtn.innerHTML = `<i class="fas fa-trash"></i>`

// IF BOOK IS READ
  if(book.read) {
    checkBtn.innerHTML = `Read <i class="fas fa-check"></i>`
    checkBtn.classList.add('button-check-read')
  } else {
    checkBtn.innerHTML = 'Read'
    checkBtn.classList.add('button-check-btn')
  }

  bookItemsDiv.appendChild(title)
  bookItemsDiv.appendChild(author)
  buttonDiv.appendChild(checkBtn)
  buttonDiv.appendChild(trashBtn)
  bookItemsDiv.appendChild(buttonDiv)
  container.appendChild(bookItemsDiv)
 }

//LOOPING THROUGH MYLIBRARY
function updateBooksGrid() {
  resetGrid()
  for (let element of myLibrary){
    createBook(element)
  }
}

function resetGrid() {
  container.innerHTML = ''
}



//SAVING TO LOCAL STORAGE
function saveLocal() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

function restoreLocal() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"))
  if(myLibrary === null) myLibrary = [];
  updateBooksGrid()


} 
restoreLocal()