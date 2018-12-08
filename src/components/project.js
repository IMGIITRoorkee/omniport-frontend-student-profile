import React from 'react';
import {Button, Segment, Icon} from 'semantic-ui-react';
import style from "../stylesheets/internship.css";

export function Project(props){

    return (
    <Segment attached>
      <div styleName="style.flex-box">
        <Segment basic >
          <b>{props.data.topic}</b>
          <p>{props.data.field}</p>
          <p>
            {props.data.startDate} - {props.data.endDate}
          </p>
          <p>{props.data.description}</p>
         {(props.data.image)?<img src={props.data.image.replace('http://localhost:3003/', 'http://192.168.121.228:60025/')} style={{border:'2px solid black', height:'15vh',width:'15vh' }}/>:null} 
          
        </Segment>
        <div>
          <Icon
            name="edit"
            color="grey"
            onClick={() => props.update(props.data)}
          />
        </div>
      </div>
    </Segment>
            
       
    )

}



