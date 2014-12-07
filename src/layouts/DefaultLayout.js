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
var PageStore = require('../stores/PageStore');
var Link = require('../components/Link');
var Navbar = require('../components/Navbar');

/**
 * Retrieves the current page metadata from the PageStore.
 * @returns {{title: string}}
 */
function getState() {
  return {
    title: PageStore.get().title
  };
}

var DefaultLayout = React.createClass({

  mixins: [PageStore.Mixin],

  getInitialState() {
    return getState();
  },

  componentDidMount() {
    PageStore.emitChange();
  },

  render() {
    var header = this.props.children.type.breadcrumb ? (
      <div className="container">
        <h2>{this.state.title}</h2>
        {this.props.children.type.breadcrumb}
      </div>
    ) : (
      <div className="container">
      </div>
    );

    return (
      <div>
        <Navbar />
        {header}
        {this.props.children}
        <div className="navbar-footer">
          <div className="container">
            <p className="text-muted">
              <span>© Signal K</span>
              <span><Link to="/">Home</Link></span>
            </p>
          </div>
        </div>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the PageStore.
   */
  onChange() {
    this.setState(getState());
  }
});

module.exports = DefaultLayout;
