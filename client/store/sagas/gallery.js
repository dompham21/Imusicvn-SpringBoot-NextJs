import { all, put, takeLatest, call } from "redux-saga/effects";
import { addGalleryAPI, deleteGalleryByIdAPI, editGalleryByIdAPI, getGalleryByIdAPI, getListGalleryAPI } from "../apis/gallery_api";
import * as t from "../types";

function* addGallery(action) {
	const dataToSubmit = action.payload
	try {
		const resp = yield call(addGalleryAPI, dataToSubmit);

		const { status, data } = resp;
		
		if( status === 201) {
			yield put({
				type: t.GALLERY_ADD_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.GALLERY_ADD_FAILED,
				payload: "Can't create this gallery. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.GALLERY_ADD_FAILED,
			payload: error,
		});
	}
}

function* getListGallery(action) {
	const {page, keyword} = action.payload;
	try {
		const resp = yield call(getListGalleryAPI, page, keyword);
		const { status, data } = resp;
		if( status === 200) {
			yield put({
				type: t.GET_LIST_GALLERY_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.GET_LIST_GALLERY_FAILED,
				payload: "Can't get list song. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.GET_LIST_GALLERY_FAILED,
			payload: error,
		});
	}
}

function* getGallery(action) {
	const id = action.payload;
	try {
		const resp = yield call(getGalleryByIdAPI, id);
		const { status, data } = resp;
		if( status === 200) {
			yield put({
				type: t.GET_GALLERY_ID_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.GET_GALLERY_ID_FAILED,
				payload: "Can't get infomation this song. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.GET_GALLERY_ID_FAILED,
			payload: error,
		});
	}
}

function* editGallery(action) {
	const {id, dataToSubmit} = action.payload
	try {
		const resp = yield call(editGalleryByIdAPI, id, dataToSubmit);
		const { status, data } = resp;
		
		if( status === 200) {
			yield put({
				type: t.GALLERY_EDIT_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.GALLERY_EDIT_FAILED,
				payload: "Can't updated this song. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.GALLERY_EDIT_FAILED,
			payload: error,
		});
	}
}

function* deleteGallery(action) {
	const id = action.payload;
	try {
		const resp = yield call(deleteGalleryByIdAPI, id);
		const { status, data } = resp;
		
		if( status === 200) {
			yield put({
				type: t.DELETE_GALLERY_ID_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.DELETE_GALLERY_ID_FAILED,
				payload: "Can't delete this song. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.DELETE_GALLERY_ID_FAILED,
			payload: error,
		});
	}
}

function* watchAddGallery() {
	yield takeLatest(t.GALLERY_ADD_REQUESTED, addGallery);
}

function* watchGetListGallery() {
	yield takeLatest(t.GET_LIST_GALLERY, getListGallery);
}

function* watchGetGalleryById() {
	yield takeLatest(t.GET_GALLERY_ID, getGallery);
}

function* watchEditGallery() {
	yield takeLatest(t.GALLERY_EDIT_REQUESTED, editGallery);
}

function* watchDeleteGallery() {
	yield takeLatest(t.DELETE_GALLERY_ID, deleteGallery);
}


export default function* rootSaga() {
	yield all([
		watchAddGallery(),
        watchGetListGallery(),
        watchGetGalleryById(),
        watchEditGallery(),
        watchDeleteGallery()
	]);
}