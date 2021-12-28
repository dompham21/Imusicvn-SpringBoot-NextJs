import * as t from "../types";

export const addCategory = (playlist) => {
	return {
		type: t.CATEGORY_ADD_REQUESTED,
		payload: playlist,
	};
};

export const resetAddCategory = () => {
	return {
		type: t.RESET_CATEGORY_ADD_SUCCEEDED,
	};
};


export const getListCategory = (page, keyword) => {
	return {
		type: t.GET_LIST_CATEGORY,
		payload: {
			page, 
			keyword
		},
	};
};
export const getCategoryById = (id) => {
	return {
		type: t.GET_CATEGORY_ID,
		payload: id,
	};
};

export const editCategoryById = (id, dataToSubmit) => {
	return {
		type: t.CATEGORY_EDIT_REQUESTED,
		payload: {
			id,
			dataToSubmit
		},
	};
};

export const deleteCategoryById = (id) => {
	return {
		type: t.DELETE_CATEGORY_ID,
		payload: id
	};
};

export const resetEditCategory = () => {
	return {
		type: t.RESET_CATEGORY_EDIT_SUCCEEDED,
	};
};

export const resetErrorGetListCategory = () => {
	return {
		type: t.RESET_ERROR_GET_LIST_CATEGORY
	}
}
export const resetErrorGetCategory = () => {
	return {
		type: t.RESET_ERROR_GET_CATEGORY
	}
}
export const resetErrorEditCategory = () => {
	return {
		type: t.RESET_CATEGORY_EDIT_FAILED
	}
}
export const resetErrorAddCategory = () => {
	return {
		type: t.RESET_CATEGORY_ADD_FAILED
	}
}
export const resetSuccessDeleteCategory = () => {
	return {
		type: t.RESET_CATEGORY_DELETE_SUCCEEDED
	}
}
export const resetErrorDeleteCategory = () => {
	return {
		type: t.RESET_CATEGORY_DELETE_FAILED
	}
}

export const getListIdCategory = () => {
	return {
		type: t.GET_LIST_ID_CATEGORY,
	};
};