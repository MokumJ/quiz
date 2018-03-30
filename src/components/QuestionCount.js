// @flow

import React from 'react';

type QuestionCountProps = {
    counter: number,
    total: number
};

const QuestionCount = (props: QuestionCountProps) => (
    <div className="questionCount">
        Question <span>{props.counter}</span> of <span>{props.total}</span>
    </div>
);

export default QuestionCount;