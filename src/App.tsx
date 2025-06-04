// src/App.tsx
import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GlobalStyle from './globalStyles';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/about"
            element={
              <div style={{ padding: '50px', textAlign: 'center' }}>
                group of 3 who need to succeed to live a happy life
              </div>
            }
          />
          <Route
            path="/something"
            element={
              <div style={{ padding: '50px', textAlign: 'center' }}>
                something for you to click on "contact us"
              </div>
            }
          />
          <Route
            path="/for-investors"
            element={
              <div style={{ padding: '50px', textAlign: 'center' }}>
                PLEASE, give us some money :((((( 
              </div>
            }
          />
          <Route
            path="/contact-us"
            element={
              <div style={{ padding: '50px', textAlign: 'center' }}>
                contact us only if you have money
              </div>
            }
          />
          <Route
            path="*"
            element={
              <div style={{ padding: '50px', textAlign: 'center' }}>
                404 — page not found
              </div>
            }
          />
        </Routes>
      </AppContainer>
    </>
  );
};

export default App;
