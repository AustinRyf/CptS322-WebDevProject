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

    if (instructor.facultyId.length != 10) {
        alert("Faculty ID must be 10 characters");
        return;
    }
    if (isNaN(parseFloat(instructor.facultyId)) == true) {
        alert("Faculty ID must be a number");
        return;
    }
    if (instructor.firstName.length < 1 || instructor.firstName.length > 32) {
        alert("First name must be greater than 0 characters and less than 32 characters");
        return;
    }
    if (instructor.lastName.length < 1 || instructor.lastName.length > 32) {
        alert("Last name must be greater than 0 characters and less than 32 characters");
        return;
    }
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(instructor.email) == false) {
        alert("Not a valid email (Please enter in form XXXX@XXXX.XXX)\n");
        return;
    }
    if(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(instructor.phone) == false) {
        alert("Not a valid phone number (Please enter in form XXX-XXX-XXXX)");
        return;
    }
    if (instructor.office.length < 1 || instructor.office.length > 32) {
        alert("Office must be greater than 0 characters and less than 32 characters");
        return;
    }
    if(instructor.password.length < 1 || instructor.password.length > 64) {
        alert("Password must be greater than 0 characters and less than 64 characters");
        return;
    }

    var onSuccess = function(data) {
        console.log(data);

        if(data.status === -1) {
            alert("Duplicate instructor profile!");
        }
        else {
            $(e.target.parentElement).hide();
            $('.gui').show();
        }
    };

    var onFailure = function(data) {
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


    if (student.studentId.length != 10) {
        alert("Student ID must 10 characters");
        return;
    }
    if (isNaN(parseFloat(student.studentId)) == true) {
        alert("Student ID must be a number");
        return;
    }
    if (student.firstName.length < 1 || student.firstName.length > 32) {
        alert("First name must be greater than 0 characters and less than 32 characters")
        return;
    }
    if (student.lastName.length < 1 || student.lastName.length > 32) {
        alert("Last name must be greater than 0 characters and less than 32 characters")
        return;
    }
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(student.email) == false) {
        alert("Not a valid email\n");
        return;
    }

    if (student.major.length < 1 || student.major.length > 64) {
        alert("Major must be greater than 0 characters and less than 64 characters");
        return;
    }
    if (student.gpa.length == 0) {
        alert("Must enter a GPA");
        return;
    }
    if (isNaN(parseFloat(student.gpa)) == true) {
        alert("GPA must be a number");
        return;
    }
    if (parseFloat(student.gpa) < 0.0){
        alert("GPA must be greater than 0.0");
        return;
    }
    if (parseFloat(student.gpa) > 4.0){
        alert("GPA must be less than 4.0");
        return;
    }
    if (student.graduationDate.length < 1 || student.graduationDate.length > 64) {
        alert("Graduation date must be greater than 0 characters and less than 64 characters");
        return;
    }
    if(student.password.length < 1 || student.password.length > 64) {
        alert("Password must be greater than 0 characters and less than 64 characters");
        return;
    }

    var onSuccess = function(data) {
        console.log(data);

        if(data.status === -1) {
            alert("Duplicate student profile!");
        }
        else {
            $(e.target.parentElement).hide();
            $('.gui').show();
        }
    };

    var onFailure = function(data) {
        console.log("POST request failed\n");
    };
    makePostRequest("api/student", student, onSuccess, onFailure);
};

var addCourse = function (e) {
    
    var course = {};

    course.courseName = $('.course-id-input').val();
    course.title = $('.course-name-input').val();
    course.description = $('.course-idk-input').val();

    if (course.courseName.length < 1 || course.courseName.length > 64) {
        alert("Course name must be greater than 0 characters and less than 64 characters");
        return;
    }
    if (course.title.length < 1 || course.title.length > 64) {
        alert("Course title must be greater than 0 characters and less than 64 characters");
        return;
    }
    if (course.courseName.length < 1 || course.courseName.length > 612) {
        alert("Course name must be greater than 0 characters and less than 612 characters");
        return;
    }

    var onSuccess = function (data) {
        
        if(data.status === -1) {
            alert("Duplicate course!");
        }
        else {
            $('.instructor-add-course').hide();
            showInstructorCurrentApplications();
            displayCourses();
        }
    }
    var onFailure = function() {
       console.log("POST request failed\n");
    }
    makePostRequest('api/addcourse', course, onSuccess, onFailure);
}

var login = function(e) {

	var data = {};

	data.username = $('.login-username').val();
	data.userType = $('.user-type').val();
	data.password = $('.login-password').val();

    if(data.username.length < 1) {
        alert("Enter a username");
        return;
    }

    if(data.userType == null) {
        alert("Select a user type");
        return;
    }

    if(data.password.length < 1) {
        alert("Enter a password");
        return;
    }

    var onSuccess = function (data) {
        $(e.target.parentElement).hide();

        if (($('.user-type').val()) == "student") {

             //STUDENT:
            console.log("you are a student");

            $('.backgroundSmall').hide();
            $('.backgroundBig').show();

            $('.instructor-display-ta-applications').hide();
            $('.view-courses').hide();

            $('.bannerStudent').show();
            showCurrentTAApplications();
            showAllTAPositions();                       
        }
        else  {
            //INSTRUCTOR:
            console.log("you are an instructor");

            $('.backgroundSmall').hide();
            $('.backgroundBig').show();

            $('.view-ta-positions').hide();
            $('.student-display-current-applications').hide();

            $('.bannerInstructor').show();
            showInstructorCurrentApplications();  //reject/accept
            displayCourses(); //display all posted courses
            


        }
    
        
        
        $('.gui').show();
        //$(".view-courses").append($(".instructor-display-ta-applications").remove());
	};
	var onFailure = function() {
		console.log("Incorrect username or password!");
	};
	makePostRequest("api/login", data, onSuccess, onFailure);
};

var studentEditSubmit = function(e) {

    var newData = {};

    newData.email = $(".edit-student-email").val();
    newData.major = $(".edit-major").val();
    newData.gpa = $(".edit-gpa").val();
    newData.graduationDate = $(".edit-graduation-date").val();

    if(newData.email.length > 0) {
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(newData.email) == false) {
            alert("Not a valid email\n");
            return;
        }
    }

    if(newData.gpa.length > 0) {
        if (isNaN(parseFloat(newData.gpa)) == true) {
            alert("GPA must be a number");
            return;
        }
    }

    if(newData.gpa.length > 0) {
        if (parseFloat(newData.gpa) < 0.0){
            alert("GPA must be greater than 0.0");
            return;
        }
    }

    if(newData.gpa.length > 0) {
        if (parseFloat(newData.gpa) > 4.0){
            alert("GPA must be less than 4.0");
            return;
        }
    }
    
    var onSuccess = function(data) {
        console.log(data);

        if(data.status === -1) {
            alert("Duplicate student email!");
        }
        else {
            $('.edit-student-profile').hide();
            goBackToStudentPage();
        }      
    }
    var onFailure = function() {
        alert("POST Request failed");
    }

    makePostRequest("api/edit_student", newData, onSuccess, onFailure);
}
var instructorEditSubmit = function(e) {

    var newData = {};

    newData.email = $(".edit-instructor-email").val();
    newData.phone = $(".edit-phone").val();
    newData.office = $(".edit-office").val();
    
    if(newData.email.length > 0) {
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(newData.email) == false) {
            alert("Not a valid email (Please enter in form XXXX@XXXX.XXX)\n");
            return;
        }
    }
    if(newData.phone.length > 0) {
        
        if(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(newData.phone) == false) {
            alert("Not a valid phone number (Please enter in form XXX-XXX-XXXX)");
            return;
        }
    }
    if(newData.office.length > 0) {
        if (newData.office.length < 1 || newData.office.length > 32) {
            alert("Office must be greater than 0 characters and less than 32 characters");
            return;
        }
    }
    
    var onSuccess = function(data) {
        console.log(data);

        if(data.status === -1) {
            alert("Duplicate instructor email!");
        }
        else {
            goBackToInstructorPage();
        }
    }
    var onFailure = function() {
        alert("POST Request failed");
    }

    makePostRequest("api/edit_instructor", newData, onSuccess, onFailure);
}

var submitNewPassword = function(e) {

    var postData = {};
    postData.password = $('.old-password').val();
    postData.newPassword = $('.new-password').val();
    postData.confirmNewPassword = $('.confirm-new-password').val();

    if(postData.newPassword.length < 1 || postData.newPassword.length > 64) {
        alert("New password must be greater than 0 characters and less than 64 characters");
        return;
    }

    if(postData.confirmPassword.length < 1 || postData.confirmPassword.length > 64) {
        alert("Confirmed new password must be greater than 0 characters and less than 64 characters");
        return;
    }

    var onSuccess = function(data) {
        console.log(data)
        if (($('.user-type').val()) == "instructor") {
            goBackToInstructorPage();
            console.log("Instructor password successfully changed");
        }
        else {
            goBackToStudentPage();
            console.log("Student password successfully changed");
        }

    }
    var onFailure = function() {
        if(postData.newPassword != postData.confirmNewPassword)
            alert("New Passwords don't match!")
        else
            alert("Old password incorrect!")

    }
    makePostRequest('api/change_password', postData, onSuccess, onFailure);
}

var submitTAPosition = function(e) {

    var postData = {};
    postData.facultyId = $('.ta-application-facultyid-input').val();
    postData.courseName = $('.ta-application-coursename-input').val();
    postData.studentGrade = $('.ta-application-grade-input').val();
    
    postData.studentSemesterTaken = $('.ta-application-season-input').val() + " " + $('.ta-application-year-input').val();
    
    if (isNaN(parseFloat(postData.facultyId)) == true) {
        alert("Faculty ID must be a number");
        return;
    }
    if (postData.facultyId.length != 10) {
        alert("Faculty ID must be 10 characters");
        return;
    }
    if (postData.courseName.length < 1 || postData.courseName.length > 32) {
        alert("Course name must be greater than 0 characters and less than 32 characters");
        return;
    }
    if (postData.studentGrade <= 2) {
        alert("Student grade must be less than or equal to 2 characters");
        return;
    }
    if (postData.studentSemesterTaken < 1 || postData.studentSemesterTaken > 10) {
        alert("Semester taken must be greater than 0 characters or less than 10 characters");
        return;
    }


    if($('.ta-application-grade-input').val() === "true") {
        postData.priorTA = true;
    }
    else {
        postData.priorTA = false;
    }

    var onSuccess = function (data) {

        console.log(data);
        if(data.status === -1) {
            alert("Duplicate ta application!");
        } 
        else {
            goBackToStudentPage();
            showCurrentTAApplications();
            showAllTAPositions(); 
        }   
    }
    var onFailure = function() {
        alert("POST Request failed");
    }

    makePostRequest('api/submit-ta-application', postData, onSuccess, onFailure);
}

var deleteCurrentApplication = function(e) {
    var applicationId = $(e.target).parents('.current-student-application').attr('id');

    var onSuccess = function(data) {
        $(e.target.parentElement).remove();
    }
    var onFailure = function() {
        alert("unable to delete application");
    }

    makePostRequest("api/delete-ta-application/" + applicationId, null, onSuccess, onFailure);
}

var instructorApproveApplication = function(e) {
    var applicationId = $(e.target).parents('.ta-application-instructor').attr('id');

    console.log(e.target.parentElement);
    var onSuccess = function(data) {
        $('.instructor-display-ta-applications').hide();
        $('.gui').show();
    }
    var onFailure = function() {
        alert("unable to approve application");
    }

    makePostRequest("api/approve-ta-application/" + applicationId, null, onSuccess, onFailure);
}

var instructorRejectApplication = function(e) {
    var applicationId = $(e.target).parents('.ta-application-instructor').attr('id');

    var onSuccess = function(data) {
        $('.instructor-display-ta-applications').hide();
        $('.gui').show();
    }
    var onFailure = function() {
        alert("unable to reject application");
    }
    makePostRequest("api/reject-ta-application/" + applicationId, null, onSuccess, onFailure);
}