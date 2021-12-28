import { HYDRATE } from "next-redux-wrapper";
import { resetAddSong } from "../actions/song";
import * as t from "../types";

const initialState = {
	isCreateSuccess: false,
	isUpdateSuccess: false,
	isDeleteSuccess: false,
	totalSongs: 0,
	errorGetListSong: "",
	listSongs: [],
	infoSong: {},
	errorGetSong: "",
	errorEditSong: "",
	errorAddSong: "",
	errorDeleteSong: "",
	listIdSongs: [],
	listSearch: [],
	errorSearchSong: ""
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.SONG_ADD_SUCCEEDED:
			return {
				...state,
				isCreateSuccess: true,
			};
		case t.SONG_ADD_FAILED:
			return {
				...state,
				isCreateSuccess: false,
				errorAddSong: action.payload
			}
		case t.RESET_SONG_ADD_SUCCEEDED:
			return {
				...state,
				isCreateSuccess: false,
			};
		case t.RESET_SONG_ADD_FAILED: {
			return {
				...state,
				errorAddSong: ""
			}
		}
		case t.GET_LIST_SONG_SUCCEEDED:
			return {
				...state,
				listSongs: action.payload.listSongs,
				totalSongs: action.payload.totalSongs,
			}
		case t.GET_LIST_SONG_FAILED: {
			
			return {
				...state,
				listSongs: [],
				totalSongs: 0,
				errorGetListSong: action.payload
			}
		}
		case t.RESET_ERROR_GET_LIST_SONG: {
			return {
				...state,
				errorGetListSong: ""
			}
		}
		case t.SEARCH_SONG_SUCCEEDED:
			return {
				...state,
				listSearch: action.payload.listSongs,
			}
		case t.SEARCH_SONG_FAILED: {
			
			return {
				...state,
				listSearch: [],
				errorSearchSong: action.payload
			}
		}
		case t.RESET_ERROR_SEARCH_SONG: {
			return {
				...state,
				errorSearchSong: ""
			}
		}
		case t.GET_SONG_ID_SUCCEEDED:
			return {
				...state,
				infoSong: action.payload
			}
		case t.GET_SONG_ID_FAILED:
			return {
				...state,
				errorGetSong: action.payload
			}
		case t.RESET_ERROR_GET_SONG: 
			return {
				...state,
				errorGetSong: ""
			}
		case t.SONG_EDIT_SUCCEEDED:
			return  {
				...state,
				isUpdateSuccess: true,
			}
		case t.SONG_EDIT_FAILED:
			return {
				...state,
				errorEditSong: action.payload,
				isUpdateSuccess: false
			}
		case t.RESET_SONG_EDIT_SUCCEEDED:
			return {
				...state,
				isUpdateSuccess: false,
			};
		case t.RESET_SONG_EDIT_FAILED:
			return {
				...state,
				errorEditSong: ""
			}
		case t.DELETE_SONG_ID_SUCCEEDED: 
			return {
				...state,
				isDeleteSuccess: true,
			}
		case t.RESET_SONG_DELETE_SUCCEEDED:
			return {
				...state,
				isDeleteSuccess: false,
			}
		case t.DELETE_SONG_ID_FAILED: 
			return {
				...state,
				isDeleteSuccess: false,
				errorDeleteSong: action.payload
			}
		case t.RESET_SONG_DELETE_FAILED:
			return {
				...state,
				errorDeleteSong: ""
			}
		case t.GET_LIST_ID_SONG_SUCCESSED: 
			return {
				...state,
				listIdSongs: action.payload
			}
		case t.GET_LIST_ID_SONG_FAILED:
			return {
				...state,
				listIdSongs: []
			}
		default:
			return state;
	}
};

export default mainReducer;