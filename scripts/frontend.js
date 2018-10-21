
var Frontend = (function() {

    var studentProfileTemplateHTML;

    var instructorProfileTemplateHTML;

    var apiUrl = "http://localhost:5000/"

    var makeGetRequest = function(url, onSuccess, onFailure) {
        $.ajax({
            type: 'GET',
            url: apiUrl + url,
            dataType: "json",
            error: onFailure,
            success: onSuccess
        });
    };
    var makePostRequest = function(url, data, onSuccess, onFailure) {
        $.ajax({
            type: 'POST',
            url: apiUrl + url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: onSuccess,
            error: onFailure
        });
    };
    
    var cancel = function(e) {
        $(e.target.parentElement).hide();
        $('.gui').show();
    };

    var showInstructorCreate = function() {
        $('.gui').hide();
        $('.instructor-create').show();
    };

    var showInstructorProfile = function() {
        $('.gui').hide();
        $('.instructor-view-profile').show();
    };

    var showStudentProfile = function() {
        $('.gui').hide();
        $('.student-view-profile').show();
    };

    var showAddClass = function() {
        $('.gui').hide();
        $('.instructor-add-course').show();
    };

    var showStudentCreate = function() {
        $('.gui').hide();
        $('.student-create').show();
    };

    var showLogin = function() {
        $('.gui').hide();
        $('.login').show();
    };

    var createInstructor = function(e) {
        e.preventDefault();

        var instructor = {};

        instructor.facultyId = $('.instructor-id-input').val();
        instructor.firstName = $('.instructor-first-name-input').val();
        instructor.lastName = $('.instructor-last-name-input').val();
        instructor.email = $('.instructor-email-input').val();
        instructor.phone = $('.instructor-phone-input').val();
        instructor.office = $('.instructor-office-input').val();
        instructor.password = $('.instructor-password-input').val();

        var onSuccess = function(data) {
            console.log(data);
            $(e.target.parentElement).hide();
            $('.gui').show();
        };

        var onFailure = function() {
            console.log("POST request failed\n");
        };
        makePostRequest("api/instructor", instructor, onSuccess, onFailure);
    };

    var createStudent = function(e) {
        e.preventDefault();

        var student = {}; 

        student.studentId = $('.student-id-input').val();
        student.firstName = $('.student-first-name-input').val();
        student.lastName = $('.student-last-name-input').val();
        student.email = $('.student-email-input').val();
        student.major = $('.student-major-input').val();
        student.gpa = $('.student-gpa-input').val();
        student.graduationDate = $('.student-graduation-input').val();
        student.password = $('.student-id-input').val();

        var onSuccess = function(data) {
            console.log(data);
            $(e.target.parentElement).hide();
            $('.gui').show();
        };

        var onFailure = function() {
            console.log("POST request failed\n");
        };
        makePostRequest("api/student", student, onSuccess, onFailure);
    };

    var start = function() {
        studentProfileTemplateHTML = $('.student-profile-template').html();
        instructorProfileTemplateHTML = $('.instructor-profile-template').html();

        $(document.getElementsByTagName("form")).hide();
        $(document.getElementsByClassName('gui')).show(); 


        $('.instructor-create-cancel').click(cancel);
        $('.student-create-cancel').click(cancel);
        $('.login-cancel').click(cancel); 
        $('.instructor-profile-back').click(cancel);
        $('.student-profile-back').click(cancel);
        $('.add-course-cancel').click(cancel);


        $('.instructor-create-gui-button').click(showInstructorCreate);
        $('.student-create-gui-button').click(showStudentCreate);
        $('.login-gui-button').click(showLogin);
        $('.instructor-view-profile-gui-button').click(showInstructorProfile);
        $('.student-view-profile-gui-button').click(showStudentProfile);
        $('.add-course-gui-button').click(showAddClass);



        $('.instructor-create-submit').click(createInstructor);
        $('.student-create-submit').click(createStudent);

     };


        
     return {
         start: start
     };
    
})();
