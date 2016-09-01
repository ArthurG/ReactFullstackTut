import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

export default  React.createClass({
  mixins: [PureRenderMixin],
  render: function(){
    return <div className = "winner"> Winner is {this.props.winner} </div>
  }
});


