import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OpProfile from './components/opponentProfile/OpProfile'
import VroongList from './components/VroongList/list'
import Commitment from './components/commitment/commit';
import Review from './components/review/review';
import Chat from './components/Chat/chat';
import Around from './components/around/around';
import Profile from './components/Profile/profile';
import PostPage from './components/post/post';
import Main from './components/mainpage/main'
import Sign from './components/sign/Sign';
import Login from './components/login/Login.jsx'
import Request from './components/request/request.jsx';
import FindId from './components/FindId/FindId.jsx';
import FindPassword from './components/FindPw/FindPassword.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/opprofile" element={<OpProfile />} />
        <Route path="/vroongList" element={<VroongList />} />
        <Route path="/postpage" element={<PostPage />} />
        <Route path="/commitment" element={<Commitment />} />
        <Route path="/review" element={<Review />} />
        <Route path="/chat" element={<Chat />} /> 
        <Route path="/" element={<Around/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/sign" element={<Sign/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/request" element={<Request/>} />
        <Route path="/FindId" element={<FindId/>} />
        <Route path="/FindPw" element={<FindPassword/>} />
      </Routes>
    </Router>
  );
};
