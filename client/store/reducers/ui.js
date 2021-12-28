import { getLocalStorage, setLocalStorage } from "../../utils/useLocalStorage";
import * as t from "../types";

const initialState = {
	isPlaying: false,
    errorFetchPlaySong: "",
    currSongInfo: {},
    previousSongInfo: {},
    listSongSuggested: [],
    errorFetchGetSongSuggested: "",
    listSongRecommend: [],
    errorGetSongRecommend: []
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case t.SET_IS_PLAY_SONG_FALSE: {
           return{ ...state,
                isPlaying: false
           }
        }
        case t.SET_IS_PLAY_SONG_TRUE: {
            return{ ...state,
                isPlaying: true
           }
        }
        case t.FETCH_PLAY_SONG_BY_ID_SUCCEEDED: {
            if(Object.keys(action.payload).length !== 0 && action.payload.constructor === Object) {
                let imusicHistory = getLocalStorage('imusic_history', {
                    history: [],
                    indexCurr: 0
                })

                let history = imusicHistory.history
                let index  = history.findIndex(item =>item.id === action.payload.id);

                if(index == -1) { //have duplicate
                    index = history.push(action.payload) - 1
                }
                
                setLocalStorage('imusic_history', {
                    history: history,
                    indexCurr: index
                })
                
                setLocalStorage('imusic_currSongInfo', action.payload)
                setLocalStorage('imusic_hasPlayer', true)
            }
			
            return {
                ...state,
                previousSongInfo: state.currSongInfo,
                currSongInfo: action.payload
            }
        }
        case t.FETCH_PLAY_SONG_BY_ID_FAILED: {
            return {
                ...state,
                previousSongInfo: state.currSongInfo,
                currSongInfo: {},
                errorFetchPlaySong: action.payload
            }
        }
        case t.RESET_ERROR_FETCH_PLAY_SONG: {
            return {
                ...state,
                errorFetchPlaySong: ""
            }
        }
        case t.FETCH_GET_SONG_SUGGESTED_BY_ID_SUCCEEDED: {
            return {
                ...state,
                listSongSuggested: action.payload
            }
        }
        case t.FETCH_PLAY_SONG_BY_ID_FAILED: {
            return {
                ...state,
                errorFetchGetSongSuggested: action.payload
            }
        }
        case t.RESET_ERROR_FETCH_GET_SONG_SUGGESTED: {
            return {
                ...state,
                errorFetchGetSongSuggested: ""
            }
        }
        case t.GET_SONG_RECOMMEND_SUCCEEDED: {
            return {
                ...state,
                listSongRecommend: action.payload
            }
        }
        case t.GET_SONG_RECOMMEND_FAILED: {
            return {
                ...state,
                errorGetSongRecommend: action.payload
            }
        }
        case t.RESET_ERROR_GET_SONG_RECOMMEND: {
            return {
                ...state,
                errorGetSongRecommend: ""
            }
        }
		default:
			return state;
	}
};

export default mainReducer;