const content = document.getElementById('content');
const formcontainer = document.querySelector('.form');
const addNewButton = document.querySelector('.addNew');
const bookForm = document.querySelector('#bookform');
const cancelButton = document.querySelector('.cancel');
let library = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = Boolean(read);
    }
    deleteSelf() {
        return library.splice(library.indexOf(this), 1);
    }
    toggleRead() {
        this.read = !this.read;
    }
}


function refresh() {
    document.querySelectorAll('.card').forEach(e => e.remove());

    const createElementWithClass = function (type, designatedClass) {
        const card = document.createElement(`${type}`)
        card.classList.add(`${designatedClass}`)
        return card
    }

    const createToggleButton = function () {
        const toggleButton = document.createElement('button')
        toggleButton.classList.add('toggleButton')
        toggleButton.textContent = 'Toggle Read'
        return toggleButton
    }

    for (let i = 0; i < library.length; i++) {
        const createdCard = createElementWithClass('div', 'card')
        const removeButton = createElementWithClass('button', 'remove')
        let book = library[i];
        for (info in book) {
            const infoDiv = createElementWithClass('div', info)
            infoDiv.textContent = book[info];
            if (info === 'read') {
                if (book[info] === false) {
                    infoDiv.classList.add('red');
                } else infoDiv.classList.add('green');
            }
            createdCard.appendChild(infoDiv);
        }

        const toggleButton = createToggleButton()
        createdCard.appendChild(toggleButton);
        createdCard.appendChild(removeButton);
        content.appendChild(createdCard);
    }
    toggleFunction();
}


function removeFunction() {
    const buttonArray = document.querySelectorAll('.remove');
    buttonArray.forEach(button => {
        button.addEventListener('click', function () {
            const needtodelete = button.parentElement.firstChild.textContent;
            library.forEach(book => book.title === needtodelete ? book.deleteSelf() : null);
            button.parentElement.remove();
        });
    });
}

function toggleFunction() {
    const toggleArray = document.querySelectorAll('.toggleButton');
    toggleArray.forEach(toggle => {
        toggle.removeEventListener('click', toggleClickHandler);
        toggle.addEventListener('click', toggleClickHandler);
    });
}

function toggleClickHandler() {
    const changingTitle = this.parentElement.firstChild.textContent;
    library.forEach(book => {
        if (book.title === changingTitle) {
            book.toggleRead();
            const readElement = this.parentElement.querySelector('.read');
            readElement.textContent = book.read;
            readElement.classList.toggle('green', book.read);
            readElement.classList.toggle('red', !book.read);
        }
    });
}

function showForm() {
    content.classList.add('hidden');
    formcontainer.classList.remove('hidden');
    addNewButton.classList.add('hidden');
}

function hideForm() {
    content.classList.remove('hidden');
    formcontainer.classList.add('hidden');
    addNewButton.classList.remove('hidden');
}

function addBooktoLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    library.push(newBook);
    refresh();
    removeFunction();
    toggleFunction();
}

addBooktoLibrary('1984', 'George Orwell', 328, false);
addBooktoLibrary('Dune', 'Frank Herbert', 794, false);
addBooktoLibrary('The Lord of the Rings', 'J.R.R Tolkien', 1178, true);


function cardFromForm(event) {
    event.preventDefault();
    const myFormData = new FormData(event.target);
    console.log(myFormData);

    const formDataObj = {};
    myFormData.forEach((value, key) => (formDataObj[key] = value));
    hideForm();

    bookForm.reset();
    addBooktoLibrary(formDataObj.title, formDataObj.author, formDataObj.pages, formDataObj.read);
    return
}
const AddAllListeners = (function () {
    cancelButton.addEventListener('click', function () {
        bookForm.reset();
        hideForm();
    });
    addNewButton.addEventListener('click', showForm);
    bookForm.addEventListener('submit', cardFromForm);
})()
