let BASEURL = "https://api.screentimeshowdown.tech";
let Routes = {
    BASEURL: BASEURL,
    AUTH: {
        LOGIN: `${BASEURL}/api/login`,
        REGISTER: `${BASEURL}/api/register`,
    },
    STUDENT: {
        PUT: `${BASEURL}/api/profile/student/put`,
        GET: `${BASEURL}/api/profile/student/get`,
    },
    TEACHER: {
        PUT: `${BASEURL}/api/profile/teacher/put`,
        GET: `${BASEURL}/api/profile/teacher/get`,
        SEARCH: `${BASEURL}/api/teacher/search`,
        REQUEST: `${BASEURL}/api/teacher/request`,
        HANDLEREQ: `${BASEURL}/api/teacher/handlereq`,
    }
};

export default Routes;
