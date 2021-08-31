import React, { Component } from "react";
import StudentDataService from "../services/student.service";
import NumberFormat from 'react-number-format';

// redux
import { connect } from 'react-redux'
import { createStudent } from '../actions/student.action'

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeBirth = this.onChangeBirth.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeParentIncome = this.onChangeParentIncome.bind(this);

    this.saveStudent = this.saveStudent.bind(this);
    this.newStudent = this.newStudent.bind(this);

    this.state = {
      id: null,
      first_name: "",
      last_name: "",
      address: "",
      birth: "",
      height: 0,
      weight: 0,
      parent_income: 0,

      submitted: false,
      errors: ""
    };
  }

  onChangeFirstName(e) {
    this.setState({ first_name: e.target.value });
  }

  onChangeLastName(e) {
    this.setState({ last_name: e.target.value });
  }

  onChangeAddress(e) {
    this.setState({ address: e.target.value });
  }

  onChangeBirth(e) {
    this.setState({ birth: e.target.value });
  }

  onChangeHeight(e) {
    this.setState({ height: e.target.value });
  }

  onChangeWeight(e) {
    this.setState({ weight: e.target.value });
  }

  onChangeParentIncome(e) {
    this.setState({ parent_income: e.target.value });
  }

  saveStudent() {
    let parent_income = this.state.parent_income.replace('Rp.', '').replaceAll('.', '')
    if (parent_income == '') parent_income = 0

    var data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      address: this.state.address,
      birth: this.state.birth.split("-").reverse().join("-"),
      height: this.state.height,
      weight: this.state.weight,
      parent_income: parent_income,
    }

    this.props.createStudent(data)
      .then(res => {
        this.setState({
          id: res.id,
          first_name: res.first_name,
          last_name: res.last_name,
          address: res.address,
          birth: res.birth,
          height: res.height,
          weight: res.weight,
          parent_income: res.parent_income,

          submitted: true
        });
        
      }).catch(e => {
        console.log('error: ', e)
      })

    // StudentDataService.create(data)
    //   .then(res => {
    //     this.setState({
    //       id: res.data.id,
    //       first_name: res.data.first_name,
    //       last_name: res.data.last_name,
    //       address: res.data.address,
    //       birth: res.data.birth,
    //       height: res.data.height,
    //       weight: res.data.weight,
    //       parent_income: res.data.parent_income,

    //       submitted: true
    //     });
    //   }).catch(e => {
    //     if (e.response !== "") {
    //       this.setState({errors: e.response.data})
    //       console.log('validation', e.response.data)
    //     }
    //   });
  }

  newStudent() {
    this.setState({
      id: null,
      first_name: "",
      last_name: "",
      address: "",
      birth: "",
      height: 0,
      weight: 0,
      parent_income: 0,

      submitted: false,
      errors: ""
    });
  }

  render() {

    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Kamu berhasil mendaftar!</h4>
            <button className="btn btn-link" onClick={this.newStudent}>
              Tambah Lagi
            </button>
          </div>
        ) : (
          <div className="container mb-5">
            <h4 className="mb-4">Tambah Siswa</h4>
            <hr/>
            <p>(<span className="text-danger">*</span>) Wajib diisi.</p>
            <form className="needs-validation" noValidate>
              <div className="form-group mb-3">
                <label htmlFor="first_name" className="form-label"><span className="text-danger">*</span>Nama Depan</label>
                <input
                  type="text"
                  className={`form-control ${this.state.errors.first_name ? "is-invalid" : ''}`}
                  id="first_name"
                  required
                  value={this.state.first_name}
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
                  value={this.state.last_name}
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
                  value={this.state.address}
                  onChange={this.onChangeAddress}
                  name="address"
                />
                <div className="invalid-feedback">{this.state.errors.address}</div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="birth" className="form-label"><span className="text-danger">*</span>Tanggal Lahir</label>
                  <NumberFormat format="##-##-####" 
                  id="birth"
                  placeholder="TGL-BLN-THN" mask={['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y']} 
                  displayType="input" 
                  className={`form-control ${this.state.errors.birth ? "is-invalid" : ''}`}
                  required value={this.state.birth}
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
                  value={this.state.height}
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
                  value={this.state.weight}
                  onChange={this.onChangeWeight}
                  name="weight"
                />
                <div className="invalid-feedback">{this.state.errors.weight}</div>
              </div>

              <div className="form-group mb-5">
                <label htmlFor="parent_income" className="form-label">Penghasilan Orang Tua (optional)</label>
                <NumberFormat value={this.state.parent_income} displayType="input"
                className={`form-control ${this.state.errors.weight ? "is-invalid" : ''}`}
                required onChange={this.onChangeParentIncome}
                thousandSeparator="." decimalSeparator="," prefix={'Rp.'}/>
              </div>
              <div className="invalid-feedback">{this.state.errors.weight}</div>
            </form>
            <button onClick={this.saveStudent} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default connect(null, { createStudent })(AddStudent)