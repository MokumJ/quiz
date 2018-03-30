import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import logo from './svg/oberon-logo.jpeg'
import Quiz from './components/Quiz.js'
import Result from './components/Result.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import update from 'react-addons-update';

import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            questionId: 1,
            question: '',
            answerOptions: [],
            answer: '',
            resultStanding: [],
            answersCount: {
                Nintendo: 0,
                Microsoft: 0,
                Sony: 0
            },
            result: ''
        };
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    componentWillMount() {
        const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));

        this.setState({
            question: quizQuestions[0].question,
            answerOptions: shuffledAnswerOptions[0]
        });
    }

    shuffleArray(array) {
        var currentIndex= array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);

        if (this.state.questionId < quizQuestions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            setTimeout(() => this.setResults(this.getResults()), 300);
        }
    }

    setUserAnswer(answer) {
        const updatedAnswersCount = update(this.state.answersCount, {
            [answer]: {$apply: (currentValue) => currentValue + 1}
        });
        this.setState({
            answersCount: updatedAnswersCount,
            answer: answer
        });
    }

    setNextQuestion() {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;
        this.setState({
            counter: counter,
            questionId: questionId,
            question: quizQuestions[counter].question,
            answerOptions: quizQuestions[counter].answers,
            answer: ''
        })
    }
    getResults() {
        const answersCount = this.state.answersCount;
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);
        return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
    }

    setResults(result) {
        if (result.length === 1) {
            this.setState({ result: result[0]});
        } else {
            this.setState({ result: 'Undetermined'});
        }
    }

    renderQuiz() {
        return (
            <Quiz
                answer={this.state.answer}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                question={this.state.question}
                questionTotal={quizQuestions.length}
                onAnswerSelected={this.handleAnswerSelected}
            />
        );
    }

    renderResult() {
        return (
            <Result quizResult={this.state.result} />
        );
    }

    renderResultList(){
        const obj = this.state.answersCount;
        const answersCount = [];
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                answersCount.push({
                    'key': prop,
                    'value': obj[prop]
                });
            }
        }
        const answersSorted = answersCount.sort((a, b) => { return b.value - a.value; });
        console.log(answersSorted)
    return(
        <div className='resultList'>
            <ol>
                {answersSorted.map((item) => (
                    <li> {item.key}: {item.value}</li>
                    ))}
                {/*<li> Nintentdo: {this.state.answersCount.Nintendo} </li>*/}
                {/*<li> Sony: {this.state.answersCount.Sony} </li>*/}
                {/*<li> Microsoft: {this.state.answersCount.Microsoft} </li>*/}
            </ol>
         </div>
         )
    }


    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Oberon Quiz</h2>
                </div>
                <div className= "quizbody">
                     {this.state.result ? this.renderResult() : this.renderQuiz()}
                    {this.renderResultList()}
                </div>
            </div>
        )
    }
}

export default App;
