export const pageStyle: Record<string, React.CSSProperties> = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    input: {
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      width: '300px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
};
  
export const chatStyle: Record<string, React.CSSProperties> = {
    chatList: {
        padding: '20px',
    },
    chatItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        cursor: 'pointer',
    },
    chatProfile: {
        width: '50px',
        height: '50px',
        overflow: 'hidden',
        borderRadius: '50%',
        marginRight: '10px',
    },
    chatProfileImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    chatInfo: {
        flexGrow: 1,
    },
    chatName: {
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    chatPreview: {
        color: '#999',
    },
    chatTime: {
        marginLeft: '10px',
    }
}

export const homeStyle: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5vh',
        alignItems: 'center',
        // height: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    input: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        width: '300px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '7px'
    },
    title: {
        textAlign: 'center',
        marginBottom: '3vw'
    },
    title_h: {
        margin: 0
    },
    title_p: {
        margin: 0,
        fontSize: '.85em',
        color: '#000000ad'
    }
}