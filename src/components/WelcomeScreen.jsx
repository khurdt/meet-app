import React from "react";
import './WelcomeScreen.css';
import { Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { ErrorAlert } from './Alert';
function WelcomeScreen(props) {
  const [infoText, setInfoText] = useState('');

  useEffect(() => {
    if (!navigator.onLine) {
      setInfoText('must have internet connection to sign in');
    } else {
      setInfoText('');
    }
  }, [navigator.onLine]);

  return props.showWelcomeScreen ?
    (
      <div className="WelcomeScreen">
        <Card className='m-auto p-3' style={{ maxWidth: '500px' }}>
          <Card.Title className='text-center p-2'>Welcome to the Meet app</Card.Title>
          <Card.Text className='text-center'>
            Log in to see upcoming events around the world for
            full-stack
            developers
          </Card.Text>
          <Card.Body>
            <div className="button_cont" align="center">
              <div className="google-btn">
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="Google sign-in"
                  />
                </div>
                <button onClick={() => { props.getAccessToken() }}
                  rel="nofollow noopener"
                  className="btn-text"
                >
                  <b>Sign in with google</b>
                </button>
              </div>
              <Card.Text><ErrorAlert text={infoText} style={{ height: '0px' }} /></Card.Text>
            </div>
            <a
              href="https://khurdt.github.io/meet-app/privacy.html"
              rel="nofollow noopener"
            >
              Privacy policy
            </a>
          </Card.Body>
        </Card>
      </div>
    )
    : null
}
export default WelcomeScreen;