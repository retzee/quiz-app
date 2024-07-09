import React, { useState } from "react";
import Welcome from "./components/WelcomeScreen/Welcome";
import Quiz from "./components/Quiz/Quiz";
import AnswerProvider from "./store/AnswerProvider";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);

  const startQuizHandler = (event) => {
    event.preventDefault();
    setShowWelcome(false);
    setShowQuiz(true);
  }
  
  const resetQuizHandler = () => {
    setShowWelcome(true);
    setShowQuiz(false);
  }

  return (
    <AnswerProvider>
      {showWelcome && <Welcome onClick={startQuizHandler} />}
      {showQuiz && <Quiz resetQuiz={resetQuizHandler} />}      
    </AnswerProvider>
  );
}

export default App;