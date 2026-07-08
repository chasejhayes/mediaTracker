const express = require('express')
const cors = require('cors')
const app = express();


app.use(express.json())
app.use(cors())

let media = [
    {title: "Perfume", dateFinished: "4/5/26", rating: 5, id: Math.random()},
    {title: "Body Double", dateFinished: "6/4/26", rating: 9, id: Math.random()},
    {title: "Malazan Book 2", dateFinished: "5/22/26", rating: 1, id: Math.random() }
]

app.get('/api/media/', (request, response) => {
    response.json(media)
})


app.post('/api/media', (request, response) => {
    let mediaData = request.body;

    let newMedia = {
        "title": mediaData.title,
        "dateFinished": mediaData.dateFinished,
        "rating": mediaData.rating,
        "id": Math.random().toString(36).slice(2)
    }

    media = media.concat(newMedia)

    response.status(201).json(newMedia)


})

app.delete('/api/media/:id', (req, res) => {
    const id = req.params.id

    media = media.filter(item => item.id !== id)

    res.status(204).end()


})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`)
})


/*
test
{
        "title": "Russian Course",
        "dateFinished": "Ongoing",
        "rating": "Incomplete"
    }

*/