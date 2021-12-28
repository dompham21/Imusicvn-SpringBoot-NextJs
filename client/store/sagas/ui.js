import { all, put, takeLatest, call } from "redux-saga/effects";
import { getLocalStorage, setLocalStorage } from "../../utils/useLocalStorage";
import { isEmptyObject } from "../../utils/utils";
import { addSongAPI, deleteSongByIdAPI, editSongByIdAPI, getListSongAPI, getSongByIdAPI, getSongSuggestedByIdAPI } from "../apis/song_apis";
import * as t from "../types";



function* getSong(action) {
	const id = action.payload;
	try {
		const resp = yield call(getSongByIdAPI, id);
		const { status, data } = resp;
		if( status === 200) {
			yield put({
				type: t.FETCH_PLAY_SONG_BY_ID_SUCCEEDED,
				payload: data
			});
			let { history } = getLocalStorage("imusic_history",{
				history: [],
				indexCurr: 0
			});
			let ids = "";

			if(history && history.length  > 0) {
				ids = history.map(song => song.id).toString();
			}
			
			
			yield put({
				type: t.FETCH_GET_SONG_SUGGESTED_BY_ID,
				payload: {
					id: id,
					ids: ids
				}
			})
		}
		else {
			yield put({
				type: t.FETCH_PLAY_SONG_BY_ID_FAILED,
				payload: "Can't get infomation this song. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.FETCH_PLAY_SONG_BY_ID_FAILED,
			payload: error,
		});
	}
}

function* getSongSuggested(action) {
	const {id, ids} = action.payload;
	try {
		const resp = yield call(getSongSuggestedByIdAPI, id, ids);
		const { status, data } = resp;
		if( status === 200) {
			setLocalStorage("imusic_suggested", data)
			yield put({
				type: t.FETCH_GET_SONG_SUGGESTED_BY_ID_SUCCEEDED,
				payload: data
			});
			
		}
		else {
			yield put({
				type: t.FETCH_GET_SONG_SUGGESTED_BY_ID_FAILED,
				payload: "Can't get infomation this song. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.FETCH_GET_SONG_SUGGESTED_BY_ID_FAILED,
			payload: error,
		});
	}
}

function* getSongRecommend(action) {
	const {id, ids} = action.payload;
	try {
		const resp = yield call(getSongSuggestedByIdAPI, id, ids);
		const { status, data } = resp;
		if( status === 200) {
			
			yield put({
				type: t.GET_SONG_RECOMMEND_SUCCEEDED,
				payload: data
			});
			
		}
		else {
			yield put({
				type: t.GET_SONG_RECOMMEND_FAILED,
				payload: "Can't get infomation this song. Please try again!"
			});
		}
		
	} catch (error) {
		yield put({
			type: t.GET_SONG_RECOMMEND_FAILED,
			payload: error,
		});
	}
}


function* watchFetchPlaySong() {
	yield takeLatest(t.FETCH_PLAY_SONG_BY_ID, getSong);
}

function* watchFetchGetSongSuggested() {
	yield takeLatest(t.FETCH_GET_SONG_SUGGESTED_BY_ID, getSongSuggested);
}

function* watchGetSongRecommend() {
	yield takeLatest(t.GET_SONG_RECOMMEND, getSongRecommend);
}

export default function* rootSaga() {
	yield all([
		watchFetchPlaySong(),
		watchFetchGetSongSuggested(),
		watchGetSongRecommend()
	]);
}