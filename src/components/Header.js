import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

theme.typography.h2 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

function Header(){
    return(
        <div className="header-wrapper">
            <ThemeProvider theme={theme}>
                <Typography variant="h2">HKU Timetable Combination Finder (21-22)</Typography>
            </ThemeProvider>
        </div>
    );
}

export default Header;