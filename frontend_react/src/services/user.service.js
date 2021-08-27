import http from '../http-common';

class UserDataService {
    getAll() {
        return http.get("/user");
    }

    get(id) {
        return http.get(`/user/${id}`);
    }

    create(data) {
        return http.post("/user", data);
    }

    update(id, data) {
        return http.put(`/user/${id}`, data);
    }

    delete(id) {
        return http.delete(`user/${id}`);
    }
}

export default new UserDataService();