import React, { useContext, useState } from 'react';
import QuizQuestion from './QuizQuestion';
import QuizAnswerOption from './QuizAnswerOption';
import Button from '../UI/Button';
import AnswerContext from '../../store/answer-context';

import styles from './Quiz.module.css';
import buttonStyle from '../UI/Button.module.css';

const QuizBody = (props) => {
    const [clickedOption, setClickedOption] = useState('');
    const answerCtx = useContext(AnswerContext);
        
    let setPrevSelectedOption = false;
    const stateAnswerIndex = answerCtx.answers.findIndex(
        stateAnswer => stateAnswer.id === props.id
    );
    const stateAnswer = answerCtx.answers[stateAnswerIndex];

    if(stateAnswer){
        setPrevSelectedOption = stateAnswer.selectedOption
    }
        
    const nextQuestionHandler = (event) => {
        event.preventDefault();
        if(clickedOption.length === 0){
            if(stateAnswer){
                const values = {
                    quizIndex: props.quizIndex,
                    questionObjId: props.id,
                    clickedOption: setPrevSelectedOption
                };
                props.onClick(values);
            }
            else{
                props.optionEmpty(true);
            }
        }
        else{
            const values = {
                quizIndex: props.quizIndex,
                questionObjId: props.id,
                clickedOption: clickedOption
            };
            props.onClick(values);
        }
    }
    
    const clickedOptionHandler = (value) => {
        setClickedOption(value);
    }

    const prevQuestionHandler = (event) => {
        event.preventDefault();
        props.onPrevClick(props.quizIndex);
    }
        
    const quizBodyClass = (props.show) ? styles['app-quiz-body']: styles.hide_element;
    const currentQuestionNo = (props.currentQuestionIndex === undefined) ? 1: props.currentQuestionIndex + 1;
    const buttonText = (currentQuestionNo === 5) ? 'Submit': 'Save & Proceed';
    
    const showPrevBtn = (currentQuestionNo !== 1) ? <Button onClick={prevQuestionHandler} useCustomClass='false' className={buttonStyle.custom_red_button}>Previous Question</Button>: '';
    
    return (
        <div className={quizBodyClass}>
            <QuizQuestion question={props.question} />
            <QuizAnswerOption {...props} onClickOption={clickedOptionHandler} />
            <div className={styles['next-button-container']}>
                {showPrevBtn}
                <Button onClick={nextQuestionHandler} useCustomClass='true'>{buttonText}</Button>
            </div>
        </div>
    );
}

export default QuizBody;