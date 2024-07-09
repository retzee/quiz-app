import React, { useState } from 'react';
import QuizHeader from './QuizHeader';
import QuizBody from './QuizBody';
import ModalOverlay from '../UI/ModalOverlay';
import { DEMO_QUESTIONS } from './DemoQuestions';

import styles from './Quiz.module.css';

const Quiz = (props) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayMessage, setOverlayMessage] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(undefined);
    const [endQuizStatus, setEndQuizStatus] = useState(false);    
    const totalQuestionCount = DEMO_QUESTIONS.length;
    const [allSelectedAnswers, setAllSelectedAnswers] = useState([]);

    const onEndQuizHandler = (event) => {
        event.preventDefault();
        props.resetQuiz();
    }
    
    const onCloseOverlayHandler = (event) => {
        event.preventDefault();
        setShowOverlay(false);
    }
    
    const nextClickHandler = (value) => {
        const currentQuestionNo = value.quizIndex + 1;
        if(DEMO_QUESTIONS[value.quizIndex] !== undefined){            
            const questionId = DEMO_QUESTIONS[value.quizIndex].id;
            const correctQtnOption = DEMO_QUESTIONS[value.quizIndex].correctOption;
            const selectedOption = value.clickedOption;

            const isCorrect = (selectedOption === correctQtnOption) ? true: false;

            console.log('value.quizIndex : '+value.quizIndex);

            const existingAnswerIndex = allSelectedAnswers.findIndex(
                    answerObj => answerObj.id === value.questionObjId
                );

            const existingAnswer = allSelectedAnswers[existingAnswerIndex];

            console.log('existingAnswerIndex : '+existingAnswerIndex);

            let allUpdatedAnswers;

            if(existingAnswer){
                // Answer had been previously saved
                console.log('existingAnswer selectedOption : '+existingAnswer.selectedOption);
                const updatedAnswer = {
                    ...existingAnswer,
                    selectedOption: selectedOption,
                    isCorrect: isCorrect
                };
                allUpdatedAnswers = [...allSelectedAnswers];
                allUpdatedAnswers[existingAnswerIndex] = updatedAnswer;
            }
            else{
                // Answer to be newly saved
                const newAnswer = {
                    id: questionId,
                    selectedOption: selectedOption,
                    isCorrect: isCorrect
                };
                allUpdatedAnswers = allSelectedAnswers.concat(newAnswer);
            }
            
            setAllSelectedAnswers(allUpdatedAnswers);

            if(currentQuestionNo === totalQuestionCount){
                // LAST QUESTION IN THE ARRAY : CLOSE QUIZ AFTER PROCESSING
             /*   const currentScorePercent = newScore / totalQuestionCount * 100;

                const msg = <div>
                                <h1>Quiz Completed...</h1>
                                <div>
                                    <p>Total Question : <strong>{totalQuestionCount}</strong></p>
                                    <p>You scored <strong>{newScore}</strong> question{newScore > 1 && 's'} CORRECTLY</p>
                                    <p>Your percentage score is <strong>{currentScorePercent}%</strong></p>
                                </div>
                            </div>;
                */
                const msg = '';
                setEndQuizStatus(true);
                setOverlayMessage(msg);
                setShowOverlay(true);                
                setCurrentQuestionIndex(undefined);
                // LAST QUESTION IN THE ARRAY : CLOSE QUIZ AFTER PROCESSING
            }
            else{
                const nextQuestion = (currentQuestionIndex === undefined) ? value.quizIndex + 1: currentQuestionIndex + 1;
                setCurrentQuestionIndex(nextQuestion);
            }

            allUpdatedAnswers.map((e, i) => {
                let allAns = '';
                allAns += e.id+' | ';
                allAns += e.selectedOption+' | ';
                allAns += e.isCorrect+' ';
                console.log(allAns);
                return true;
            });

        }
    }    

    const prevClickHandler = (quizIndex) => {
        const getPrevQuestion = (quizIndex === 1) ? 0: quizIndex - 1;
        setCurrentQuestionIndex(getPrevQuestion);
    }
    
    const blankAnswerOption = (value) => {
        const msg = <h1>You must select an Answer from the Options</h1>
        setOverlayMessage(msg);
        setShowOverlay(value);
    }

    return (
        <React.Fragment>
            {showOverlay && <ModalOverlay onClose={onCloseOverlayHandler} endQuiz={endQuizStatus} onEndQuiz={onEndQuizHandler}>{overlayMessage}</ModalOverlay>}

            <div className={styles.main_container}>
                <div className={styles['app-quiz-container']}>
                    <QuizHeader totalQuestionCount={totalQuestionCount} questionIndex={currentQuestionIndex} />
                    
                    {DEMO_QUESTIONS.map( (element, index) => {
                        let showQuiz = false;
                        let getQuizBody = false;
                        if(currentQuestionIndex === undefined){
                            if(index === 0){
                                showQuiz = true;
                            }
                        }     
                        else{
                            if(index === currentQuestionIndex){
                                showQuiz = true;
                            }
                        }                

                        if(showQuiz){
                            getQuizBody = <QuizBody
                                                key={element.id}
                                                show={showQuiz}
                                                quizIndex={index}
                                                currentQuestionIndex={currentQuestionIndex}
                                                totalQuestionCount={totalQuestionCount}
                                                {...element}
                                                onClick={nextClickHandler}
                                                onPrevClick={prevClickHandler}
                                                optionEmpty={blankAnswerOption}
                                            />;
                        }

                        return(getQuizBody);
                    } )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Quiz;