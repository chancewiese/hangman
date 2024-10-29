import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const WordInput = ({ onSubmit }) => {
   const [input, setInput] = useState("");
   const [error, setError] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      if (input.trim().length > 0) {
         // Allow letters and spaces only
         if (/^[A-Za-z\s]+$/.test(input.trim())) {
            onSubmit(input.trim());
            setError("");
         } else {
            setError("Please enter only letters and spaces");
         }
      }
   };

   return (
      <Box component="form" onSubmit={handleSubmit}>
         <Typography variant="h6" gutterBottom>
            Enter word(s) to begin:
         </Typography>
         <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={!!error}
            sx={{ mb: 2 }}
            inputProps={{
               pattern: "[A-Za-z\\s]+",
            }}
            required
         />
         <Button type="submit" variant="contained" fullWidth size="large">
            Start Game
         </Button>
      </Box>
   );
};

export default WordInput;
