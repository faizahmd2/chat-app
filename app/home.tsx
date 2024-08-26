import { useRef, useState } from 'react'
import { homeStyle } from '../styles'
import { db, tx, id } from './services/instantdbService'
import { useRouter } from 'next/navigation';
import MyLoader from './components/loader';
import Share from './components/shareIcons';

function HomePage(props) {
    const router = useRouter();
    
    const [code, setCode] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [generatedCode, setGeneratedCode] = useState(null)
    
    const { data: findChat, isLoading } = db.useQuery({chats: { $ : { where : { id: code ? code : "-1" } } }})
    
    if(isLoading) return <MyLoader />

    const handleMethodChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const createNewChat = () => {
        const chat = {
            id: id(),
            createrId: props.user.id,
            recieverId: null,
            createdAt: new Date()
        };

        db.transact([
            tx.chats[chat.id].update(chat)
        ])

        return chat.id;
    }

    const joinChat = () => {
        if(findChat && findChat.chats && findChat.chats[0]) {
            const chat = { ...findChat.chats[0] };
            if(chat.createrId === props.user.id) {
                alert("Invalid process!");
                return
            }

            if(chat.recieverId !== props.user.id && chat.recieverId !== null) {
                alert("No rooms Allowed!")
                return
            }

            chat.recieverId = props.user.id;
    
            db.transact([
                tx.chats[chat.id].update(chat)
            ])
    
            return chat.id;
        } else {
            alert("Invalid Code!")
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        if(isChecked) {
            let joined = joinChat()

            if(joined) {
                router.push(`/chat/${code}`);
            }
        } else {
            const chatId = createNewChat();

            setIsChecked(false)
            setGeneratedCode(chatId)
        }
    };

    return <>
        <div style={homeStyle.container}>
            <div style={homeStyle.title}>
                <h2 style={homeStyle.title_h}>Welcome To Chat App</h2>
                <p style={homeStyle.title_p}>Create/join chat below or <a href="/chat" target='_blank'>redirect to chat ↗</a></p>
            </div>
            <div className="create-chat-container">
                <div style={homeStyle.btnContainer}>
                    {
                        isChecked && <input
                            style={homeStyle.input}
                            placeholder="Enter Chat Code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required={true}
                        />
                    }
                    {
                        generatedCode && <CopyText code={generatedCode} />
                    }
                    {!generatedCode && <button onClick={handleSubmit} style={homeStyle.button}>
                        {isChecked ? 'Join' : 'Create Chat'}
                    </button>}
                </div>
                {generatedCode && <div className='share-icons-container'>
                    <Share text={generatedCode} />
                </div>}
                {!generatedCode && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '11px'}}>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleMethodChange}
                    />
                    <div style={{ color: '#333', margin: 0 }}>Have Code? Join Chat</div>
                </div>}
            </div>
        </div>
    </>
}

function CopyText(props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
  
    const handleCopy = () => {
      if (inputRef.current) {
        inputRef.current.select();
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      }
    };

    const handleShare = () => {

    }

    return (<>
        <div className="readonly-input-container">            
          <input
            type="text"
            value={props.code}
            readOnly
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`readonly-input ${isCopied ? 'copied' : ''}`}
          />
          <button className={`${ isCopied && isFocused ? 'focused' : ''}`} onClick={handleCopy}>{isCopied && isFocused ? 'Copied' : 'Copy'}</button>
        </div>
        </>
      );
}

export default HomePage;