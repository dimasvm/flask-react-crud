import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';

export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeBirth = this.onChangeBirth.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeParentIncome = this.onChangeParentIncome.bind(this);

    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
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
    this.getUser(this.props.match.params.id);
  }

  onChangeFirstName(e) {
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        first_name: e.target.value
      }
    }));
  }

  onChangeLastName(e) {
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        last_name: e.target.value
      }
    }));
  }

  onChangeAddress(e) {
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        address: e.target.value
      }
    }));
  }

  onChangeBirth(e) {
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        birth: e.target.value
      }
    }));
  }

  onChangeHeight(e) {
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        height: e.target.value
      }
    }));
  }

  onChangeWeight(e) {
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        weight: e.target.value
      }
    }));
  }

  onChangeParentIncome(e) {
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        parent_income: e.target.value
      }
    }));
  }

  getUser(id) {
    UserDataService.get(id)
      .then(res => {
        const date = new Date(res.data.birth)
        const data = res.data
        data.birth = ("0" + date.getDate()).slice(-2) + '-'
          + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear()
        this.setState({
          currentUser: data
        });
        console.log('res', data)
      })
      .catch(e => {
        console.error(e)
      })
  }

  updateUser() {
    var data = {
      id: this.state.currentUser.id,
      first_name: this.state.currentUser.first_name,
      last_name: this.state.currentUser.last_name,
      address: this.state.currentUser.address,
      birth: this.state.currentUser.birth.split("-").reverse().join("-"),
      height: this.state.currentUser.height,
      weight: this.state.currentUser.weight,
      parent_income: this.state.currentUser.parent_income.replace('Rp.', '').replaceAll('.', ''),
    }

    UserDataService.update(
      this.state.currentUser.id,
      data
    ).then(res => {
      this.setState({
        message: "Data berhasil di update!"
      });
    }).catch(e => {
      if (e.response !== "") {
        this.setState({ errors: e.response.data })
        console.log('validation', e.response.data)
      }
    })
  }

  deleteUser(id) {
    UserDataService.delete(id)
      .then(res => {
        console.log(res.data);
        this.props.history.push('/users');
      }).catch(e => {
        console.error(e);
      })
  }

  render() {
    const { currentUser } = this.state

    return (
      <div className="container">
        {currentUser ? (
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
                  value={currentUser.first_name}
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
                  value={currentUser.last_name}
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
                  value={currentUser.address}
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
                  required value={currentUser.birth}
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
                  value={currentUser.height}
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
                  value={currentUser.weight}
                  onChange={this.onChangeWeight}
                  name="weight"
                />
                <div className="invalid-feedback">{this.state.errors.weight}</div>
              </div>

              <div className="form-group mb-5">
                <label htmlFor="parent_income" className="form-label">Penghasilan Orang Tua (optional)</label>
                <NumberFormat value={currentUser.parent_income} displayType="input"
                  className={`form-control ${this.state.errors.weight ? "is-invalid" : ''}`}
                  required onChange={this.onChangeParentIncome}
                  thousandSeparator="." decimalSeparator="," prefix={'Rp.'} />
              </div>
            </form>

            {this.state.message ? (
              <div className="alert alert-success d-flex align-items-center" role="alert"><div>
                {this.state.message}. Kembali ke <Link className="alert-link" to={'/users'}>Daftar Siswa</Link>
              </div>
              </div>
            ) : ('')}

            <div className="mb-4">
              <button className="btn btn-primary me-2" type="button" onClick={() => this.updateUser()}>Update</button>
              <button className="btn btn-danger me-2" type="button" onClick={() => {
                if (window.confirm(`Yakin ingin menghapus?`)) {
                  this.deleteUser(currentUser.id)
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