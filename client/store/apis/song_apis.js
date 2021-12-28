import axiosService from "../../helper/axiosService";
import { DELETE_SONG_BY_ID_ENDPOINT, EDIT_SONG_BY_ID_ENDPOINT, GET_LIST_ID_SONG_ENDPOINT, GET_LIST_SONG_ENDPOINT, GET_SONG_BY_ID_ENDPOINT, GET_SONG_SUGGESTED_BY_ID_ENDPOINT, SERVER_URL, SONG_ADD_REQUESTED_ENDPOINT } from "../types";


export const addSongAPI = (dataPost) => {

    return axiosService.post(`${SERVER_URL}/${SONG_ADD_REQUESTED_ENDPOINT}`,dataPost);
};

export const getListSongAPI = (page, keyword) => {

    return axiosService.get(`${SERVER_URL}/${GET_LIST_SONG_ENDPOINT}/${page}`,{ params: { keyword: keyword } });
};

export const searchSongApi = (page, keyword, num) => {

    return axiosService.get(`${SERVER_URL}/${GET_LIST_SONG_ENDPOINT}/${page}`,{ params: { keyword: keyword, num: num } });
};

export const getSongByIdAPI = (id) => {

    return axiosService.get(`${SERVER_URL}/${GET_SONG_BY_ID_ENDPOINT}/${id}`);
};

export const editSongByIdAPI = (id, dataPost) => {

    return axiosService.post(`${SERVER_URL}/${EDIT_SONG_BY_ID_ENDPOINT}/${id}`, dataPost);
};

export const deleteSongByIdAPI = (id) => {
    return axiosService.get(`${SERVER_URL}/${DELETE_SONG_BY_ID_ENDPOINT}/${id}`);
};

export const getSongSuggestedByIdAPI = (id, ids) => {
    return axiosService.get(`${SERVER_URL}/${GET_SONG_SUGGESTED_BY_ID_ENDPOINT}/${id}`, {params: { ids: ids}});
};

export const getListIdSongAPI = () => {
    return axiosService.get(`${SERVER_URL}/${GET_LIST_ID_SONG_ENDPOINT}`);
};