# use convertcsv.com to convert from csv to json first

import json
import os


def divide_subclasses(courses):
    divided = {
        "code": courses[0]["COURSE CODE"],
        "title": courses[0]["COURSE TITLE"],
        "term": courses[0]["TERM"][-1],
        "subclass": [{
            "section": courses[0]["CLASS SECTION"],
            "stime": [courses[0]["START TIME"]] if not courses[0]["START TIME"].isspace() else ["N/A"],
            "etime": [courses[0]["END TIME"]],
            "venue": [courses[0]["VENUE"]] if (not courses[0]["VENUE"].isspace()) and (len(courses[0]["VENUE"]) > 0) else ["N/A"],
        }]
    }
    day = list(filter(None, [courses[0]["SUN"], courses[0]["MON"], courses[0]["TUE"],
                             courses[0]["WED"], courses[0]["THU"], courses[0]["FRI"], courses[0]["SAT"]]))
    if len(day) > 0:
        divided["subclass"][0]["day"] = [day[0]]
    else:
        divided["subclass"][0]["day"] = ["N/A"]
    for course in courses[1:]:
        day = list(filter(None, [course["SUN"], course["MON"], course["TUE"],
                                 course["WED"], course["THU"], course["FRI"], course["SAT"]]))
        exists = False
        for sub in divided["subclass"]:
            if course["CLASS SECTION"] == sub["section"]:
                exists = True
                if len(day) > 0 and day[0] not in sub["day"]:
                    sub["stime"].append(course["START TIME"])
                    sub["etime"].append(course["END TIME"])
                    sub["venue"].append(course["VENUE"])
                    sub["day"].append(day[0])

        if not exists:
            newsub = {
                "section": course["CLASS SECTION"],
                "stime": [course["START TIME"]],
                "etime": [course["END TIME"]],
                "venue": [course["VENUE"]]
            }
            if len(day) > 0:
                newsub["day"] = [day[0]]
            else:
                newsub["day"] = ["N/A"]
            divided["subclass"].append(newsub)
    return divided


here = os.path.dirname(os.path.abspath(__file__))
filename = os.path.join(here, '2022-23_class_timetable_20220721.json')
result_filename = os.path.join(here, 'simplified.json')

with open(filename, 'rt', encoding='UTF8') as json_data:
    courses = json.load(json_data)

prevCourse = courses[0]
sameCourse = [courses[0]]
newJSON = []

for course in courses:
    if prevCourse["COURSE CODE"] == course["COURSE CODE"]:
        sameCourse.append(course)
    else:
        newJSON.append(divide_subclasses(sameCourse))
        sameCourse.clear()
        sameCourse.append(course)
        prevCourse = course


with open(result_filename, "w") as outfile:
    json.dump(newJSON, outfile)
