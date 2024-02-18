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
const VideoRoom = () => {
  const agora_appId = import.meta.env.VITE_Agora_appid
  const agora_token = import.meta.env.VITE_AGORA_TOKEN
  const [isAudioOn, setIsAudioOn] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isAudioPubed, setIsAudioPubed] = useState(false)
  const [isVideoPubed, setIsVideoPubed] = useState(false)
  const [isVideoSubed, setIsVideoSubed] = useState(false);
  const is_actual_superuser = localStorage.getItem("is_actual_superuser");


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
      channel.current,
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
      <div className="left-side">
        <h3>Please check you camera / microphone!</h3>
        <div className="buttons">
          <button
            onClick={() => turnOnCamera()}
            // className={isVideoOn ? "button-on" : ""}
            className={`py-2 mt-1 px-4 mx-2 inline-block rounded-full shadow-2xl bg-[#4F46E5] text-[#FFFFFF] hover:bg-[#382bf0] hover:-translate-y-1 duration-300`}
          >
            Turn {isVideoOn ? "off" : "on"} camera
          </button>
          <button
            onClick={() => turnOnMicrophone()}
            // className={isAudioOn ? "button-on" : ""}
            className={`py-2 mt-1 px-4 mx-2 inline-block rounded-full shadow-2xl bg-[#4F46E5] text-[#FFFFFF] hover:bg-[#382bf0] hover:-translate-y-1 duration-300`}
          >
            Turn {isAudioOn ? "off" : "on"} Microphone
          </button>
        </div>
        {/* <h3>
          {`Please input the appid and token (`}
          <a href="https://www.agora.io/en/blog/how-to-get-started-with-agora">
            Create an account.
          </a>
          {`) `}
        </h3> */}
        {/* <input
          defaultValue={agora_appId}
          placeholder="appid"
          onChange={e => (appid.current = e.target.value)}
        />
        <input
          defaultValue={token.current}
          placeholder="token"
          onChange={e => (token.current = e.target.value)}
        /> */}
        <h3>Please input the channel name</h3>
        <input className='flex border-2 items-center w-full justify-center  px-3 py-3 rounded-2xl m-2 border-indigo-600'
          defaultValue={channel.current}
          onChange={e => (channel.current = e.target.value)}
        />
        <div className="buttons">
          {/* <button onClick={joinChannel} className={isJoined ? "button-on" : ""}> */}
          <button onClick={joinChannel} className={`py-2 mt-1 px-4 mx-2 inline-block rounded-full shadow-2xl bg-[#4F46E5] text-[#FFFFFF] hover:bg-[#382bf0] hover:-translate-y-1 duration-300`}>
            Join Channel
          </button>
          <button
            onClick={publishVideo}
            // className={isVideoPubed ? "button-on" : ""}
            className={`py-2 mt-1 px-4 mx-2 inline-block rounded-full shadow-2xl bg-[#4F46E5] text-[#FFFFFF] hover:bg-[#382bf0] hover:-translate-y-1 duration-300`}
          >
            Publish Video
          </button>
          <button
            onClick={publishAudio}
            // className={isAudioPubed ? "button-on" : ""}
            className={`py-2 mt-1 px-4 mx-2 inline-block rounded-full shadow-2xl bg-[#4F46E5] text-[#FFFFFF] hover:bg-[#382bf0] hover:-translate-y-1 duration-300`}
          >
            Publish Audio
          </button>
          <button onClick={leaveChannel} className={`py-2 mt-1 px-4 mx-2 inline-block rounded-full shadow-2xl bg-[#4F46E5] text-[#FFFFFF] hover:bg-[#382bf0] hover:-translate-y-1 duration-300`}>Leave Channel</button>
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
export default VideoRoom;