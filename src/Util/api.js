import axios from "axios"

export default axios.create({
   // baseURL: "https://oktara-back.herokuapp.com"
    baseURL: "http://localhost:8000/"
 
})
// axios.defaults.baseURL = "https://oktara-back.herokuapp.com"