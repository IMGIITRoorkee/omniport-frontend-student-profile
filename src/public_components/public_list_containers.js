import React from 'react'

import { listComponents } from "../constants/listComponents";
import { components } from "../constants/genericComponents";

export const publicListMaker = (theme, handle) => {
  let list = {};
  for (let index in components) {
    let componentName = components[index]
    let ReactComponent = listComponents[componentName]
    list[componentName] = <ReactComponent appDetails={{
        theme: theme,
        handle: handle,
        editMode: false,
    }} state={{
        isPublic: true,
        active: false,
        update: false,
    }} fetchData = {() => {}} />
  }
  return list;
};