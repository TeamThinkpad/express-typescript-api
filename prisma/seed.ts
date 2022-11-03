import { db } from "../src/utils/db.server";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

async function seed(): Promise<void> {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );
  const author = await db.author.findFirst({
    where: {
      firstName: "Alex",
    },
  });
  await Promise.all(
    getBooks().map((book) => {
      const { title, isFiction, datePublished } = book;
      return db.book.create({
        data: {
          title,
          isFiction,
          datePublished,
          authorId: author.id,
        },
      });
    })
  );
}
seed();

function getAuthors(): Array<Author> {
  return [
    {
      firstName: "Alex",
      lastName: "De Michele",
    },
    {
      firstName: "Elon",
      lastName: "Musk",
    },
    {
      firstName: "Kira",
      lastName: "Yamato",
    },
  ];
}

function getBooks(): Array<Book> {
  return [
    {
      title: "Gundam",
      isFiction: true,
      datePublished: new Date(),
    },
    {
      title: "How to make Teslas",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "Piloting Gundams",
      isFiction: true,
      datePublished: new Date(),
    },
  ];
}
