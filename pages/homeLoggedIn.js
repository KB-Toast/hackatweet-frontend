import styles from '../styles/HomeLoggedIn.module.css';
import { useState, useEffect } from 'react';
import Tweet from '../components/Tweet';
import LastTweet from '../components/LastTweet';
import { useDispatch, useSelector } from 'react-redux';
import { getTweets } from '../reducers/tweets';

function Index() {
    const dispatch = useDispatch();

    const [tweetText, setTweetText] = useState();
    const currentUser = useSelector((state) => state.user.value);

    const [tweetsData, setTweetsData] = useState(useSelector((state) => state.tweets.value));
    const [lastedTweet, setLastTweet] = useState({});
  
    useEffect(() => {
        
      fetch('http://localhost:3000/tweets')
        .then(response => response.json())
        .then(data => {
          setLastTweet(data.Tweet[data.Tweet.length - 1]);
          setTweetsData(data.Tweet.reverse());
          dispatch(getTweets(data.Tweet));
        });
        
    }, []);

    const handleDeleteTweet = (id) => {
        fetch(`http://localhost:3000/tweets/delete/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
                    console.log('tweet deleted from db');
                    const indexToDelete = (elem) => elem._id === id;
                    const newTweetsData = [...tweetsData];
                    newTweetsData.splice(tweetsData.findIndex(indexToDelete), 1);
                    setTweetsData([...newTweetsData]);
                }
            });
    }

    let tweets = tweetsData.filter((data, i) => i > 0).map((data, i) => {
        return (<Tweet key={i} {...data} handleDeleteTweet={handleDeleteTweet} />)
    });

    let  lastTweet = <LastTweet {...lastedTweet} handleDeleteTweet={handleDeleteTweet} />

    
    const handleClickAddTweet = () => {
        // add tweet to DB
        fetch(`http://localhost:3000/tweets/addTweet/${currentUser.token}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text: tweetText }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
                    setTweetsData([data.newTweet, ...tweetsData]);
                    setLastTweet(data.newTweet);
					setTweetText('');
				}
			});
    };

  return (
  <div className={styles.layoutContainer}>
    <div className={styles.layoutLeft}>
        <div className={styles.partsTitle}>
            <div>Logo here</div>
        </div>
        <div className={styles.leftFooter}>
            {currentUser.userName} + @{currentUser.firstName} + logout here
        </div>
    </div>
    <div className={styles.layoutCenter}>
        <div className={styles.partsTitle}>
            <h2 className={styles.h2}>Home</h2>
            <div className={styles.addTweet}>
                <div className={styles.tweetText}>
                <textarea name="addTweet" placeholder="What's up ?" value={tweetText} onChange={(e) => setTweetText(e.target.value)}/>
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
