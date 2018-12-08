import React from 'react';
import {Icon} from 'semantic-ui-react';

export function ImagePreview (props)

{

    
        return (
            <div><Icon inverted color="black" name="trash" onClick = {()=>{props.removeImage()}}/>
            <img src={props.imagePreviewUrl} style={{border:'2px solid black', height:'15vh',width:'15vh' }}/></div>
        );



}