// import React, { useState } from 'react';
// import AgoraUIKit from 'agora-react-uikit';

// const App = () => {
//   const [videoCall, setVideoCall] = useState(true);
//   const [userType] = useState('student'); // Set user type here, for example: 'student' or 'teacher'

//   const rtcProps = {
//     appId: import.meta.env.VITE_Agora_appid,
//     channel: 'main',
//     token: import.meta.env.VITE_AGORA_TOKEN // use null or skip if using app in testing mode
//   };

//   const callbacks = {
//     EndCall: () => setVideoCall(false),
//   };

//   const isTeacher = userType === 'teacher';

//   return videoCall ? (
//     <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
//       <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks}>
//         {isTeacher ? (
//           // Display control strip if user is a teacher
//           <div className="custom-control-strip">
//             {/* Your control strip content here */}
//           </div>
//         ) : null}
//       </AgoraUIKit>
//     </div>
//   ) : (
//     <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
//   );
// };

// export default App;

import { useRef, useState } from "react"
import "./video.css"

// import {
//   VERSION,
//   createClient,
//   createCameraVideoTrack,
//   createMicrophoneAudioTrack,
//   onCameraChanged,
//   onMicrophoneChanged
// } from "agora-rtc-sdk-ng/esm"

// console.log("Current SDK VERSION: ", VERSION)

// onCameraChanged(device => {
//   console.log("onCameraChanged: ", device)
// })
// onMicrophoneChanged(device => {
//   console.log("onMicrophoneChanged: ", device)
// })

// const client = createClient({
//   mode: "rtc",
//   codec: "vp8"
// })
// let audioTrack
// let videoTrack
const VideoCallComponent = ()=> {
  // const agora_appId = import.meta.env.VITE_Agora_appid
  // const agora_token = import.meta.env.VITE_AGORA_TOKEN
  // const [isAudioOn, setIsAudioOn] = useState(false)
  // const [isVideoOn, setIsVideoOn] = useState(false)
  // const [isAudioPubed, setIsAudioPubed] = useState(false)
  // const [isVideoPubed, setIsVideoPubed] = useState(false)
  // const [isVideoSubed, setIsVideoSubed] = useState(false)

  // const turnOnCamera = async flag => {
  //   flag = flag ?? !isVideoOn
  //   setIsVideoOn(flag)

  //   if (videoTrack) {
  //     return videoTrack.setEnabled(flag)
  //   }
  //   videoTrack = await createCameraVideoTrack()
  //   videoTrack.play("camera-video")
  // }

  // const turnOnMicrophone = async flag => {
  //   flag = flag ?? !isAudioOn
  //   setIsAudioOn(flag)

  //   if (audioTrack) {
  //     return audioTrack.setEnabled(flag)
  //   }

  //   audioTrack = await createMicrophoneAudioTrack()
  //   // audioTrack.play();
  // }

  // const [isJoined, setIsJoined] = useState(false)
  // const channel = useRef("")
  // // you can apply appid follow the guide https://www.agora.io/en/blog/how-to-get-started-with-agora/
  // const appid = useRef("")
  // // you can apply token follow the guide https://www.agora.io/en/blog/how-to-get-started-with-agora/
  // const token = useRef("")

  // const joinChannel = async () => {
  //   if (!channel.current) {
  //     channel.current = "react-room"
  //   }

  //   if (isJoined) {
  //     await leaveChannel()
  //   }

  //   client.on("user-published", onUserPublish)

  //   // await client.join(
  //   //   appid.current,
  //   //   channel.current,
  //   //   token.current || null,
  //   //   null
  //   // )
  //   await client.join(
  //     agora_appId,
  //     channel.current,
  //     agora_token,
  //     null
  //   )
  //   setIsJoined(true)
  // }

  // const leaveChannel = async () => {
  //   setIsJoined(false)
  //   setIsAudioPubed(false)
  //   setIsVideoPubed(false)

  //   await client.leave()
  // }

  // const onUserPublish = async (user, mediaType) => {
  //   if (mediaType === "video") {
  //     const remoteTrack = await client.subscribe(user, mediaType)
  //     remoteTrack.play("remote-video")
  //     setIsVideoSubed(true)
  //   }
  //   if (mediaType === "audio") {
  //     const remoteTrack = await client.subscribe(user, mediaType)
  //     remoteTrack.play()
  //   }
  // }

  // const publishVideo = async () => {
  //   await turnOnCamera(true)

  //   if (!isJoined) {
  //     await joinChannel()
  //   }
  //   await client.publish(videoTrack)
  //   setIsVideoPubed(true)
  // }

  // const publishAudio = async () => {
  //   await turnOnMicrophone(true)

  //   if (!isJoined) {
  //     await joinChannel()
  //   }

  //   await client.publish(audioTrack)
  //   setIsAudioPubed(true)
  // }

  return (
    <>
    </>
  )
}


export default VideoCallComponent;
