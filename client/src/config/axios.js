import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:3005"
});

export default axios;

//module.exports = Note
