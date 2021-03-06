import { call, all, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  loadCollectionListSuccess,
  loadMoreCollectionSuccess,
} from "./collection.actions";
import CollectionActionTypes from "./collection.types";
import { getCollectionList, loadMoreCollectionList } from "./collection.utils";

export function* fetchCollectinListSaga(payload) {
  const { items, initialPageNumber, pageSize } = payload.payload;
  const getItems = yield call(
    getCollectionList,
    items,
    initialPageNumber,
    pageSize
  );
  yield put(loadCollectionListSuccess(getItems));
}

export function* loadMoreCollectionListSaga(payload) {
  const { items, nextPageNumber, pageSize } = payload.payload;
  const getMoreItems = yield call(
    loadMoreCollectionList,
    items,
    nextPageNumber,
    pageSize
  );

  yield put(loadMoreCollectionSuccess(getMoreItems));
}

export function* onFetchCollectionList() {
  yield takeLatest(
    CollectionActionTypes.FETCH_COLLECTION_LIST,
    fetchCollectinListSaga
  );
}

export function* onFetchLoadMoreCollectionList() {
  yield takeEvery(
    CollectionActionTypes.FETCH_LOAD_MORE_COLLECTION,
    loadMoreCollectionListSaga
  );
}

export function* collectionSagas() {
  yield all([call(onFetchCollectionList), call(onFetchLoadMoreCollectionList)]);
}
