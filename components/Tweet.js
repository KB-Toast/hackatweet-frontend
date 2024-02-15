import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';




function Tweet(props) {

  // use props to replace values
  // console.log('props: ', props);

  let iconStyle = {};
  // most likely different than "props.isLiked" but the idea if to check if user already liked the tweet
	if (props.isLiked) {
		iconStyle = { 'color': '#e5397f' };
	}

  return (
    <div className={styles.tweet}>
        <div className={styles.tweetHeader}>
            img + Author + <span> @Author - {props.date}</span>
        </div>
        <div className={styles.tweetMain}>
            {props.text}
        </div>
        <div className={styles.tweetFooter}>
        <FontAwesomeIcon icon={faHeart} onClick={() => handleLikeClick()} style={iconStyle} /> {props.numberLikes}
        <FontAwesomeIcon icon={faTrashCan} onClick={()=> handleDeleteTweet()} />
        </div>
    </div>
  );
}

export default Tweet;
