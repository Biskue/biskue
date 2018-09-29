const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

// pull request
const port = 3005

app.listen(port, () => {
    console.log(`Server listening at localhost:${port}`);
});