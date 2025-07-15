import { privateRequest } from "../config/axios.config";

/* list of resource */
export const index = async () => {
    return await privateRequest.get(`/vendor/profile`);
};
export const update = async (data) => {
    return await privateRequest.post(`/vendor/update-profile`,data);
};



