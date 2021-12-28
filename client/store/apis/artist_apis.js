import axiosService from "../../helper/axiosService";
import { ARTIST_ADD_REQUESTED_ENDPOINT, DELETE_ARTIST_BY_ID_ENDPOINT, EDIT_ARTIST_BY_ID_ENDPOINT, GET_ARTIST_BY_ID_ENDPOINT, GET_LIST_ARTIST_ENDPOINT, GET_LIST_ID_ARTIST_ENDPOINT, SERVER_URL } from "../types";


export const addArtistAPI = (dataPost) => {

    return axiosService.post(`${SERVER_URL}/${ARTIST_ADD_REQUESTED_ENDPOINT}`,dataPost);
};

export const getListArtistAPI = (page, keyword) => {

    return axiosService.get(`${SERVER_URL}/${GET_LIST_ARTIST_ENDPOINT}/${page}`,{ params: { keyword: keyword } });
};

export const getArtistByIdAPI = (id) => {

    return axiosService.get(`${SERVER_URL}/${GET_ARTIST_BY_ID_ENDPOINT}/${id}`);
};

export const editArtistByIdAPI = (id, dataPost) => {

    return axiosService.post(`${SERVER_URL}/${EDIT_ARTIST_BY_ID_ENDPOINT}/${id}`, dataPost);
};

export const deleteArtistByIdAPI = (id) => {
    return axiosService.get(`${SERVER_URL}/${DELETE_ARTIST_BY_ID_ENDPOINT}/${id}`);
};

export const getListIdArtistAPI = () => {
    return axiosService.get(`${SERVER_URL}/${GET_LIST_ID_ARTIST_ENDPOINT}`);
};