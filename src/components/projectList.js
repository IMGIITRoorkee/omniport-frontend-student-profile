import React from 'react';
import {Project} from './project';

export function ProjectList(props)
{    var children = null;
    if(props.arr!=null)
    {
     children = Array.from(props.arr).map(function(child)
    {
        return <Project id={child.id} key={child.id} update={props.update} data={child}/>
    });
}
    return <div>{children}</div>;

}