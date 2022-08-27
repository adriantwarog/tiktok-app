import React, { useEffect, useRef, useState } from "react";
import useElementOnScreen from './hooks/useElementOnScreen'
import s from 'styled-components'
import { ReactComponent as PlayIcon } from './play-solid.svg';

const Video = ({
  url,
  index,
  channel,
  description,
  song,
  likes,
  messages,
  shares,
}) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
  }
  const isVisibile = useElementOnScreen(options, videoRef)
  const onVideoClick = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(!playing);
    } else {
      videoRef.current.play();
      setPlaying(!playing);
    }
  };

  const onEnded = () => {
    var myDiv = document.getElementById('scroll-window')
    let x = myDiv.scrollTop;
    myDiv.scrollTop = x + 500
    console.log('ended')
  }

  useEffect(() => {
    if (isVisibile) {
      if (!playing) {        
        videoRef.current.play();
        setPlaying(true)
      }
    }
    else {
      if (playing) {        
        videoRef.current.pause();
        setPlaying(false)
      }
    }
  }, [isVisibile])

  useEffect(() => {
    setTimeout(()=> {
      if(index === 0){
        console.log('testing',index)
        videoRef.current.play();
        setPlaying(true)
      } else {
        videoRef.current.pause();
        setPlaying(false)
      }
    },500)
  }, [])



  return (
    <VideoHolder>
      <VideoPlayer
        muted="muted"
        ref={videoRef}
        onClick={onVideoClick}
        src={"/uploads/"+url}
        onEnded={onEnded}
        defaultMuted
        playsInline
      ></VideoPlayer>
      {/* <VideoImg src={require("./placeholder.jpg")}  /> */}
      {!playing && <VideoPlayButton onVideoClick={onVideoClick} />}
    </VideoHolder>
  );
};

const VideoPlayButton = ({onVideoClick}) => {
  return (
      <PlayButton>
          <PlayIcon color="white" onClick={onVideoClick} width="64" />
      </PlayButton>
  )
}

const VideoImg = s.img`
  border-radius:18px;
  @media(max-width:992px){
    border-radius:0px;
    width:100%;
  }
`

const PlayButton = s.div`
  position: relative;
  color: white;
  text-align: center;
`

const VideoHolder = s.div`
  position:relative;
  min-width:764px;
  background:black;
  overflow:hidden;
  border-radius:15px;
  display:flex;
  align-items:center;
  justify-content:center;
  @media(max-width:992px){
    min-width:100vw;
    border-radius:0px;
  }
`

const VideoPlayer = s.video`
  position: absolute;
  width:100%;
  height:100%;
  left:0;right:0;bottom:0;top:0;
  object-fit: fill;
  object-fit: cover;
`

export default Video;