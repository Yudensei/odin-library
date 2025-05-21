function Book(name, author, pages, read) {
    if (!new.target) {
        throw Error("You must use 'new' keyword to call this constructor")
    }

    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBook(name, author, pageNumber, hasRead) {
    library.push(new Book(name, author, pageNumber, hasRead))
}

let library = [];