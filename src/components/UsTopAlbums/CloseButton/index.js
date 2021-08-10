import styles from './CloseButton.module.scss';
import close from '../../../static/icons/close.png';

const CloseButton = ({ onClose }) => {
  return (
    <button
      data-testid="closeButton"
      onClick={onClose}
      className={styles.closeButton}
    >
      <img src={close} className={styles.closeIcon} alt="close-icon" />
    </button>
  );
};

export { CloseButton };
