import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../UI/Button';

import styles from './ModalOverlay.module.css';
import closeIcon from '../../assets/images/cross.png';

const ModalBox = (props) => {
    const showCloseButton = (props.endQuiz) ? <Button onClick={props.onEndQuiz} useCustomClass='false'>End Quiz</Button>: <Button onClick={props.onClose} useCustomClass='false'>Close</Button>;

    const showCloseIcon = (props.endQuiz) ? <div onClick={props.onEndQuiz}><img src={closeIcon} alt='Close Icon' /></div>: <div onClick={props.onClose}><img src={closeIcon} alt='Close Icon' /></div>;

    return (
        <div className={styles['modal-container']}>

            <div className={styles['modal-content-container']}>

                <div className={styles['modal-close-icon-box']}>{showCloseIcon}</div>

                <div className={styles['modal-content-body']}>{props.children}</div>

                <div className={styles['modal-button-container']}>{showCloseButton}</div>

            </div>
        </div>
    );
}

const ModalOverlay = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <ModalBox 
                    onClose={props.onClose} 
                    endQuiz={props.endQuiz} 
                    onEndQuiz={props.onEndQuiz} 
                    {...props} 
                />, 
                document.getElementById('modal_overlay_container')
            )}
        </React.Fragment>
    );
}

export default ModalOverlay;