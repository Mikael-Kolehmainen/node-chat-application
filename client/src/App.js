import ReactDOM from 'react-dom/client';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Chat from './components/Chat';
import SignUp from './components/SignUp';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index exact path="/" element={<SignUp />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}