import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddStudent from "./components/add-student.component";
import EditStudent from "./components/edit-student.component";
import ListStudent from "./components/list-student.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <a href="/students" className="navbar-brand">Sekolah Sepak Bola</a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/students"} className="nav-link">
                  Daftar Siswa
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/student/add"} className="nav-link">
                  Tambah Siswa
                </Link>
              </li>
            </div>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/students"]} component={ListStudent} />
            <Route exact path="/student/add" component={AddStudent} />
            <Route path="/student/:id" component={EditStudent} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
