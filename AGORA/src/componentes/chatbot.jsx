import { useEffect, useState } from "react";

const Chatbot = ({ bloqueado = false }) => {
  const [chatbotListo, setChatbotListo] = useState(false);

  useEffect(() => {
    if (window.voiceflow?.chat) {
      setChatbotListo(true);
      return;
    }

    let script = document.getElementById("voiceflow-script");

    if (!script) {
      script = document.createElement("script");
      script.id = "voiceflow-script";
      script.type = "text/javascript";
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";

      script.onload = function() {
        if (window.voiceflow?.chat) {
          window.voiceflow.chat.load({
            verify: { projectID: '6aeea5efdf9d2ff728acc1e8' },
            url: 'https://general-runtime.voiceflow.com',
            voice: {
              url: 'https://runtime-api.voiceflow.com'
            }
          });
          setChatbotListo(true);
        }
      };

      document.body.appendChild(script);
    } else {
      if (window.voiceflow?.chat) {
        setChatbotListo(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!chatbotListo || !window.voiceflow?.chat) return;

    if (bloqueado) {
      window.voiceflow.chat.close();
      window.voiceflow.chat.hide();
    } else {
      window.voiceflow.chat.show();
    }
  }, [bloqueado, chatbotListo]);

  return null;
};

export default Chatbot;