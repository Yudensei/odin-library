function Book(name, author, pages, hasRead) {
    if (!new.target) {
        throw Error("You must use 'new' keyword to call this constructor")
    }

    this.title = name;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    if (this.hasRead) {
        this.read = "Yes";
    } else {
        this.read = "No";
    }
    this.id = crypto.randomUUID();
}

function addBook(name, author, pageNumber, hasRead) {
    library.push(new Book(name, author, pageNumber, hasRead))
}

function getBook(id) {
    for (let book of library) {
        if (id === book.id) {
            return book
        }
    }
}

Book.prototype.changeStatus = function () {
    this.hasRead = this.hasRead ? false : true;
    // const htmlRead = document.querySelector(`[data-id="${this.id}"] > .read`)
    // htmlRead.textContent = this.hasRead ? "Yes" : "No";
}

let library = [];

const htmlLibrary = document.querySelector("#library");
const template = document.querySelector(".template");

const form = document.querySelector("form");

const createBook = document.querySelector("button[type='submit']");
createBook.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    addBook(formData.get("title"), formData.get("author"), formData.get("pages"), formData.get("hasRead"))
    storeBook(library.at(-1))
})

htmlLibrary.addEventListener("click", (e) => {
    if (e.target.className === "read") {
    e.target.textContent = (e.target.textContent === "Read: Yes") ? "Read: No" : "Read: Yes"
    getBook(e.target.parentElement.getAttribute("data-id")).changeStatus;
    } else if (e.target.id === "trash") {
        e.target.parentElement.remove()
    }
})

function storeBook(libraryBook) {
    let newBook = template.cloneNode(true);
    let newBookContent = newBook.children;
    newBook.setAttribute("data-id", libraryBook.id)
    for (let info of newBookContent) {
        if (libraryBook[info.className] === undefined) continue;
        info.textContent += libraryBook[info.className];
    }
    displayBook(newBook);
    htmlLibrary.appendChild(newBook);
}

function displayBook(htmlBook) {
    htmlBook.setAttribute("class", "book");
}