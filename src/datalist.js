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
var extend = require('./extend.js');
var DataBox = require('./databox.js');

var DataList = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.updates) {
      nextProps.updates.forEach(function(update) {
        update.values.forEach(function(value) {
          var data = this.state.data;
          data[value.path] = value.value;
          this.setState({data: data});
        }, this);
      }, this);
    }
  },

  render: function() {
    var latitude = 0,
        longitude = 0,
        position = this.state.data['navigation.position'];

    if(position) {
      latitude = position.latitude;
      longitude = position.longitude;
    }

    var loc = [
      { name: "Latitude", unit: "\u00B0", value: latitude },
      { name: "Longitude", unit: "\u00B0", value: longitude }
    ];

    var cog = [
      {value: this.state.data['navigation.courseOverGroundTrue'],
       unit: "\u00B0"}
    ];

    var sog = [
      {value: this.state.data['navigation.speedOverGround'],
       unit: "m/s"}
    ];

    var dbk = [
      {value: this.state.data['environment.depth.belowTransducer'],
        unit: "m"}
    ];

    var twd = [
      {name: "Angle", value: this.state.data['environment.wind.directionTrue'],
       unit: "\u00B0"},
      {name: "Speed", value: this.state.data['environment.wind.speedTrue'],
       unit: "m/s"}
    ];

    var awd = [
      {name: "Angle",
       value: this.state.data['environment.wind.angleApparent'],
       unit: "\u00B0"},
      {name: "Speed", value: this.state.data['environment.wind.speedApparent'],
       unit: "m/s"}
    ];

    return (
      <div className="container-inner">
        <h1>Signal K React Demo</h1>
        <div className="dataList">
          <DataBox name="Location" data={loc} />
          <DataBox name="Course Over Ground" data={cog} />
          <DataBox name="Speed Over Ground" data={sog} />
          <DataBox name="Depth Below Transducer" data={dbk} />
          <DataBox name="True Wind" data={twd} />
          <DataBox name="Apparent Wind" data={awd} />
        </div>
      </div>
    );
  },
});

module.exports = DataList;
