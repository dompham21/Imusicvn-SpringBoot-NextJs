import * as t from "../types";

const initialState = {
	isCreateSuccess: false,
	isUpdateSuccess: false,
	isDeleteSuccess: false,
	totalGallery: 0,
	errorGetListGallery: "",
	listGallery: [],
	infoGallery: {},
	errorGetGallery: "",
	errorEditGallery: "",
	errorAddGallery: "",
	errorDeleteGallery: "",
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		
		case t.GALLERY_ADD_SUCCEEDED:
			return {
				...state,
				isCreateSuccess: true,
			};
		case t.GALLERY_ADD_FAILED:
			return {
				...state,
				isCreateSuccess: false,
				errorAddGallery: action.payload
			}
		case t.RESET_GALLERY_ADD_SUCCEEDED:
			return {
				...state,
				isCreateSuccess: false,
			};
		case t.RESET_GALLERY_ADD_FAILED: {
			return {
				...state,
				errorAddGallery: ""
			}
		}
		case t.GET_LIST_GALLERY_SUCCEEDED:
			return {
				...state,
				listGallery: action.payload.listGallery,
				totalGallery: action.payload.totalGallery,
			}
		case t.GET_LIST_GALLERY_FAILED: {
			
			return {
				...state,
				listGallery: [],
				totalGallery: 0,
				errorGetListGallery: action.payload
			}
		}
		case t.RESET_ERROR_GET_LIST_GALLERY: {
			return {
				...state,
				errorGetListGallery: ""
			}
		}
		case t.GET_GALLERY_ID_SUCCEEDED:
			return {
				...state,
				infoGallery: action.payload
			}
		case t.GET_GALLERY_ID_FAILED:
			return {
				...state,
				errorGetGallery: action.payload
			}
		case t.RESET_ERROR_GET_GALLERY: 
			return {
				...state,
				errorGetGallery: ""
			}
		case t.GALLERY_EDIT_SUCCEEDED:
			return  {
				...state,
				isUpdateSuccess: true,
			}
		case t.GALLERY_EDIT_FAILED:
			return {
				...state,
				errorEditGallery: action.payload,
				isUpdateSuccess: false
			}
		case t.RESET_GALLERY_EDIT_SUCCEEDED:
			return {
				...state,
				isUpdateSuccess: false,
			};
		case t.RESET_GALLERY_EDIT_FAILED:
			return {
				...state,
				errorEditGallery: ""
			}
		case t.DELETE_GALLERY_ID_SUCCEEDED: 
			return {
				...state,
				isDeleteSuccess: true,
			}
		case t.RESET_GALLERY_DELETE_SUCCEEDED:
			return {
				...state,
				isDeleteSuccess: false,
			}
		case t.DELETE_GALLERY_ID_FAILED: 
			return {
				...state,
				isDeleteSuccess: false,
				errorDeleteGallery: action.payload
			}
		case t.RESET_GALLERY_DELETE_FAILED:
			return {
				...state,
				errorDeleteGallery: ""
			}
		default:
			return state;
	}
};

export default mainReducer;