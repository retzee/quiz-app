import React from "react";

const AnswerContext = React.createContext({
    answers: [],
    totalAnswerScore: 0,
    addAnswer: (answer) => {},
    unsetAnswer: (answer) => {}
});

export default AnswerContext;