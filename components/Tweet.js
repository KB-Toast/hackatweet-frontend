import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Tweet(props) {

  const [isLiked, setIsLiked] = useState(props.isLiked);
  const stateCurrentNbrLikes = useSelector((state) => state.tweets.length);
  const currentNbrLikes = stateCurrentNbrLikes ? stateCurrentNbrLikes : 0;
  const [nbrLikes, setNbrLikes] = useState(currentNbrLikes);

const handleLikeClick = () => {
  // add "token" to numberLikes in BDD
  console.log('clicked on like');
};

const handleDeleteTweet = () => {
  props.handleDeleteTweet(props._id);
}

  let iconStyle = {};
  // most likely different than "props.isLiked" but the idea if to check if user already liked the tweet
	if (props.isLiked) {
		iconStyle = { 'color': '#e5397f' };
	}

  return (
    <div className={styles.tweet}>
        <div className={styles.tweetHeader}>
        <img src='../images/user.png' className={styles.tweetImg} /> {props.author} + <span> @{props.author} - {props.date}</span>
        </div>
        <div className={styles.tweetMain}>
            {props.text}
        </div>
        <div className={styles.tweetFooter}>
        <FontAwesomeIcon icon={faHeart} onClick={() => handleLikeClick()} style={iconStyle} /> {props.numberLikes}
        <span>
          {nbrLikes}
        </span>
        <FontAwesomeIcon icon={faTrashCan} onClick={()=> handleDeleteTweet()} />
        </div>
    </div>
  );
}

export default Tweet;
