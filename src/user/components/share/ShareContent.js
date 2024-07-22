import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

const ShareContent = ({ imageUrl, imageAlt, shareUrl,des }) => {
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this image!',
          text: `I found this interesting image and wanted to share it with you. Check it out here: ${shareUrl}`,
          url: shareUrl,
        });
        console.log('Share successful');
      } catch (error) {
        console.error('Error sharing', error);
      }
    } else {
      console.log('Web Share API is not supported in your browser.');
    }
  };

  const whatsappMessage = `${des}\n\nI found this interesting site and wanted to share it with you. Check it out here: ${shareUrl}`;

  return (
    <div>
      <Helmet>
        <meta property="og:title" content="Check out this image!" />
        <meta property="og:description" content="I found this interesting image and wanted to share it with you." />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div style={{ marginTop: '10px',display:'flex',justifyContent:'end',alignItems:'center',flexDirection:'row-reverse',gap:'5px' }}>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={25} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={25} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} title={whatsappMessage}>
          <WhatsappIcon size={25} round={true} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default ShareContent;
