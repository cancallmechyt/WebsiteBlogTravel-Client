import axios from "axios";

const useAxios = axios.create({
    baseURL: "https://crazy-red-codfish.cyclic.app", //THIS http://localhost:8800/...https://crazy-red-codfish.cyclic.app
    headers: {
        Authorization: `Bearer ${
          localStorage.getItem("user")!= null /*  .token, != null */
            ? JSON.parse(localStorage.getItem("user")).token
            : null
        }`,
      }
})

export default useAxios;