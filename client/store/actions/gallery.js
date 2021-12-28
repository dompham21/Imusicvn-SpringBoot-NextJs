import * as t from "../types";

export const addGallery = (gallery) => {
	return {
		type: t.GALLERY_ADD_REQUESTED,
		payload: gallery,
	};
};

export const resetAddGallery = () => {
	return {
		type: t.RESET_GALLERY_ADD_SUCCEEDED,
	};
};


export const getListGallery = (page, keyword) => {
	return {
		type: t.GET_LIST_GALLERY,
		payload: {
			page, 
			keyword
		},
	};
};
export const getGalleryById = (id) => {
	return {
		type: t.GET_GALLERY_ID,
		payload: id,
	};
};

export const editGalleryById = (id, dataToSubmit) => {
	return {
		type: t.GALLERY_EDIT_REQUESTED,
		payload: {
			id,
			dataToSubmit
		},
	};
};

export const deleteGalleryById = (id) => {
	return {
		type: t.DELETE_GALLERY_ID,
		payload: id
	};
};

export const resetEditGallery = () => {
	return {
		type: t.RESET_GALLERY_EDIT_SUCCEEDED,
	};
};

export const resetErrorGetListGallery = () => {
	return {
		type: t.RESET_ERROR_GET_LIST_GALLERY
	}
}
export const resetErrorGetGallery = () => {
	return {
		type: t.RESET_ERROR_GET_GALLERY
	}
}
export const resetErrorEditGallery = () => {
	return {
		type: t.RESET_GALLERY_EDIT_FAILED
	}
}
export const resetErrorAddGallery = () => {
	return {
		type: t.RESET_GALLERY_ADD_FAILED
	}
}
export const resetSuccessDeleteGallery = () => {
	return {
		type: t.RESET_GALLERY_DELETE_SUCCEEDED
	}
}
export const resetErrorDeleteGallery = () => {
	return {
		type: t.RESET_GALLERY_DELETE_FAILED
	}
}