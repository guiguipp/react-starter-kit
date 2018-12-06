import axios from "axios";

// If needed, one can transform the current url in order to query the public API locally 
// (Back End is Express port 8080 while React run on Front End on port 3000).
// Once deployed, it should reset to the domain name used.
let currentURL = window.location.origin

if (currentURL === "http://localhost:3000") {
    currentURL = "http://localhost:8080"
    }

export default {
    getUsers: () => {       
        const url = currentURL + "/api/user/"
        return axios.get(url)
        },
    }