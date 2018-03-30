// @flow
import React from 'react';
import PropTypes from 'prop-types'
type AnswerOptionProps = {
    answerType: string,
    answerContent: string,
    answer: string,
    onAnswerSelected: Function,
};

const AnswerOption = (props: AnswerOptionProps) => {

    return (
    <li className="answerOption">
        <input
            type="radio"
            className="radioCustomButton"
            name="radioGroup"
            checked={props.answerType === props.answer}
            id={props.answerType}
            value={props.answerType}
            disabled={props.answer}
            onChange={props.onAnswerSelected}
        />
        <label className="radioCustomLabel" htmlFor={props.answerType}>
            {props.answerContent}
        </label>
    </li>
    );
}

AnswerOption.propTypes = {
    onAnswerSelected: PropTypes.func
}

export default AnswerOption;