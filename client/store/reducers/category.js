import * as t from "../types";

const initialState = {
	isCreateSuccess: false,
	isUpdateSuccess: false,
	isDeleteSuccess: false,
	totalCategory: 0,
	errorGetListCategories: "",
	listCategories: [],
	infoCategory: {},
	errorGetCategory: "",
	errorEditCategory: "",
	errorAddCategory: "",
	errorDeleteCategory: "",
	listIdCategory: []
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		
		case t.CATEGORY_ADD_SUCCEEDED:
			return {
				...state,
				isCreateSuccess: true,
			};
		case t.CATEGORY_ADD_FAILED:
			return {
				...state,
				isCreateSuccess: false,
				errorAddCategory: action.payload
			}
		case t.RESET_CATEGORY_ADD_SUCCEEDED:
			return {
				...state,
				isCreateSuccess: false,
			};
		case t.RESET_CATEGORY_ADD_FAILED: {
			return {
				...state,
				errorAddCategory: ""
			}
		}
		case t.GET_LIST_CATEGORY_SUCCEEDED:
			return {
				...state,
				listCategories: action.payload.listCategories,
				totalCategory: action.payload.totalCategory,
			}
		case t.GET_LIST_CATEGORY_FAILED: {
			
			return {
				...state,
				listCategories: [],
				totalCategory: 0,
				errorGetListCategories: action.payload
			}
		}
		case t.RESET_ERROR_GET_LIST_CATEGORY: {
			return {
				...state,
				errorGetListCategories: ""
			}
		}
		case t.GET_CATEGORY_ID_SUCCEEDED:
			return {
				...state,
				infoCategory: action.payload
			}
		case t.GET_CATEGORY_ID_FAILED:
			return {
				...state,
				errorGetCategory: action.payload
			}
		case t.RESET_ERROR_GET_CATEGORY: 
			return {
				...state,
				errorGetCategory: ""
			}
		case t.CATEGORY_EDIT_SUCCEEDED:
			return  {
				...state,
				isUpdateSuccess: true,
			}
		case t.CATEGORY_EDIT_FAILED:
			return {
				...state,
				errorEditCategory: action.payload,
				isUpdateSuccess: false
			}
		case t.RESET_CATEGORY_EDIT_SUCCEEDED:
			return {
				...state,
				isUpdateSuccess: false,
			};
		case t.RESET_CATEGORY_EDIT_FAILED:
			return {
				...state,
				errorEditCategory: ""
			}
		case t.DELETE_CATEGORY_ID_SUCCEEDED: 
			return {
				...state,
				isDeleteSuccess: true,
			}
		case t.RESET_CATEGORY_DELETE_SUCCEEDED:
			return {
				...state,
				isDeleteSuccess: false,
			}
		case t.DELETE_CATEGORY_ID_FAILED: 
			return {
				...state,
				isDeleteSuccess: false,
				errorDeleteCategory: action.payload
			}
		case t.RESET_CATEGORY_DELETE_FAILED:
			return {
				...state,
				errorDeleteCategory: ""
			}
		case t.GET_LIST_ID_CATEGORY_SUCCESSED: 
			return {
				...state,
				listIdCategory: action.payload
			}
		case t.GET_LIST_ID_CATEGORY_FAILED:
			return {
				...state,
				listIdCategory: []
			}
		default:
			return state;
	}
};

export default mainReducer;