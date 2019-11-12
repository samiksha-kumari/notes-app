import React from "react"
import { Link } from "react-router-dom"
import axios from "../../config/axios"


export default class NotesShow extends React.Component {
    constructor() {
        super()
        this.state = {
            note: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/notes/${id}`, {
            headers: {
                "x-auth": localStorage.getItem("authToken")
            }
        })
            .then(response => {
                const note = response.data
                this.setState({ note })
            })
            .catch(err => {
                alert(err)

            })

    }

    render() {
        return (
            <div>
                <h2>{this.state.note.title} - {this.state.note.description}</h2>
                <Link to={`/notes/edit/${this.state.note._id}`}>edit</Link>

            </div>
        )
    }
}