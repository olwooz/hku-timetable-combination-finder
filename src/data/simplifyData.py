import json
import os

def remove_duplicates(courses):
    simplified = {
        "code": courses[0]["COURSE CODE"],
        "title": courses[0]["COURSE TITLE"],
        "term": courses[0]["TERM"][-1],
        "section": courses[0]["CLASS SECTION"],
        "stime": [courses[0]["START TIME"]] if not courses[0]["START TIME"].isspace() else ["N/A"],
        "etime": [courses[0]["END TIME"]],
        "venue": [courses[0]["VENUE"]] if (not courses[0]["VENUE"].isspace()) and (len(courses[0]["VENUE"])>0) else ["N/A"],
    }
    day = list(filter(None, [courses[0]["SUN"],courses[0]["MON"],courses[0]["TUE"],courses[0]["WED"],courses[0]["THU"],courses[0]["FRI"],courses[0]["SAT"]]))
    if len(day) > 0:
        simplified["day"] = [day[0]]
    else:
        simplified["day"] = ["N/A"]
    for course in courses:
        day = list(filter(None, [course["SUN"],course["MON"],course["TUE"],course["WED"],course["THU"],course["FRI"],course["SAT"]]))
        if len(day) == 1 and day[0] not in simplified["day"]:
            simplified["stime"].append(course["START TIME"])
            simplified["etime"].append(course["END TIME"])
            if (not course["VENUE"].isspace()) and (len(course["VENUE"])>0):
                simplified["venue"].append(course["VENUE"])
            simplified["day"].append(day[0])
    return simplified

here = os.path.dirname(os.path.abspath(__file__))
filename = os.path.join(here, 'hku_21-22_class_timetable.json')
result_filename = os.path.join(here, 'simplified.json')

with open(filename) as json_data:
    courses = json.load(json_data)

prevCourse = courses[0]
sameCourse = [courses[0]]
newJSON = []

for course in courses:
    if prevCourse["COURSE CODE"] == course["COURSE CODE"]:
        sameCourse.append(course)
    else:
        newJSON.append(remove_duplicates(sameCourse))
        sameCourse.clear()
        sameCourse.append(course)
        prevCourse = course


with open(result_filename, "w") as outfile:
    json.dump(newJSON, outfile)


