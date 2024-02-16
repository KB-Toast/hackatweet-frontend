import styles from '../styles/HomeLoggedIn.module.css';
import { useState, useEffect } from 'react';
import Tweet from '../components/Tweet';
import LastTweet from '../components/LastTweet';
import { useDispatch, useSelector } from 'react-redux';
import { getTweets} from '../reducers/tweets';

function Index() {
    const dispatch = useDispatch();

    const [tweetText, setTweetText] = useState();
    const tweetsList = useSelector((state) => state.tweets.value);

    const [tweetsData, setTweetsData] = useState([]);
    const [lastedTweet, setLastTweet] = useState({});

    // to remove when token is ok
    const sampleToken = '0sT99VOi5LHIxdmp_wu7C6CvrJhO56IL';
   
  
    useEffect(() => {
      fetch('http://localhost:3000/tweets')
        .then(response => response.json())
        .then(data => {
          // console.log(data.Tweet[data.Tweet.length - 1])
          setLastTweet(data.Tweet[data.Tweet.length - 1]);
          setTweetsData(data.Tweet.reverse());
          dispatch(getTweets(data.Tweet));
        });
        
    }, []);

    const handleDeleteTweet = (id) => {
        console.log('todo: delete id: ', id);
    }

      // console.log(tweetsData)
      // console.log(lastedTweet)
    let tweets = tweetsData.filter((data, i) => i > 0).map((data, i) => {
        return (<Tweet key={i} {...data} handleDeleteTweet={handleDeleteTweet} />)
    });

    let  lastTweet = <LastTweet {...lastedTweet} handleDeleteTweet={handleDeleteTweet} />

    const handleClickAddTweet = () => {
        // add tweet to DB
        fetch(`http://localhost:3000/tweets/addTweet/${sampleToken}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text: tweetText }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					console.log('data.result: ', data.result);
					setTweetText('');
				}
			});
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
                        {tweetText ? tweetText.length : 0}
                    </div>
                    <div className={styles.buttonTweet}>
                        <button onClick={() => handleClickAddTweet()}>Add tweet</button>
                    </div>
                </div>
            </div>
            <div className={styles.tweetsContainer}>
              {lastTweet}
              {tweets}
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
