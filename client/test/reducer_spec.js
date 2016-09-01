import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', ()=>{
  it('handles set_state', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('a', 'b'),
          tally: Map({a: 1, b:2})
        })
      })
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['a', 'b'],
        tally: {a: 1, b: 2}
      }

    })
       
    );
  });
  
  it('handles set_state from js payload', ()=>{
    const initlaState = Map();
    const action = {
      type: "SET_STATE",
      state: {
        vote: {
          pair: ['a', 'b'],
          tally: {a: 1}
        }
      }
    }
    const nextState = reducer(initlaState, action); 

    expect(nextState).to.equal(fromJS({
      vote: {
         pair: ['a', 'b'],
         tally: {a: 1}
      }
    }));

  });


  it('reduces undefined initial state correctly', ()=>{
    const action = {
      type: "SET_STATE",
      state: {
        vote: {
          pair: ['a', 'b'],
          tally: {a: 1}
        }
      }
    }
    const nextState = reducer(undefined, action); 

    expect(nextState).to.equal(fromJS({
      vote: {
         pair: ['a', 'b'],
         tally: {a: 1}
      }
    }));

  });
  
  it('handles VOTE by setting hasVoted', ()=>{
    const state = fromJS({
      vote: {
        pair: ['a', 'b'],
        tally: {a: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'a'};
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      vote:{
        pair: ['a', 'b'],
        tally: {a: 1}       
      },
      hasVoted: 'a'
    }));
  });
   
  it('doesnt set hasvoted for invalid entry', ()=>{
    const state = fromJS({
      vote: {
        pair: ['a', 'b'],
        tally: {a: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'd'};
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      vote:{
        pair: ['a', 'b'],
        tally: {a: 1}       
      }
    }));
  });

  it('removes hasVoted if pair changes', ()=>{
    const initialState = fromJS({
      vote:{
        pair: ['a', 'b'],
        tally: {a: 1}       
      }
    });
    const action = {
     type: 'SET_STATE',
     state: {
       vote: {
         pair: ['c', 'd']    
       }
     }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['c', 'd']
      }
    }));
  });

});
