import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/SignUp.module.css';

function SignUp() {
  const [signUpUsername, setSignUpUsername] = useState();
  const [signUpFirstName, setSignUpFirstName] = useState();
  const [signUpPassword, setSignUpPassword] = useState();
  const dispatch = useDispatch();
  const router = useRouter();


  const handleSignUp = () => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: signUpUsername,
        firstName: signUpFirstName,
        password: signUpPassword,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        dispatch(login({ userName: signUpUsername, firstName: signUpFirstName, token: data.token }));

        closeModal();
        router.push('/homeLoggedIn'); 
      } else {
       
        alert('Failed Inscription');
        closeModal();
      }
    })
  };


  const closeModal = () => {
    setSignUpUsername('');
    setSignUpFirstName('');
    setSignUpPassword('');
  };
  return (
    <div className={styles.signUpContainer}>
       <img className={styles.imgLogo} src='../images/bird.png'/>
       <p className={styles.create}>Create your Hackatweet account</p>
        <input
          className={styles.input}
          placeholder="First Name"
          onChange={(e) => setSignUpFirstName(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Username"
          onChange={(e) => setSignUpUsername(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setSignUpPassword(e.target.value)}
        />
         <button className={styles.btnUp} key="submit"  onClick={handleSignUp}>
            Sign up
         </button>
    </div>
  );
}

export default SignUp;
