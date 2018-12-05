import React from 'react';
import axios from 'axios';
import {Link} from 'semantic-ui-react';

import {Link} from '../components/link';

export class LinkList extends React.Component{
    constructor(props)
    {
        super(props);
    }


    render()
    {
            const {handleDelete ,data} = this.props;
            const children = Array.from(data).map(function(child, index)
            {
                return (
                    <Link key={index} data={child} handleDelete={handleDelete}/>
                );
            });
            return (
                <Segment>{children}</Segment>
            )
    }
}