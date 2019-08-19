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

import { Chatty } from '../src/index'
import { Actions } from './constants'
import { Msg } from './types'

document.addEventListener('DOMContentLoaded', () => {
  Chatty.createClient()
    .on(Actions.SET_STATUS, (msg: Msg) => {
      const status = document.querySelector('#client-status')!
      status.innerHTML = msg.status
    })
    .on(Actions.GET_TITLE, (msg: Msg) => {
      return document.querySelector('title')!.innerText
    })
    .withTargetOrigin(window.location.origin)
    .build()
    .connect()
    .then(host => {
      document.querySelector('#change-status')!.addEventListener('click', () => {
        host.send(Actions.SET_STATUS, { status: 'click from client' })
      })
    })
    .catch(console.error)
})
