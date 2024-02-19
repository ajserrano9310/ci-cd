const express = require('express')
const app = express()
const port = 3000

const students =
    [
        {
            name: 'Alejandro',
            lastName: 'Serrano',
            ssn: 1231231234,
            id: 1
        },
        {
            name: 'Javier',
            lastName: 'Serrano',
            ssn: 999999789,
            id: 2
        }
    ];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/student', (req, res) => {

    console.log('no id')
    res.send(students);
})

app.get('/student/:id/', (req, res) => {

    if (req.params.id) {
        console.log("the id", req.params.id)
        let student = students.find(s => s.id === req.params.id);
        console.log(student)
        if (!student) { res.send('No student found') }
        else { res.send(student) };
    } else {
        res.send('No student found')
    }


    //res.send(student);
})

app.get('/superquery', (req, res) => {
    let id = req.query.id;

    if (id) {
        res.send('Id was: ' + id);
    }
    else {
        res.send('No id yet')
    }
})

app.get('/getlist', (req, res) => {
    res.send(['this', 'is', 'a', 'list']);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
