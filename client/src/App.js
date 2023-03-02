import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Chat from './components/Chat';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index exact path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}