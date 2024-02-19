import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, update } from 'firebase/database';
import { Link } from 'react-router-dom';
// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  databaseURL: import.meta.env.VITE_databaseURL,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const QuizForm = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }]);
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };
  const handleCheckboxChange = (index) => {
    const newOptions = [...options];
    newOptions.forEach((option, i) => {
      if (i === index) {
        option.isCorrect = true;
      } else {
        option.isCorrect = false;
      }
    });
    setOptions(newOptions);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const quizRef = ref(database, 'quizzes');
    const newQuizRef = push(quizRef);
    update(newQuizRef, {
      question,
      options,
    });
    setQuestion('');
    setOptions([{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }]);
  };
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-lg text-indigo-600 font-bold'>Create Quiz</h2>
      <form onSubmit={handleSubmit}>
      <div className='flex items-center mt-4 justify-center' >
          <label className='text-lg flex items-center justify-center text-indigo-600 font-bold'>Question:</label>
          <input
          className='flex border-2 items-center w-full justify-center  px-3 py-3 rounded-2xl m-2 border-indigo-600' type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </div>
        <h4 className='text-lg flex items-center justify-center text-indigo-600 font-bold'>Options</h4>
        <div className='flex items-center justify-center'>
        
        <div className='grid grid-cols-2'>
          {options.map((option, index) => (
            <div key={index}>
              <input
                className=' flex border-2 px-3 py-3 rounded-2xl m-2 border-indigo-600'
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
              <input className=''
                type="checkbox"
                checked={option.isCorrect}
                onChange={() => handleCheckboxChange(index)}
              />
            </div>
          ))}
          </div>
        </div>
        <div className='flex items-center justify-center'>
        <button className="select-none text-white rounded-lg bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={() => setOptions([...options, ''])}>
          Add Option
        </button>
        <button className="ml-5 select-none text-white rounded-lg bg-indigo-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit">Send Quiz</button>
        </div>
        
      </form>
      <Link to="/collaborate">
                <button className="btn-submit px-8 mt-3 py-2 text-lg font-medium text-center text-white bg-indigo-600 rounded-lg">
                  Go Back
                </button>
              </Link>
    </div>
  );
};
export default QuizForm;