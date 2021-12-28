import { all, put, takeLatest, call } from "redux-saga/effects";
import { addSongAPI, deleteSongByIdAPI, editSongByIdAPI, getListIdSongAPI, getListSongAPI, getSongByIdAPI, searchSongApi } from "../apis/song_apis";
import * as t from "../types";

function* addSong(action) {
	const dataToSubmit = action.payload
	try {
		const resp = yield call(addSongAPI, dataToSubmit);

		const { status, data } = resp;
		
		if( status === 201) {
			yield put({
				type: t.SONG_ADD_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.SONG_ADD_FAILED,
				payload: "Can't create this song. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.SONG_ADD_FAILED,
			payload: error.message,
		});
	}
}


function* getListSong(action) {
	const {page, keyword} = action.payload;
	try {
		const resp = yield call(getListSongAPI, page, keyword);
		const { status, data } = resp;
		if( status === 200) {
			yield put({
				type: t.GET_LIST_SONG_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.GET_LIST_SONG_FAILED,
				payload: "Can't get list song. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.GET_LIST_SONG_FAILED,
			payload: error.message,
		});
	}
}

function* searchSong(action) {
	const {page, keyword, num} = action.payload;
	try {
		const resp = yield call(searchSongApi, page, keyword, num);
		const { status, data } = resp;
		if( status === 200) {
			yield put({
				type: t.SEARCH_SONG_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.SEARCH_SONG_FAILED,
				payload: "Can't get list song. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.SEARCH_SONG_FAILED,
			payload: error,
		});
	}
}

function* getSong(action) {
	const id = action.payload;
	try {
		const resp = yield call(getSongByIdAPI, id);
		const { status, data } = resp;
		if( status === 200) {
			yield put({
				type: t.GET_SONG_ID_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.GET_SONG_ID_FAILED,
				payload: "Can't get infomation this song. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.GET_SONG_ID_FAILED,
			payload: error,
		});
	}
}

function* editSong(action) {
	const {id, dataToSubmit} = action.payload
	try {
		const resp = yield call(editSongByIdAPI, id, dataToSubmit);
		const { status, data } = resp;
		
		if( status === 200) {
			yield put({
				type: t.SONG_EDIT_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.SONG_EDIT_FAILED,
				payload: "Can't updated this song. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.SONG_EDIT_FAILED,
			payload: error,
		});
	}
}

function* deleteSong(action) {
	const id = action.payload;
	try {
		const resp = yield call(deleteSongByIdAPI, id);
		const { status, data } = resp;
		
		if( status === 200) {
			yield put({
				type: t.DELETE_SONG_ID_SUCCEEDED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.DELETE_SONG_ID_FAILED,
				payload: "Can't delete this song. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.DELETE_SONG_ID_FAILED,
			payload: error,
		});
	}
}

function* getListIdSong() {
	try {
		const resp = yield call(getListIdSongAPI);
		const { status, data } = resp;
		if( status === 200) {
			yield put({
				type: t.GET_LIST_ID_SONG_SUCCESSED,
				payload: data
			});
		}
		else {
			yield put({
				type: t.GET_LIST_ID_SONG_FAILED,
				payload: "Can't get list artist. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.GET_LIST_ID_SONG_FAILED,
			payload: error,
		});
	}
}

function* watchGetListSong() {
	yield takeLatest(t.GET_LIST_SONG, getListSong);
}

function* watchGetSongById() {
	yield takeLatest(t.GET_SONG_ID, getSong);
}

function* watchEditSong() {
	yield takeLatest(t.SONG_EDIT_REQUESTED, editSong);
}

function* watchDeleteSong() {
	yield takeLatest(t.DELETE_SONG_ID, deleteSong);
}

function* watchGetListIdSong() {
	yield takeLatest(t.GET_LIST_ID_SONG, getListIdSong)
}

function* watchAddSong() {
	yield takeLatest(t.SONG_ADD_REQUESTED, addSong);
}

function* watchSearchSong() {
	yield takeLatest(t.SEARCH_SONG, searchSong);
}

export default function* rootSaga() {
	yield all([
		watchAddSong(),
		watchGetListSong(),
		watchGetSongById(),
		watchEditSong(),
		watchDeleteSong(),
		watchGetListIdSong(),
		watchSearchSong()
	]);
}