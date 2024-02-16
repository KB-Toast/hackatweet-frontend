import styles from '../styles/HomeLoggedIn.module.css';
import { useState, useEffect } from 'react';
import Tweet from '../components/Tweet';
import LastTweet from '../components/LastTweet';
import { useDispatch, useSelector } from 'react-redux';
import { getTweets } from '../reducers/tweets';
import Button from '../components/Button';

function Index() {
    const dispatch = useDispatch();

    const [tweetText, setTweetText] = useState();
    const currentUser = useSelector((state) => state.user.value);
    const [tweetsData, setTweetsData] = useState(useSelector((state) => state.tweets.value));
    const [lastedTweet, setLastTweet] = useState({});
    const [trendsList, setTrendsList] = useState([]);
  
    useEffect(() => {
        
      fetch('http://localhost:3000/tweets')
        .then(response => response.json())
        .then(data => {
          setLastTweet(data.Tweet[data.Tweet.length - 1]);
          setTweetsData(data.Tweet.reverse());
            // add trends
            let newTrendsList = [];
            for (let elem of data.Tweet) {
                if (elem.trend.length > 0) {
                    for (let trend of elem.trend) {
                        newTrendsList.push(trend[0]);
                    }
                }
            }
            //console.log("ntl: ", newTrendsList);
            // end add trends
          dispatch(getTweets(data.Tweet));
        });
        
    }, []);

    const handleClickLogOut = () => {
        console.log('log out');
        // todo: log out user
    };

    //console.log(tweetsData);

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

                    if (id === lastedTweet._id) {
                        setLastTweet(newTweetsData[0]);
                    }
                }
            });
    }

    let tweets = tweetsData.filter((data, i) => i > 0).map((data, i) => {
        return (<Tweet key={i} {...data} handleDeleteTweet={handleDeleteTweet} />)
    });

    let  lastTweet = <LastTweet {...lastedTweet} handleDeleteTweet={handleDeleteTweet} />

    // gestion du tweet trop long via style
    let counterStyle = {};
    if (tweetText && tweetText.length > 280) {
        counterStyle = { 'color': 'red' };
    }

    const handleClickAddTweet = () => {
        if (tweetText.length > 280) {
            console.log('TLDR, make it shorter');
        } else {

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
        }
    };

  return (
  <div className={styles.layoutContainer}>
    <div className={styles.layoutLeft}>
        <div className={styles.partsTitle}>
            <div className={styles.logoImg}>
                <img src='../images/bird.png'/>
            </div>
        </div>
        <div className={styles.leftFooter}>
            <div className={styles.leftFooterTop}>
                <img src='../images/user.png' />
                <div className={styles.user}>
                    <div>
                        {currentUser.userName} + @{currentUser.firstName}
                    </div>
                </div>
            </div>
            <div className={styles.leftFooterBottom}>
                <Button
                        className={styles.btnLogOut}
                        text="Log out"
                        onClick={() => handleClickLogOut()}
                    />
            </div>
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
                    <div className={styles.counterTweet} style={counterStyle}>    
                        {tweetText ? tweetText.length : 0}/280
                    </div>
                    <Button
                        className={styles.btnUpHome}
                        text="Tweet"
                        onClick={() => handleClickAddTweet()}
                    />
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
