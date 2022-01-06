import Grid from '@mui/material/Grid';

import SemesterController from "../components/SemesterController";
import CourseSearchBar from "../components/CourseSearchBar";
import SelectedCoursesList from "../components/SelectedCoursesList";
import SeeCombinationsButton from "../components/SeeCombinationsButton";


function CourseSelectArea({semester, handleSemesterChange, selectedCourses, handleDelete, inputCheck, courses, handleInputChange, handleAdd, numCourse, setNumCourse, handleMakeComb}){
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
                        <SeeCombinationsButton selectedCourses={selectedCourses} numCourse={numCourse} setNumCourse={setNumCourse} handleMakeComb={handleMakeComb}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </div>
        </div>
    );
}

export default CourseSelectArea;