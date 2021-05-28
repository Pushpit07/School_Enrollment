const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

// Using cors
app.use(cors());

app.use(express.json())

// DB connection initiated
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'schoolEnrollment'
});

/******************************     CRUD     ********************************/

// Student Create endpoint
app.post('/create', (req, res) => {
    console.log(req.body);
    const studentName = req.body.studentName;
    const fatherName = req.body.fatherName;
    const dob = req.body.dob;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const pin = req.body.pin;
    const phone = req.body.phone;
    const email = req.body.email;
    const classOpted = req.body.classOpted;
    const marks = req.body.marks;
    const enrolledDate = req.body.enrolledDate;

    db.query('INSERT INTO Students (studentName, fatherName, dob, address, city, state, pin, phone, email, classOpted, marks, enrolledDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        [studentName, fatherName, dob, address, city, state, pin, phone, email, classOpted, marks, enrolledDate], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

// Get all Students endpoint
app.get('/students', (req, res) => {
    db.query('SELECT * FROM Students', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Update Student endpoint
app.put('/update', (req, res) => {
    const id = req.body.id;
    const marks = req.body.marks;

    db.query('UPDATE Students SET marks = ? WHERE  id = ?', [marks, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Delete Student endpoint
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM Students WHERE id = ?', id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Get Student with particular id endpoint
app.get('/student/:id', (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM Students WHERE  id = ?', id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log('Running now!');
});