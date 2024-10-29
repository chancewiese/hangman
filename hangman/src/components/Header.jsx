import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = ({ gameStarted, onReset }) => {
   return (
      <AppBar position="static" sx={{ bgcolor: "primary.main", mb: 4 }}>
         <Toolbar>
            <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
               Hangman
            </Typography>
            {gameStarted && (
               <Button color="inherit" onClick={onReset}>
                  New Game
               </Button>
            )}
         </Toolbar>
      </AppBar>
   );
};

export default Header;
