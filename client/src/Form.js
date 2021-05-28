import React, { Fragment } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Form() {
    const [studentName, setStudentName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [dob, setDOB] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pin, setPin] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [classOpted, setClassOpted] = useState(0);
    const [marks, setMarks] = useState("");
    const [enrolledDate, setEnrolledDate] = useState("");

    // const displayInfo = () => {
    //     console.log(studentName, fatherName, dob, address, city, state, pin, phone, email, classOpted, marks, enrolledDate);
    // }

    const addStudent = () => {
        axios.post('http://localhost:3001/create', {
            studentName: studentName,
            fatherName: fatherName,
            dob: dob,
            address: address,
            city: city,
            state: state,
            pin: pin,
            phone: phone,
            email: email,
            classOpted: classOpted,
            marks: marks,
            enrolledDate: enrolledDate
        }).then(() => {
            console.log("Success!");
        });
    }

    return (
        <Fragment>
            <div className="row">
                <div className="offset-10 col-2">
                    <Link to={"/"}><button className="btn btn-primary pl-5 pr-5">View Students</button></Link>
                </div>
            </div>
            <div className="container mt-4">
                <div className="form_info">
                    <form onSubmit={addStudent}>
                        <div className="row">
                            <div className="offset-1 col-3">
                                <label>Student Name : </label>
                                <input type="text" onChange={(event) => { setStudentName(event.target.value) }} required />
                            </div>
                            <div className="col-3">
                                <label>Father's Name : </label>
                                <input type="text" onChange={(event) => { setFatherName(event.target.value) }} required />
                            </div>
                            <div className="col-3">
                                <label>Date of Birth : </label>
                                <input type="date" onChange={(event) => { setDOB(event.target.value) }} required />
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-1 col-3">
                                <label>Address : </label>
                                <input type="text" onChange={(event) => { setAddress(event.target.value) }} required />
                            </div>
                            <div className="col-3">
                                <label>City : </label>
                                <input type="text" onChange={(event) => { setCity(event.target.value) }} required />
                            </div>
                            <div className="col-3">
                                <label>State : </label>
                                <input type="text" onChange={(event) => { setState(event.target.value) }} required />
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-1 col-3">
                                <label>Pin : </label>
                                <input type="number" onChange={(event) => { setPin(event.target.value) }} required />
                            </div>
                            <div className="col-3">
                                <label>Phone Number : </label>
                                <input type="tel" onChange={(event) => { setPhone(event.target.value) }} required />
                            </div>
                            <div className="col-3">
                                <label>Email : </label>
                                <input type="email" onChange={(event) => { setEmail(event.target.value) }} required />
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-1 col-3">
                                <label>Class Opted : </label>
                                <input type="number" onChange={(event) => { setClassOpted(event.target.value) }} required />
                            </div>
                            <div className="col-3">
                                <label>Marks % : </label>
                                <input type="text" onChange={(event) => { setMarks(event.target.value) }} />
                            </div>
                            <div className="col-3">
                                <label>Date enrolled : </label>
                                <input type="date" onChange={(event) => { setEnrolledDate(event.target.value) }} required />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12 text-center">
                                <input type="submit" className="btn btn-success submit_form_btn" value="Add Student" />
                            </div>
                        </div>
                    </form>
                </div >
            </div>
        </Fragment >
    );
}

export default Form;