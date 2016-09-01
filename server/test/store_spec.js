import {Map, fromJS} from 'immutable'
import {expect} from 'chai'

import makeStore from '../src/store';

describe('store', ()=>{
  it('is a redux store configured with correct reducer', ()=>{
    const store = makeStore();
    expect(store.getState()).to.equal(Map({}));
    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['a', 'b']
    });
    expect(store.getState()).to.equals(fromJS({
       entries: ['a', 'b']
    }));
  });

});
