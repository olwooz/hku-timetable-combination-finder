import { useEffect, useState } from "react";

import "../styles/styles.scss";

import courses from "../data/simplified";
import Header from "../components/Header";
import BaseTable from "../components/BaseTable";
import CombinationList from "../components/CombinationList";
import CourseSelectArea from "../components/CourseSelectArea";
import Footer from "../components/Footer";

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
    const [displayIdx, setDisplayIdx] = useState("0");

    const reset = () => {
        setSelectedCourses([]);
        setSelectedSubclasses([]);
        setShowComb(false);
        setNumCourse("1")
    }

    const handleSemesterChange = (semester) => {
        if (semester === "1") {
            setSemester("1");
            reset();
        } else if (semester === "2") {
            setSemester("2");
            reset();
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

    const handleMakeComb = () => {
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
        setDisplayIdx(idx+1);
    }

    const hideTable = () => {
        setSelectedComb([]);
        setShowTable(false);
        setShowComb(true);
        setDisplayIdx("0")
    }

    useEffect(() => {
        setNumCourse(selectedCourses.length);
    }, [selectedCourses])

    return(
        <div>
            <div className="content-wrapper">
            <Header />
            <CourseSelectArea 
                semester={semester} 
                inputCheck={inputCheck}
                courses={courses}
                numCourse={numCourse}
                selectedCourses={selectedCourses}
                handleSemesterChange={handleSemesterChange} 
                handleInputChange={handleInputChange}
                handleAdd={handleAdd}
                handleDelete={handleDelete}
                setNumCourse={setNumCourse}
                handleMakeComb={handleMakeComb} 
            />
            {showComb ? 
                <CombinationList result={result} displayTable={displayTable}/>
            : null}
            {showTable ?
            <div>
                <BaseTable 
                    courses={selectedComb}
                    hideTable={hideTable}
                    idx={displayIdx}
                />
            </div>   
            : null}
            </div>
            <Footer />
        </div>
    );
}

export default Timetable;