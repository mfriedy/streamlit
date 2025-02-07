/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022)
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

import React from "react"
import { shallow } from "@streamlit/lib/src/test_util"

import ErrorElement, { ErrorElementProps } from "./ErrorElement"

const getProps = (
  propOverrides: Partial<ErrorElementProps> = {}
): ErrorElementProps => ({
  name: "Name",
  message: "Message",
  stack: "Stack\nLine 1   \nLine 2\n",
  width: 100,
  ...propOverrides,
})

describe("ErrorElement element", () => {
  it("renders an AlertElement without crashing", () => {
    const props = getProps()
    const wrapper = shallow(<ErrorElement {...props} />)

    expect(wrapper).toBeDefined()
    expect(wrapper.find("AlertElement")).toBeDefined()
  })

  it("renders stack without first line and trimmed lines", () => {
    const props = getProps()
    const wrapper = shallow(<ErrorElement {...props} />)

    expect(wrapper.find("code").exists()).toBe(true)
    expect(wrapper.find("code").text()).toEqual("Line 1\nLine 2\n")
  })

  it("does not render the stack when not defined", () => {
    const props = getProps({ stack: undefined })
    const wrapper = shallow(<ErrorElement {...props} />)

    expect(wrapper.find("code").exists()).toBe(false)
  })
})
