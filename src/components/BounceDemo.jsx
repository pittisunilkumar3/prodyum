import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-end justify-center h-screen bg-black">
      <div className="loader"></div>

      <style>{`
        .loader {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1E88E5, #4CAF50);
          box-shadow: 0 0 30px rgba(30,136,229,0.5), 0 0 60px rgba(76,175,80,0.3);

          /* Bounce animation */
          animation: ballBounce 1.5s cubic-bezier(0.33, 1, 0.68, 1) infinite;

          /* Squash & stretch on landing */
          animation: ballBounce 1.5s ease-in-out infinite;
        }

        /* The shadow under the ball */
        .loader::after {
          content: '';
          display: block;
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          filter: blur(5px);
          animation: shadowBounce 1.5s ease-in-out infinite;
        }

        @keyframes ballBounce {
          0% {
            transform: translateY(0) scaleX(1) scaleY(1);
          }
          /* Going up */
          30% {
            transform: translateY(-250px) scaleX(0.9) scaleY(1.1);
          }
          /* At peak - stretched */
          50% {
            transform: translateY(-300px) scaleX(1) scaleY(1);
          }
          /* Coming down */
          70% {
            transform: translateY(-150px) scaleX(1) scaleY(1);
          }
          /* Landing - squash */
          85% {
            transform: translateY(0) scaleX(1.3) scaleY(0.7);
          }
          /* Bounce back up slightly */
          92% {
            transform: translateY(-40px) scaleX(0.95) scaleY(1.05);
          }
          100% {
            transform: translateY(0) scaleX(1) scaleY(1);
          }
        }

        @keyframes shadowBounce {
          0% { transform: translateX(-50%) scale(1); opacity: 0.3; }
          30% { transform: translateX(-50%) scale(0.5); opacity: 0.1; }
          50% { transform: translateX(-50%) scale(0.3); opacity: 0.05; }
          70% { transform: translateX(-50%) scale(0.6); opacity: 0.15; }
          85% { transform: translateX(-50%) scale(1.2); opacity: 0.4; }
          100% { transform: translateX(-50%) scale(1); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};
