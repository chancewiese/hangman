import { Box, Typography } from "@mui/material";

const GameBoard = ({ word, correctLetters, gameStatus }) => {
   return (
      <Box sx={{ textAlign: "center", mb: 4 }}>
         <Typography
            variant="h3"
            component="div"
            sx={{ fontFamily: "monospace", letterSpacing: 2 }}
         >
            {word.split("").map((letter, index) => (
               <Box
                  key={index}
                  component="span"
                  sx={{
                     display: "inline-block",
                     margin: "0 4px",
                     minWidth: "1ch",
                     borderBottom: letter === " " ? "none" : "2px solid",
                     padding: "0 4px",
                  }}
               >
                  {letter === " "
                     ? "\u00A0" // Use non-breaking space for visual spacing
                     : correctLetters.includes(letter) || gameStatus === "lost"
                     ? letter
                     : "_"}
               </Box>
            ))}
         </Typography>
      </Box>
   );
};

export default GameBoard;
