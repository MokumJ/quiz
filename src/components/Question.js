// @flow
import React from 'react';

type QuestionProps = {
    content: string,
};


const Question = (props: QuestionProps) => (

    <h2 className="question">{props.content}</h2>

);

export default Question;

