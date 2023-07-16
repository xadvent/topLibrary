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
}

const content = document.getElementById('content')
const addForm = document.querySelector('.form')
const addNewButton = document.querySelector('.addNew')


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

function addBooktoLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    library.push(newBook)
    refresh()
    removeFunction() // lets you remove using button
    return
}

addBooktoLibrary('veronica is cute', 'Pierce', 200, true)
addBooktoLibrary('Trust in God', "Pierce", 1, false)
addBooktoLibrary('The Lord of the Rings', "Jk ROwling", 1024, true)


addNewButton.addEventListener('click', function () {
    content.classList.add('hidden')
    addForm.classList.remove('hidden')
    addNewButton.classList.add('hidden')
})