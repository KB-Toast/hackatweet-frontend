import styles from '../styles/LastTweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function LastTweet(props) {

  // use props to replace values
  // console.log('props: ', props);

  let iconStyle = {};
	if (props.isLiked) {
		iconStyle = { 'color': '#e5397f' };
	}

  return (
    <div className={styles.tweet}>
        <div className={styles.tweetHeader}>
            img + {props.author} + <span> @{props.author} - {props.date}</span>
        </div>
        <div className={styles.tweetMain}>
            {props.text}
        </div>
        <div className={styles.tweetFooter}>
        <FontAwesomeIcon icon={faHeart} onClick={() => handleLikeClick()} style={iconStyle} /> {props.numberLikes}
        {props.numberLikes ? props.numberLikes.length : 0}
        <FontAwesomeIcon icon={faTrashCan} onClick={()=> handleDeleteTweet()} />
        </div>
    </div>
  );
}

export default LastTweet;
