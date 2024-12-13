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
import Login from './components/Login/Login';
import Sign from './components/sign/Sign';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/opprofile" element={<OpProfile />} />
        <Route path="/vroongList" element={<VroongList />} />
        <Route path="/postpage" element={<PostPage />} />
        <Route path="/commitment" element={<Commitment />} />
        <Route path="/review" element={<Review />} />
        <Route path="/chat" element={<Chat />} /> 
        <Route path="/sign" element={<Sign/>} />
        <Route path="/" element={<Around/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
  );
};

export default App;
