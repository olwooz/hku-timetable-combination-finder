import React from "react";

import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import TextField from "@mui/material/TextField";

import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function SeeCombinations({
  selectedCourses,
  numCourse,
  setNumCourse,
  handleMakeComb,
  handleDayOffCheck,
  stime,
  setStime,
}) {
  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid className="dayoff-wrapper" item xs={12}>
        <FormControl component="fieldset">
          <FormLabel className="dayoff-legend" component="legend">
            Select day off:
          </FormLabel>
          <FormGroup aria-label="dayoff" row>
            <FormControlLabel
              className="dayoff-checkbox"
              value="SUN"
              control={<Checkbox />}
              label="SUN"
              labelPlacement="top"
              onChange={handleDayOffCheck}
            />
            <FormControlLabel
              className="dayoff-checkbox"
              value="MON"
              control={<Checkbox />}
              label="MON"
              labelPlacement="top"
              onChange={handleDayOffCheck}
            />
            <FormControlLabel
              className="dayoff-checkbox"
              value="TUE"
              control={<Checkbox />}
              label="TUE"
              labelPlacement="top"
              onChange={handleDayOffCheck}
            />
            <FormControlLabel
              className="dayoff-checkbox"
              value="WED"
              control={<Checkbox />}
              label="WED"
              labelPlacement="top"
              onChange={handleDayOffCheck}
            />
            <FormControlLabel
              className="dayoff-checkbox"
              value="THU"
              control={<Checkbox />}
              label="THU"
              labelPlacement="top"
              onChange={handleDayOffCheck}
            />
            <FormControlLabel
              className="dayoff-checkbox"
              value="FRI"
              control={<Checkbox />}
              label="FRI"
              labelPlacement="top"
              onChange={handleDayOffCheck}
            />
            <FormControlLabel
              className="dayoff-checkbox"
              value="SAT"
              control={<Checkbox />}
              label="SAT"
              labelPlacement="top"
              onChange={handleDayOffCheck}
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="stime-select-label">Lecture start time:</InputLabel>
          <Select
            labelId="stime-select-label"
            id="stime-select"
            label="Lecture start time:"
            value={stime}
            onChange={(e) => setStime(e.target.value)}
          >
            <MenuItem value="">Select lecture start time</MenuItem>
            <MenuItem value="09:30">09:30</MenuItem>
            <MenuItem value="10:30">10:30</MenuItem>
            <MenuItem value="11:30">11:30</MenuItem>
            <MenuItem value="12:30">12:30</MenuItem>
            <MenuItem value="13:30">13:30</MenuItem>
          </Select>
        </FormControl>
      </Grid>
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
              max: selectedCourses.length > 6 ? 6 : selectedCourses.length,
            },
          }}
          variant="outlined"
          value={numCourse}
          onChange={(e) => setNumCourse(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid style={{ display: "flex" }} item xs={6}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleMakeComb}
          startIcon={<FormatListBulletedIcon />}
        >
          See Combinations
        </Button>
      </Grid>
    </Grid>
  );
}

export default React.memo(SeeCombinations);
