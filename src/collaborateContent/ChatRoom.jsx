import React from 'react'
import { Link } from 'react-router-dom';
const ChatRoom = () => {
  return (
    <Link
    to="/quizpage"
    rel="noopener"
    className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-full ">
    Quiz Page
  </Link>
  )
}

export default ChatRoom;
