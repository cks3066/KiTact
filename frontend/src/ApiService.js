import axios from "axios";

const USER_API_BASE_URL = "http://localhost:3000/users";

class ApiService {

    fetchUsers(){
        return axios.get(USER_API_BASE_URL);
    }
    
    fetchUserByID(userID){
        return axios.get(USER_API_BASE_URL + '/' + userID);
    }
    
    deleteUsers(userID){
        return axios.delete(USER_API_BASE_URL + '/' + userID);
    }
    
    addUsers(user){
        return axios.post(USER_API_BASE_URL, user);
    }
    
    editUsers(user){
        return axios.put(USER_API_BASE_URL +'/' + user.id, user);
    }
}

export default new ApiService();