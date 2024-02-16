import React from 'react';
import Login from './Login';
import styles from '../styles/Home.module.css';


function Home() {



    return (     

        <section className={styles.containerFull}>
          <div className={styles.containerImage}>
         
         </div>
          <div className={styles.containerLog}>
            <img className={styles.imgLogo} src='../images/bird.png'/>
            <p className={styles.see}>See what's</p>
            <p className={styles.happen}>happening</p>
             <p className={styles.join}>Join Hackatweet today.</p>
             <Login />
             </div>
      </section>
      
     
       







    )
}
export default Home