import React from "react";
import axios from "../../config/axios";
import { Link } from "react-router-dom";

export default class NotesList extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }

  handleRemove = id => {
    axios
      .delete(`/notes/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        if (response.data._id) {
          this.setState(prevState => {
            return {
              notes: prevState.notes.filter(note => note._id !== id)
            };
          });
        }
      });
  };

  componentDidMount() {
    axios
      .get("/notes", {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        const notes = response.data;
        console.log(response.data);
        this.setState({ notes });
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div>
        <h2>Listing Notes - {this.state.notes.length}</h2>
        <table>
          <thead>
            <tr>
              <th> Id </th>
              <th> Title </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {this.state.notes.map((note, index) => {
              return (
                <tr key={note._id}>
                  <td>{index + 1}</td>
                  <td>{note.title}</td>
                  <td>  <Link to={`/notes/${note._id}`}>show</Link> </td>
                  <td> <button
                    onClick={() => {
                      const confirm = window.confirm("Are You Sure?");
                      if (confirm) {
                        this.handleRemove(note._id);
                      }
                    }}
                  >
                    remove
                  </button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link to="/notes/new">Add</Link>
      </div>
    );
  }
}
