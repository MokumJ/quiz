// @flow

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

type ResultProps = {
    quizResult: string
};

const Result = (props: ResultProps) => (
    <ReactCSSTransitionGroup
        className="container result"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
    >
        <div>
            You prefer <strong>{props.quizResult}</strong>!
        </div>
    </ReactCSSTransitionGroup>

);

export default Result;