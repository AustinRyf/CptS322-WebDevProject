
var Frontend = (function() {

    var studentProfileTemplateHTML;

    var instructorProfileTemplateHTML;

    var classTemplateHTML;

    var courses;

    var apiUrl = "http://127.0.0.1:5000/"

    var makeGetRequest = function(url, onSuccess, onFailure) {
        $.ajax({
            type: 'GET',
            url: apiUrl + url,
            dataType: "json",
            error: onFailure,
            crossDomain: true,
            credentials: 'same-origin',
            success: onSuccess,
            xhrFields: {
                withCredentials: true
            }
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
            crossDomain: true,
            credentials: 'same-origin',
            error: onFailure,
            xhrFields: {
                withCredentials: true
            }
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
    var showAddClass = function(e) {
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

    var showProfile = function() {

        var showInstructor = function(data)
        {
            var profile = $(instructorProfileTemplateHTML);

            profile.attr('id', data.id);

            $('.display-profile-student').hide();
            $('.display-profile-instructor').show();

            $('.profile-name-instructor').text(data.instructor.last_name + ", " + data.instructor.first_name);
            $('.profile-email-instructor').text(data.instructor.email);
            $('.profile-phone-instructor').text(data.instructor.phone);
            $('.profile-faculty-id').text(data.instructor.faculty_id);
            $('.profile-office-instructor').text(data.instructor.office);
        };

        var showStudent = function(data)
        {
            var profile = $(studentProfileTemplateHTML);

            profile.attr('id', data.id);

            $('.display-profile-instructor').hide();
            $('.display-profile-student').show();

            $('.profile-name-student').text(data.student.last_name + ", " + data.student.first_name);
            $('.profile-email-student').text(data.student.email);
            $('.profile-student-id').text(data.student.student_id);
            $('.profile-gpa').text(data.student.gpa);
            $('.profile-graduation-date').text(data.student.graduation_date);
            $('.profile-major').text(data.student.major);
        };
        var onSuccess = function(data)
        {
            console.log(data);
            if(data.status == -1)
            {
               
                $('.gui').hide();
                $('.login').show();
                $('.login-message').text('Please login first.');
                
            }
            else if(data.type == "student")
            {
                showStudent(data);
                
                $('.gui').hide();
                $('.view-profile').show();
            }
            else 
            {
                showInstructor(data);
                
                $('.gui').hide();
                $('.view-profile').show();
            }
        };
        var onFailure = function()
        {
            console.log("GET Request failed");
        };
        makeGetRequest("api/profile", onSuccess, onFailure);
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
        student.password = $('.student-password-input').val();

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

    var addCourse = function(e) {
        var course = {};

        course.courseName = $('.class-id-input').val();
        course.title = $('.class-name-input').val();
        course.description = $('.class-idk-input').val();

        var onSuccess = function(data) {
            //idk dont rly need nuffin
        }
        var onFailure = function() {
            //idk dont rly need nuffin
        }
        makePostRequest('api/addcourse', course, onSuccess, onFailure);
    }

    var insertCourse = function(course) {
        var newElement = $(classTemplateHTML);

        newElement.attr('id', course.id);
        newElement.find('.course-name').text(course.course_name);
        newElement.find('.course-title').text(course.title);
        newElement.find('.course-description').text(course.description);
        newElement.find('.instructor').text(course.instructor);

        courses.append(newElement);
    }

    var displayCourses = function() {
        var onSuccess = function(data) {
            console.log(data);

            $('#courses').empty();

            for(i = 0; i < data.courses.length; i++) {
                insertCourse(data.courses[i]);
            }
            $('.gui').hide();
            $('.view-courses').show();
            courses.show();
        }
        var onFailure = function() {

        }
        makeGetRequest('api/courses', onSuccess, onFailure);

    }

    var login = function(e) {

    	var data = {};

    	data.username = $('.login-username').val();
    	data.userType = $('.user-type').val();
    	data.password = $('.login-password').val();

    	var onSuccess = function(data) {
    		console.log(data);
    		$(e.target.parentElement).hide();
    		$('.gui').show();
    	};
    	var onFailure = function() {
    		console.log("Incorrect username or password!");
    	};
    	makePostRequest("api/login", data, onSuccess, onFailure);
    };



    var editProfile = function(e) {
        var onSuccess = function(data) {

            var editStudentProfile = function(data) {
                $('.gui').hide();

                $(".edit-student-email").attr('placeholder', 'Current Email: ' + data.student.email);
                $(".edit-major").attr('placeholder', 'Current Major: ' + data.student.major);
                $(".edit-gpa").attr('placeholder', 'Current GPA: ' + data.student.gpa);
                $(".edit-graduation-date").attr('placeholder', 'Current Graduation Date: ' + data.student.graduation_date);

                $('.edit-student-profile').show();
            }
            var editInstructorProfile = function() {
                $('.gui').hide();

                $(".edit-instructor-email").attr('placeholder', 'Current Email: ' + data.instructor.email);
                $(".edit-phone").attr('placeholder', 'Current Phone: ' + data.instructor.phone);
                $(".edit-office").attr('placeholder', 'Current Office: ' + data.instructor.office);
    
                $('.edit-instructor-profile').show();
            }

            if(data.type == "student")
                editStudentProfile(data);
            else if(data.type == "instructor")
                editInstructorProfile(data);
            else {
                $('.gui').hide();
                $('.login-message').text('Not logged in!');
                $('.login').show();
            }
        }
        var onFailure = function() {

        }
        makeGetRequest('api/profile', onSuccess, onFailure);
    }

    var studentEditSubmit = function(e) {

        var newData = {};

        newData.email = $(".edit-student-email").val();
        newData.major = $(".edit-major").val();
        newData.gpa = $(".edit-gpa").val();
        newData.graduationDate = $(".edit-graduation-date").val();

        var onSuccess = function(data) {
            console.log(data);
            $('.edit-student-profile').hide();
            $('.gui').show();
        }
        var onFailure = function() {

        }

        makePostRequest("api/edit_student", newData, onSuccess, onFailure);
    }
    var instructorEditSubmit = function(e) {

        var newData = {};

        newData.email = $(".edit-instructor-email").val();
        newData.phone = $(".edit-phone").val();
        newData.office = $(".edit-office").val();
        
        
        var onSuccess = function(data) {
            console.log(data);
            $('.edit-instructor-profile').hide();
            $('.gui').show();
        }
        var onFailure = function() {

        }

        makePostRequest("api/edit_instructor", newData, onSuccess, onFailure);
    }

    var submitNewPassword = function(e) {

        var postData = {};
        postData.password = $('.old-password').val();
        postData.newPassword = $('.new-password').val();
        postData.confirmNewPassword = $('.confirm-new-password').val();

        var onSuccess = function(data) {
            console.log(data)
        }
        var onFailure = function() {
            if(postData.newPassword != postData.confirmNewPassword)
                alert("New Passwords don't match!")
            else
                alert("Old password incorrect!")

        }
        makePostRequest('api/change_password', postData, onSuccess, onFailure);
    }

    var showChangePassword = function(e) {
         $(e.target.parentElement).hide();
         $('.change-password-form').show();
    }

    var logout = function(e) {
        var onSuccess = function(data) {    
            console.log(data)
        }
        var onFailure = function() {
            alert ("logout GET request failed")
        }

        makeGetRequest('api/logout', onSuccess, onFailure);
    }

    var start = function() {

        studentProfileTemplateHTML = $('.display-profile-student').outerHTML;
        instructorProfileTemplateHTML = $('.display-profile-instructor').outerHTML;
        classTemplateHTML = $('.course')[0].outerHTML;
        console.log(classTemplateHTML);

        courses = $(".courses");
        courses.html('');

        $('.courses').hide();
        //document.getElementById('courses').remove('.course');

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


        $('.login-submit').click(login);

        $('.edit-instructor-submit').click(instructorEditSubmit);
        $('.edit-student-submit').click(studentEditSubmit);

        $('.add-course-button').click(showAddClass)

        $('.instructor-create-gui-button').click(showInstructorCreate);
        $('.student-create-gui-button').click(showStudentCreate);
        $('.login-gui-button').click(showLogin);
        $('.view-profile-gui-button').click(showProfile);
        $('.add-course-gui-button').click(showAddClass);
        $('.add-course-submit').click(addCourse);
        $('.view-courses-gui-button').click(displayCourses);
        $('.edit-profile').click(editProfile);
        $('.change-password').click(showChangePassword);
        $('.logout-gui-button').click(logout);

        $('.instructor-create-submit').click(createInstructor);
        $('.student-create-submit').click(createStudent);
        $('.new-password-submit').click(submitNewPassword);
     };


        
     return {
         start: start
     };
    
})();
