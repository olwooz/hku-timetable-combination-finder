import useState from "react";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function SemesterController({semester, handleSemesterChange}) {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Choose Semester</FormLabel>
            <RadioGroup row aria-label="semester" name="row-radio-buttons-group">
                <FormControlLabel value="1" control={<Radio />} label="Semester 1" checked={semester === "1" ? true : false} onChange={() => handleSemesterChange("1")} />
                <FormControlLabel value="2" control={<Radio />} label="Semester 2" checked={semester === "2" ? true : false} onChange={() => handleSemesterChange("2")} />
            </RadioGroup>
        </FormControl>
    );
}

export default SemesterController;