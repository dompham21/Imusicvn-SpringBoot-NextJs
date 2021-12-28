import { all, put, takeLatest, call } from "redux-saga/effects";
import { addCategoryAPI, deleteCategoryByIdAPI, editCategoryByIdAPI, getCategoryByIdAPI, getListCategoryAPI, getListIdCategoryAPI } from "../apis/category_apis";
import * as t from "../types";

function* addCategory(action) {
	const dataToSubmit = action.payload
	try {
		const resp = yield call(addCategoryAPI, dataToSubmit);

		const { status, data } = resp;
		
		if( status === 201) {
			yield put({
				type: t.CATEGORY_ADD_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.CATEGORY_ADD_FAILED,
				payload: "Can't create this category. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.CATEGORY_ADD_FAILED,
			payload: error,
		});
	}
}

function* getListCategories(action) {
	const {page, keyword} = action.payload;
	try {
		const resp = yield call(getListCategoryAPI, page, keyword);
		const { status, data } = resp;
		if( status === 200) {
			yield put({
				type: t.GET_LIST_CATEGORY_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.GET_LIST_CATEGORY_FAILED,
				payload: "Can't get list categories. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.GET_LIST_CATEGORY_FAILED,
			payload: error,
		});
	}
}

function* getCategory(action) {
	const id = action.payload;
	try {
		const resp = yield call(getCategoryByIdAPI, id);
		const { status, data } = resp;
		if( status === 200) {
			yield put({
				type: t.GET_CATEGORY_ID_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.GET_CATEGORY_ID_FAILED,
				payload: "Can't get infomation this playlist. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.GET_CATEGORY_ID_FAILED,
			payload: error,
		});
	}
}

function* editCategory(action) {
	const {id, dataToSubmit} = action.payload
	try {
		const resp = yield call(editCategoryByIdAPI, id, dataToSubmit);
		const { status, data } = resp;
		
		if( status === 200) {
			yield put({
				type: t.CATEGORY_EDIT_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.CATEGORY_EDIT_FAILED,
				payload: "Can't updated this playlist. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.CATEGORY_EDIT_FAILED,
			payload: error,
		});
	}
}

function* deleteCategory(action) {
	const id = action.payload;
	try {
		const resp = yield call(deleteCategoryByIdAPI, id);
		const { status, data } = resp;
		
		if( status === 200) {
			yield put({
				type: t.DELETE_CATEGORY_ID_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.DELETE_CATEGORY_ID_FAILED,
				payload: "Can't delete this playlist. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.DELETE_CATEGORY_ID_FAILED,
			payload: error,
		});
	}
}

function* getListIdCategory() {
	try {
		const resp = yield call(getListIdCategoryAPI);
		const { status, data } = resp;
		if( status === 200) {
			yield put({
				type: t.GET_LIST_ID_CATEGORY_SUCCESSED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.GET_LIST_ID_CATEGORY_FAILED,
				payload: "Can't get list artist. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.GET_LIST_ID_CATEGORY_FAILED,
			payload: error,
		});
	}
}

function* watchAddCategory() {
	yield takeLatest(t.CATEGORY_ADD_REQUESTED, addCategory);
}

function* watchGetListCategories() {
	yield takeLatest(t.GET_LIST_CATEGORY, getListCategories);
}

function* watchGetCategoryById() {
	yield takeLatest(t.GET_CATEGORY_ID, getCategory);
}

function* watchEditCategory() {
	yield takeLatest(t.CATEGORY_EDIT_REQUESTED, editCategory);
}

function* watchDeleteCategory() {
	yield takeLatest(t.DELETE_CATEGORY_ID, deleteCategory);
}

function* watchGetListIdCategory() {
	yield takeLatest(t.GET_LIST_ID_CATEGORY, getListIdCategory)
}

export default function* rootSaga() {
	yield all([
		watchAddCategory(),
        watchGetListCategories(),
        watchGetCategoryById(),
        watchEditCategory(),
        watchDeleteCategory(),
		watchGetListIdCategory()
	]);
}