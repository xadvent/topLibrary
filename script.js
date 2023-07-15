let library = []

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = Boolean(read)
    }
    info() {
        return `${this.title} by ${this.author}, has ${this.pages} pages and ${this.read ? 'has been read.' : 'has not been read.'}`
    }
}


function addBooktoLibrary(title, author, pages, read){
    return library.push(new Book(title, author, pages, read))
}