import React from "react";
import axios from "../../config/axios";
import ListItem from "./ListItem";
import CategoryNew from './New'

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  handleRemove = id => {
    axios
      .delete(`/categories/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        // console.log(response.data);
        if (response.data._id) {
          this.setState(prevState => {
            return {
              categories: prevState.categories.filter(
                category => category._id !== id
              )
            };
          });
        }
      })
      .catch(err => {
        alert(err);
      });
  };
  componentDidMount() {
    axios
      .get("/categories", {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        const categories = response.data;
        this.setState({ categories });
      })
      .catch(err => {
        console.log(err);
      });
  }
  addCat = cat => {
    this.setState(prevState => {
      return {
        categories: [...prevState.categories, cat]
      }
    })
  }

  render() {
    return (
      <div>
        <h2>Listing Categories - {this.state.categories.length}</h2>
        <ul>
          {this.state.categories.map(category => {
            return (
              <ListItem
                key={category._id}
                _id={category._id}
                name={category.name}
                handleRemove={this.handleRemove}
              //{...category}
              //category={category}
              />
            );
            //  <li key={category._id}>{category.name}</li>;
          })}
        </ul>
        <CategoryNew addCat={this.addCat} />
      </div>
    );
  }
}
export default CategoryList;
