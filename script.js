let library = []

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = Boolean(read)
    }
}

const newDiv = document.createElement('div').classList.add('.card')
const content = document.getElementById('content')
console.log(content)

function remake() {
    document.querySelectorAll('.card').forEach(e => e.remove())
}


function refresh() {
    remake()
    for(let i = 0; i < library.length; i++) {
        const quanda = document.createElement('div')
        quanda.classList.add('card')
        const removeButton = document.createElement('button')
        removeButton.classList.add('remove')
        quanda.appendChild(removeButton)
        let item = library[i]
        for(thing in item){
            const thingie = document.createElement('div')
            thingie.classList.add(`${thing}`)
            thingie.textContent = item[thing]
            if (thingie.textContent === 'false') thingie.classList.add('red')
            if (thingie.textContent === 'true') thingie.classList.add('green')
            
            quanda.appendChild(thingie)
        }
        content.appendChild(quanda)
    }
}

function addBooktoLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    library.push(newBook)
    refresh()
    return
}

//addBooktoLibrary('veronica is cute', 'Pierce', 200, true)
addBooktoLibrary('Trust in God', "Pierce", 1, false)
addBooktoLibrary('The Lord of the Rings', "Jk ROwling", 1024, true)