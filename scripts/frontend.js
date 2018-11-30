var studentProfileTemplateHTML;

var instructorProfileTemplateHTML;

var courseTemplateHTML;

var courses;

var currentTAApplicationTemplateHTML;
var currentTAApplications;

var allTAApplicationsTemplateHTML;
var allTAApplications;

var instructorTAApplicationTemplateHTML;
var instructorTAApplications;

var apiUrl = "http://127.0.0.1:5000/"

var Frontend = (function() {



    var start = function() {

        $('.courses').hide();

        $(document.getElementsByTagName("form")).hide();
        $(document.getElementsByClassName('gui')).show(); 


        $('.instructor-create-cancel').click(cancel);
        $('.student-create-cancel').click(cancel);
        $('.login-cancel').click(cancel); 
        $('.profile-back-student').click(cancel);
        $('.profile-back-instructor').click(cancel);
        $('.add-course-cancel').click(cancel);
        $('.view-courses-back').click(cancel);
        $('.edit-instructor-back').click(cancel);
        $('.edit-student-back').click(cancel);
        $('.new-password-cancel').click(cancel);
        $('.apply-ta-position-back').click(cancel);
        $('.student-view-ta-positions-back').click(cancel);
        $('.instructor-view-ta-positions-back').click(cancel);
        $('.student-view-ta-applications-back').click(cancel);
        




        $('.login-submit').click(login);

        $('.edit-instructor-submit').click(instructorEditSubmit);
        $('.edit-student-submit').click(studentEditSubmit);

        $('.add-course-button').click(showAddCourse)

        $('.instructor-create-gui-button').click(showInstructorCreate);
        $('.student-create-gui-button').click(showStudentCreate);
        $('.login-gui-button').click(showLogin);
        $('.view-profile-gui-button').click(showProfile);
        $('.add-course-gui-button').click(showAddCourse);
        $('.add-course-submit').click(addCourse);
        $('.view-courses-gui-button').click(displayCourses);
        $('.edit-profile').click(editProfile);
        $('.change-password').click(showChangePassword);
        $('.logout-gui-button').click(logout);
        $('.student-list-ta-positions-button').click(showAllTAPositions);
        $('.view-ta-positions-apply').click(showTAApplicationForm);
        $('.student-view-current-applications').click(showCurrentTAApplications);
        $('.instructor-list-ta-applications-button').click(showInstructorCurrentApplications);

        $('.instructor-create-submit').click(createInstructor);
        $('.student-create-submit').click(createStudent);
        $('.new-password-submit').click(submitNewPassword);
        $('.apply-ta-position-submit').click(submitTAPosition);

        $('.current-applications').on('click', '.current-application-delete-button', deleteCurrentApplication);

        $('.instructor-applications').on('click', '.approve-ta-application-button', instructorApproveApplication);
        $('.instructor-applications').on('click', '.decline-ta-application-button', instructorRejectApplication);

        courseTemplateHTML = $('.course')[0].outerHTML;
        courses = $(".courses");
        courses.html('');

        currentTAApplicationTemplateHTML = $('.current-student-application')[0].outerHTML;
        currentTAApplications = $('.current-applications');
        currentTAApplications.html('');

        allTAApplicationsTemplateHTML = $('.ta-position-student')[0].outerHTML;
        allTAApplications = $('.view-all-ta-positions');
        allTAApplications.html('');

        instructorTAApplicationTemplateHTML = $('.ta-application-instructor')[0].outerHTML;
        instructorTAApplications = $('.instructor-applications');
        instructorTAApplications.html('');

        console.log(currentTAApplicationTemplateHTML);
        console.log(instructorTAApplicationTemplateHTML);

     };


        
     return {
         start: start
     };
    
})();
