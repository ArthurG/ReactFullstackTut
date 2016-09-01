import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';

describe('results', ()=>{
  
  it('renders entries with vote counts or zero', ()=>{
    const pair = List.of('a', 'b');
    const tally = Map({a: 5});
    const component = renderIntoDocument(<Results pair={pair} tally={tally}/>);

    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [a,b] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(a).to.contain('a');
    expect(a).to.contain(5);
    expect(b).to.contain('b');
    expect(b).to.contain('0');
  });

  it('invotes the next callback when next is clicked', ()=>{
   let nextInvoked = false;
   const next = ()=>nextInvoked=true;
   
   const pair = List.of('a', 'b');
   const component = renderIntoDocument(<Results pair = {pair} tally = {Map()} next={next}/>);
   Simulate.click(ReactDOM.findDOMNode(component.refs.next));
   expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', ()=>{
    const component = renderIntoDocument(<Results winner = "a" pair = {['a', 'b']} tally={Map()}/>);
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('a');
    
  });



});
