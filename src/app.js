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
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var {Router} = require('director');
var Dispatcher = require('./core/Dispatcher');
var ActionTypes = require('./constants/ActionTypes');
var router;

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

Dispatcher.register((payload) => {

  var action = payload.action;

  switch (action.actionType)
  {
    case ActionTypes.SET_CURRENT_ROUTE:
      router.setRoute(action.route);
      break;

    case ActionTypes.SET_CURRENT_PAGE:
      if (ExecutionEnvironment.canUseDOM) {
        document.title = action.page.title;
      }
      break;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

/**
 * Check if Page component has a layout property; and if yes, wrap the page
 * into the specified layout, then mount to document.body.
 */
function render(page) {
  var layout = null, child = null, props = {};
  while ((layout = page.type.layout || (page.defaultProps && page.defaultProps.layout))) {
    child = React.createElement(page, props, child);
    page = layout;
  }
  React.render(React.createElement(page, props, child), document.body);
}

// Define URL routes
// See https://github.com/flatiron/director
var routes = {
  '/': () => render(require('./pages/Index')),
  '/privacy': () => render(require('./pages/Privacy'))
};

// Initialize a router
router = new Router(routes).configure({html5history: true}).init();
