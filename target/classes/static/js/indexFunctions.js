//This function put the mouse focus in the first field of the form when the page is loaded
function initialState() {
    $("#userEmail").focus();
}
//This function verifies if an user exist and allows to verify entry fields in different forms
function userValidation(formName) {
    if (formName == "logInForm") {
        let email = $("#userEmail").val();
        let password = $("#userPassword").val();
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);

        if ((email == "") || (password == "")) {
            alert("Debe diligenciar todos los campos");
        } else {
            if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))) {
                alert("Email no es un formato válido");
                email.focus();
            } else {
                $.ajax({
                    url: "http://localhost:8080/api/user/" + email + "/" + password + "",
                    //url: "http://150.230.86.149:80/api/user/" + email + "/" + password + "",
                    type: "GET",
                    datatype: "JSON",
                    success: function (item) {
                        console.log(item);
                        userVerification(item);
                    }
                });
                clearFields(formName);
            }
        }
    } else if (formName == "admForm"){
        let admEmail = $("#admEmail").val();
        let admPassword = $("#admPassword").val();

        if ((admEmail == "") || (admPassword == "")) {
            alert("Debe diligenciar todos los campos");
        } else {
            if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(admEmail))) {
                alert("La dirección de email es incorrecta.");
            } else {
                $.ajax({
                    url: "http://localhost:8080/api/user/" + admEmail + "/" + admPassword + "",
                    //url: "http://150.230.86.149:80/api/user/" + admEmail + "/" + admPassword + "",
                    type: "GET",
                    datatype: "JSON",
                    success: function (item) {
                        console.log(item);
                        admVerification(item);
                    }
                });
                clearFields(formName);
            }
        }
    }
}
//This Function allows to verify if the user is registered in the DB as ASE (asesor) or COORD (coordinador)
function userVerification(user){
    if (user.identification === null){
        alert("Usted no se encuentra registrado, por favor comuníquese con el administrador");
    } else if (user.type === "ASE") {
        alert("Bienvenido " + user.name);
        console.log(user.id);
        window.location.href = "userPage.html";
    } else if (user.type === "COORD"){
        alert("Bienvenido " + user.name);
        console.log(user.id);
        window.location.href = "coordPage.html";
    } else if (user.type === "ADM"){
        alert("Usted es un administrador\npor favor ingrese en el link de la parte inferior")
    }
}
//This Function allows to verify if the user is registered in the DB as ADM (administrador)
function admVerification(admon){
    if (admon.type != "ADM"){
        alert("Usted no es administrador de esta Aplicación Web");
    }else{
        alert("Bienvenido " + admon.name);
        console.log(admon.id);
        window.location.href = "admon.html";
    }
}