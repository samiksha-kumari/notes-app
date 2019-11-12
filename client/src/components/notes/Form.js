import React from "react";

class NotesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.note.title ? props.note.title : "",
      description: props.note.description ? props.note.description : ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = {
      title: this.state.title,
      description: this.state.description
    };
    // console.log(formData);
    this.props.note && (formData.id = this.props.note._id);
    if (this.props.note) {
      this.props.handleNoteSubmit(formData)
    } else {
      this.props.handleAddNotes(formData);
    }

  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            title
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
              name="title"
            />
          </label>
          <br />
          <label>
            description
            <input
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
              name="description"
            />
          </label>
          <br />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default NotesForm;
