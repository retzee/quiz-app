import React, { useContext, useState } from 'react';
import styles from './Quiz.module.css';
import AnswerContext from '../../store/answer-context';

const QuizAnswerOption = (props) => {  
    const [selectedOption, setSelectedOption] = useState('');
    //const [prevSelectedOption, setPrevSelectedOption] = useState();
    const answerCtx = useContext(AnswerContext);
    
    console.log('Component Rendered');
    
    const optionList = ['optionA', 'optionB', 'optionC', 'optionD'];
    let ignoreCtxOption = true;
    
    console.log('ignoreCtxOption 1 '+ignoreCtxOption);
    
    let ctxPrevSelectedOption = false;
    const ctxAnswerIndex = answerCtx.answers.findIndex(
        thisCtxAnswer => thisCtxAnswer.id === props.id
    );
    const ctxAnswer = answerCtx.answers[ctxAnswerIndex];

    if(ctxAnswer){
        if(ctxAnswerIndex >= 0){
            ctxPrevSelectedOption = ctxAnswer.selectedOption;
            ignoreCtxOption = false;
        }
    }
    console.log('ignoreCtxOption 2 '+ignoreCtxOption);

    let selectedOptionClass = '';

    const optionClickHandler = (event, ignoreCtxOptionValue) => {
        console.log('Click Event');
        const value = event.target.value;
        setSelectedOption(value);
        ignoreCtxOption = ignoreCtxOptionValue;
        //setSelectedOptionUpdated(true);
        props.onClickOption(value);
    }
    console.log('ignoreCtxOption 3 '+ignoreCtxOption);

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

                //console.log(props.id+' => option element loop: '+element);
                
                if(ctxAnswer){
                    if(ignoreCtxOption === true){
                        selectedOptionClass = (element === selectedOption) ? styles.option_selected: '';
                    }
                    else{
                        selectedOptionClass = (element === ctxPrevSelectedOption) ? styles.option_selected: ''; 
                    }
                }
                else{
                    selectedOptionClass = (element === selectedOption) ? styles.option_selected: ''; 
                }

                const rowKey = element+'_'+i;
                const inputFieldId = 'id_'+element+'_'+i;

                return (
                    <span key={rowKey}>
                        <input 
                            onClick={(e) => optionClickHandler(e, true)} 
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