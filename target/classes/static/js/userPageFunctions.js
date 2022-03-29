let email = sessionStorage.getItem("email");
let password = sessionStorage.getItem("password");
$.ajax({
    url: "http://localhost:8080/api/user/" + email + "/" + password + "",
    //url: "http://150.230.86.149:80/api/user/" + email + "/" + password + "",
    type: "GET",
    datatype: "JSON",
    success: function (item) {
        let userList = "<ul>";
        userList += "<li><b>Identificación:</b> " + item.identification + "</li>";
        userList += "<li><b>Nombre:</b> " + item.name + "</li>";
        userList += "<li><b>N° Celular:</b> " + item.cellPhone + "</li>";
        userList += "<li><b>Email:</b> " + item.email + "</li>";
        userList += "<li><b>Zona:</b> " + item.zone + "</li>";
        userList += "<li><b>Tipo:</b> " + item.type + "</li>";
        userList += "</ul>";
        $("#userData").append(userList);
        let salesman = item.name;
        let zone = item.zone;
        sessionStorage.setItem("salesman", salesman);
        sessionStorage.setItem("zone", zone);
        sessionStorage.setItem("user", JSON.stringify(item));
    }
});

//VALIDATE whether an user has a zone
function orderForm(){
    let zone= sessionStorage.getItem("zone");
    if (zone==""){
        alert("Usted no tiene zona asignada, comuníquese con su Coordinador")
    } else{
        window.location.href = "orderForm.html";
    }
}
