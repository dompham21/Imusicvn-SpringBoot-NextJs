import { all, put, takeLatest, call } from "redux-saga/effects";
import { addArtistAPI, deleteArtistByIdAPI, editArtistByIdAPI, getArtistByIdAPI, getListArtistAPI, getListIdArtistAPI } from "../apis/artist_apis";
import * as t from "../types";

function* addArtist(action) {
	const dataToSubmit = action.payload
	try {
		const resp = yield call(addArtistAPI, dataToSubmit);

		const { status, data } = resp;
		
		if( status === 201) {
			yield put({
				type: t.ARTIST_ADD_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.ARTIST_ADD_FAILED,
				payload: "Can't create this artist. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.ARTIST_ADD_FAILED,
			payload: error,
		});
	}
}



function* getListArtist(action) {
	const {page, keyword} = action.payload;
	try {
		const resp = yield call(getListArtistAPI, page, keyword);
		const { status, data } = resp;
		if( status === 200) {
			yield put({
				type: t.GET_LIST_ARTIST_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.GET_LIST_ARTIST_FAILED,
				payload: "Can't get list artist. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.GET_LIST_ARTIST_FAILED,
			payload: error,
		});
	}
}

function* getArtist(action) {
	const id = action.payload;
	try {
		const resp = yield call(getArtistByIdAPI, id);
		const { status, data } = resp;
		if( status === 200) {
			yield put({
				type: t.GET_ARTIST_ID_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.GET_ARTIST_ID_FAILED,
				payload: "Can't get infomation this artist. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.GET_ARTIST_ID_FAILED,
			payload: error,
		});
	}
}

function* editArtist(action) {
	const {id, dataToSubmit} = action.payload
	try {
		const resp = yield call(editArtistByIdAPI, id, dataToSubmit);
		const { status, data } = resp;
		
		if( status === 200) {
			yield put({
				type: t.ARTIST_EDIT_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.ARTIST_EDIT_FAILED,
				payload: "Can't updated this song. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.ARTIST_EDIT_FAILED,
			payload: error,
		});
	}
}

function* deleteArtist(action) {
	const id = action.payload;
	try {
		const resp = yield call(deleteArtistByIdAPI, id);
		const { status, data } = resp;
		
		if( status === 200) {
			yield put({
				type: t.DELETE_ARTIST_ID_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.DELETE_ARTIST_ID_FAILED,
				payload: "Can't delete this artist. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.DELETE_ARTIST_ID_FAILED,
			payload: error,
		});
	}
}


function* getListIdArtist(action) {
	try {
		const resp = yield call(getListIdArtistAPI);
		const { status, data } = resp;
		if( status === 200) {
			yield put({
				type: t.GET_LIST_ID_ARTIST_SUCCESSED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.GET_LIST_ID_ARTIST_FAILED,
				payload: "Can't get list artist. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.GET_LIST_ID_ARTIST_FAILED,
			payload: error,
		});
	}
}

function* watchGetListArtist() {
	yield takeLatest(t.GET_LIST_ARTIST, getListArtist);
}

function* watchGetArtistById() {
	yield takeLatest(t.GET_ARTIST_ID, getArtist);
}

function* watchEditArtist() {
	yield takeLatest(t.ARTIST_EDIT_REQUESTED, editArtist);
}

function* watchDeleteArtist() {
	yield takeLatest(t.DELETE_ARTIST_ID, deleteArtist);

}

function* watchAddArtist() {
	yield takeLatest(t.ARTIST_ADD_REQUESTED, addArtist);
}

function* watchGetListIdArtist() {
	yield takeLatest(t.GET_LIST_ID_ARTIST, getListIdArtist);
}

export default function* rootSaga() {
	yield all([
		watchAddArtist(),
		watchGetListArtist(),
		watchGetArtistById(),
		watchEditArtist(),
		watchDeleteArtist(),
		watchGetListIdArtist()
	]);
}