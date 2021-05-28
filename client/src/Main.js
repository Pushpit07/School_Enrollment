import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';

function Main() {
    // Initialising states
    const [studentList, setStudentList] = useState([]);
    const [particularStudent, setParticularStudent] = useState([]);
    const [newMarks, setNewMarks] = useState('');

    // Functions to call APIs

    const getStudents = () => {
        axios.get('http://localhost:3001/students').then((response) => {
            setStudentList(response.data);
        });
    }

    const updateStudentMarks = (id) => {
        axios.put('http://localhost:3001/update', {
            marks: newMarks,
            id: id
        }).then((response) => {
            alert('Updated!');
        });
    }

    const deleteStudent = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            setStudentList(studentList.filter((student) => {
                return student.id !== id;
            }));
        });
    }

    const openPopUp = (id) => {
        axios.get(`http://localhost:3001/student/${id}`).then((response) => {
            setParticularStudent(response.data);
        });
    }

    useEffect(() => {
        getStudents();
    }, []);

    // Making table better by applying pagination and searching functionalities
    $(document).ready(function () {
        $('#studentTable').dataTable();
    });

    return (
        <Fragment>
            <div className="row">
                <div className="offset-10 col-2">
                    <Link to={"/create"}><button className="btn btn-success pl-5 pr-5">New Student</button></Link>
                </div>
            </div>
            <div className="row m-5">
                <div className="col-12">
                    <table className="table table-lg table-hover" id="studentTable">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col text-left">Student Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone#</th>
                                <th scope="col">Class</th>
                                <th scope="col">Marks %</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <th scope="row"><button className="hidden_btn" onClick={() => { openPopUp(val.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal">{val.id}</button></th>
                                        <td><button className="hidden_btn" onClick={() => { openPopUp(val.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal">{val.studentName}</button></td>
                                        <td><button className="hidden_btn" onClick={() => { openPopUp(val.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal">{val.email}</button></td>
                                        <td><button className="hidden_btn" onClick={() => { openPopUp(val.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal">{val.phone}</button></td>
                                        <td><button className="hidden_btn" onClick={() => { openPopUp(val.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal">{val.classOpted}</button></td>
                                        <td><button className="hidden_btn" onClick={() => { openPopUp(val.id) }} data-bs-toggle="modal" data-bs-target="#exampleModal">{val.marks}</button></td>
                                        <td><button className="btn btn-sm btn-primary" onClick={() => { updateStudentMarks(val.id) }}>Update</button><input type="text" id="editMarks" onChange={(event) => { setNewMarks(event.target.value) }} /></td>
                                        <td><button className="btn btn-sm btn-danger" onClick={() => { deleteStudent(val.id) }}>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Student details</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body p-4">
                                    {particularStudent[0] ?
                                        <div>
                                            <p><b>ID :</b> {particularStudent[0].id}</p>
                                            <p><b>Student's Name :</b> {particularStudent[0].studentName}</p>
                                            <p><b>Father's Name :</b> {particularStudent[0].fatherName}</p>
                                            <p><b>DOB :</b> {particularStudent[0].dob.substr(0, 10)}</p>
                                            <p><b>Address :</b> {particularStudent[0].address}</p>
                                            <p><b>City :</b> {particularStudent[0].city}</p>
                                            <p><b>State :</b> {particularStudent[0].state}</p>
                                            <p><b>Pin :</b> {particularStudent[0].pin}</p>
                                            <p><b>Phone :</b> {particularStudent[0].phone}</p>
                                            <p><b>Email :</b> {particularStudent[0].email}</p>
                                            <p><b>Class Opted :</b> {particularStudent[0].classOpted}</p>
                                            <p><b>Marks :</b> {particularStudent[0].marks}</p>
                                            <p><b>Date of enrollment :</b> {particularStudent[0].enrolledDate.substr(0, 10)}</p>
                                        </div> : null
                                    }
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Main;