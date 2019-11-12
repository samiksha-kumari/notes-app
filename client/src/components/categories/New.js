import React from "react"
import axios from "../../config/axios"

export default class CategoryNew extends React.Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    handleSubmit = e => {
        e.preventDefault()

        const formData = {
            name: this.state.name
        }
        console.log(formData)
        axios.post(`/categories`, formData, {
            headers: {
                "x-auth": localStorage.getItem("authToken")
            }
        })
            .then(response => {
                if (response.data.errors) {
                    alert("validation error", response.data.errors);
                } else {
                    alert("success");
                    this.props.addCat(response.data)
                }
            })
            .catch(err => {
                alert(err);
            });
    }

    render() {
        return (
            <div>
                <h2> Add Category </h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="name" />
                    </label>
                    <br />
                    <button type="submit">Add</button>

                </form>

            </div>
        )
    }

}