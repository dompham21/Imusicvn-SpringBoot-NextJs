import axiosService from "../../helper/axiosService";
import { CATEGORY_ADD_REQUESTED_ENDPOINT, DELETE_CATEGORY_BY_ID_ENDPOINT, EDIT_CATEGORY_BY_ID_ENDPOINT, GET_CATEGORY_BY_ID_ENDPOINT, GET_LIST_CATEGORY_ENDPOINT, GET_LIST_ID_CATEGORY_ENDPOINT, SERVER_URL } from "../types";

export const addCategoryAPI = (dataPost) => {
    return axiosService.post(`${SERVER_URL}/${CATEGORY_ADD_REQUESTED_ENDPOINT}`, dataPost);
};

export const getListCategoryAPI = (page, keyword) => {

    return axiosService.get(`${SERVER_URL}/${GET_LIST_CATEGORY_ENDPOINT}/${page}`,{ params: { keyword: keyword } });
};

export const getCategoryByIdAPI = (id) => {

    return axiosService.get(`${SERVER_URL}/${GET_CATEGORY_BY_ID_ENDPOINT}/${id}`);
};

export const editCategoryByIdAPI = (id, dataPost) => {

    return axiosService.post(`${SERVER_URL}/${EDIT_CATEGORY_BY_ID_ENDPOINT}/${id}`, dataPost);
};

export const deleteCategoryByIdAPI = (id) => {
    return axiosService.get(`${SERVER_URL}/${DELETE_CATEGORY_BY_ID_ENDPOINT}/${id}`);
};

export const getListIdCategoryAPI = () => {
    return axiosService.get(`${SERVER_URL}/${GET_LIST_ID_CATEGORY_ENDPOINT}`);
};