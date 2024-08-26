import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'next-share'

interface ShareProps {
    text: string
    size?: number
}

function Share(props: ShareProps) {
    const text = props.text;
    const size = props.size || 30;

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px'}}>
            <WhatsappShareButton url={text}>
                <WhatsappIcon size={size} round />
            </WhatsappShareButton>
            <EmailShareButton url={text}>
                <EmailIcon size={size} round />
            </EmailShareButton>
            <TwitterShareButton url={text}>
                <TwitterIcon size={size} round />
            </TwitterShareButton>
            <TelegramShareButton url={text}>
                <TelegramIcon size={size} round />
            </TelegramShareButton>
            <RedditShareButton url={text}>
                <RedditIcon size={size} round />
            </RedditShareButton>
            <FacebookShareButton url={text}>
                <FacebookIcon size={size} round />
            </FacebookShareButton>
            <FacebookMessengerShareButton url={text} appId={''}>
                <FacebookMessengerIcon size={size} round />
            </FacebookMessengerShareButton>
        </div>
    )
}

export default Share;