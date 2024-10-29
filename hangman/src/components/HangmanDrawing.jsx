const HangmanDrawing = ({ wrongGuesses }) => {
   const BODY_PARTS = {
      head: wrongGuesses >= 1,
      body: wrongGuesses >= 2,
      leftArm: wrongGuesses >= 3,
      rightArm: wrongGuesses >= 4,
      leftLeg: wrongGuesses >= 5,
      rightLeg: wrongGuesses >= 6,
   };

   return (
      <svg viewBox="0 0 200 200" className="w-64 h-64 mx-auto mb-8">
         {/* Gallows */}
         <line
            x1="40"
            y1="180"
            x2="160"
            y2="180"
            stroke="black"
            strokeWidth="4"
         />{" "}
         {/* Base */}
         <line
            x1="100"
            y1="180"
            x2="100"
            y2="20"
            stroke="black"
            strokeWidth="4"
         />{" "}
         {/* Pole */}
         <line
            x1="100"
            y1="20"
            x2="150"
            y2="20"
            stroke="black"
            strokeWidth="4"
         />{" "}
         {/* Top */}
         <line
            x1="150"
            y1="20"
            x2="150"
            y2="40"
            stroke="black"
            strokeWidth="4"
         />{" "}
         {/* Rope */}
         {/* Head */}
         {BODY_PARTS.head && (
            <circle
               cx="150"
               cy="55"
               r="15"
               stroke="black"
               strokeWidth="4"
               fill="none"
            />
         )}
         {/* Body */}
         {BODY_PARTS.body && (
            <line
               x1="150"
               y1="70"
               x2="150"
               y2="120"
               stroke="black"
               strokeWidth="4"
            />
         )}
         {/* Arms */}
         {BODY_PARTS.leftArm && (
            <line
               x1="150"
               y1="85"
               x2="120"
               y2="100"
               stroke="black"
               strokeWidth="4"
            />
         )}
         {BODY_PARTS.rightArm && (
            <line
               x1="150"
               y1="85"
               x2="180"
               y2="100"
               stroke="black"
               strokeWidth="4"
            />
         )}
         {/* Legs */}
         {BODY_PARTS.leftLeg && (
            <line
               x1="150"
               y1="120"
               x2="120"
               y2="150"
               stroke="black"
               strokeWidth="4"
            />
         )}
         {BODY_PARTS.rightLeg && (
            <line
               x1="150"
               y1="120"
               x2="180"
               y2="150"
               stroke="black"
               strokeWidth="4"
            />
         )}
      </svg>
   );
};

export default HangmanDrawing;
