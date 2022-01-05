import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function SelectedCoursesList({selectedCourses, handleDelete}) {
    return(
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
        </List>
    );
}

export default SelectedCoursesList;