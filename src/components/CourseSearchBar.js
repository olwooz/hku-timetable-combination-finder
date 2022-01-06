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
            menuPortalTarget={document.body}
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        />
    );
}

export default CourseSearchBar;