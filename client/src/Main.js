import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Main() {
    const [studentList, setStudentList] = useState([]);

    const getStudents = () => {
        axios.get('http://localhost:3001/students').then((response) => {
            setStudentList(response.data);
        });
    }

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <Fragment>
            <div className="row">
                <div className="offset-10 col-2">
                    <Link to={"/create"}><button className="btn btn-success pl-5 pr-5">New Student</button></Link>
                </div>
            </div>
            <div className="row m-5">
                <div className="col-12">
                    <table class="table table-lg table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col text-left">Student Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone#</th>
                                <th scope="col">Class</th>
                                <th scope="col">Marks %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <th scope="row">{val.id}</th>
                                        <td>{val.studentName}</td>
                                        <td>{val.email}</td>
                                        <td>{val.phone}</td>
                                        <td>{val.classOpted}</td>
                                        <td>{val.marks}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}

export default Main;