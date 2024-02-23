const express = require('express')
const Author = require('./models/author'); 
const Genre = require('./models/genre');
const Book = require('./models/book'); 
const BookInstance = require('./models/bookinstance')
const router = express.Router();
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const mongoDB = "mongodb+srv://ajserrano93:1093ajss@cluster0.gxkkw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(mongoDB);
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// const Schema = mongoose.Schema;

// const stds = new Schema ({
//     Student: {
//         firstName: String,
//         lastName: String,
//         ssn: Number,
//         id: Number
//     }
// })

// const student = mongoose.model('stds', stds); 
// const super_students =
//     [
//         {
//             firstName: 'Alejandro',
//             lastName: 'Serrano',
//             ssn: 1231231234,
//             id: 1
//         },
//         {
//             firstName: 'Javier',
//             lastName: 'Serrano',
//             ssn: 999999789,
//             id: 2
//         }
//     ];

// student.create( super_students );
// let ss = student.find({id: 1}).select("firstName lastName"); 
// student.bulkSave();

// console.log(ss);

// const students =
//     [
//         {
//             name: 'Alejandro',
//             lastName: 'Serrano',
//             ssn: 1231231234,
//             id: 1
//         },
//         {
//             name: 'Javier',
//             lastName: 'Serrano',
//             ssn: 999999789,
//             id: 2
//         }
//     ];

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.get('/student', (req, res) => {

//     console.log('no id')
//     res.send(students);
// })

// app.get('/student/:id/', (req, res) => {

//     if (req.params.id) {
//         console.log("the id", req.params.id)

//         for(let s of students) {
//             console.log(s.id);
//         }
//         let student = students.select(s => s.id === Number(req.params.id));
//         console.log(student)
//         if (!student) { res.send('No student found') }
//         else { res.send(student) };
//     } else {
//         res.send('No student found')
//     }


//     //res.send(student);
// })

// app.get('/superquery', (req, res) => {
//     let id = req.query.id;

//     if (id) {
//         res.send('Id was: ' + id);
//     }
//     else {
//         res.send('No id yet')
//     }
// })

// app.get('/getlist', (req, res) => {
//     res.send(['this', 'is', 'a', 'list']);
// })



