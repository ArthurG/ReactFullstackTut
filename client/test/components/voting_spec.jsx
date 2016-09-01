import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import {expect} from 'chai';
import {List} from 'immutable';
import {Voting} from '../../src/components/Voting';
import Vote from '../../src/components/Vote';

describe('Voting', ()=>{
 it('renders a pair of buttons',  ()=>{
   const component = renderIntoDocument(<Voting pair={['a', 'b']}/>);
   const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
   expect(buttons.length).to.equal(2);
   expect(buttons[0].textContent).to.equal('a');
   expect(buttons[1].textContent).to.equal('b');
   
   
  }); 
  it('invokes callback when button is clicked',  ()=>{
     let voteWith;
     const vote = (entry) => voteWith = entry;
     const component = renderIntoDocument(<Voting pair={['a', 'b']} vote = {vote}/>);
     const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
     Simulate.click(buttons[0]); 
     expect(voteWith).to.equal('a');
   
  }); 
  it('disables button when voted', ()=>{
    const component = renderIntoDocument(<Voting pair = {['a', 'b']} hasVoted = 'a'/>);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);

  });

  it('adds label to voted entry', ()=>{
    const component = renderIntoDocument(<Voting pair = {['a', 'b']} hasVoted = 'a'/>);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[0].textContent).to.contain('Voted');
  });
  
  it('renders just the winner if there is one', ()=>{
    const component = renderIntoDocument(<Voting winner = "a" />);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('a');
  });

  it('renders as a pure component', ()=>{
    const pair = ['a', 'b'];
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair = {pair}/>,
      container);
    
    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('a');

    pair[0] = 'z';
    component = ReactDOM.render(<Voting pair = {pair} />, container);
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('a');

  });

  
  it('updates when prrop  changes', ()=>{
    const pair =List.of( 'a', 'b' );
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair = {pair}/>,
      container);
    
    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('a');

    const newPair = pair.set(0, 'z');
    component = ReactDOM.render(<Voting pair = {newPair} />, container);
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('z');

  });

});
