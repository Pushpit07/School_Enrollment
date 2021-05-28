const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'schoolEnrollment'
});

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

app.get('/students', (req, res) => {
    db.query('SELECT * FROM Students', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log('Running here noww!');
});