import styles from './Quiz.module.css';

const QuizHeader = (props) => {
    const questionNo = (props.questionIndex === undefined) ? 1: props.questionIndex + 1;
    return (
        <div className={styles['app-details-container']}>
                <h1> Question : {questionNo} / {props.totalQuestionCount}</h1>
            </div>
    );
}

export default QuizHeader;