
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
            contentType: "test/plain",
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
    };

    var createStudent = function(e) {
        e.preventDefault();

        var student = {}; 

        student.id = $('.student-id-input').val();
        student.firstName = $('.student-first-name-input').val();
        student.lastName = $('.student-last-name-input').val();
        student.email = $('.student-email-input').val();
        student.major = $('.student-major-input').val();
        student.gpa = $('.student-gpa-input').val();
        student.graduationDate = $('.student-graduation-input').val();
        student.password = $('.student-id-input').val();

        var onSuccess = function(data) {
            console.log(data);
            cancel();
        };

        var onFailure = function() {
            console.log("POST request failed\n");
        };
        makePostRequest(apiUrl + "api/student", student, onSuccess, onFailure);
    };

    var start = function() {
        studentProfileTemplateHTML = $('.student-profile-template').html();
        instructorProfileTemplateHTML = $('.instructor-profile-template').html();

        $(document.getElementsByTagName("form")).hide();
        $(document.getElementsByClassName('gui')).show(); 


        $('.instructor-create-cancel').click(cancel);
        $('.student-create-cancel').click(cancel);
        $('.login').click(cancel);


        $('.instructor-create-gui-button').click(showInstructorCreate);
        $('.student-create-gui-button').click(showStudentCreate);
        $('.login-gui-button').click(showLogin);


        $('.instructor-create-submit').click(createInstructor);
        $('.student-create-submit').click(createStudent);
     };


        
     return {
         start: start
     };
    
})();
