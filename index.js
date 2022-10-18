// console.log("howdy");

const http = require("http");
const express = require("express");
const app = express();

/* A middleware function that parses the body of the request. */
app.use(express.json());

/* Creating an array of objects. */
let notes = [
  {
    id: 1,
    content: "The purpose of our lives is to be happy.",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Life is what happens when you're busy making other plans.",
    date: "2022-03-30T17:30:31.098Z",
    important: false,
  },
  {
    id: 3,
    content:
      "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    date: "2022-02-30T17:30:31.098Z",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Howdy</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = +request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    // response.status(404).end();
    response.status(400).send("<h1 style='color:red'>404</h1>");
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

/**
 * It creates an id by returning the next highest number in the array of notes.
 * @returns The maxId + 1
 */
const generatedId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  return maxId + 1;
};

/* Creating a new note. */
app.post("/api/notes", (request, response) => {
  /* Finding the max id of the notes array. */
  const body = request.body;

  /* Checking to see if the body of the request has a content property. If it does not, it returns a 400
status code and an error message. */
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generatedId(),
  };

  notes = notes.concat(note);
  response.json(note);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on T minus ${PORT}`);
