// @flow
import Question from './Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';

type QuizProps = {
    answer: string,
    answerOptions: Array,
    counter: number,
    question: string,
    questionId: number,
    questionTotal: number,
    onAnswerSelected: Function,
};



const Quiz = (props: QuizProps) => {

    const renderAnswerOptions = (key) =>
    {

        return (
            <AnswerOption
                key={key.content}
                answerContent={key.content}
                answerType={key.type}
                answer={props.answer}
                questionId={props.questionId}
                onAnswerSelected={props.onAnswerSelected}
            />
        )

    }
        return (
            <ReactCSSTransitionGroup
                className="container"
                component="div"
                transitionName="fade"
                transitionEnterTimeout={800}
                transitionLeaveTimeout={500}
                transitionAppear
                transitionAppearTimeout={500}
            >
                <div key={props.questionId}>
                    <QuestionCount
                        counter={props.questionId}
                        total={props.questionTotal}
                    />
                    <Question content={props.question} />
                    <ul className="answerOptions">
                        {props.answerOptions.map(renderAnswerOptions)}
                    </ul>
                </div>
            </ReactCSSTransitionGroup>
    );
}

Quiz.propTypes = {
    onAnswerSelected: PropTypes.func
}

export default Quiz;