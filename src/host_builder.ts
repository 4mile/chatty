/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Looker Data Sciences, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import { Callback, CallbackStore } from './types'
import { ChattyHost } from './host'

/**
 * Provides methods to define the properties of a [[ChattyHost]]
 */

export class ChattyHostBuilder {
  private _appendTo: HTMLElement | null = null
  private _handlers: CallbackStore = {}
  private _sandboxAttrs: string[] = []
  private _frameBorder: string = '0'
  private _targetOrigin: string | null = null

  /*
   * @hidden
   */

  constructor (private _url: string) {}

  get el () {
    return this._appendTo || document.body
  }

  get handlers () {
    return this._handlers
  }

  get sandboxAttrs () {
    return this._sandboxAttrs
  }

  get targetOrigin () {
    return this._targetOrigin
  }

  get url () {
    return this._url
  }

  /**
   * @param el the HTML element that the iframe will live inside. The iframe will be created as
   * a direct child of the element.
   */

  appendTo (el: HTMLElement) {
    this._appendTo = el
    return this
  }

  /**
   * Removes an event handler to the host.
   *
   * @param name Event name
   * @param fn Callback function to remove.
   */

  off (name: string, fn: Callback) {
    if (this._handlers[name]) {
      this._handlers[name] = this._handlers[name].filter((handler) => handler !== fn)
    }
  }

  /**
   * Adds an event handler to the host.
   *
   * @param name Event name to which to listen.
   * @param fn Callback function that is invoked when the event
   * is received, and accepts any parameters that were passed with the event.
   */

  on (name: string, fn: Callback) {
    this._handlers[name] = this._handlers[name] || []
    this._handlers[name].push(fn)
    return this
  }

  getFrameBorder () {
    return this._frameBorder
  }

  frameBorder (attr: string) {
    this._frameBorder = attr
    return this
  }

  sandbox (attr: string) {
    this._sandboxAttrs.push(attr)
    return this
  }

  withTargetOrigin (targetOrigin: string) {
    this._targetOrigin = targetOrigin
    return this
  }

  /**
   * Builds a [[ChattyHost]] with the provided properties.
   */

  build () {
    return new ChattyHost(this)
  }
}
