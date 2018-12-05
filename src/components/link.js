import React from 'react';
import axios from 'axios';
import { Segment, Icon } from 'semantic-ui-react';


class Link extends React.Component
{
    constructor(props)
    {
        super(props);

    }
    handleDelete = ( ) =>
    {
        this.props.handleDelete(this.props.data.id);
    }
    render()
    {
        return (
            <Segment attached>
                {this.props.data.url}
            <Icon onClick={this.handleDelete}/>
            </Segment>
        )
    }
}