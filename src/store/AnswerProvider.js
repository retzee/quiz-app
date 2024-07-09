import React, { useReducer } from "react";
import AnswerContext from "./answer-context";

const defaultAnswerState = {
    answers: [],
    totalAnswerScore: 0
};

const answerReducer = (state, action) => {
    if(action.type === 'ADD'){
        const allStateAnswers = state.answers;
        let updatedTotalScore = state.totalAnswerScore;

        const existingAnswerIndex = allStateAnswers.findIndex(
            answerObj => answerObj.id === action.answer.id
        );

        const existingAnswer = allStateAnswers[existingAnswerIndex];
        
        let allUpdatedAnswers;

        if(existingAnswer){
            // Answer had been previously saved
            const updatedAnswer = {
                ...existingAnswer,
                selectedOption: action.answer.selectedOption,
                isCorrect: action.answer.isCorrect
            };
            if(existingAnswer.isCorrect === false){
                updatedTotalScore = (action.answer.isCorrect === true) ? updatedTotalScore + 1: updatedTotalScore;
            }
            else{
                updatedTotalScore = (action.answer.isCorrect === false) ? updatedTotalScore - 1: updatedTotalScore;
            }
            allUpdatedAnswers = [...allStateAnswers];
            allUpdatedAnswers[existingAnswerIndex] = updatedAnswer;
        }
        else{
            // Answer to be newly saved
            const newAnswer = {
                id: action.answer.id,
                selectedOption: action.answer.selectedOption,
                isCorrect: action.answer.isCorrect
            };
            updatedTotalScore = (action.answer.isCorrect === true) ? updatedTotalScore + 1: updatedTotalScore;
            allUpdatedAnswers = allStateAnswers.concat(newAnswer);
        }

        return {
            answers: allUpdatedAnswers,
            totalAnswerScore: updatedTotalScore
        };
    }

    if(action.type === 'UNSET'){
        return {
            answers: [],
            totalAnswerScore: 0
        };
    }
    
    return  defaultAnswerState;
}

const AnswerProvider = (props) => {
    const [answerState, dispatchAnswerAction] = useReducer(answerReducer, defaultAnswerState);

    const addAnswerHandler = (answer) => {
        dispatchAnswerAction({type: 'ADD', answer: answer});
    }
    
    const unsetAnswerHandler = (answer) => {
        dispatchAnswerAction({type: 'UNSET', answer: answer});
    }
    
    const answerContext = {
        answers: answerState.answers,
        totalAnswerScore: answerState.totalAnswerScore,
        addAnswer: addAnswerHandler,
        unsetAnswer: unsetAnswerHandler
    };

    return (
        <AnswerContext.Provider value={answerContext}>
            {props.children}
        </AnswerContext.Provider>
    );
}

export default AnswerProvider;