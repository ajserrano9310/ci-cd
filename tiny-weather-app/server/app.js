const express = require('express')
const app = express()
const port = 3000

const students = [{
    name: 'Alejandro',
    lastName: 'Serrano',
    ssn: 1231231234, 
    id: 1
}];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/student', (req, res) => {
    res.send(student);
})

app.get('/student/:id', (req, res) => {
    let student = {};
    for(let s of students) {
        if(s.id === req.params.id) {student = s}
    }
    console.log('hello')
    res.send(student);
})

app.get('/getlist', (req, res) => {
    res.send(['this', 'is', 'a', 'list']);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
