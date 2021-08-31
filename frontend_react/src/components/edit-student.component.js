import React, { Component } from "react";
import StudentDataService from "../services/student.service";
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';

// redux
import { connect } from 'react-redux'
import {updateStudent, deleteStudent } from '../actions/student.action'

class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeBirth = this.onChangeBirth.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeParentIncome = this.onChangeParentIncome.bind(this);

    this.getStudent = this.getStudent.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);

    this.state = {
      currentStudent: {
        id: null,
        first_name: "",
        last_name: "",
        address: "",
        birth: "",
        height: 0,
        weight: 0,
        parent_income: 0
      },
      message: "",
      errors: ""
    };
  }

  componentDidMount() {
    this.getStudent(this.props.match.params.id);
  }

  onChangeFirstName(e) {
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        first_name: e.target.value
      }
    }));
  }

  onChangeLastName(e) {
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        last_name: e.target.value
      }
    }));
  }

  onChangeAddress(e) {
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        address: e.target.value
      }
    }));
  }

  onChangeBirth(e) {
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        birth: e.target.value
      }
    }));
  }

  onChangeHeight(e) {
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        height: e.target.value
      }
    }));
  }

  onChangeWeight(e) {
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        weight: e.target.value
      }
    }));
  }

  onChangeParentIncome(e) {
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        parent_income: e.target.value
      }
    }));
  }

  getStudent(id) {
    StudentDataService.get(id)
      .then(res => {
        const date = new Date(res.data.birth)
        const data = res.data
        data.birth = ("0" + date.getDate()).slice(-2) + '-'
          + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear()
        this.setState({
          currentStudent: data
        });
        console.log('res', data)
      })
      .catch(e => {
        console.error(e)
      })
  }

  updateStudent() {
    let parent_income = this.state.currentStudent.parent_income.toString().replace('Rp.', '').replaceAll('.', '')
    if (parent_income === '') parent_income = 0

    var data = {
      id: this.state.currentStudent.id,
      first_name: this.state.currentStudent.first_name,
      last_name: this.state.currentStudent.last_name,
      address: this.state.currentStudent.address,
      birth: this.state.currentStudent.birth.split("-").reverse().join("-"),
      height: this.state.currentStudent.height,
      weight: this.state.currentStudent.weight,
      parent_income: parent_income
    }

    this.props.updateStudent(this.state.currentStudent.id, data).then(res => {
      this.setState({
        message: "Data berhasil di update!"
      });
    }).catch(e => {
      if (e.response !== "") {
        this.setState({ errors: e.response })
        console.log('validation', e.response)
      }
    })
  }

  deleteStudent(id) {
    this.props.deleteStudent(id).then(res => {
      alert('Berhasil hapus data')
      this.props.history.goBack()
    }).catch(e => {
      console.log('error', e.message)
      alert('Gagal hapus data.')
    })
  }

  render() {
    const { currentStudent } = this.state

    return (
      <div className="container">
        {currentStudent ? (
          <div className="edit-form">
            <h4 className="mb-4">Edit Siswa</h4>
            <hr />
            <p>(<span className="text-danger">*</span>) Wajib diisi.</p>
            <form>
              <div className="form-group mb-3">
                <label htmlFor="first_name" className="form-label"><span className="text-danger">*</span>Nama Depan</label>
                <input
                  type="text"
                  className={`form-control ${this.state.errors.first_name ? "is-invalid" : ''}`}
                  id="first_name"
                  required
                  value={currentStudent.first_name}
                  onChange={this.onChangeFirstName}
                  name="first_name"
                />
                <div className="invalid-feedback">{this.state.errors.first_name}</div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="last_name" className="form-label"><span className="text-danger">*</span>Nama Belakang</label>
                <input
                  type="text"
                  className={`form-control ${this.state.errors.last_name ? "is-invalid" : ''}`}
                  id="last_name"
                  required
                  value={currentStudent.last_name}
                  onChange={this.onChangeLastName}
                  name="last_name"
                />
                <div className="invalid-feedback">{this.state.errors.last_name}</div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="address" className="form-label"><span className="text-danger">*</span>Alamat</label>
                <input
                  type="text"
                  className={`form-control ${this.state.errors.address ? "is-invalid" : ''}`}
                  id="address"
                  required
                  value={currentStudent.address}
                  onChange={this.onChangeAddress}
                  name="address"
                />
                <div className="invalid-feedback">{this.state.errors.address}</div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="birth" className="form-label"><span className="text-danger">*</span>Tanggal Lahir</label>
                <NumberFormat format="##-##-####"
                  placeholder="TGL-BLN-THN" mask={['d', 'd', 'm', 'm', 'y', 'y', 'y', 'y']}
                  displayType="input"
                  className={`form-control ${this.state.errors.birth ? "is-invalid" : ''}`}
                  required value={currentStudent.birth}
                  onChange={this.onChangeBirth}
                />
                <div className="invalid-feedback">{this.state.errors.birth}</div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="height" className="form-label"><span className="text-danger">*</span>Tinggi Badan (cm)</label>
                <input
                  type="number"
                  className={`form-control ${this.state.errors.height ? "is-invalid" : ''}`}
                  id="height"
                  required
                  value={currentStudent.height}
                  onChange={this.onChangeHeight}
                  name="height"
                />
                <div className="invalid-feedback">{this.state.errors.height}</div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="weight" className="form-label"><span className="text-danger">*</span>Berat Badan (kg)</label>
                <input
                  type="number"
                  className={`form-control ${this.state.errors.weight ? "is-invalid" : ''}`}
                  id="weight"
                  required
                  value={currentStudent.weight}
                  onChange={this.onChangeWeight}
                  name="weight"
                />
                <div className="invalid-feedback">{this.state.errors.weight}</div>
              </div>

              <div className="form-group mb-5">
                <label htmlFor="parent_income" className="form-label">Penghasilan Orang Tua (optional)</label>
                <NumberFormat value={currentStudent.parent_income} displayType="input"
                  className={`form-control ${this.state.errors.weight ? "is-invalid" : ''}`}
                  required onChange={this.onChangeParentIncome}
                  thousandSeparator="." decimalSeparator="," prefix={'Rp.'} />
              </div>
            </form>

            {this.state.message ? (
              <div className="alert alert-success d-flex align-items-center" role="alert"><div>
                {this.state.message}. Kembali ke <Link className="alert-link" to={'/students'}>Daftar Siswa</Link>
              </div>
              </div>
            ) : ('')}

            <div className="mb-4">
              <button className="btn btn-primary me-2" type="button" onClick={() => this.updateStudent()}>Update</button>
              <button className="btn btn-danger me-2" type="button" onClick={() => {
                if (window.confirm(`Yakin ingin menghapus?`)) {
                  this.deleteStudent(currentStudent.id)
                }
              }}>Hapus</button>
              <button className="btn btn-dark" type="button" onClick={() => this.props.history.goBack()}>Batal</button>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Mohon klik siswa...</p>
          </div>
        )}
      </div>
    )
  }
}

export default connect(null, { updateStudent, deleteStudent })(EditStudent)