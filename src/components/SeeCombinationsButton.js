import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import TextField from '@mui/material/TextField';

function SeeCombinationsButton({selectedCourses, numCourse, setNumCourse, handleMakeComb}){
    return(
        <Grid container justifyContent="space-between" spacing={2}>
            <Grid item xs={6}>
            <TextField
                label="Number of courses to take:"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    inputProps: {
                        min: "1",
                        max: selectedCourses.length > 5 ? 5 : selectedCourses.length
                    }
                }}
                variant="outlined"
                value={numCourse}
                onChange={(e)=>setNumCourse(e.target.value)}
                fullWidth 
            />
            </Grid>
            <Grid style={{ display: "flex" }} item xs={6}>
                <Button fullWidth variant="contained" onClick={handleMakeComb} startIcon={<FormatListBulletedIcon />}>See Combinations</Button>
            </Grid>
        </Grid>
    );
}

export default SeeCombinationsButton;