import React from "react";
import NotesForm from "../notes/Form";
import axios from "../../config/axios";

export default class NotesNew extends React.Component {
  constructor() {
    super();
    this.state = {
      note: {}
    };
  }

  handleAddNotes = note => {
    console.log("hi", note);
    axios
      .post(`/notes`, note, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        console.log("notes", response.data);
        if (response.data.errors) {
          alert("validation errors", response.data.errors);
        } else {
          alert("success", response.data);
          this.props.history.push("/notes");
        }
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    return (
      <div>
        <h2>Add Notes</h2>
        <NotesForm handleAddNotes={this.handleAddNotes} />
      </div>
    );
  }
}
