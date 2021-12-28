function checkEmailUnique(form) {
    url = "/users/check_email";
    csrf = $("input[name='_csrf']").val();
    userEmail = $("#email").val();
    userId = $("#id").val();
    params = {id: userId, email: userEmail,_csrf: csrf}



    $.post(url, params, function(response) {
        if(response == "Ok") {
            form.submit();
        }
        else if(response == "Duplicated") {
            showModalDialog("Warning", "There is another user having the email " + userEmail)
        }

    })
    return false;
}