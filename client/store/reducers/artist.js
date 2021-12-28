import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	isCreateSuccess: false,
	isUpdateSuccess: false,
	isDeleteSuccess: false,
	errorGetListArtist: "",
	listArtists: [],
	infoArtist: {},
	errorGetArtist: "",
	errorEditArtist: "",
	errorAddArtist: "",
	errorDeleteArtist: "",
	listIdArtists: [],
	totalArtists: 0
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.ARTIST_ADD_SUCCEEDED:
			return {
				...state,
				isCreateSuccess: true,
			};
		case t.ARTIST_ADD_FAILED:
			return {
				...state,
				isCreateSuccess: false,
				errorAddArtist: action.payload
			}
		case t.RESET_ARTIST_ADD_SUCCEEDED:
			return {
				...state,
				isCreateSuccess: false,
			};
		case t.RESET_ARTIST_ADD_FAILED: {
			return {
				...state,
				errorAddArtist: ""
			}
		}
		case t.GET_LIST_ARTIST_SUCCEEDED:
			return {
				...state,
				listArtists: action.payload.listArtists,
				totalArtists: action.payload.totalArtists,
			}
		case t.GET_LIST_ARTIST_FAILED: {
			
			return {
				...state,
				listArtists: [],
				errorGetListArtist: action.payload
			}
		}
		case t.RESET_ERROR_GET_LIST_ARTIST: {
			return {
				...state,
				errorGetListArtist: ""
			}
		}
		case t.GET_ARTIST_ID_SUCCEEDED:
			return {
				...state,
				infoArtist: action.payload
			}
		case t.GET_ARTIST_ID_FAILED:
			return {
				...state,
				errorGetArtist: action.payload
			}
		case t.RESET_ERROR_GET_ARTIST: 
			return {
				...state,
				errorGetArtist: ""
			}
		case t.ARTIST_EDIT_SUCCEEDED:
			return  {
				...state,
				isUpdateSuccess: true,
			}
		case t.ARTIST_EDIT_FAILED:
			return {
				...state,
				errorEditArtist: action.payload,
				isUpdateSuccess: false
			}
		case t.RESET_ARTIST_EDIT_SUCCEEDED:
			return {
				...state,
				isUpdateSuccess: false,
			};
		case t.RESET_ARTIST_EDIT_FAILED:
			return {
				...state,
				errorEditArtist: ""
			}
		case t.DELETE_ARTIST_ID_SUCCEEDED: 
			return {
				...state,
				isDeleteSuccess: true,
			}
		case t.RESET_ARTIST_DELETE_SUCCEEDED:
			return {
				...state,
				isDeleteSuccess: false,
			}
		case t.DELETE_ARTIST_ID_FAILED: 
			return {
				...state,
				isDeleteSuccess: false,
				errorDeleteArtist: action.payload
			}
		case t.RESET_ARTIST_DELETE_FAILED:
			return {
				...state,
				errorDeleteArtist: ""
			}
		case t.GET_LIST_ID_ARTIST_SUCCESSED: 
			return {
				...state,
				listIdArtists: action.payload
			}
		case t.GET_LIST_ID_ARTIST_FAILED:
			return {
				...state,
				listIdArtists: []
			}
		default:
			return state;
	}
};

export default mainReducer;