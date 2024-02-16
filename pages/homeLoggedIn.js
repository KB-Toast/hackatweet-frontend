import styles from '../styles/HomeLoggedIn.module.css';
import { useState} from 'react';
import Tweet from '../components/Tweet';

function Index() {

    const [tweetText, setTweetText] = useState();

    const handleClickAddTweet = () => {
        // add tweet to DB
    };

    console.log(tweetText);


  return (
  <div className={styles.layoutContainer}>
    <div className={styles.layoutLeft}>
        <div className={styles.partsTitle}>
            <div>Logo here</div>
        </div>
        <div className={styles.leftFooter}>
            User info + logout here
        </div>
    </div>
    <div className={styles.layoutCenter}>
        <div className={styles.partsTitle}>
            <h2 className={styles.h2}>Home</h2>
            <div className={styles.addTweet}>
                <div className={styles.tweetText}>
                <textarea name="addTweet" placeholder="What's up ?" onChange={(e) => setTweetText(e.target.value)}/>
                </div>
                <div className={styles.tweetActions}>
                    <div className={styles.counterTweet}>    
                        counter
                    </div>
                    <div className={styles.buttonTweet}>
                        <button onClick={() => handleClickAddTweet()}>Add tweet</button>
                    </div>
                </div>
            </div>
            <div className={styles.tweetsContainer}>
                <Tweet />
                <Tweet />
                <Tweet />
            </div>
        </div>
    </div>
    <div className={styles.layoutRight}>
        <div className={styles.partsTitle}>
            <h2 className={styles.h2}>Trends</h2>
        </div>
        
        <ul className={styles.rightTrendsContainer}>
            <li>
                #Trend 1
                <span className={styles.rightTrendCounter}> 2 tweets</span>
            </li>
            <li>
                #Trend 2
                <span className={styles.rightTrendCounter}> 1 tweets</span>
            </li>
            <li>
                #Trend 3
                <span className={styles.rightTrendCounter}> 0 tweets</span>
            </li>
            
        </ul>
    </div>

  </div>
  )
}

export default Index;
