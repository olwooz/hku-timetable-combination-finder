import Fab from "@mui/material/Fab";
import { Typography } from "@mui/material";

import ViewListIcon from "@mui/icons-material/ViewList";

import "../styles/styles.scss";
var tableElemHeight = 40;

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

function calcTop(time) {
  var sh = 8;
  var sm = 30;
  var t = time.split(":");
  var th = parseInt(t[0]);
  var tm = parseInt(t[1]);
  var res = (th - sh) * 2;
  if (tm < sm) res++;
  return res;
}

function calcHeight(stime, etime) {
  var s = stime.split(":");
  var e = etime.split(":");
  var sh = parseInt(s[0]);
  var eh = parseInt(e[0]);
  var sm = parseInt(s[1]);
  var em = parseInt(e[1]);
  if (em === 20) em = 30;
  else if (em === 50) {
    eh++;
    em = 0;
  }
  var res = (eh - sh) * 2;
  if (sm < em) res++;
  else if (em < sm) res--;
  return res;
}

function BaseTable({ courses, hideTable, idx }) {
  return (
    <div>
      <Typography variant="h5">Combination {idx}:</Typography>
      <div className="timetable">
        <div className="timeline">
          <ul>
            <li></li>
            <li>
              <span>08:30</span>
            </li>
            <li>
              <span>09:00</span>
            </li>
            <li>
              <span>09:30</span>
            </li>
            <li>
              <span>10:00</span>
            </li>
            <li>
              <span>10:30</span>
            </li>
            <li>
              <span>11:00</span>
            </li>
            <li>
              <span>11:30</span>
            </li>
            <li>
              <span>12:00</span>
            </li>
            <li>
              <span>12:30</span>
            </li>
            <li>
              <span>13:00</span>
            </li>
            <li>
              <span>13:30</span>
            </li>
            <li>
              <span>14:00</span>
            </li>
            <li>
              <span>14:30</span>
            </li>
            <li>
              <span>15:00</span>
            </li>
            <li>
              <span>15:30</span>
            </li>
            <li>
              <span>16:00</span>
            </li>
            <li>
              <span>16:30</span>
            </li>
            <li>
              <span>17:00</span>
            </li>
            <li>
              <span>17:30</span>
            </li>
            <li>
              <span>18:00</span>
            </li>
            <li>
              <span>18:30</span>
            </li>
            <li>
              <span>19:00</span>
            </li>
            <li>
              <span>19:30</span>
            </li>
            <li>
              <span>20:00</span>
            </li>
            <li>
              <span>20:30</span>
            </li>
            <li>
              <span>21:00</span>
            </li>
            <li>
              <span>21:30</span>
            </li>
            <li>
              <span>22:00</span>
            </li>
            <li>
              <span>22:30</span>
            </li>
            <li>
              <span>23:00</span>
            </li>
            <li>
              <span>23:30</span>
            </li>
          </ul>
        </div>
        <div className="courses">
          <ul className="courses-wrapper">
            <li className="courses-group">
              <div className="top-info">
                <span>SUN</span>
              </div>
              <ul>
                {courses.map((course, idx) => {
                  if (course.day.includes("SUN")) {
                    var i = 0;
                    while (course.day[i] != "SUN") i++;
                    var top = calcTop(course.stime[i]) * tableElemHeight;
                    var height =
                      calcHeight(course.stime[i], course.etime[i]) *
                      tableElemHeight;
                    var lineHeight = height + "px";
                    var spanHeight = height / 2 + "px";
                    var style = {
                      top: top,
                      height: height,
                      lineHeight: lineHeight,
                    };
                    return (
                      <li
                        key={idx}
                        style={style}
                        className={`course-${idx + 1}`}
                        data-start={course.stime[i]}
                        data-end={course.etime[i]}
                        data-content={`course-${course.code}`}
                        data-event={`course-${idx + 1}`}
                      >
                        <span
                          style={{ lineHeight: spanHeight }}
                          className="coursetext"
                        >
                          {course.code + " " + course.section}
                          <br />
                          {course.stime[i] + "-" + course.etime[i]}
                        </span>
                      </li>
                    );
                  }
                })}
              </ul>
            </li>

            <li className="courses-group">
              <div className="top-info">
                <span>MON</span>
              </div>
              <ul>
                {courses.map((course, idx) => {
                  if (course.day.includes("MON")) {
                    var i = 0;
                    while (course.day[i] != "MON") i++;
                    var top = calcTop(course.stime[i]) * tableElemHeight;
                    var height =
                      calcHeight(course.stime[i], course.etime[i]) *
                      tableElemHeight;
                    var lineHeight = height + "px";
                    var spanHeight = height / 2 + "px";
                    var style = {
                      top: top,
                      height: height,
                      lineHeight: lineHeight,
                    };
                    return (
                      <li
                        key={idx}
                        style={style}
                        className={`course-${idx + 1}`}
                        data-start={course.stime[i]}
                        data-end={course.etime[i]}
                        data-content={`course-${course.code}`}
                        data-event={`course-${idx + 1}`}
                      >
                        <span
                          style={{ lineHeight: spanHeight }}
                          className="coursetext"
                        >
                          {course.code + " " + course.section}
                          <br />
                          {course.stime[i] + "-" + course.etime[i]}
                        </span>
                      </li>
                    );
                  }
                })}
              </ul>
            </li>

            <li className="courses-group">
              <div className="top-info">
                <span>TUE</span>
              </div>
              <ul>
                {courses.map((course, idx) => {
                  if (course.day.includes("TUE")) {
                    var i = 0;
                    while (course.day[i] != "TUE") i++;
                    var top = calcTop(course.stime[i]) * tableElemHeight;
                    var height =
                      calcHeight(course.stime[i], course.etime[i]) *
                      tableElemHeight;
                    var lineHeight = height + "px";
                    var spanHeight = height / 2 + "px";
                    var style = {
                      top: top,
                      height: height,
                      lineHeight: lineHeight,
                    };
                    return (
                      <li
                        key={idx}
                        style={style}
                        className={`course-${idx + 1}`}
                        data-start={course.stime[i]}
                        data-end={course.etime[i]}
                        data-content={`course-${course.code}`}
                        data-event={`course-${idx + 1}`}
                      >
                        <span
                          style={{ lineHeight: spanHeight }}
                          className="coursetext"
                        >
                          {course.code + " " + course.section}
                          <br />
                          {course.stime[i] + "-" + course.etime[i]}
                        </span>
                      </li>
                    );
                  }
                })}
              </ul>
            </li>

            <li className="courses-group">
              <div className="top-info">
                <span>WED</span>
              </div>
              <ul>
                {courses.map((course, idx) => {
                  if (course.day.includes("WED")) {
                    var i = 0;
                    while (course.day[i] != "WED") i++;
                    var top = calcTop(course.stime[i]) * tableElemHeight;
                    var height =
                      calcHeight(course.stime[i], course.etime[i]) *
                      tableElemHeight;
                    var lineHeight = height + "px";
                    var spanHeight = height / 2 + "px";
                    var style = {
                      top: top,
                      height: height,
                      lineHeight: lineHeight,
                    };
                    return (
                      <li
                        key={idx}
                        style={style}
                        className={`course-${idx + 1}`}
                        data-start={course.stime[i]}
                        data-end={course.etime[i]}
                        data-content={`course-${course.code}`}
                        data-event={`course-${idx + 1}`}
                      >
                        <span
                          style={{ lineHeight: spanHeight }}
                          className="coursetext"
                        >
                          {course.code + " " + course.section}
                          <br />
                          {course.stime[i] + "-" + course.etime[i]}
                        </span>
                      </li>
                    );
                  }
                })}
              </ul>
            </li>

            <li className="courses-group">
              <div className="top-info">
                <span>THU</span>
              </div>
              <ul>
                {courses.map((course, idx) => {
                  if (course.day.includes("THU")) {
                    var i = 0;
                    while (course.day[i] != "THU") i++;
                    var top = calcTop(course.stime[i]) * tableElemHeight;
                    var height =
                      calcHeight(course.stime[i], course.etime[i]) *
                      tableElemHeight;
                    var lineHeight = height + "px";
                    var spanHeight = height / 2 + "px";
                    var style = {
                      top: top,
                      height: height,
                      lineHeight: lineHeight,
                    };
                    return (
                      <li
                        key={idx}
                        style={style}
                        className={`course-${idx + 1}`}
                        data-start={course.stime[i]}
                        data-end={course.etime[i]}
                        data-content={`course-${course.code}`}
                        data-event={`course-${idx + 1}`}
                      >
                        <span
                          style={{ lineHeight: spanHeight }}
                          className="coursetext"
                        >
                          {course.code + " " + course.section}
                          <br />
                          {course.stime[i] + "-" + course.etime[i]}
                        </span>
                      </li>
                    );
                  }
                })}
              </ul>
            </li>

            <li className="courses-group">
              <div className="top-info">
                <span>FRI</span>
              </div>
              <ul>
                {courses.map((course, idx) => {
                  if (course.day.includes("FRI")) {
                    var i = 0;
                    while (course.day[i] != "FRI") i++;
                    var top = calcTop(course.stime[i]) * tableElemHeight;
                    var height =
                      calcHeight(course.stime[i], course.etime[i]) *
                      tableElemHeight;
                    var lineHeight = height + "px";
                    var spanHeight = height / 2 + "px";
                    var style = {
                      top: top,
                      height: height,
                      lineHeight: lineHeight,
                    };
                    return (
                      <li
                        key={idx}
                        style={style}
                        className={`course-${idx + 1}`}
                        data-start={course.stime[i]}
                        data-end={course.etime[i]}
                        data-content={`course-${course.code}`}
                        data-event={`course-${idx + 1}`}
                      >
                        <span
                          style={{ lineHeight: spanHeight }}
                          className="coursetext"
                        >
                          {course.code + " " + course.section}
                          <br />
                          {course.stime[i] + "-" + course.etime[i]}
                        </span>
                      </li>
                    );
                  }
                })}
              </ul>
            </li>

            <li className="courses-group">
              <div className="top-info">
                <span>SAT</span>
              </div>
              <ul>
                {courses.map((course, idx) => {
                  if (course.day.includes("SAT")) {
                    var i = 0;
                    while (course.day[i] != "SAT") i++;
                    var top = calcTop(course.stime[i]) * tableElemHeight;
                    var height =
                      calcHeight(course.stime[i], course.etime[i]) *
                      tableElemHeight;
                    var lineHeight = height + "px";
                    var spanHeight = height / 2 + "px";
                    var style = {
                      top: top,
                      height: height,
                      lineHeight: lineHeight,
                    };
                    return (
                      <li
                        key={idx}
                        style={style}
                        className={`course-${idx + 1}`}
                        data-start={course.stime[i]}
                        data-end={course.etime[i]}
                        data-content={`course-${course.code}`}
                        data-event={`course-${idx + 1}`}
                      >
                        <span
                          style={{ lineHeight: spanHeight }}
                          className="coursetext"
                        >
                          {course.code + " " + course.section}
                          <br />
                          {course.stime[i] + "-" + course.etime[i]}
                        </span>
                      </li>
                    );
                  }
                })}
              </ul>
            </li>
          </ul>
        </div>
        <Fab style={fabStyle} onClick={hideTable}>
          <ViewListIcon />
        </Fab>
      </div>
    </div>
  );
}

export default BaseTable;
