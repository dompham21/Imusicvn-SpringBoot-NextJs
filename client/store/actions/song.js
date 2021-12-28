import * as t from "../types";

export const addSong = (song) => {
	return {
		type: t.SONG_ADD_REQUESTED,
		payload: song,
	};
};

export const resetAddSong = () => {
	return {
		type: t.RESET_SONG_ADD_SUCCEEDED,
	};
};


export const getListSong = (page, keyword) => {
	return {
		type: t.GET_LIST_SONG,
		payload: {
			page, 
			keyword
		},
	};
};


export const searchSong = (page, keyword, num) => {
	return {
		type: t.SEARCH_SONG,
		payload: {
			page, 
			keyword, 
			num
		},
	};
};

export const getSongById = (id) => {
	return {
		type: t.GET_SONG_ID,
		payload: id,
	};
};

export const getListIdSong = () => {
	return {
		type: t.GET_LIST_ID_SONG,
	};
};

export const editSongById = (id, dataToSubmit) => {
	return {
		type: t.SONG_EDIT_REQUESTED,
		payload: {
			id,
			dataToSubmit
		},
	};
};

export const deleteSongById = (id) => {
	return {
		type: t.DELETE_SONG_ID,
		payload: id
	};
};

export const resetEditSong = () => {
	return {
		type: t.RESET_SONG_EDIT_SUCCEEDED,
	};
};

export const resetErrorGetListSong = () => {
	return {
		type: t.RESET_ERROR_GET_LIST_SONG
	}
}
export const resetErrorGetSong = () => {
	return {
		type: t.RESET_ERROR_GET_SONG
	}
}
export const resetErrorEditSong = () => {
	return {
		type: t.RESET_SONG_EDIT_FAILED
	}
}
export const resetErrorAddSong = () => {
	return {
		type: t.RESET_SONG_ADD_FAILED
	}
}
export const resetSuccessDeleteSong = () => {
	return {
		type: t.RESET_SONG_DELETE_SUCCEEDED
	}
}
export const resetErrorDeleteSong = () => {
	return {
		type: t.RESET_SONG_DELETE_FAILED
	}
}