/**
 *
 * Copyright (c) 2014 The Signal K Project Developers [http://signalk.org]
 *
 * This file is part of react-consumer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var React = require('react');
var SignalKClient = require('signalk-client').Client;

var DataList = require('./datalist');

var skClient = new SignalKClient();

var ConnectionHandler = React.createClass({
  getInitalState: function() {
    return {updates: []};
  },

  componentDidMount: function() {
    skClient.connectDelta(
      window.location.host,
      this.handleDelta,
      this.onConnect,
      console.log
    );

  },

  render: function() {
    return <DataList updates={this.state ? this.state.updates : []} />
  },

  handleDelta: function(delta) {
    if(this.isForSelf(delta) && delta.updates) {
      this.setState({updates: delta.updates});
    }
  },

  isForSelf: function(delta) {
    if(this.state == null) {
      return false;
    } else {
      return (delta.context === this.state.selfId);
    }
  },

  onConnect: function() {
    var t = this;
    skClient.getSelf(window.location.host).then(function(result) {
      var selfId = result.body.uuid || result.body.mmsi;
      t.setState({selfId: 'vessels.' + selfId});
      console.log('self', result);
    });
  }
});

module.exports = ConnectionHandler;
