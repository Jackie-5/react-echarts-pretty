/**
 * Created by Jackie.Wu on 2018/6/20.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';

const { Component } = React;
const { render } = ReactDOM;

class Demo extends Component<any> {
    render() {
        return <div className="test">sadfasdf</div>
    }
}

render(
    <Demo />,
    document.getElementById('wrapper'),
);