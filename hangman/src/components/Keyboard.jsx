import { Button, Box } from "@mui/material";

const Keyboard = ({ correctLetters, wrongLetters, onGuess, disabled }) => {
   const firstRow = "QWERTYUIOP".split("");
   const secondRow = "ASDFGHJKL".split("");
   const thirdRow = "ZXCVBNM".split("");

   const renderKey = (letter) => {
      const isUsed =
         correctLetters.includes(letter) || wrongLetters.includes(letter);
      return (
         <Button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={disabled || isUsed}
            variant="contained"
            sx={{
               m: 0.5,
               minWidth: 40,
               height: 40,
               bgcolor: isUsed ? "grey.400" : "primary.main",
            }}
         >
            {letter}
         </Button>
      );
   };

   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
         }}
      >
         <Box sx={{ display: "flex", justifyContent: "center" }}>
            {firstRow.map(renderKey)}
         </Box>
         <Box sx={{ display: "flex", justifyContent: "center" }}>
            {secondRow.map(renderKey)}
         </Box>
         <Box sx={{ display: "flex", justifyContent: "center" }}>
            {thirdRow.map(renderKey)}
         </Box>
      </Box>
   );
};

export default Keyboard;
