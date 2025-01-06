import axios from "axios";

const API = "http://localhost:3000/api/";

export const registerRequest = (user, url) => {
    const en = `${API}${url}`
    axios.post(en, user);

}
    
