const express = require('express')
const app = express();

app.use(express.json())

app.get('/api/media', (request, response) => {
    response.json([{test: "test"}])
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`)
})