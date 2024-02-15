import styles from '../styles/LastTweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


function LastTweet(props) {

  // use props to replace values
  console.log('props: ', props);

  let iconStyle = {};
	if (props.isLiked) {
		iconStyle = { 'color': '#e5397f' };
	}

  return (
    <div className={styles.tweet}>
        <div className={styles.tweetHeader}>
            img + Author + <span> @Author - 5 hours</span>
        </div>
        <div className={styles.tweetMain}>
            Super tweet <span>#hackatweet</span> guys !
        </div>
        <div className={styles.tweetFooter}>
        <FontAwesomeIcon icon={faHeart} onClick={() => handleLikeClick()} style={iconStyle} /> 0
        </div>
    </div>
  );
}

export default LastTweet;
