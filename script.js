let library = []

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = Boolean(read)
    }
    deleteSelf() {
        return library.splice(library.indexOf(this), 1)
    }
    toggleRead() {
        this.read ? this.read = false : this.read = true
        return library.splice(library)
    }
}

const content = document.getElementById('content')
const formcontainer = document.querySelector('.form')
const addNewButton = document.querySelector('.addNew')
const bookForm = document.querySelector('#bookform')
const cancelButton = document.querySelector('.cancel')
const createButton = document.createElement('button')
createButton.classList.add('toggleRead')


function deleteCards() {
    document.querySelectorAll('.card').forEach(e => e.remove())
}

function refresh() {
    deleteCards()
    for (let i = 0; i < library.length; i++) {
        const quanda = document.createElement('div')
        quanda.classList.add('card')
        const removeButton = document.createElement('button')
        removeButton.classList.add('remove')
        let item = library[i]
        for (thing in item) {
            const thingie = document.createElement('div')
            thingie.classList.add(`${thing}`)
            thingie.textContent = item[thing]
            if (thingie.textContent === 'false') thingie.classList.add('red')
            if (thingie.textContent === 'true') thingie.classList.add('green')

            quanda.appendChild(thingie)
        };

        quanda.appendChild(removeButton)
        content.appendChild(quanda)
    }; return
}

function removeFunction() {
    const buttonArray = document.querySelectorAll('.remove')
    buttonArray.forEach(button => {
        button.addEventListener('click', function () {
            const needtodelete = button.parentElement.firstChild.textContent
            library.forEach(book => book.title === needtodelete ? book.deleteSelf() : null)
            return button.parentElement.remove()
        })
    })
}

function showForm() {
    content.classList.add('hidden')
    formcontainer.classList.remove('hidden')
    addNewButton.classList.add('hidden')
}
function hideForm() {
    content.classList.remove('hidden')
    formcontainer.classList.add('hidden')
    addNewButton.classList.remove('hidden')
}

function addBooktoLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    library.push(newBook)
    refresh()
    removeFunction() // lets you remove using button
    return
}

addBooktoLibrary('Prince is cute', 'Pierce', 200, true)
addBooktoLibrary('Trust in God', "Pierce", 1, false)
addBooktoLibrary('The Lord of the Rings', "Jk ROwling", 1024, true)
bookForm.addEventListener('submit', dothing)
function dothing(event) {
    event.preventDefault()
    const myFormData = new FormData(event.target)
    console.log(myFormData)

    const formDataObj = {}
    myFormData.forEach((value, key) => (formDataObj[key] = value))
    hideForm()


    bookForm.reset()
    return addBooktoLibrary(formDataObj.title, formDataObj.author, formDataObj.pages, formDataObj.read)
}
cancelButton.addEventListener('click', function(){
    bookForm.reset()
    hideForm()
})

addNewButton.addEventListener('click', showForm)