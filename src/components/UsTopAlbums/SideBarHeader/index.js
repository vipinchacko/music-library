import { CloseButton } from '../CloseButton';
import styles from './SideBarHeader.module.scss';

const SideBarHeader = ({ onClose }) => {
  return (
    <div className={styles.sideBarHeader}>
      <CloseButton onClose={onClose} />
    </div>
  );
};

export { SideBarHeader };
