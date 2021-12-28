import { combineReducers } from "redux";
import songReducer from './song';
import artistReducer from './artist'
import uiReducer from './ui'
import galleryReducer from './gallery'
import categoryReducer from './category'

const rootReducer = combineReducers({
    song: songReducer,
    artist: artistReducer,
    ui: uiReducer,
    gallery: galleryReducer,
    category: categoryReducer
});

export default rootReducer;