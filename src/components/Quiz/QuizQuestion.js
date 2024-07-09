import styles from './Quiz.module.css';

const QuizQuestion = (props) => {
    return (
        <div className={styles['app-question-container']}>
                <h1 id="display-question">{props.question}</h1>
            </div>
    );
}

export default QuizQuestion;