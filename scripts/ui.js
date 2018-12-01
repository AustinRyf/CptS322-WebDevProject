var cancel = function(e) {
    $(e.target.parentElement).hide();
    $('.gui').show();
};


var cancelBigPage = function (e) {
    $(e.target.parentElement).hide();
   
    if (($('.user-type').val()) == "instructor") {
        goBackToInstructorPage();
    }
    else {
        goBackToStudentPage();
    }
}

var goBackToStudentPage = function (e) {
    $('.change-password-form').hide();
    $('.backgroundBig').show();
    $('.backgroundSmall').hide();

    $('.bannerStudent').show();
    $('.view-ta-positions').show();
    $('.student-display-current-applications').show();
    $('.display-profile-student').hide();
    $('.edit-student-profile').hide();
    $('.apply-ta-position').hide();
}

var goBackToInstructorPage = function (e) {
    $('.change-password-form').hide();
    $('.instructor-display-ta-applications').show();
    $('.view-courses').show();
    $('.backgroundBig').show();
    $('.backgroundSmall').hide();
    $('.bannerInstructor').show();
   
    $('.display-profile-instructor').hide();
    $('.edit-instructor-profile').hide();
    $('.instructor-add-course').hide();
    $('.change-password-form').hide();
}

var cancelStudentPage = function (e) {
    $(e.target.parentElement).hide();

    goBackToStudentPage();
}

var showInstructorCreate = function() {
    $('.gui').hide();
    $('.instructor-create').show();
};
var showAddCourse = function (e) {


    $('.backgroundBig').hide();
    $('.backgroundSmall').show();

    $('.display-profile-instructor').hide();
    $('.edit-instructor-profile').hide();

    $('.view-profile').hide();
    $('.instructor-add-course').show();
    $('.instructor-display-ta-applications').hide();
    $('.view-courses').hide();
};

var showStudentCreate = function() {
    $('.gui').hide();
    $('.student-create').show();
};

var showLogin = function() {
    $('.login-message').text('Log in...');
    $('.gui').hide();
    $('.login').show();
};

var showChangePassword = function(e) {
    $(e.target.parentElement).hide();
    $('.change-password-form').show();
}

var insertCourse = function(course) {
    var newElement = $(courseTemplateHTML);

    newElement.attr('id', course.id);
    newElement.find('.course-name').text(course.course_name);
    newElement.find('.course-title').text(course.title);
    newElement.find('.course-description').text(course.description);
    newElement.find('.instructor').text(course.instructor);

    courses.append(newElement);
}

var insertCurrentTAApplication = function(taApplication) {

    var newElement = $(currentTAApplicationTemplateHTML);

    newElement.attr('id', taApplication.id);
    newElement.find('.current-application-instructor-id').text(taApplication.faculty_id);
    newElement.find('.current-application-course-name').text(taApplication.course_name);
    newElement.find('.current-application-status').text(taApplication.application_status);

    currentTAApplications.append(newElement);
}



var showTAApplicationForm = function (e) {
    $(e.target.parentElement).hide();

    $('.backgroundBig').hide();
    $('.backgroundSmall').show();

   
    $('.apply-ta-position').show();
    $('.bannerStudent').show();

    $('.edit-student-profile').hide();
    $('.display-profile-student').hide();
    $('.view-ta-positions').hide();
    $('.student-display-current-applications').hide();
}

var insertTAPosition = function(course) {

    var newElement = $(allTAApplicationsTemplateHTML);
    
    newElement.attr('id', course.id);
    newElement.find('.student-ta-position-course-name').text(course.course_name);
    newElement.find('.student-ta-position-instructor').text(course.instructor);
    newElement.find('.student-ta-position-instructor-id').text(course.student_grade);

    allTAApplications.append(newElement);
}

var insertInstructorTAApplication = function(taApplication) {

    var newElement = $(instructorTAApplicationTemplateHTML);

    newElement.attr('id', taApplication.id);
    newElement.find('.instructor-ta-application-student-id').text(taApplication.student_id);
    newElement.find('.instructor-ta-application-course-name').text(taApplication.course_name);
    newElement.find('.instructor-ta-application-grade-recieved').text(taApplication.student_grade);
    newElement.find('.instructor-ta-application-semester-taken').text(taApplication.student_semester_taken);
    newElement.find('.instructor-ta-application-prior-ta').text(taApplication.prior_ta);
    newElement.find('.instructor-ta-application-date').text(taApplication.application_date);

    instructorTAApplications.append(newElement);
}