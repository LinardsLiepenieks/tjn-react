import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Layout from './components/Layout';
import { CalendarEventProvider } from './contexts/CalendarEventContext';

function App() {
  return (
    <Router>
      <CalendarEventProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/calendar" element={<Calendar />}></Route>
          </Routes>
        </Layout>
      </CalendarEventProvider>
    </Router>
  );
}

export default App;
