import * as t from "../types";

export const setIsPlayingTrue = () => {
	return {
		type: t.SET_IS_PLAY_SONG_TRUE,
	};
};


export const setIsPlayingFalse = () => {
	return {
		type: t.SET_IS_PLAY_SONG_FALSE,
	};
};


export const fetchPlaySongById = (id) => {
    return {
        type: t.FETCH_PLAY_SONG_BY_ID,
        payload: id
    }
}

export const fetchGetSongSuggestedById = (id,ids) => {
	return {
		type: t.FETCH_GET_SONG_SUGGESTED_BY_ID,
		payload: {
			id,
			ids
		}
	}
}

export const getSongRecommend = (id,ids) => {
	return {
		type: t.GET_SONG_RECOMMEND,
		payload: {
			id,
			ids
		}
	}
}