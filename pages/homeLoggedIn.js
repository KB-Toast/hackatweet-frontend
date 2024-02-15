import styles from '../styles/HomeLoggedIn.module.css';
import { useState, useEffect } from 'react';
import Tweet from '../components/Tweet';
import LastTweet from '../components/LastTweet';

function Index() {

    const [tweetText, setTweetText] = useState();

    const [tweetsData, setTweetsData] = useState([]);
    const [lastedTweet, setLastTweet] = useState({});
   
  
    useEffect(() => {
      fetch('http://localhost:3000/tweets')
        .then(response => response.json())
        .then(data => {
          // console.log(data.Tweet[data.Tweet.length - 1])
          setLastTweet(data.Tweet[data.Tweet.length - 1]);
          setTweetsData(data.Tweet.reverse());
        });
        
    }, []);

      console.log(tweetsData)
      // console.log(lastedTweet)
    let tweets = tweetsData.filter((data, i) => i > 0).map((data, i) => {
        return (<Tweet key={i} 
        {...data} 
         />)
    });

    let  lastTweet = <LastTweet {...lastedTweet} />

    const handleClickAddTweet = () => {
        // add tweet to DB
    };


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
              {lastTweet}
              {tweets}
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
