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

var DataBox = React.createClass({
  render: function() {
    var dataElements = this.props.data.map(function(d, i) {
      return (
        <DataElement name={d.name} value={d.value} unit={d.unit} key={i} />
      );
    });
    return (
      <div className="dataBox">
        {dataElements}
        <footer>{this.props.name}</footer>
      </div>
    );
  }
});

var DataElement = React.createClass({
  render: function() {
    var v = this.props.value || 0;
    v = v.toFixed(2);
    var n = this.props.name || '';
    if(n.length > 0) {
      n += ":";
    }
    return (
      <div className="dataElement">
        <label>{n}</label>
        <span>{v}{this.props.unit}</span>
      </div>
    );
  }
});

module.exports = DataBox;
