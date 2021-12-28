import * as t from "../types";

export const addArtist = (artist) => {
	return {
		type: t.ARTIST_ADD_REQUESTED,
		payload: artist,
	};
};

export const resetAddArtist = () => {
	return {
		type: t.RESET_ARTIST_ADD_SUCCEEDED,
	};
};


export const getListArtist = (page, keyword) => {
	return {
		type: t.GET_LIST_ARTIST,
		payload: {
			page, 
			keyword
		},
	};
};


export const getListIdArtist = () => {
	return {
		type: t.GET_LIST_ID_ARTIST,
	};
};

export const getArtistById = (id) => {
	return {
		type: t.GET_ARTIST_ID,
		payload: id,
	};
};

export const editArtistById = (id, dataToSubmit) => {
	return {
		type: t.ARTIST_EDIT_REQUESTED,
		payload: {
			id,
			dataToSubmit
		},
	};
};


export const resetEditArtist = () => {
	return {
		type: t.RESET_ARTIST_EDIT_SUCCEEDED,
	};
};

export const resetErrorGetListArtist = () => {
	return {
		type: t.RESET_ERROR_GET_LIST_ARTIST
	}
}
export const resetErrorGetArtist = () => {
	return {
		type: t.RESET_ERROR_GET_ARTIST
	}
}

export const resetErrorEditArtist = () => {
	return {
		type: t.RESET_ARTIST_EDIT_FAILED
	}
}
export const resetErrorAddArtist = () => {
	return {
		type: t.RESET_ARTIST_ADD_FAILED
	}
}

export const deleteArtistById = (id) => {
	return {
		type: t.DELETE_ARTIST_ID,
		payload: id
	};
};

export const resetSuccessDeleteArtist = () => {
	return {
		type: t.RESET_ARTIST_DELETE_SUCCEEDED
	}
}
export const resetErrorDeleteArtist = () => {
	return {
		type: t.RESET_ARTIST_DELETE_FAILED
	}
}