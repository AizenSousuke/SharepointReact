import * as React from 'react';
import { Component } from 'react';

interface Props {
    
}
interface State {
    
}

export default class ExampleComponent extends Component<Props, State> {
    state = {}

    render() {
        return (
            <div>
                Example Component
                ${this.context.pageContext.web.title}
            </div>
        )
    }
}
