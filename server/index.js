const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})
app.listen(5000, () => {
	console.log('server started on port 5000')
})
