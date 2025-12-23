interface Book {
  title: string;
  author: string;
  pages: number;
  isPublished: boolean;
}

const book1: Book = {
  title: "Clean Code",
  author: "Robert C. Martin",
  pages: 464,
  isPublished: true
};

const book2: Book = {
  title: "The Pragmatic Programmer",
  author: "Andrew Hunt & David Thomas",
  pages: 352,
  isPublished: true
};

const book3: Book = {
  title: "Learning TypeScript",
  author: "Josh Goldberg",
  pages: 450,
  isPublished: false
};

function printBookInfo(book: Book): void {
  console.log(`Title: ${book.title}`);
  console.log(`Author: ${book.author}`);
  console.log(`Pages: ${book.pages}`);
  console.log(`Published: ${book.isPublished ? "Yes" : "No"}`);
  console.log("-------------------------");
}

const library: Book[] = [book1, book2, book3];

for (const book of library) {
  printBookInfo(book);
}
