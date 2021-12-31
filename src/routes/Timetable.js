import { useEffect, useState } from "react";
import Select from 'react-select'

import courses from "../data/simplified";

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
    const [make, setMake] = useState(false);
    const [result, setResult] = useState([]);

    const handleSemesterChange = (e) => {
        if (e.target.value === "1") {
            setSemester("1");
            setSelectedCourses([]);
            setSelectedSubclasses([]);
            setMake(false);
        } else if (e.target.value === "2") {
            setSemester("2");
            setSelectedCourses([]);
            setSelectedSubclasses([]);
            setMake(false);
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
            for(var i = 0; i<e["subclass"].length; i++){
                var newCourse = {
                    "code": e["code"],
                    "title": e["title"],
                    "term": e["term"],
                    "section": e["subclass"][i]["section"],
                    "stime": e["subclass"][i]["stime"],
                    "etime": e["subclass"][i]["etime"],
                    "venue": e["subclass"][i]["venue"],
                    "day": e["subclass"][i]["day"]
                }
                addedCourses.push(newCourse);
            }
            setSelectedCourses(s => [...s, e]);
            setSelectedSubclasses(s => [...s, ...addedCourses]);
        }
    }

    const handleDelete = (e) => {
        setSelectedCourses(prevS => prevS.filter(course => course.code != e.target.parentElement.id));
        setSelectedSubclasses(prevS => prevS.filter(course => course.code != e.target.parentElement.id));
    }

    const handleMake = () => {
        var comb = k_combinations(selectedSubclasses, numCourse);
        comb = comb.filter(c => isValidCombination(c));
        setResult(comb);
        setMake(true);
    }

    return(
        <div>
            <h1>Timetable</h1>
            <div>
                Semester 1 <input type="radio" value="1" name="semester" checked={semester === "1" ? true : false} onChange={handleSemesterChange}/>
                Semester 2 <input type="radio" value="2" name="semester" checked={semester === "2" ? true : false} onChange={handleSemesterChange}/>
            </div>
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
            <ul>
                {selectedCourses.map((course,idx) => 
                    <li id={course.code} key={idx}>
                        <span>{course.code + " " + course.title}</span>
                        <button onClick={handleDelete}>delete</button>
                    </li>
                )}
            </ul> : null}
            {selectedCourses.length > 0 ? 
            <div>
                <label htmlFor="course-num">Number of courses to take: </label>
                <input name="course-num" value={numCourse} type="number" min="1" max={selectedCourses.length > 5 ? 5 : selectedCourses.length} onChange={(e)=>setNumCourse(e.target.value)}/>
                <button onClick={handleMake}>Make timetable</button>
            </div>
            : null}
            {make ? 
            <div>
                {result.map((comb,idx) =>
                    <ul key={idx}>
                        {comb.map((course,id) => <li key={id}>{course.code + " " + course.title + " " + course.section + " " + course.day + " " + course.stime + " " + course.etime}</li>)}
                    </ul>   
                )}
            </div>
            : null}
        </div>
    );
}

export default Timetable;