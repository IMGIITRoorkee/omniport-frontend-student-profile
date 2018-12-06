import React from 'react';
import axios from 'axios';
import { Segment, Icon } from 'semantic-ui-react';
import style from "../stylesheets/interestForm.css";

export class Link extends React.Component
{
    constructor(props)
    {
        super(props);

    }
    handleDelete = ( ) =>
    {
        console.log(this.props.data.id);
        this.props.handleUpdateDelete(this.props.data.id);
    }
    render()
    {  //ad-hoc solution
        return (
            <Segment attached styleName="style.headingBox" >  
                {this.props.data.url}
            <Icon name="delete" onClick={this.handleDelete}/>
            </Segment>
        )
    }
}