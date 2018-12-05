import React from "react";
import "./../index.css";
import { Button, Icon, List } from "semantic-ui-react";
import style from "../stylesheets/interest.css";

export function Interest(props) {
  return (
    <div styleName="style.field">
    <div styleName="style.headingBox" >
      
    
      <List>
      <List.Item>
        <List.Icon name='stop circle outline' color='blue'/>
        <List.Content>
          <b>{props.data.topic}</b><br/>
                  </List.Content>
      </List.Item>
      </List> 
      
        
      <Icon color="grey" name="compose" onClick={() => props.manageData(props.data.id)}/>
      
    </div>
    </div>
  );
}
