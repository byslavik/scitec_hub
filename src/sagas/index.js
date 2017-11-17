import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import axios from 'axios';

import {apiUrl} from '../settings.js';
import {urlGenerator} from '../utilities';

function fetchItems(params){
    const link = urlGenerator(apiUrl, params);
    
    return axios.get(link)
            .then((response)=>{;
              return response.data;
            })
}

export function* fetchItemsCall(action) {
  const isLoader = action.payload.isLoader != undefined ? action.payload.isLoader : true;

  console.log(action);
  
   try {
      const params = action.payload.params;
      if(isLoader) {
        yield put({ type: 'ACTION_PRELOADER', payload: true });
      }
      const result = yield call(fetchItems, params);
      yield put({type: `${action.type}_SUCCESS`, payload: result});
      
      if(isLoader) {
        yield put({ type: 'ACTION_PRELOADER', payload: false });
      }
   } catch (e) {
      yield put({type: `${action.type}_FAILED`, payload: e.message});
      
      if(isLoader) {
        yield put({ type: 'ACTION_PRELOADER', payload: false });
      }
   }
}

export function* cardsSaga() {
  yield* takeEvery("FETCH_CARDS", fetchItemsCall);
}
export function* langVarsSaga() {
  yield* takeEvery("LANG_VARS", fetchItemsCall);
}
export function* peopleSaga() {
  yield* takeEvery("FETCH_PEOPLE", fetchItemsCall);
}
export function* specCardSaga() {
  yield* takeEvery("FETCH_SPECIFIC_CARD", fetchItemsCall);
}
export function* articleSaga() {
  yield* takeEvery("FETCH_ARTICLE", fetchItemsCall);
}
export function* specPeopleSaga() {
  yield* takeEvery("FETCH_SPECIFIC_PEOPLE", fetchItemsCall);
}
export function* dropdownsSaga() {
  yield* takeEvery("GET_DROPDOWNS", fetchItemsCall);
}
export function* searchSaga() {
  yield* takeEvery("SEARCH_WORD", fetchItemsCall);
}


export default function* root() {
  yield [
    fork(cardsSaga),
    fork(langVarsSaga),
    fork(peopleSaga),
    fork(specCardSaga),
    fork(articleSaga),
    fork(specPeopleSaga),
    fork(searchSaga),
    fork(dropdownsSaga)
  ]
}




