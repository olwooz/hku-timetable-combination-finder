import { useEffect, useState } from "react";
import Select from 'react-select';

import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import "../styles/styles.scss";

import courses from "../data/simplified";
import BaseTable from "../components/BaseTable";
import { ClassSharp } from "@material-ui/icons";

// check if two courses have overlapping time
function compareTime(c1, c2) { 
    for (var i = 0; i < c1["day"].length; i++) {
        for (var j = 0; j < c2["day"].length; j++) {
            if (c1["day"][i] == c2["day"][j]) {
                if (c1["stime"][i] < c2["etime"][j] && c1["stime"][i] >= c2["stime"][j]) {
                    return false;
                }
            }
        }
    }
    return true;
}

// check if there are no same courses and no time clash in the combination
function isValidCombination(courses) {
    for (var i = 0; i < courses.length - 1; i++) {
        for (var j = i+1; j < courses.length; j++) {
            if (courses[i]["code"] === courses[j]["code"]){
                return false;
            }
            if (!compareTime(courses[i], courses[j])) { 
                return false;
            }
        }
    }
    return true;
}

// get combinations of courses
function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;
	
	if (k > set.length || k <= 0) {
		return [];
	}

	if (k == set.length) {
		return [set];
	}

	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i + 1);
        var nextIdx = 1;
        while (i + nextIdx + k - 1 < set.length) {
            if (set[i+nextIdx]["code"] === head[0]["code"])
                nextIdx++;
            else break;
        }
		tailcombs = k_combinations(set.slice(i + nextIdx), k - 1);

		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

function Timetable() {
    const [semester, setSemester] = useState("1");
    const [inputCheck, setInputCheck] = useState(false);
    
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [selectedSubclasses, setSelectedSubclasses] = useState([]);
    const [numCourse, setNumCourse] = useState("1");
    
    const [result, setResult] = useState([]);
    const [selectedComb, setSelectedComb] = useState([]);

    const [showComb, setShowComb] = useState(false);
    const [showTable, setShowTable] = useState(false);

    const handleSemesterChange = (e) => {
        if (e.target.value === "1") {
            setSemester("1");
            setSelectedCourses([]);
            setSelectedSubclasses([]);
            setShowComb(false);
        } else if (e.target.value === "2") {
            setSemester("2");
            setSelectedCourses([]);
            setSelectedSubclasses([]);
            setShowComb(false);
        }
    }

    const handleInputChange = (e) => {
        if (e.length > 3) {
            setInputCheck(true);
        } else {
            setInputCheck(false);
        }
    };

    const handleAdd = (e) => {
        if(!selectedCourses.includes(e)){
            var addedCourses = []
            for(var i = 0; i < e.subclass.length; i++){
                var newCourse = {
                    "code": e.code,
                    "title": e.title,
                    "term": e.term,
                    "section": e.subclass[i].section,
                    "stime": e.subclass[i].stime,
                    "etime": e.subclass[i].etime,
                    "venue": e.subclass[i].venue,
                    "day": e.subclass[i].day
                }
                addedCourses.push(newCourse);
            }
            setSelectedCourses(s => [...s, e]);
            setSelectedSubclasses(s => [...s, ...addedCourses]);
        }
    }

    const handleDelete = id => () => {
        if (numCourse == selectedCourses.length) {
            setNumCourse(numCourse-1)
        };
        setSelectedCourses(prevS => prevS.filter(course => course.code != id));
        setSelectedSubclasses(prevS => prevS.filter(course => course.code != id));
    }

    const handleMake = () => {
        setShowTable(false);
        setSelectedComb([])
        var comb = k_combinations(selectedSubclasses, numCourse);
        comb = comb.filter(c => isValidCombination(c));
        setResult(comb);
        setShowComb(true);
    }

    const displayTable = (idx) => {
        setSelectedComb(result[idx]);
        setShowTable(true);
        setShowComb(false);
    }

    const hideTable = () => {
        setSelectedComb([]);
        setShowTable(false);
        setShowComb(true);
    }

    return(
        <div>
            <h1>HKU Timetable Combination Finder (21-22)</h1>
            <FormControl component="fieldset">
                <FormLabel component="legend">Choose Semester</FormLabel>
                <RadioGroup row aria-label="semester" name="row-radio-buttons-group">
                    <FormControlLabel value="1" control={<Radio />} label="Semester 1" checked={semester === "1" ? true : false} onChange={handleSemesterChange} />
                    <FormControlLabel value="2" control={<Radio />} label="Semester 2" checked={semester === "2" ? true : false} onChange={handleSemesterChange} />
                </RadioGroup>
            </FormControl>
            <Select 
                name="selectCourse"
                value=""
                options={inputCheck ? courses.filter(course => course.term == semester) : []}
                onInputChange={handleInputChange}
                getOptionLabel={(course) => course.code + " (" + course.title + ")"}
                getOptionValue={(course) => course.code + course.section}
                placeholder="Type to search by course code or name..."
                onChange={handleAdd}
            />
            {selectedCourses.length > 0 ? 
            <List>
                {selectedCourses.map((course,idx) => 
                    <ListItem id={course.code} key={idx}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={handleDelete(`${course.code}`)}>
                                <DeleteIcon/>
                            </IconButton>
                        }
                    >
                        <ListItemText 
                            primary={course.code}
                            secondary={course.title}
                        />
                    </ListItem>
                )}
            </List> : null}
            {selectedCourses.length > 0 ? 
            <Grid container style={{width:'80%',margin:'auto'}} justifyContent="center" alignItems="stretch" spacing={2}>
                <Grid item xs={8}>
                <TextField
                    label="Number of courses to take:"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={numCourse}
                    min="1"
                    max={selectedCourses.length > 5 ? 5 : selectedCourses.length}
                    onChange={(e)=>setNumCourse(e.target.value)}
                    fullWidth 
                />
                </Grid>
                <Grid alignItems="stretch" style={{ display: "flex" }} item xs={4}>
                    <Button variant="contained" onClick={handleMake} startIcon={<FormatListBulletedIcon />}>See Combinations</Button>
                </Grid>
            </Grid>
            : null}
            {showComb ? 
            <div>
                <h3>Total {result.length} {result.length > 1 ? 'combinations' : 'combination'} available!</h3>
                {result.map((comb,idx) =>
                    <div className={`comb ${idx}`} key={idx}>
                        <ul>
                            {comb.map((course,id) => <li key={id}>{course.code + " " + course.title + " " + course.section + " " + course.day + " " + course.stime + " " + course.etime}</li>)}
                        </ul>
                        <button onClick={(e)=>displayTable(idx, e)}>See Timetable</button>   
                    </div>
                )}
            </div>
            : null}
            {showTable ?
            <div>
                <button onClick={hideTable}>Choose another combination</button>
                <BaseTable 
                    courses={selectedComb}
                />
            </div>   
            : null}
        </div>
    );
}

export default Timetable;