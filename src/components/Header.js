import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

theme.typography.h2 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};

function Header() {
  return (
    <div className="header-wrapper">
      <ThemeProvider theme={theme}>
        <Typography variant="h2">
          HKU Timetable Combination Finder (22-23)
        </Typography>
        <a href="https://hits.seeyoufarm.com">
          <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fdyi919.github.io%2Fhku-timetable-combination-finder%2F&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false" />
        </a>
      </ThemeProvider>
    </div>
  );
}

export default Header;
