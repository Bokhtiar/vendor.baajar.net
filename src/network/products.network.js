import { privateRequest, publicRequest } from "../config/axios.config";


/* list of resource */
export const index = async () => {
    return await publicRequest.get(`/vendor/product`);
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/vendor/product', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/vendor/product/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.post(`/vendor/product/update/{id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/vendor/product/${id}`)
}
