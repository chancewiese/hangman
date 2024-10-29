import { useState } from "react";
import {
   AppBar,
   Box,
   Button,
   Container,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Grid,
   Paper,
   Toolbar,
   Typography,
} from "@mui/material";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import HangmanDrawing from "./components/HangmanDrawing";
import WordInput from "./components/WordInput";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const App = () => {
   const [word, setWord] = useState("");
   const [gameStarted, setGameStarted] = useState(false);
   const [correctLetters, setCorrectLetters] = useState([]);
   const [wrongLetters, setWrongLetters] = useState([]);
   const [gameStatus, setGameStatus] = useState("setup"); // setup, playing, won, lost

   const handleWordSubmit = (newWord) => {
      setWord(newWord.toUpperCase());
      setGameStarted(true);
      setGameStatus("playing");
   };

   const handleGuess = (letter) => {
      if (gameStatus !== "playing") return;

      if (word.includes(letter)) {
         setCorrectLetters((prev) => [...prev, letter]);
         // Check win condition excluding spaces
         if (
            [...word]
               .filter((char) => char !== " ")
               .every((char) => [...correctLetters, letter].includes(char))
         ) {
            setGameStatus("won");
         }
      } else {
         const newWrongLetters = [...wrongLetters, letter];
         setWrongLetters(newWrongLetters);
         if (newWrongLetters.length >= 6) {
            setGameStatus("lost");
         }
      }
   };

   const resetGame = () => {
      setWord("");
      setGameStarted(false);
      setCorrectLetters([]);
      setWrongLetters([]);
      setGameStatus("setup");
   };

   return (
      <Box sx={{ flexGrow: 1, bgcolor: "grey.100", minHeight: "100vh" }}>
         <AppBar position="static" sx={{ bgcolor: "primary.main", mb: 4 }}>
            <Toolbar>
               <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
                  Hangman
               </Typography>
               {gameStarted && (
                  <Button color="inherit" onClick={resetGame}>
                     New Game
                  </Button>
               )}
            </Toolbar>
         </AppBar>

         <Container maxWidth="lg">
            {!gameStarted ? (
               <Paper elevation={3} sx={{ p: 4, maxWidth: "sm", mx: "auto" }}>
                  <WordInput onSubmit={handleWordSubmit} />
               </Paper>
            ) : (
               <Grid container spacing={3}>
                  {/* Main Game Area */}
                  <Grid item xs={12} md={8}>
                     <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
                        <Box sx={{ maxWidth: 400, mx: "auto", mb: 4 }}>
                           <HangmanDrawing wrongGuesses={wrongLetters.length} />
                        </Box>
                        <GameBoard
                           word={word}
                           correctLetters={correctLetters}
                           gameStatus={gameStatus}
                        />
                        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
                           <Keyboard
                              correctLetters={correctLetters}
                              wrongLetters={wrongLetters}
                              onGuess={handleGuess}
                              disabled={gameStatus !== "playing"}
                           />
                        </Box>
                     </Paper>
                  </Grid>

                  {/* Right Panel */}
                  <Grid item xs={12} md={4}>
                     <Grid container direction="column" spacing={3}>
                        {/* Correct Letters */}
                        <Grid item>
                           <Paper elevation={3} sx={{ p: 2 }}>
                              <Box
                                 sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 2,
                                 }}
                              >
                                 <CheckCircleOutlineIcon
                                    color="success"
                                    sx={{ mr: 1 }}
                                 />
                                 <Typography variant="h6" color="success.main">
                                    Correct Letters
                                 </Typography>
                              </Box>
                              <Box
                                 sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                 }}
                              >
                                 {correctLetters.sort().map((letter) => (
                                    <Paper
                                       key={letter}
                                       elevation={1}
                                       sx={{
                                          p: 1,
                                          minWidth: 36,
                                          textAlign: "center",
                                          bgcolor: "success.light",
                                          color: "white",
                                       }}
                                    >
                                       {letter}
                                    </Paper>
                                 ))}
                              </Box>
                           </Paper>
                        </Grid>

                        {/* Wrong Letters */}
                        <Grid item>
                           <Paper elevation={3} sx={{ p: 2 }}>
                              <Box
                                 sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 2,
                                 }}
                              >
                                 <ErrorOutlineIcon
                                    color="error"
                                    sx={{ mr: 1 }}
                                 />
                                 <Typography variant="h6" color="error.main">
                                    Wrong Letters
                                 </Typography>
                              </Box>
                              <Box
                                 sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                 }}
                              >
                                 {wrongLetters.sort().map((letter) => (
                                    <Paper
                                       key={letter}
                                       elevation={1}
                                       sx={{
                                          p: 1,
                                          minWidth: 36,
                                          textAlign: "center",
                                          bgcolor: "error.light",
                                          color: "white",
                                       }}
                                    >
                                       {letter}
                                    </Paper>
                                 ))}
                              </Box>
                           </Paper>
                        </Grid>

                        {/* Remaining Guesses */}
                        <Grid item>
                           <Paper elevation={3} sx={{ p: 2 }}>
                              <Typography variant="h6" gutterBottom>
                                 Remaining Guesses
                              </Typography>
                              <Typography variant="h3" color="primary">
                                 {6 - wrongLetters.length}
                              </Typography>
                           </Paper>
                        </Grid>
                     </Grid>
                  </Grid>
               </Grid>
            )}

            {/* Game Over Dialog */}
            <Dialog
               open={gameStatus !== "playing" && gameStatus !== "setup"}
               onClose={resetGame}
               maxWidth="sm"
               fullWidth
            >
               <DialogTitle sx={{ textAlign: "center" }}>
                  {gameStatus === "won" ? "Congratulations!" : "Game Over"}
               </DialogTitle>
               <DialogContent>
                  <Typography variant="h6" align="center">
                     {gameStatus === "won"
                        ? "You successfully guessed the answer!"
                        : `The answer was: ${word}`}
                  </Typography>
               </DialogContent>
               <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                  <Button variant="contained" onClick={resetGame} size="large">
                     Play Again
                  </Button>
               </DialogActions>
            </Dialog>
         </Container>
      </Box>
   );
};

export default App;
