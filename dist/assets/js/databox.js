/**
 *
 * Copyright (c) 2014 "Signal K" [http://signalk.github.io]
 *
 * This file is part of react-consumer
 *
 * react-consumer is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by the
 * Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * @jsx React.DOM
 */

var DataList = React.createClass({
  getInitialState: function() {
    return {data: {
      "navigation": {
        "courseOverGroundMagnetic": null,
        "speedOverGround": null,
        "position": {
          "latitude": null,
          "longitiude": null
        }
      },
      "environmental": {
        "wind": {
          "directionApparent": null,
          "speedApparent": null
        },
        "depthBelowKeel": {
          "value": null
        }
      }
    }};
  },
  componentDidMount: function() {
    var socket = io.connect(this.props.url);
    var that = this;
    socket.on('signalk', function(data) {
      var s = data.self;
      that.setState({data: data.vessels[s]});
    });
  },
  render: function() {
    var loc = [
      {name: "Latitude", value: this.state.data.navigation.position.latitude,
       unit: "\u00B0"},
      {name: "Longitude", value: this.state.data.navigation.position.longitude,
       unit: "\u00B0"}
    ];

    var cog = [
      {value: this.state.data.navigation.courseOverGroundMagnetic,
       unit: "\u00B0"}
    ];

    var sog = [
      {value: this.state.data.navigation.speedOverGround,
       unit: "m/s"}
    ];

    var dbk = [
      {value: this.state.data.environmental.depthBelowKeel.value,
        unit: "m"}
    ];

    var twd = [
      {name: "Angle", value: this.state.data.environmental.wind.directionTrue,
       unit: "\u00B0"},
      {name: "Speed", value: this.state.data.environmental.wind.speedTrue,
       unit: "m/s"}
    ];

    var awd = [
      {name: "Angle",
       value: this.state.data.environmental.wind.directionApparent,
       unit: "\u00B0"},
      {name: "Speed", value: this.state.data.environmental.wind.speedApparent,
       unit: "m/s"}
    ];

    return (
      <div class="container-inner">
        <h1>Signal K React Demo</h1>
        <div className="dataList">
          <DataBox name="Location" data={loc} />
          <DataBox name="Course Over Ground" data={cog} />
          <DataBox name="Speed Over Ground" data={sog} />
          <DataBox name="Depth Below Keel" data={dbk} />
          <DataBox name="True Wind" data={twd} />
          <DataBox name="Apparent Wind" data={awd} />
        </div>
      </div>
    );
  }
});

var DataBox = React.createClass({
  render: function() {
    var dataElements = this.props.data.map(function(d) {
      return (
        <DataElement name={d.name} value={d.value} unit={d.unit} />
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
    if(this.props.name) {
      this.props.name += ":";
    }
    return (
      <div className="dataElement">
        <label>{this.props.name}</label>
        <span>{v}{this.props.unit}</span>
      </div>
    );
  }
});

React.renderComponent(
    <DataList url={"wss://" + location.hostname + ":3000/signalk/stream"} />,
    document.getElementById('container')
);

