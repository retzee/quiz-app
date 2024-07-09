import styles from './Button.module.css';

const Button = (props) => {
    let btnClasses = (props.useCustomClass === 'true') ? styles.custom_button: '';
    btnClasses += ' '+props.className;

    return (
        <button className={btnClasses} onClick={props.onClick}>{props.children}</button>
    );
}

export default Button;