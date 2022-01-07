import Grid from '@mui/material/Grid';

import SemesterController from "../components/SemesterController";
import CourseSearchBar from "../components/CourseSearchBar";
import SelectedCoursesList from "../components/SelectedCoursesList";
import SeeCombinations from "./SeeCombinations";


function CourseSelectArea({semester, handleSemesterChange, selectedCourses, handleDelete, inputCheck, courses, handleInputChange, handleAdd, numCourse, setNumCourse, handleMakeComb, handleDayOffCheck, stime, setStime}){
    return(
        <div>
        <SemesterController semester={semester} handleSemesterChange={handleSemesterChange}/>
        <div className="course-sel-wrapper">
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} order={{xs: 2, md: 1}}>
                <SelectedCoursesList selectedCourses={selectedCourses} handleDelete={handleDelete} /> 
            </Grid>
            <Grid item xs={12} md={6} order={{xs: 1, md: 2}}>
                <Grid container spacing={2} direction="column" justifyContent="space-between" alignItems="stretch"> 
                    <Grid item xs={12}>
                        <CourseSearchBar inputCheck={inputCheck} semester={semester} courses={courses} handleInputChange={handleInputChange} handleAdd={handleAdd} />
                    </Grid>
                    <Grid item xs={12}>
                        <SeeCombinations 
                            selectedCourses={selectedCourses} 
                            numCourse={numCourse} 
                            setNumCourse={setNumCourse} 
                            handleMakeComb={handleMakeComb} 
                            handleDayOffCheck={handleDayOffCheck} 
                            stime={stime} 
                            setStime={setStime}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </div>
        </div>
    );
}

export default CourseSelectArea;