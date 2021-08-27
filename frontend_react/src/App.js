import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUser from "./components/add-user.component";
import EditUser from "./components/edit-user.component";
import ListUser from "./components/list-user.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <a href="/users" className="navbar-brand">Sekolah Sepak Bola</a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Daftar Siswa
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/user/add"} className="nav-link">
                  Tambah Siswa
                </Link>
              </li>
            </div>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/users"]} component={ListUser} />
            <Route exact path="/user/add" component={AddUser} />
            <Route path="/user/:id" component={EditUser} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
