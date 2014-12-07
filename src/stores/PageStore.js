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

var Store = require('../core/Store');
var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');

/**
 * @typedef Page
 * @type {object}
 * @property {string} title
 * @property {string} description
 * @property {string} keywords
 */
var _page;

var PageStore = new Store({

  /**
   * Gets metadata associated with the current page.
   * @returns {Page}
   */
  get() {
    return _page || require('../constants/Settings').defaults.page;
  }

});

PageStore.dispatcherToken = Dispatcher.register(payload => {

  var action = payload.action;

  if (action.actionType == ActionTypes.SET_CURRENT_PAGE) {
    _page = action.page;
    PageStore.emitChange();
  }

  return true; // No errors.  Needed by promise in Dispatcher.

});

module.exports = PageStore;
