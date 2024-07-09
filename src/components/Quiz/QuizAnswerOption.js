import React, { useContext, useState } from 'react';
import styles from './Quiz.module.css';
import AnswerContext from '../../store/answer-context';

const QuizAnswerOption = (props) => {  
    const [selectedOption, setSelectedOption] = useState('');
    const answerCtx = useContext(AnswerContext);
        
    const optionList = ['optionA', 'optionB', 'optionC', 'optionD'];
        
    let ctxPrevSelectedOption = false;
    const ctxAnswerIndex = answerCtx.answers.findIndex(
        thisCtxAnswer => thisCtxAnswer.id === props.id
    );
    const ctxAnswer = answerCtx.answers[ctxAnswerIndex];

    if(ctxAnswer){
        if(ctxAnswerIndex >= 0){
            ctxPrevSelectedOption = ctxAnswer.selectedOption;
        }
    }

    let selectedOptionClass = '';

    const optionClickHandler = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        props.onClickOption(value);
    }

    return (
        <div className={styles['app-options-container']}>
                
            {optionList.map((element, i) => {
                let optionValue = '';
                switch(element){
                    case 'optionA':
                        optionValue = props.optionA;
                        break;
                    case 'optionB':
                        optionValue = props.optionB;
                        break;
                    case 'optionC':
                        optionValue = props.optionC;
                        break;
                    case 'optionD':
                        optionValue = props.optionD;
                        break;
                    default :
                        optionValue = '';
                        break;
                }
                
                if(selectedOption){
                    selectedOptionClass = (element === selectedOption) ? styles.option_selected: ''; 
                }
                else{
                    if(ctxAnswer){
                        if(ctxAnswerIndex >= 0){
                            selectedOptionClass = (element === ctxPrevSelectedOption) ? styles.option_selected: ''; 
                        }
                    }
                }

                const rowKey = element+'_'+i;
                const inputFieldId = 'id_'+element+'_'+i;

                return (
                    <span key={rowKey}>
                        <input 
                            onClick={optionClickHandler} 
                            type="radio" 
                            name="option" 
                            className="radio" 
                            id={inputFieldId}
                            value={element} 
                        />
                        <label className={selectedOptionClass} htmlFor={inputFieldId}>{optionValue}</label>
                    </span>
                );
            })}
            
        </div>
    );
}

export default QuizAnswerOption;