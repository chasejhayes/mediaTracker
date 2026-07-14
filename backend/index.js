const express = require('express')
const cors = require('cors')
const app = express();


app.use(express.json())
app.use(cors())

let media = [
    {title: "Perfume", dateFinished: "4/5/26", rating:5, id: Math.random()},
     {title: "Perfame", dateFinished: "4/5/26", rating:5, id: Math.random()},
      {title: "Perfumt", dateFinished: "4/5/26", rating:5, id: Math.random()},
    {title: "Body Double", dateFinished: "6/4/26", rating:3, id: Math.random()},
    {title: "Malazan Book 2", dateFinished: "5/22/26", rating:1, id: 3 },
    {title: "Stalin", dateFinished: "5/22/1990", rating:2, id: 10 },
    {title: "King of the World", dateFinished: "5/01/19", rating:1, id:9 }
]

app.get('/api/media/', (request, response) => {
    response.json(media)
})

app.patch('/api/media/:id', (req, res) => {
    const id = Number(req.params.id)

    media = media.map(item => 
        item.id === id
        ? {...item, ...req.body}
        : item
    )

    const updatedMedia = media.find(item =>
        item.id === id
    )
    res.json(updatedMedia)
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