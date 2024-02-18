import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { Link } from 'react-router-dom';

// import './livequiz.css';
// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBm3--ubPJARyUzEGmwUVqqmiGeLBQbATU",
    authDomain: "curiocamp-b13dc.firebaseapp.com",
    databaseURL: "https://curiocamp-b13dc-default-rtdb.firebaseio.com",
    projectId: "curiocamp-b13dc",
    storageBucket: "curiocamp-b13dc.appspot.com",
    messagingSenderId: "346127704571",
    appId: "1:346127704571:web:4c77347a938eb9481e2b5e",
    measurementId: "G-1PYWZ9RYPH"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const QuizPage = () => {
    const [lastQuestion, setLastQuestion] = useState('');
    const [lastQuestionOptions, setLastQuestionOptions] = useState([]);
    const [isCorrectOption,setIsCorrectOption] =  useState(false);
    useEffect(() => {
        const db = getDatabase(app);
        const quizRef = ref(db, 'quizzes');
        const unsubscribe = onValue(quizRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Get the last question
                const keys = Object.keys(data);
                const lastKey = keys[keys.length - 1];
                const lastQuestionObj = data[lastKey];
                const lastQuestionText = lastQuestionObj.question;
                // console.log(lastQuestionText);
                const lastQuestionOpts = lastQuestionObj.options || [];
                setLastQuestion(lastQuestionText);
                setLastQuestionOptions(lastQuestionOpts.map(option => ({
                    ...option,
                    isSelected: false
                })));
                console.log(lastQuestionOpts);
            }
        });
        return () => {
            // Unsubscribe from database updates when component unmounts
            off(quizRef, 'value', unsubscribe);
        };
    }, []);
    const handleOptionClick = (index, isCorrect) => {
        // Mark the clicked option as selected
        const updatedOptions = lastQuestionOptions.map((option, idx) => ({
            ...option,
            isSelected: idx === index && isCorrect
        }));
        setLastQuestionOptions(updatedOptions);
    };
    return (
        <div className="conatiner relative h-screen">
            <div className="flex absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex-col mt-10 w-screen px-5 h-screen items-center text-black">
            <div className="p-4 m-3 w-full lg:w-3/5 shadow-lg rounded-2xl">
            <h2 className="mt-1 text-md font-bold text-indigo-600">Quiz Question</h2>
            <p className='text-bold text-xl mt-2 mb-1'>{lastQuestion}</p>
            <div >
            <ul>
                {lastQuestionOptions.map((option, index) => (
                    <li key={index}>
                        <div className="ml-3 flex border-2  px-4 py-4 rounded-2xl m-2 border-indigo-600">
                        <label className={option.isSelected ? 'selected-option' : ''}>
                            <input
                                type="radio"
                                name="options"
                                value={option.text}
                                onClick={() => handleOptionClick(index, option.is_correct)}
                            />
                            {option.text}
                        </label>
                        </div>
                    </li>
                ))}
            </ul>
            <Link to="/collaborate">
                <button className="btn-submit px-8 mt-3 py-2 text-lg font-medium text-center text-white bg-indigo-600 rounded-2xl">
                  Go Back
                </button>
              </Link>
            </div>
        </div>
            </div>
        </div>
    );
};
export default QuizPage;