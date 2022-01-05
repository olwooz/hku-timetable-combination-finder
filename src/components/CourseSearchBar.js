import Select from 'react-select';

function CourseSearchBar({inputCheck, semester, courses, handleInputChange, handleAdd}){
    return(
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
    );
}

export default CourseSearchBar;