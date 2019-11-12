import React from "react";
import axios from "../../config/axios";
import NotesForm from "./Form";

export default class NotesEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      note: {}
    };
  }
  handleNoteSubmit = note => {
    console.log("edit", note);
    axios
      .put(`/notes/${note.id}`, note, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        console.log(response.data);
        if (response.data.errors) {
          window.alert(response.data.message);
          console.log("validation error", response.data.errors);
        } else {
          console.log("success", response.data);
          this.props.history.push(`/notes/${response.data._id}`);
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  componentDidMount() {
    console.log("edit notes component did mount");
    const id = this.props.match.params.id;
    axios.get(`/notes/${id}`, {
      headers: {
        "x-auth": localStorage.getItem("authToken")
      }
    })
      .then(response => {
        const note = response.data;
        this.setState({ note });
      })
      .catch(err => {
        alert(err)
      })
  }
  render() {
    return (
      <div>
        <h2>Edit Notes</h2>
        {Object.keys(this.state.note).length !== 0 && (
          <NotesForm
            note={this.state.note}
            handleNoteSubmit={this.handleNoteSubmit}
          />
        )}
      </div>
    );
  }
}
