const express = require('express');
const app = express();
const PORT = 3000;
const core = require("cors")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(core())

app.get("/", core(), async (req, res) => {
    res.send("ok")
})
app.get("/test", (req, res) => {
    res.send({ status: 200, message: "ok" });
});

app.get("/time", (req, res) => {
    const currentDate = new Date();
    const time = currentDate.getHours() + ":" + currentDate.getMinutes();
    res.send({ status: 200, message: time });
});
app.get('/hello/:username', (req, res) => {
    res.json({ status: 200, message: `Hello, ${req.params.username}` })
})

app.get('/search', (req, res) => {
    console.log(req.query.s)
    if (req.query.s == undefined || req.query.s == "") {
        console.log(req.query.s)
        res.json({ status: 500, error: true, message: "you have to provide a search" })
    }
    else {
        res.json({ status: 200, message: "ok", data: req.query.s })
    }
});
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]
app.get("/movies/create", (req, res) => {
    res.send(`create`)
});
app.get("/movies/read", (req, res) => {
    res.json({ status: 200, data: movies });
});
app.get("/movies/update", (req, res) => {
    res.send(`update`);
})
app.get("/movies/delete", (req, res) => {
    res.send(`delete`);
})
app.get('/movies/read/by-date', (req, res) => {
    res.json({ status: 200, data: movies.sort((a, b) => a.year - b.year) });
});
app.get("/movies/read/by-rating", (req, res) => {
    res.json({ status: 200, data: movies.sort((a, b) => b.rating - a.rating) })
})

app.get("/movies/read/by-title", (req, res) => {
    res.json({status: 200, data: movies.sort((a, b) => (a.title).localeCompare(b.title))
    })
});
app.get('/movies/read/id/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const movie = movies[id-1];
    if (movie){
      res.status(200).json({ status: 200, data: movie });
    } else {
      res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` });
    }
});
app.get("/movies/add", (req, res) => {  
    if (
        req.query.title === "" ||
        req.query.year.length > 4 ||
        req.query.year === "" ||
        isNaN(req.query.year) === true ||
        isNaN(req.query.rating) === true
      ) {
        res.json({
          status: 403,error: true,message: "you cannot create a movie without providing a title and a year",
        });
      } else if (req.query.rating === "") {
        movies.push({title: req.query.title,year: parseInt(req.query.year),rating: 4,
        });
        res.json(movies);
      } else {
        movies.push({
          title: req.query.title,year: parseInt(req.query.year),rating: parseInt(req.query.rating),
        });
        res.json(movies);
      }
});
app.get("/movies/delete/:id", (req, res) => {
    const del = req.params.id;
    if (isNaN(del)) {
      res.send({status: 404,error: true,message: `please enter a valid id number`,
      });
    } else if (del < 0 || del > movies.length - 1) {
      res.send({status: 404,error: true,message: `the movie ${del} does not exist`,
      });
    } else {
      movies.splice(del, 1);
      res.send(movies);
    }
  });
    app.put("/movies/update/:id", (req, res,next) => {
    if (req.query.title == undefined) {
      movies[req.params.id - 1].year = parseInt(req.query.year);
      movies[req.params.id - 1].rating = parent(req.query.rating);
      movies[req.params.id - 1].year = parseInt(req.query.year);
      movies[req.params.id - 1].rating = movies[req.params.id - 1].rating;
      res.json(movies);
    } else {
      movies[req.params.id - 1].title = req.query.title;
      movies[req.params.id - 1].year = parseInt(req.query.year);
      movies[req.params.id - 1].rating = parseInt(req.query.rating);
      res.json(movies);
    }
})

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})