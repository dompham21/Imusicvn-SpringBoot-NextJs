import { all, fork } from "redux-saga/effects";

import songSaga from "./song";
import artistSaga from "./artist";
import uiSaga from "./ui";
import gallerySaga from "./gallery"
import categorySaga from "./category"
export default function* () {
    yield all([
      fork(songSaga),
      fork(artistSaga),
      fork(uiSaga),
      fork(gallerySaga),
      fork(categorySaga)
    ]);
}