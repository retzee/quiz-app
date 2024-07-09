import Button from '../UI/Button';

import styles from './Welcome.module.css';

const Welcome = (props) => {
    return (
        <div className={styles.welcome_container}>
            <div className={styles.welcome_text}>
                <h2>Welcome to Quiz Center</h2>
                <Button onClick={props.onClick} useCustomClass='true'>Start Quiz</Button>
            </div>        
        </div>
    );
}

export default Welcome;