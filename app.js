//----DEPENDENCIES
const express = require('express')

//----CONFIG
const port = 9000
const app = express()

//Habilitar recibir formato JSON
app.use(express.json())

const moviesDB = []

let id = 1

app.get('/', (req, res) => {
    res.json({
        message: 'OK'
    })
})


//Rutas de MOVIES's
app.get('/movies', (req, res) => {
    res.status(200).json(moviesDB)
})


app.post('/movies', (req,res) => {
    const {title, year, director} = req.body
    if(title && year && director){
        const newMovies = {
            id: id++,
            title,
            year,
            director
        }
        moviesDB.push(newMovies)
        res.status(200).json(newMovies)
    } else {
        res.status(400).json({message: 'Invalid data'})
    }
})

app.get('/movies/:id', (req, res) => {
    const id =req.params.id;

    const movie = moviesDB.find(item => item.id == id)

    if(movie){
        res.status(200).json(movie)
    } else {
        res.status(404).json({message: 'Invalid ID'})
    }
    
})


app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})