import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer'
describe('reducer', ()=>{
  
  it('handles set entries', ()=>{
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries:['Trainspotting']}
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it('handles next', ()=>{
    const initialState = fromJS({
      entries : ['a', 'b']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
     vote: {
       pair: ['a', 'b']
     },
     entries: []
    }));
  });
 
  it('handles vote', ()=>{
    const initialState = fromJS({
     vote: {
       pair: ['a', 'b']
     },
     entries: []
    });
    const action = {type: 'VOTE',entry: 'a'};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
     vote: {
       pair: ['a', 'b'],
       tally: {'a': 1}
     },
     entries: []
    }));
  });

  it('can be used with reduce', ()=>{
    const actions = [
      {type: 'SET_ENTRIES', entries: ['a', 'b']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'a'},
      {type: 'VOTE', entry: 'b'},
      {type: 'VOTE', entry: 'a'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());
    expect(finalState).to.equal(fromJS({
      winner: 'a'
    }));
  });
});
