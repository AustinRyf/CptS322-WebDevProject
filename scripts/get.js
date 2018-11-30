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

var showProfile = function() {
    $('.backgroundBig').hide();
    $('.backgroundSmall').show();


    var showInstructor = function(data)
    {
        $('.instructor-add-course').hide();
        $('.edit-instructor-profile').hide();



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
        $('.edit-student-profile').hide();
        $('.display-profile-instructor').hide();
        $('.apply-ta-position').hide();

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

            $('.view-ta-positions').hide();
            $('.student-display-current-applications').hide();


            $('.gui').hide();
            $('.view-profile').show();
        }
        else 
        {
            showInstructor(data);
            $('.instructor-display-ta-applications').hide();
            $('.view-courses').hide();

            
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

var editProfile = function (e) {
    $('.backgroundSmall').show();
    $('.backgroundBig').hide();
    var onSuccess = function(data) {

        var editStudentProfile = function(data) {
            $('.gui').hide();
            $('.view-ta-positions').hide();
            $('.student-display-current-applications').hide();
            $('.apply-ta-position').hide();
            $('.bannerStudent').show();
            $('.display-profile-student').hide();

            $(".edit-student-email").attr('placeholder', 'Current Email: ' + data.student.email);
            $(".edit-major").attr('placeholder', 'Current Major: ' + data.student.major);
            $(".edit-gpa").attr('placeholder', 'Current GPA: ' + data.student.gpa);
            $(".edit-graduation-date").attr('placeholder', 'Current Graduation Date: ' + data.student.graduation_date);

            $('.edit-student-profile').show();
        }
        var editInstructorProfile = function() {
            $('.gui').hide();
            $('.display-profile-instructor').hide();
            $('.instructor-add-course').hide();
            $('.backgroundBig').hide();
            $('.instructor-display-ta-applications').hide();
            $('.view-courses').hide();

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

var displayCourses = function() {
    var onSuccess = function(data) {
        console.log(data);

        $('#courses').empty();

        for(i = 0; i < data.courses.length; i++) {
            insertCourse(data.courses[i]);
        }
        $('.gui').hide();
        $(".courses").show();
        $('.view-courses').show();
        
    }
    var onFailure = function() {

    }
    makeGetRequest('api/courses', onSuccess, onFailure);
}

var logout = function(e) {
    var onSuccess = function(data) {    
        console.log(data)
        $('.gui').show();
        $('.instructor-display-ta-applications').hide();
        $('.view-courses').hide();
        $('.bannerInstructor').hide();

        $('.backgroundBig').hide();
        $('.backgroundSmall').show();
        $('.bannerStudent').hide();
        $('.view-ta-positions').hide();
        $('.student-display-current-applications').hide();
    }
    var onFailure = function() {
        alert ("logout GET request failed")
    }

    makeGetRequest('api/logout', onSuccess, onFailure);
}

//shows list of applied courses and their status
//student -> view profile -> view stastus of current applications
var showCurrentTAApplications = function(e) {
    var onSuccess = function(data) {

        console.log(data);



        $('#current-applications').empty();

        if (e != undefined) {
            $(e.target.parentElement).hide();
        }

        for(i = 0; i < data.applications.length; i++) {
            insertCurrentTAApplication(data.applications[i]);
        }
        
        $('.gui').hide();
        $('.student-display-current-applications').show();
    }
    var onFailure = function() {
        
    }

    makeGetRequest('api/get-current-applications', onSuccess, onFailure);
}

//on student page. lists all available courses regardless of approval
//student -> view profile -> available ta positions
var showAllTAPositions = function(e) {
    var onSuccess = function(data) {
        console.log(data);
        $('#view-all-ta-positions').empty();

        if (e != undefined) {
            $(e.target.parentElement).hide();
        }

        for(i = 0; i < data.courses.length; i++) {
            insertTAPosition(data.courses[i]);
        }
        $('.display-profile-student').hide();
        $('.view-ta-positions').show();
    }
    var onFailure = function() {

    }
    makeGetRequest('api/get-all-positions', onSuccess, onFailure);
}

//this is where instructor can accept and reject
var showInstructorCurrentApplications = function(e) {
    var onSuccess = function(data) {
        console.log(data);

        
        $('#instructor-applications').empty();

        if (e != undefined) {
            $(e.target.parentElement).hide();
        }
        
        $('.instructor-display-ta-applications').show();
        $('.backgroundBig').show();
        $('.backgroundSmall').hide();

        for(i = 0; i < data.applications.length; i++) {
            insertInstructorTAApplication(data.applications[i]);
        }

        
       
        console.log(document.getElementById('view-courses'));
    }
    var onFailure = function(data) {
        alert("instructor applications GET request failed");
    }
    makeGetRequest('api/get-instructor-applications', onSuccess, onFailure);
}
