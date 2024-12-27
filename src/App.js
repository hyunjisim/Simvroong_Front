import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OpProfile from './components/opponentProfile/OpProfile'
import VroongList from './components/VroongList/list'
import ChatVroong from './components/chatvroong/ChatVroong.jsx';
import Around from './components/around/around';
import Profile from './components/Profile/profile';
import PostPage from './components/post/post';
import Main from './components/mainpage/main'
import Sign from './components/sign/Sign';
import Login from './components/login/Login.jsx'
import Request from './components/request/request.jsx';
import FindId from './components/findId/FindId.jsx';
import FindPassword from './components/findPw/FindPassword.jsx';
import Alrim from './components/alrim/Alrim.jsx';
import AlrimAll from './components/alrim/AlrimAll.jsx'
import AlrimDetail from './components/alrim/AlrimDetail.jsx'
import Maind from './components/maind/Maind.jsx';
import PersonalInfo from './components/editPsw/PersonalInfo.jsx';
import EditProfile from './components/editPsw/editProfile.jsx';
import ChangePsw from './components/editPsw/changePsw.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/opprofile" element={<OpProfile />} />
        <Route path="/vroongList" element={<VroongList />} />
        <Route path="/postpage" element={<PostPage />} />
        <Route path="/chat" element={<ChatVroong />} /> 
        <Route path="/around" element={<Around/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/sign" element={<Sign/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/request" element={<Request/>} />
        <Route path="/FindId" element={<FindId/>} />
        <Route path="/FindPw" element={<FindPassword/>} />
        <Route path="/personalInfo" element={<PersonalInfo/>} />
        <Route path="/editProfile" element={<EditProfile/>} />
        <Route path="/changePsw" element={<ChangePsw/>} />
        <Route path="/alrim" element={<Alrim />} />
        <Route path="/alrimall/:id" element={<AlrimAll />} />
        <Route path="/alrimdetail/:id" element={<AlrimDetail />} />
        <Route path="/maind" element={<Maind />} />
      </Routes>
    </Router>
  );
};

export default App;
