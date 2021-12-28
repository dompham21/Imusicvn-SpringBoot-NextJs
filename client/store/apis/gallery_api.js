import axiosService from "../../helper/axiosService";
import { DELETE_GALLERY_BY_ID_ENDPOINT, EDIT_GALLERY_BY_ID_ENDPOINT, GALLERY_ADD_REQUESTED_ENDPOINT, GET_GALLERY_BY_ID_ENDPOINT, GET_LIST_GALLERY_ENDPOINT, SERVER_URL } from "../types";

export const addGalleryAPI = (dataPost) => {
    return axiosService.post(`${SERVER_URL}/${GALLERY_ADD_REQUESTED_ENDPOINT}`, dataPost);
};

export const getListGalleryAPI = (page, keyword) => {

    return axiosService.get(`${SERVER_URL}/${GET_LIST_GALLERY_ENDPOINT}/${page}`,{ params: { keyword: keyword } });
};

export const getGalleryByIdAPI = (id) => {

    return axiosService.get(`${SERVER_URL}/${GET_GALLERY_BY_ID_ENDPOINT}/${id}`);
};

export const editGalleryByIdAPI = (id, dataPost) => {

    return axiosService.post(`${SERVER_URL}/${EDIT_GALLERY_BY_ID_ENDPOINT}/${id}`, dataPost);
};

export const deleteGalleryByIdAPI = (id) => {
    return axiosService.get(`${SERVER_URL}/${DELETE_GALLERY_BY_ID_ENDPOINT}/${id}`);
};