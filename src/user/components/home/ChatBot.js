import React, { useEffect, useState } from 'react';

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);

  const toggleChatBox = () => {
    setShowChat(!showChat);
  };

  const closeChatBox = () => {
    setShowChat(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsAndroidUsed(window.innerWidth < 1000); // Adjust the threshold based on your design considerations
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the correct value

    // Cleanup the event listener when component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          left: isAndroidUsed ? '85vw' : '93vw',
          top: '90vh',
          fontSize: '60px',
        }}
      >
        <div 
          style={{ 
            position: 'relative', 
            display: 'inline-block', 
            transition: 'transform 0.3s ease, opacity 0.3s ease', 
            transform: showChat ? 'rotate(360deg)' : 'rotate(0deg)',
            opacity: showChat ? 0.5 : 1,
            cursor: 'pointer',
            animation: 'bounce 1.5s infinite',
          }} 
          onClick={toggleChatBox}
        >
          <svg
      viewBox="0 0 100 100"
      width="70"
      height="70"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle cx="50" cy="50" r="40" fill="#0033A0" />

      {/* IRCTC Styled Element */}
      <polygon points="50,15 65,50 35,50" fill="#FFF" />
      <polygon points="35,50 50,85 65,50" fill="#0033A0" />
      <polygon points="50,35 35,50 50,65 65,50" fill="#FFF" />

      {/* Hand Element */}
      <rect
        x="45"
        y="20"
        width="10"
        height="30"
        fill="#FFF"
        style={{
          transformOrigin: 'bottom',
          animation: 'wave 1s infinite',
        }}
      />
      <style>
        {`
          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-20deg); }
          }
        `}
      </style>
    </svg>
        </div>
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: isAndroidUsed ? '0px' : '20px',
          width: isAndroidUsed ? '100%' : '500px',
          height: isAndroidUsed ? '90%' : '500px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          overflow: 'hidden',
          zIndex: 1001,
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          transform: showChat ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
          opacity: showChat ? 1 : 0,
          visibility: showChat ? 'visible' : 'hidden',
        }}
      >
        {showChat && (
          <>
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
                zIndex: 1002,
              }}
              onClick={closeChatBox}
            >
              <i
                className="fas fa-times"
                style={{
                  fontSize: '20px',
                  color: 'black',
                }}
              ></i>
            </div>
            <iframe
              src="https://chatbot.socialbharat.org/"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            ></iframe>
          </>
        )}
      </div>
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-15px);
          }
          60% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
