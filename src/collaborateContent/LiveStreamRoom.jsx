import React , { useRef, useState } from 'react'
import "../pages/video.css"
import {
  VERSION,
  createClient,
  createCameraVideoTrack,
  createMicrophoneAudioTrack,
  onCameraChanged,
  onMicrophoneChanged
} from "agora-rtc-sdk-ng/esm"
import { Link } from 'react-router-dom'
import Reactlogo from "../assets/reactlogo.svg";
import Angularlogo from "../assets/angularlogo.svg";
import Nodejslogo from "../assets/nodejslogo.svg";
import Nextjslogo from "../assets/nextjslogo.svg";
// console.log("Current SDK VERSION: ", VERSION)
onCameraChanged(device => {
  // console.log("onCameraChanged: ", device)
})
onMicrophoneChanged(device => {
  // console.log("onMicrophoneChanged: ", device)
})
const client = createClient({
  mode: "rtc",
  codec: "vp8"
})
let audioTrack
let videoTrack
const LiveStreamRoom = () => {
  const [selectedLogo, setSelectedLogo] = useState(null);

  const handleClick = (logo) => {
    setSelectedLogo(logo);
  };
  const agora_appId = import.meta.env.VITE_Agora_appid
  const agora_token = import.meta.env.VITE_AGORA_TOKEN
  const agora_room = 'main'
  const [isAudioOn, setIsAudioOn] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isAudioPubed, setIsAudioPubed] = useState(false)
  const [isVideoPubed, setIsVideoPubed] = useState(false)
  const [isVideoSubed, setIsVideoSubed] = useState(false)
  const [isLiveStreamRoom, setIsLiveStreamRoom] = useState(true);
  const is_actual_superuser = localStorage.getItem("is_actual_superuser");
  console.log(is_actual_superuser);
  const turnOnCamera = async flag => {
    flag = flag ?? !isVideoOn
    setIsVideoOn(flag)
    if (videoTrack) {
      return videoTrack.setEnabled(flag)
    }
    videoTrack = await createCameraVideoTrack()
    videoTrack.play("camera-video")
  }
  const turnOnMicrophone = async flag => {
    flag = flag ?? !isAudioOn
    setIsAudioOn(flag)
    if (audioTrack) {
      return audioTrack.setEnabled(flag)
    }
    audioTrack = await createMicrophoneAudioTrack()
    // audioTrack.play();
  }
  const [isJoined, setIsJoined] = useState(false)
  const channel = useRef("")
  // you can apply appid follow the guide https://www.agora.io/en/blog/how-to-get-started-with-agora/
  const appid = useRef("")
  // you can apply token follow the guide https://www.agora.io/en/blog/how-to-get-started-with-agora/
  const token = useRef("")
  const joinChannel = async () => {
    if (!channel.current) {
      channel.current = "react-room"
    }
    if (isJoined) {
      await leaveChannel()
    }
    client.on("user-published", onUserPublish)
    // await client.join(
    //   appid.current,
    //   channel.current,
    //   token.current || null,
    //   null
    // )
    await client.join(
      agora_appId,
      agora_room,
      agora_token,
      null
    )
    setIsJoined(true)
  }
  const leaveChannel = async () => {
    setIsJoined(false)
    setIsAudioPubed(false)
    setIsVideoPubed(false)
    await client.leave()
  }
  const onUserPublish = async (user, mediaType) => {
    if (mediaType === "video") {
      const remoteTrack = await client.subscribe(user, mediaType)
      remoteTrack.play("remote-video")
      setIsVideoSubed(true)
    }
    if (mediaType === "audio") {
      const remoteTrack = await client.subscribe(user, mediaType)
      remoteTrack.play()
    }
  }
  const publishVideo = async () => {
    await turnOnCamera(true)
    if (!isJoined) {
      await joinChannel()
    }
    await client.publish(videoTrack)
    setIsVideoPubed(true)
  }
  const publishAudio = async () => {
    await turnOnMicrophone(true)
    if (!isJoined) {
      await joinChannel()
    }
    await client.publish(audioTrack)
    setIsAudioPubed(true)
  }
  
  return (
    <>
      <div className="left-side mt-2">
        {/* <h3>Pleat check you camera / microphone!</h3> */}
        <div className="buttons">
      {(is_actual_superuser === "true") && <button
            onClick={() => turnOnCamera()}
            // className={isVideoOn ? "button-on" : ""}
          className='flex border-2 items-center w-full justify-center  px-3 py-3 rounded-2xl m-2 border-indigo-600'
          >
            Turn {isVideoOn ? "off" : "on"} camera
          </button>}
{ (is_actual_superuser === "true") && <button
            onClick={() => turnOnMicrophone()}
            className='flex border-2 items-center w-full justify-center  px-3 py-3 rounded-2xl m-2 border-indigo-600'
          >
            Turn {isAudioOn ? "off" : "on"} Microphone
          </button>}
        </div>
        
        <h2 className='text-indigo-600 block text-lg font-bold'>Default rooms:</h2>
        <div className="flex gap-7">
        <img
          className={`w-24 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 rounded-xl focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${selectedLogo === 'react' && 'brightness-125 border-2 border-indigo-600'}`}
          src={Reactlogo}
          alt="reactlogo"
          onClick={() => handleClick('react')}
        />
        <img
          className={`w-24 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 rounded-xl focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${selectedLogo === 'angular' && 'brightness-125 border-2 border-indigo-600'}`}
          src={Angularlogo}
          alt="angularlogo"
          onClick={() => handleClick('angular')}
        />
        <img
          className={`w-24 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 rounded-xl focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${selectedLogo === 'nextjs' && 'brightness-125 border-2 border-indigo-600'}`}
          src={Nextjslogo}
          alt="nextjslogo"
          onClick={() => handleClick('nextjs')}
        />
        <img
          className={`w-24 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 rounded-xl focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${selectedLogo === 'nodejs' && 'brightness-125 border-2 border-indigo-600'}`}
          src={Nodejslogo}
          alt="nodejslogo"
          onClick={() => handleClick('nodejs')}
        />
      </div>
        <div className='hidden'>
        <h3 className='mb-3 ml-2'>Please input the channel name</h3>
        {/* <input
          defaultValue={channel.current}
          onChange={e => (channel.current = e.target.value)}
          className='flex border-2 items-center w-full justify-center  px-3 py-3 rounded-2xl m-2 border-indigo-600'
        /> */}
        </div>
        <div className="buttons mt-4">
          <button onClick={joinChannel} className={`py-2 mt-1 px-4 mx-2 inline-block rounded-full shadow-2xl bg-[#4F46E5] text-[#FFFFFF] hover:bg-[#382bf0] hover:-translate-y-1 duration-300`}>
            Join Channel
          </button>
      {(is_actual_superuser === "true") &&  <button
            onClick={publishVideo}
            // className={isVideoPubed ? "button-on" : ""}
            className='flex border-2 items-center w-full justify-center  px-3 py-3 rounded-2xl m-2 border-indigo-600'
          >
            Publish Video
          </button>}
{(is_actual_superuser === "true") &&<button
            onClick={publishAudio}
            // className={isAudioPubed ? "button-on" : ""}
          className='flex border-2 items-center w-full justify-center  px-3 py-3 rounded-2xl m-2 border-indigo-600'
          >
            Publish Audio
          </button>}
          <button onClick={leaveChannel} className={`py-2 mt-1 px-4 mx-2 inline-block rounded-full shadow-2xl bg-[#4F46E5] text-[#FFFFFF] hover:bg-[#382bf0] hover:-translate-y-1 duration-300`}>Leave Channel</button>
{(is_actual_superuser === "true") &&<Link
    to="/quizform"
    rel="noopener"
    className="px-4 py-2 text-lg mt-5 font-medium text-white bg-indigo-600 rounded-full">
    Quiz Form
  </Link>}
        </div>
      </div>
      <div className="right-side">
        <video id="camera-video" hidden={isVideoOn ? false : true}></video>
        <video id="remote-video" hidden={isVideoSubed ? false : true}></video>
        {isJoined && !isVideoSubed ? (
          <div className="waiting">
            You can shared channel {channel.current} to others.....
          </div>
        ) : null}
      
      </div>
    </>
  )
}
export default LiveStreamRoom;