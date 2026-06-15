const express = require('express')
const app = express();

app.use(express.json())

let media = [
    {title: "Perfume", dateFinished: "4/5/26", rating: "5/5 stars"},
    {title: "Body Double", dateFinished: "6/4/26", rating: "3.5/5 stars"},
    {title: "Malazan Book 2", dateFinished: "5/22/26", rating: "3.5/5 stars" }
]

app.get('/api/media/', (request, response) => {
    response.json(media)
})

app.post('/api/media', (request, response) => {
    let mediaData = request.body;

    let newMedia = {
        "title": mediaData.title,
        "dateFinished": mediaData.dateFinished,
        "rating": mediaData.rating
    }

    media = media.concat(newMedia)

    response.status(201).json(mediaData)


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