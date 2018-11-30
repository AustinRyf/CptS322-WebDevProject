var cancel = function(e) {
    $(e.target.parentElement).hide();
    $('.gui').show();
};

var showInstructorCreate = function() {
    $('.gui').hide();
    $('.instructor-create').show();
};
var showAddCourse = function(e) {
    $('.view-profile').hide();
    $('.instructor-add-course').show();
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

var showTAApplicationForm = function(e) {
    $(e.target.parentElement).hide();
    $('.apply-ta-position').show();
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