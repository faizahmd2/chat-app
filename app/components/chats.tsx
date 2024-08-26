import React from 'react';
import { status } from '../../types/schema';

interface ChatItemProps {
  profileImage?: string;
  title: string;
  preview: string;
  status: status
  time: string;
  isCreator:boolean
  handleClick:any
}

const ChatItem: React.FC<ChatItemProps> = ({
  profileImage,
  title,
  preview,
  status,
  time,
  isCreator,
  handleClick
}) => {
  return (
    <div style={styles.chatItem} onClick={handleClick}>
      {/* Profile Image */}
      <div style={styles.profileWrapper}>
        <img
          src={profileImage}
          alt="Profile"
          style={styles.profileImage}
        />
      </div>

      {/* Chat Details */}
      <div style={styles.chatDetails}>
        <div style={styles.chatTitleWrapper}>
          <h4 style={styles.chatTitle}>{title.length > 14 ? title.slice(0, 14) + '...' : title}</h4>
          <span style={styles.chatTime}>{time}</span>
        </div>
        <div style={styles.chatPreviewWrapper}>
          <p style={styles.chatPreview} className={`${!isCreator && status === "sent" ? 'bold' : ''}`}>
            {preview.length > 30 ? preview.slice(0, 30) + '...' : preview}
          </p>
          <span style={styles.chatStatus}>
            {isCreator ? (status === 'seen' ? '👁️ Seen' : status === 'sent' ? '✔️ Sent' : 'Delivered') : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  chatItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    cursor: 'pointer',
    minWidth: '280px'
  },
  profileWrapper: {
    marginRight: '15px',
  },
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  chatDetails: {
    flex: 1,
  },
  chatTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  chatTitle: {
    fontWeight: 'bold',
    margin: '0',
  },
  chatTime: {
    color: '#888',
    fontSize: '0.9em',
  },
  chatPreviewWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '5px',
  },
  chatPreview: {
    color: '#555',
    margin: '0',
  },
  chatStatus: {
    fontSize: '0.9em',
    color: '#888',
    marginLeft: '10px',
  },
};

export default ChatItem;
