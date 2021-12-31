import { useEffect, useState } from "react";
import Select from 'react-select'

import courses from "../data/simplified";

function Timetable() {
    const [semester, setSemester] = useState("1");
    const [inputCheck, setInputCheck] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);

    const handleSemesterChange = (e) => {
        if (e.target.value === "1") {
            setSemester("1");
            setSelectedCourses([]);
        } else if (e.target.value === "2") {
            setSemester("2");
            setSelectedCourses([]);
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
        setSelectedCourses(s => [...s, e]);
    }

    const handleDelete = (e) => {
        setSelectedCourses(prevS => prevS.filter(course => course.code+course.section != e.target.parentElement.id))
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
                    <li id={course.code+course.section} key={idx}>
                        <span>{course.code + " " + course.title}</span>
                        <button onClick={handleDelete}>delete</button>
                    </li>
                )}
            </ul> : null}
            {selectedCourses.length > 0 ? 
            <div>
                <label for="course-num">Number of courses to take: </label>
                <input name="course-num" type="number" min="1" max={selectedCourses.length > 5 ? 5 : selectedCourses.length }/>
            </div>
            : null}
        </div>
    );
}

export default Timetable;