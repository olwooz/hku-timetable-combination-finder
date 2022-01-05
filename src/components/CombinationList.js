import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Fab from '@mui/material/Fab';

import TableChartIcon from '@mui/icons-material/TableChart';

import { Typography } from "@mui/material";

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

function CombinationList({result, displayTable}) {

    return(
        <div>
        <Typography variant='h5'>Total {result.length} {result.length > 1 ? 'combinations' : 'combination'} available!</Typography>
        {result.map((comb, idx) =>
            <div className='comb-list'>
            <List className={`comb-${idx}`} key={idx}>
                <Typography variant='h6'>Combination {idx+1}</Typography>
                {comb.map((course, id) => {
                    var secondaryText = course.day[0] + " " + course.stime[0] + "-" +course.etime[0];
                    for (var i = 1; i < course.day.length; i++) {
                        secondaryText = secondaryText + " / " + course.day[i] + " " + course.stime[i] + "-" + course.etime[i];
                    }
                    return (
                    <ListItem id={course.code} key={id}>
                        <ListItemText 
                            primary={course.code + " " + course.section + " " + course.title}
                            secondary={secondaryText}
                        />
                    </ListItem>
                    );
                }
                )}
                <Fab style={fabStyle} onClick={(e)=>displayTable(idx, e)}><TableChartIcon /></Fab>
            </List>
            </div>
        )}
        </div>
    );
}

export default CombinationList;