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
 * @jsx React.DOM
 */

var DataList = React.createClass({
  getInitialState: function() {
    return {data: {
      "navigation": {
        "courseOverGroundTrue": {value:null},
        "speedOverGround": {value:null},
        "position": {
          "latitude": null,
          "longitiude": null
        }
      },
      "environment": {
        "wind": {
          "angleApparent": {value:null},
          "speedApparent": {value:null}
        },
        "depth": {
          "belowTransducer": {
            "value": null
          }
        }
      }
    }};
  },
  componentDidMount: function() {
    var that = this;
      var handleTree = function(data) {
      var s = data.self;
      console.log(data.vessels[s]);
      that.setState({data: data.vessels[s]});
    };
      if (typeof Primus != 'undefined') {
        var signalKStream = Primus.connect(this.props.url, {
          reconnect: {
            maxDelay: 15000,
            minDelay: 500,
            retries: Infinity
          }
        });

        signalKStream.on('data', handleTree);
      } else {
        connection = new WebSocket(this.props.url);
        connection.onopen = function(msg) {
          console.log("open:" + msg);
        };

        connection.onerror = function(error) {
          console.log("error:" + msg);
        };
        connection.onmessage = function(msg) {
          handleTree(JSON.parse(msg.data));
        };
      }
  },
  render: function() {
    var loc = [
      {name: "Latitude", value: this.state.data.navigation.position.latitude,
       unit: "\u00B0"},
      {name: "Longitude", value: this.state.data.navigation.position.longitude,
       unit: "\u00B0"}
    ];

    var cog = [
      {value: this.state.data.navigation.courseOverGroundTrue.value,
       unit: "\u00B0"}
    ];

    var sog = [
      {value: this.state.data.navigation.speedOverGround.value,
       unit: "m/s"}
    ];

    var dbk = [
      {value: this.state.data.environment.depth.belowTransducer.value,
        unit: "m"}
    ];

    var twd = [
      {name: "Angle", value: this.state.data.environment.wind.directionTrue,
       unit: "\u00B0"},
      {name: "Speed", value: this.state.data.environment.wind.speedTrue,
       unit: "m/s"}
    ];

    var awd = [
      {name: "Angle",
       value: this.state.data.environment.wind.angleApparent.value,
       unit: "\u00B0"},
      {name: "Speed", value: this.state.data.environment.wind.speedApparent.value,
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
    <DataList url={"ws://" + location.hostname + ":3000/signalk/stream"} />,
    document.getElementById('container')
);

