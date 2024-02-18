import React from 'react'

const Instructor = () => {
  return (
    <div name="Instructor" className='m-4 p-3 max-w-[800px] shadow-lg rounded-2xl'>
      <h1 className='font-bold text-indigo-600 text-xl mb-3'>Instructor</h1>
      <p className='text-gray-500' >
      In this free 14 hour tutorial you are going to learn how to build a Twitch Clone using Next 14. We are going to start with the basics like configuring Next.js, learning the routing concepts, and then slowly go deeper into setting up authentication, database, local tunnels, webhooks, all the way to generating RTMP and WHIP connections to connect to our OBS streaming software.
      </p>
    </div>
  )
}

export default Instructor
