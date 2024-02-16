import styles from '../styles/LastTweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function LastTweet(props) {

    // modifier le default "false" en fonction de si l'user a déjà liké le tweet
    const [isLiked, setIsLiked] = useState(props.isLiked);
    const stateCurrentNbrLikes = useSelector((state) => state.tweets.length);
    const currentNbrLikes = stateCurrentNbrLikes ? stateCurrentNbrLikes : 0;
    const [nbrLikes, setNbrLikes] = useState(currentNbrLikes);

    /*
  console.log('current likes: ', currentNbrLikes);
  console.log('nbrLikes: ', nbrLikes);
  // use props to replace values
console.log('props: ', props);
*/

const handleLikeClick = () => {
  // add "token" to numberLikes in BDD
  console.log('clicked on like');
};

const handleDeleteTweet = () => {
  props.handleDeleteTweet(props._id);
}
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
