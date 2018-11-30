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

    course.courseName = $('.course-id-input').val();
    course.title = $('.course-name-input').val();
    course.description = $('.course-idk-input').val();

    var onSuccess = function(data) {
        //idk dont rly need nuffin
    }
    var onFailure = function() {
        //idk dont rly need nuffin
    }
    makePostRequest('api/addcourse', course, onSuccess, onFailure);
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

var submitTAPosition = function(e) {

    var postData = {};
    postData.facultyId = $('.ta-application-facultyid-input').val();
    postData.courseName = $('.ta-application-coursename-input').val();
    postData.studentGrade = $('.ta-application-grade-input').val();
    
    postData.studentSemesterTaken = $('.ta-application-season-input').val() + " " + $('.ta-application-year-input').val();
    

    if($('.ta-application-grade-input').val() === "true") {
        postData.priorTA = true;
    }
    else {
        postData.priorTA = false;
    }

    var onSuccess = function(data) {
        console.log(data);
    }
    var onFailure = function() {

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