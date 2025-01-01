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
import FindId from './components/FindId/FindId.jsx';
import FindPassword from './components/FindPw/FindPassword.jsx';
import Alrim from './components/alrim/Alrim.jsx';
import AlrimAll from './components/alrim/AlrimAll.jsx'
import AlrimDetail from './components/alrim/AlrimDetail.jsx'
import Maind from './components/maind/Maind.jsx';
import PersonalInfo from './components/editPsw/PersonalInfo.jsx';
import EditProfile from './components/editPsw/editProfile.jsx';
import ChangePsw from './components/editPsw/changePsw.jsx';

import Notice from './components/notice/Notice.jsx';
import FAQ from './components/FAQ/FAQ.jsx';
import TermsofUse from './components/termsofUse/TermsofUse.jsx';

import Chat from './components/chatvroong/chat.jsx';
import VroongSetting from './components/set/VroongSetting.jsx';

import VroongMoneyCharge from './components/vroongmoney/VroongMoneyCharge.jsx';
import VroongMoneyOut from './components/vroongmoney/VroongMoneyOut.jsx';
import VroongMoney from './components/vroongmoney/VroongMoney.jsx';

import PartnershipStep1 from './components/patnershipSignUp/step1';
import PartnershipStep2 from './components/patnershipSignUp/step2';
import PartnershipStep3 from './components/patnershipSignUp/step3';
import PartnershipStep4 from './components/patnershipSignUp/step4';
import PartnershipStep5 from './components/patnershipSignUp/step5';
import Performance from './components/ProfileDetail/Performance.jsx';
import Review from './components/ProfileDetail/Review.jsx';
import JJimVroong from './components/likeList/JJimVroong.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/opprofile" element={<OpProfile />} />
        <Route path="/vroongList" element={<VroongList />} />
        <Route path="/postpage" element={<PostPage />} />
        <Route path="/chat" element={<ChatVroong />} /> 
        <Route path="/chatting" element={<Chat />} /> 
        <Route path="/around" element={<Around/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/Performance" element={<Performance/>}/>
        <Route path="/profile/Review" element={<Review/>}/>
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

        <Route path="/notice" element={<Notice />} />
        <Route path="/question" element={<FAQ />} />
        <Route path="/terms" element={<TermsofUse />} />
        <Route path="/set" element={<VroongSetting />} />

        <Route path="/money" element={<VroongMoney />} />
        <Route path="/charge" element={<VroongMoneyCharge />} />
        <Route path="/out" element={<VroongMoneyOut />} />

        <Route path="/post/:taskId" element={<PostPage />} />
        <Route path="/JJimVroong" element={<JJimVroong/>}/>

        <Route path="/partnership/Step1" element={<PartnershipStep1/>}/>
        <Route path="/partnership/Step2" element={<PartnershipStep2/>}/>
        <Route path="/partnership/Step3" element={<PartnershipStep3/>}/>
        <Route path="/partnership/Step4" element={<PartnershipStep4/>}/>
        <Route path="/partnership/Step5" element={<PartnershipStep5/>}/>

      </Routes>
    </Router>
  );
};

export default App;
