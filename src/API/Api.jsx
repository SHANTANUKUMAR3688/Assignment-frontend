import axios from "axios";

const API = axios.create({
  // baseURL: "https://atal-optical-backend-t0nr.onrender.com/api",
   baseURL:"https://assignment-backend-i90i.onrender.com/api",
  //  baseURL: "http://localhost:4000/api",
  withCredentials: true,
})
export default API;

