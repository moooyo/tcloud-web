import React from 'react'
import { Provider } from 'react-redux';
import CloudIndex from '@/pages/cloud/components/indexPage';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import CloudReducer from '@/pages/cloud/components/reducer';

let store = createStore(CloudReducer, composeWithDevTools())

export default function() {
  return (
    <Provider store={store} >
      <CloudIndex/>
    </Provider>
  )
}
