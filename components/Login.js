// Login.js
import React, { useState } from 'react';
import Button from './Button'; 
import SignIn from './SignIn';
import SignUp from './SignUp';
import Modal from './Modal';
import styles from '../styles/Login.module.css';

function Login() {
  const [isSignInModalVisible, setIsSignInModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);

  return (
    <>
      <Button
        className={styles.btnUp}
        text="Sign Up"
        onClick={() => setIsSignUpModalVisible(true)}
      />
    
       <p className={styles.ready}>Already have an account</p>

       <Button
        className={styles.btnIn}
        text="Sign In"
        onClick={() => setIsSignInModalVisible(true)}
      />

    
      <Modal isOpen={isSignInModalVisible} onClose={() => setIsSignInModalVisible(false)}>
        <SignIn />
      </Modal>

      <Modal isOpen={isSignUpModalVisible} onClose={() => setIsSignUpModalVisible(false)}>
        <SignUp />
      </Modal>
    </>
  );
}

export default Login;
