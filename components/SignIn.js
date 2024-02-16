import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import styles from '../styles/SignIn.module.css'; 

function SignIn() {
  const [signInUsername, setSignInUsername] = useState();
  const [signInPassword, setSignInPassword] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignIn = () => {
    // Validation simple pour s'assurer que les champs ne sont pas vides
    if (!signInUsername || !signInPassword) {
      setError('Les champs ne doivent pas être vides');
      return;

    } else{
      fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: signInUsername,
        password: signInPassword,
      }),
    })
    .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ userName: signInUsername, token: data.token, firstName: data.firstName }));

          closeModal();
          router.push('/homeLoggedIn');
        } else {

          alert('invalid credentials');
          closeModal();
        }
      })
    
    };
    }

    const closeModal = () => {
      setSignInUsername('');
      setSignInPassword('');
    };
    
  return (
    <div className={styles.signInContainer}>
       <img className={styles.imgLogo} src='../images/bird.png'/>
      <input
        className={styles.input}
        placeholder="user name"
        onChange={(e) => setSignInUsername(e.target.value)}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="password"
        onChange={(e) => setSignInPassword(e.target.value)}
      />
    <button key="submit"  onClick={() => handleSignIn()}>
    Sign in
     </button>
  </div>
  );
}

export default SignIn;
