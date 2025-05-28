import { privateRequest, publicRequest } from '../config/axios.config'

/* list of resource */
export const index = async (page, perPage) => {
    return await publicRequest.get(`/admin/category?page=${page}&page_size=${perPage}`);
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/category', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/category/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.post(`/admin/category/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/category/${id}`)
}

/** category list */
export const categoryList = async () => {
    return await privateRequest.get(`/admin/category/`);
};
// hompage category list 
export const homepagecategoryshow = async() => {
    return await privateRequest.get('/admin/home-page-category')
}
// hompage category list 
export const homepagecategory = async(data) => {
    return await privateRequest.post('/admin/home-page-category', data)
}