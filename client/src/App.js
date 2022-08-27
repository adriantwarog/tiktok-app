// This is an application to replicate the features of TikTok by creating a react app which shows a desktop and mobile version of TikTok and allows users to view videos, autoscroll and upload videos.
import { useState, useRef } from 'react';
import logo from './tiktoklogo.svg';
import React from 'react'
import s from 'styled-components'
import IconHome from './nav-home.svg'
import IconFriends from './nav-friends.svg'
import IconInbox from './nav-inbox.svg'
import IconUser from './nav-user.svg'
import IconAddVid from './nav-addvid.svg'
import IconSearch from './nav-search.svg'

import StatLike from './stat-like.svg'
import StatComment from './stat-comment.svg'
import StatReshare from './stat-reshare.svg'

import Video from './Video'

function App() {
  const [videos, setVideos] = React.useState([])

  const fileRef = useRef(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setVideos(data.videos));
  }, []);

  const handleFileUpload = event => {
    console.log(event.target.files[0].name);
    const form = document.querySelector('#upload-video');
    const formData = new FormData(form);
    fetch('/upload-video', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <AppHolder>
      <Header>
        <MenuHolder>
          <Logo>
             <img src={logo} alt="logo" width="100%" />
          </Logo>
          <Nav>
            <NavItem className="active">
              <NavImg src={IconHome}  width="30" />
              <NavText>
                Home
              </NavText>
            </NavItem>
            <NavItem>
              <NavImg src={IconFriends}  width="32" />
              <NavText>
               Friends
              </NavText>
            </NavItem>
            <NavButton onClick={()=>fileRef.current.click()}>
              <NavImg src={IconAddVid}  width="75" />
              <React.Fragment>
                <form id="upload-video" style={{ display: "none" }}>
                <input
                  ref={fileRef}
                  onChange={handleFileUpload}
                  type="file"
                  name="my-video"
                  style={{ display: "none" }}
                  accept="video/mp4,video/webm"
                  // multiple={false}
                />
                </form>
              </React.Fragment>
            </NavButton>
            <NavItem>
              <NavImg src={IconInbox}  width="32" />
              <NavText>
              Inbox
              </NavText>
            </NavItem>
            <NavItem>
              <NavImg src={IconUser}  width="24" />
              <NavText>
              Inbox
              </NavText>
            </NavItem>
          </Nav>
          <Search>
           <NavItem>
              <NavImg src={IconSearch}  width="24" />
              <NavText>
                Search
              </NavText>
            </NavItem>
          </Search>
        </MenuHolder>
        <FollowingHolder>
            <Following>
              Following
            </Following>
            <ForYou>
              For You
            </ForYou>
        </FollowingHolder>
      </Header>
      <VideoScroller id="scroll-window">
       {videos.map(({ url, channel, description, song, likes, messages, shares }, index) =>
          <TikVideo key={url} index={index} url={url} channel={channel} description={description} song={song} likes={likes} messages={messages} shares={shares} />)}
          {/* <TikVideo />
          <TikVideo />
          <TikVideo />
          <TikVideo />
          <TikVideo /> */}
          <Spacer />
      </VideoScroller>
      <nav className="tiktik-menu">
       
      </nav>
    </AppHolder>
  );
}

const TikVideo = ({ url, channel, index, description, song, likes, messages, shares }) => 
  <VideoHolder>
      <Video key={url} index={index}  url={url} channel={channel} description={description} song={song} likes={likes} messages={messages} shares={shares} src={require("./placeholder.jpg")}  />
      <VideoInfo>
        <Avatar></Avatar>
        <Name>@{channel}</Name>
        <Desc>
          {description}
        </Desc>
        <Song>
          <SongIcon></SongIcon>
          <SongTitle>
            {song}
          </SongTitle>
        </Song>
        <VideoStats>
          <Stat>
            <StatImg src={StatLike}  width="32" />
            <Amount>{likes}</Amount>
          </Stat>
          <Stat>
            <StatImg src={StatComment}  width="32" />
            <Amount>{messages}</Amount>
          </Stat>
          <Stat>
            <StatImg src={StatReshare}  width="32" />
            <Amount>{shares}</Amount>
          </Stat>
        </VideoStats>
      </VideoInfo>
    </VideoHolder>

const VideoStats = s.div`
  display:flex;
  padding-top:18px;
  line-height:1;
  @media(max-width:992px){
    position:absolute;
    right:0px;
    bottom:100px;
    flex-direction:column;
    gap:30px;
  }
`

const Stat = s.div`
  padding:0px 18px;
  cursor:pointer;
`

const Amount = s.div`
  font-size:0.75em;
  text-align:center;
`

const StatImg = s.img`
  margin-bottom: 4px;
`

const Avatar = s.div`
width:48px;
height:48px;
background:white;
border-radius:50%;
margin-bottom:8px;
@media(max-width:992px){
  position:absolute;
  right:15px;
  bottom:350px;
}
`
const Name = s.div`
font-weight:bold;
margin-bottom:8px;
@media(max-width:992px){
  padding-right:65px;
}
`
const Desc = s.div`
font-weight:300;
font-size:0.85em;
opacity:0.85;
margin-bottom:8px;
@media(max-width:992px){
  padding-right:65px;
}
`

const Song = s.div`
display:flex;
align-items:center;
@media(max-width:992px){
  padding-right:65px;
}
`

const Spacer = s.div`
 min-height:75vh;
`
const SongIcon = s.div`
  width:24px;
  height:24px;
  background:white;
  border-radius:50%;
  opacity:0.5;
  margin-right:8px;
`
const SongTitle = s.div`
font-size:0.75em;
opacity:0.85;
`


const VideoInfo = s.div`
  padding:18px;

  @media(max-width:992px){
    position:absolute;
    bottom:15px;
    right:15px;
    left:15px;
  }
`



const VideoHolder = s.div`
  display:flex;
  padding-top:32px;
  max-width:1024px;
  scroll-snap-align: start;
  position:relative;

  @media(max-width:992px){
    max-width:none;
    min-height:calc(100vh - 71px);
    padding-top:0px;
    width:100%;
  }
`

const VideoScroller = s.div`
  display:flex;
  position:absolute;
  top:0;right:0;bottom:0;left:0;
  overflow-y:scroll;
  flex-direction:column;
  align-items:center;
  padding:18px;
  scroll-snap-type: y mandatory;
	scroll-snap-stop: always;
  margin-top:158px;
  scroll-behavior: smooth;
  @media (max-width: 1024px) {
    margin-top:0px;
    padding:0px;
  }
`

const Following = s.div`
  display:flex;
  padding:18px 32px;
  border-bottom:2px solid white;
  transition:ease 0.25s all;
  cursor:pointer;
  &:hover {
    border-bottom:2px solid rgba(255,255,255,0.5);
  }
`

const ForYou = s.div`
  display:flex;
  padding:18px 32px;
  transition:ease 0.25s all;
  border-bottom:2px solid rgba(255,255,255,0);
  cursor:pointer;
  opacity:0.66;
  &:hover {
    border-bottom:2px solid #aaa;
    opacity:1;
  }
`

const FollowingHolder = s.div`
  display:flex;
  justify-content:center;
  @media (max-width: 1024px) {
    position:absolute;
    top:0;
    left:0;
    right:0;
  }
`

const NavImg = s.img`
  margin-right: 8px;
  transition: ease 0.2s all;
  @media (max-width: 1024px) {
    margin-right: 0px;
  }
`

const NavButton = s.div`
  display:flex;
  padding-left:18px;
  padding-right:10px;
  cursor:pointer;
  &:hover ${NavImg} {
    transform: scale(1.2);
    
  }
  @media (max-width: 1024px) {
    padding-left:18px;
    padding-right:18px;
  }
`



const NavText = s.span`
  @media (max-width: 1024px) {
    font-size:0.85em;
  }
`

const NavItem = s.div`
  display:flex;
  align-items:center;
  transition:ease 0.25s all;
  padding:16px;
  opacity:0.66;
  &.active {
    opacity:1;
  }
  &:hover {
    background:rgba(255,255,255,0.05);
    cursor:pointer;
    opacity:1;
  }
  @media (max-width: 1024px) {
    flex-direction:column;
    padding:12px;
    padding-bottom:0px;
    justify-content:center;
    text-align:center;
    flex:1;
  }
`

const Nav = s.div`
  display:flex;
  flex:1;
  justify-content:center; 
  
`

const Logo = s.div`
  display:flex;
  padding:16px;
  padding-left:32px;
  @media (max-width: 1024px) {
    display:none;
  }
`

const Search = s.div`
  display:flex;
  justify-content:flex-end;
  padding-right:18px;
  @media (max-width: 1024px) {
    display:none;
  }
`

const MenuHolder = s.div`
  background:black;
  display:flex;
  @media (max-width: 1024px) {
    position:fixed;
    bottom:0px;
    right:0px;
    left:0px;
  }
`

const Header = s.div`
  background:#141414;
  display:flex;
  flex-direction:column;
  position:relative;
  z-index:5000;
  @media (max-width: 1024px) {
    flex-direction:column-reverse;
  }
`

const AppHolder = s.div`
  background:#282828;
  disply:flex;
  
`

export default App;
