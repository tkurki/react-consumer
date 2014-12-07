/*
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
 */

/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');
var PageActions = require('../actions/PageActions');
var DefaultLayout = require('../layouts/DefaultLayout');

var HomePage = React.createClass({

  statics: {
    layout: DefaultLayout
  },

  componentWillMount() {
    PageActions.set({title: 'React.js Starter Kit'});
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <h3>Runtime Components</h3>
            <dl>
              <dt><a href="https://facebook.github.io/react/">React</a></dt>
              <dd>A JavaScript library for building user interfaces, developed by Facebook</dd>
              <dt><a href="https://github.com/flatiron/director">Director</a></dt>
              <dd>A tiny and isomorphic URL router for JavaScript</dd>
              <dt><a href="http://getbootstrap.com/">Bootstrap</a></dt>
              <dd>CSS framework for developing responsive, mobile first interfaces</dd>
            </dl>
          </div>
          <div className="col-sm-4">
            <h3>Development Tools</h3>
            <dl>
              <dt><a href="http://gulpjs.com">Gulp</a></dt>
              <dd>JavaScript streaming build system and task automation</dd>
              <dt><a href="http://webpack.github.io/">Webpack</a></dt>
              <dd>Compiles front-end source code into modules / bundles</dd>
              <dt><a href="http://www.browsersync.io/">BrowserSync</a></dt>
              <dd>A lightweight HTTP server for development</dd>
            </dl>
          </div>
          <div className="col-sm-4">
            <h3>Fork me on GitHub</h3>
            <p><a href="https://github.com/kriasoft/react-starter-kit">github.com/kriasoft/react-starter-kit</a></p>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = HomePage;
