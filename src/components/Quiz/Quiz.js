import React, { useState, useContext } from 'react';
import QuizHeader from './QuizHeader';
import QuizBody from './QuizBody';
import ModalOverlay from '../UI/ModalOverlay';
import { DEMO_QUESTIONS } from './DemoQuestions';
import AnswerContext from '../../store/answer-context';

import styles from './Quiz.module.css';

const Quiz = (props) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayMessage, setOverlayMessage] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(undefined);
    const [endQuizStatus, setEndQuizStatus] = useState(false);    
    const totalQuestionCount = DEMO_QUESTIONS.length;
    const answerCtx = useContext(AnswerContext);

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
            
            const newAnswer = {
                id: questionId,
                selectedOption: selectedOption,
                isCorrect: isCorrect
            };
                        
            answerCtx.addAnswer(newAnswer); 

            if(currentQuestionNo === totalQuestionCount){
                // LAST QUESTION IN THE ARRAY : CLOSE QUIZ AFTER PROCESSING
                const currentTotalScore = answerCtx.totalAnswerScore;
                const newTotalScore = (isCorrect === true) ? currentTotalScore + 1: currentTotalScore;
                const currentScorePercent = newTotalScore / totalQuestionCount * 100;

                const msg = <div>
                                <h1>Quiz Completed...</h1>
                                <div>
                                    <p>Total Question : <strong>{totalQuestionCount}</strong></p>
                                    <p>You scored <strong>{newTotalScore}</strong> question{newTotalScore > 1 && 's'} CORRECTLY</p>
                                    <p>Your percentage score is <strong>{currentScorePercent}%</strong></p>
                                </div>
                            </div>;
                
                setEndQuizStatus(true);
                setOverlayMessage(msg);
                setShowOverlay(true);                
                setCurrentQuestionIndex(undefined);
                answerCtx.unsetAnswer(); 
                // LAST QUESTION IN THE ARRAY : CLOSE QUIZ AFTER PROCESSING
            }
            else{
                const nextQuestion = (currentQuestionIndex === undefined) ? value.quizIndex + 1: currentQuestionIndex + 1;
                setCurrentQuestionIndex(nextQuestion);
            }
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