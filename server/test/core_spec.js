import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('a', 'b');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('a', 'b')
      }));
    });
    it('converts to immutable', () => {
      const state = Map();
      const entries = ['a', 'b'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('a', 'b')
      }));
    });
  });
  describe('next', ()=>{
    it('takes the next two entries for vote', ()=>{
      const state = Map({
       entries: List.of('a', 'b', 'c')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
       vote: Map({
         pair: List.of('a', 'b')
       }),
       entries: List.of('c')
      }));
     });
    it('put winner back into entries', ()=>{
      const state = Map({
        vote: Map({
          pair: List.of('a', 'b'),
          tally: Map({
            'a': 4,
            'b': 2
          })
        }),
        entries: List.of('c', 'd', 'e', 'f')
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of('c', 'd'),
          }),
          entries: List.of('e', 'f', 'a')
       })
      );
    });

    it('puts both from tied vote back into entries', ()=>{
      const state = Map({
        vote: Map({
          pair: List.of('a', 'b'),
          tally: Map({
            'a': 4,
            'b': 4
          })
        }),
        entries: List.of('c', 'd', 'e', 'f')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('c', 'd'),
        }),
        entries: List.of('e', 'f', 'a', 'b'),
        })
      );
    });
 
   it('declares winner when only one entry left', () => {
     const state = Map({
      vote:Map({

        pair: List.of('a', 'b'),
        tally: Map({
          'a': 2,
          'b': 3
        })}),
      entries : List()
     });
     const nextState = next(state);
     expect(nextState).to.equal(Map({
       winner: 'b'
     }));

   });
  });
  describe('vote', ()=>{
    it('creates a tally for voted entry', ()=>{
       const state = Map({
            pair: List.of('a', 'b')
          });
      
       const nextState = vote(state, 'a');
       expect(nextState).to.equal(
         Map({
           pair: List.of('a', 'b'),
           tally: Map({
             'a': 1
           })  
         })
       );
    });

    it('adds to existing entry', ()=>{
       const state = Map({
              pair: List.of('a', 'b'),
              tally: Map({
                'a': 1,
                'b': 2
              })
          })
       
       const nextState = vote(state, 'a');
       expect(nextState).to.equal(Map({
           pair: List.of('a', 'b'),
           tally: Map({
             'a': 2,
             'b': 2
           })  
         }),
       );
    });
 
  });
});
