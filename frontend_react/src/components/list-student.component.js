import React, { Component } from "react";
import StudentDataService from '../services/student.service'
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import NumberFormat from 'react-number-format';

// redux
import { connect } from 'react-redux'
import { retrieveStudents, deleteStudent } from "../actions/student.action";


class ListStudent extends Component {
  constructor(props) {
    super(props);
    this.getStudents = this.getStudents.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);

    this.state = {
      students: []
    };
  }

  componentDidMount() {
    this.getStudents()
  }

  getStudents() {
    this.props.retrieveStudents()
  }

  deleteStudent(id) {
    this.props.deleteStudent(id)
      .then(res => {
        alert('Berhasil hapus data')
        this.props.history.push('/students')
      }).catch(e => {
        alert('gagal hapus data')
        console.log('error: ', e.message)
      })
  }

  render() {
    const { students } = this.props

    return (
      <div className="container">
        <h4 className="mb-4">Daftar Siswa</h4>
        <Link to={'student/add'}>
          <button type="button" className="btn btn-primary btn-sm mb-3">Tambah Siswa</button>
        </Link>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Nama</th>
              <th scope="col">Tanggal Lahir</th>
              <th scope="col">Tinggi(cm)/Berat(kg)</th>
              <th scope="col">Alamat</th>
              <th scope="col">Penghasilan Ortu</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {students && students.map((student, index) => (
              <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{student.first_name + ' ' + student.last_name}</td>
              <td>{dateFormat(student.birth, "dd-mm-yyyy")}</td>
              <td>{student.height + '/' + student.weight}</td>
              <td>{student.address}</td>
              <td align="right"><NumberFormat value={student.parent_income} 
              displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'Rp.'}/></td>
              <td>
              <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                <Link to={"/student/" + student.id}>
                  <button type="button" className="btn btn-warning btn-sm">Edit</button>
                </Link>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => { 
                if(window.confirm(`Yakin ingin menghapus ${student.first_name + ' ' + student.last_name}?`)) { 
                  this.deleteStudent(student.id) 
                } }}>Hapus</button>
              </div>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students
  }
}

export default connect(mapStateToProps, { retrieveStudents, deleteStudent })(ListStudent)