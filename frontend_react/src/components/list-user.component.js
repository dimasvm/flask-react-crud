import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import NumberFormat from 'react-number-format';


export default class ListUser extends Component {
  constructor(props) {
    super(props);
    this.getUsers = this.getUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    UserDataService.getAll()
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(e => console.error(e))
  }

  deleteUser(id) {
    UserDataService.delete(id)
      .then(res => {
        alert('Berhasil hapus data')
        this.props.history.push('/users')
      }).catch(e => {
        alert('Gagal hapus data')
        console.error(e)
      })
  }

  render() {
    const { users } = this.state

    return (
      <div className="container">
        <h4 className="mb-4">Daftar Siswa</h4>
        <Link to={'user/add'}>
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
            {users && users.map((user, index) => (
              <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{user.first_name + ' ' + user.last_name}</td>
              <td>{dateFormat(user.birth, "dd-mm-yyyy")}</td>
              <td>{user.height + '/' + user.weight}</td>
              <td>{user.address}</td>
              <td align="right"><NumberFormat value={user.parent_income} 
              displayType={'text'} thousandSeparator="." decimalSeparator="," prefix={'Rp.'}/></td>
              <td>
              <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                <Link to={"/user/" + user.id}>
                  <button type="button" className="btn btn-warning btn-sm">Edit</button>
                </Link>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => { 
                if(window.confirm(`Yakin ingin menghapus ${user.first_name + ' ' + user.last_name}?`)) { 
                  this.deleteUser(user.id) 
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