//OPEN usersAdmon page
function usersAdmon(){
    window.location.href = "usersAdmon.html";
}
//OPEN productsAdmon page
function productsAdmon(){
    window.location.href = "productsAdmon.html";
}
//OPEN registerUserForm page
function registerUserForm(){
    window.location.href = "registerUserForm.html";
}
//OPEN registerProductForm page
function registerProductForm(){
    window.location.href = "registerProductForm.html";
}
//CREATE a new User
function createUser(){
    let formName = "registerUserForm";
    let newIden = $("#newIden").val();
    let newName = $("#newName").val();
    let newBDay = $("#newBDay").val();
    let newMonthBDay = $("#newMonthBDay").val();
    let newAddress = $("#newAddress").val();
    let newCellPhone = $("#newCellPhone").val();
    let newEmail = $("#newEmail").val();
    let newPwd = $("#newPwd").val();

    if (newIden == "" || newName == "" || newBDay == "" || newMonthBDay == "" || newAddress == "" ||
        newCellPhone == "" || newEmail == "" || newPwd == "") {
        alert("Se deben diligenciar todos los campos");
    } else {
        if ((!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(newEmail)))) {
            alert("La dirección de email es incorrecta.");
        } else {
            if (newPwd.length < 6) {
                alert("La contraseña debe tener mínimo 6 caractéres");
            } else {
                if (emailVerification(newEmail)) {
                    alert("El email ingresado ya existe");
                    clearFields(formName);
                } else {
                    console.log("llego al ajax de traer la cuenta de filas")
                    $.ajax({
                        url: "http://localhost:8080/api/user/all",
                        //url: "http://150.230.86.149:80/api/user/all",
                        async: false,
                        type: "GET",
                        datatype: "JSON",
                        success: function (answer) {
                            console.log(answer);
                            let lastUser= answer[answer.length - 1];
                            console.log(lastUser);
                            let idUser = lastUser.id + 1;//Hay que buscar el id del último usuario creado
                            console.log(idUser);
                            let myData = {
                                id:idUser,
                                identification: $("#newIden").val(),
                                name: $("#newName").val(),
                                address: $("#newAddress").val(),
                                cellPhone: $("#newCellPhone").val(),
                                email: $("#newEmail").val(),
                                password: $("#newPwd").val(),
                                zone: $("#zone").val(),
                                type: $("#type").val(),
                            };
                            let dataToSend = JSON.stringify(myData);
                            $.ajax({
                                url: "http://localhost:8080/api/user/new",
                                //url: "http://150.230.86.149:80/api/user/new",
                                type: "POST",
                                data: dataToSend,
                                contentType: "application/json; charset=utf-8",
                                datatype: "JSON",
                                success: function (answer) {
                                    console.log(answer);
                                    alert("Usuario registrado con éxito");
                                    clearFields(formName);
                                }
                            });
                        }
                    });
                }
            }
        }
    }
}
//CREATE a new product
function createProduct(){
    let formName = "registerProductForm";
    let newRef = $("#newRef").val();
    let newCategory = $("#newCategory").val();
    let newSize = $("#newSize").val();
    let newDes = $("#newDes").val();
    let newAva = $("#newAva").val();
    let newPrice = $("#newPrice").val();
    let newQua = $("#newQua").val();
    let newPhoto = $("#newPhoto").val();

    if (newRef == "" || newCategory == "" || newSize == "" || newDes == "" || newAva == "" || newPrice == ""
        || newQua == "" || newPhoto == "") {
        alert("Se deben diligenciar todos los campos");
    } else {
        let myData = {
            reference: $("#newRef").val(),
            category: $("#newCategory").val(),
            size: $("#newSize").val(),
            description: $("#newDes").val(),
            availability: $("#newAva").val(),
            price: $("#newPrice").val(),
            quantity: $("#newQua").val(),
            photography: $("#newPhoto").val(),
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://localhost:8080/api/clothe/new",
            //url: "http://150.230.86.149:80/api/clothe/new",
            type: "POST",
            data: dataToSend,
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            success: function (answer) {
                console.log(answer);
                alert("Producto registrado con éxito");
                //clearFields(formName);
            }
        });
    }
}
//Allows VERIFY if a new user email exists in the DB
function emailVerification(email) {
    let emailExits = false;
    $.ajax({
        url: "http://localhost:8080/api/user/emailexist/" + email + "",
        //url: "http://150.230.86.149:80/api/user/emailexist/" + email + "",
        async: false,
        type: "GET",
        datatype: "JSON",
        success: function (answer) {
            console.log(answer);
            emailExits = answer;
        }
    });
    return emailExits;
}
//GET INFORMATION from the DB and show in a table form
function showData(formName) {
    if (formName == "usersAdmon") {
        $('#usersAdmonResult').empty();
        $.ajax({
            url: "http://localhost:8080/api/user/all",
            //url: "http://150.230.86.149:80/api/user/all",
            async: false,
            type: "GET",
            datatype: "JSON",
            success: function (answer) {
                console.log(answer);
                paintAnswer(formName, answer);
            }
        });
    } else if (formName == "productsAdmon"){
        $('#productsAdmonResult').empty();
        $.ajax({
            url: "http://localhost:8080/api/clothe/all",
            //url: "http://150.230.86.149:80/api/clothe/all",
            type: "GET",
            datatype: "JSON",
            success: function (answer) {
                console.log(answer);
                paintAnswer(formName, answer);
            }
        });
    }
}
//SHOW INFORMATION brought from backend in a form in the frontend
function paintAnswer(formName, items) {
    let myTable = "<table class=\"table table-striped table-responsive\">";
    if (formName == "usersAdmon") {
        myTable += "<th>Identificación</th>";
        myTable += "<th>Nombre</th>";
        myTable += "<th>Dirección</th>";
        myTable += "<th>Celular</th>";
        myTable += "<th>Email</th>";
        myTable += "<th>Contraseña</th>";
        myTable += "<th>Zona</th>";
        myTable += "<th>Tipo</th>";
        myTable += "<th>Actualizar</th>";
        myTable += "<th>Borrar</th>";

        for (i = 0; i < items.length; i++) {
            myTable += "<tr>";
            myTable += "<td><small>" + items[i].identification + "</small></td>";
            myTable += "<td><small>" + items[i].name + "</small></td>";
            myTable += "<td><small>" + items[i].address + "</small></td>";
            myTable += "<td><small>" + items[i].cellPhone + "</small></td>";
            myTable += "<td><small>" + items[i].email + "</small></td>";
            myTable += "<td><small>" + items[i].password + "</small></td>";
            myTable += "<td><small>" + items[i].zone + "</small></td>";
            myTable += "<td><small>" + items[i].type + "</small></td>";

            myTable += "<td> <button onclick='bringData(\"usersAdmon\"," + items[i].id + ")'>Actualizar</button>";
            myTable += "<td> <button onclick='deleteData(\"usersAdmon\"," + items[i].id + ")'>Borrar</button>";
            myTable += "</tr>";
        }
        myTable += "</table>";
        $("#usersAdmonResult").append(myTable);
    } else if (formName == "productsAdmon") {
        myTable += "<th>Referencia</th>";
        myTable += "<th>Categoría</th>";
        myTable += "<th>Talla</th>";
        myTable += "<th>Descripción</th>";
        myTable += "<th>Disponibilidad</th>";
        myTable += "<th>Precio</th>";
        myTable += "<th>Cantidad</th>";
        myTable += "<th>Imagen</th>";
        myTable += "<th>Actualizar</th>";
        myTable += "<th>Borrar</th>";

        for (i = 0; i < items.length; i++) {
            myTable += "<tr>";
            let reference = '"'+ items[i].reference + '"';
            console.log (reference);
            myTable += "<td><small>" + items[i].reference + "</small></td>";
            myTable += "<td><small>" + items[i].category + "</small></td>";
            myTable += "<td><small>" + items[i].size + "</small></td>";
            myTable += "<td><small>" + items[i].description + "</small></td>";
            myTable += "<td><small>" + items[i].availability + "</small></td>";
            myTable += "<td><small>" + items[i].price + "</small></td>";
            myTable += "<td><small>" + items[i].quantity + "</small></td>";
            myTable += "<td><small>" + items[i].photography + "</small></td>";

            myTable += "<td> <button onclick='bringData(\"productsAdmon\","+ reference +")'>Actualizar</button>";
            myTable += "<td> <button onclick='deleteData(\"productsAdmon\","+ reference +")'>Borrar</button>";
            myTable += "</tr>";
        }
        myTable += "</table>";
        $("#productsAdmonResult").append(myTable);
    }
}
//BRING DATA into a form
function bringData(formName,idElement) {
    if (formName == "usersAdmon"){
        console.log(idElement);
        $("#admonUsersBar").load("updateUserForm.html");
        dataCharge(formName, idElement)
        alert("Modifíque los campos que desee");
    }else if (formName == "productsAdmon"){
        console.log(idElement);
        $("#admonProductsBar").load("updateProductForm.html");
        dataCharge(formName, idElement)
        alert("Modifíque los campos que desee");
    }
}
//GET INFORMATION for updating a form
function dataCharge(formName, idElement) {
    if (formName == "usersAdmon"){
        $.ajax({
            url:"http://localhost:8080/api/user/" + idElement + "",
            //url: "http://150.230.86.149:80/api/user/" + idElement + "",
            type:"GET",
            datatype:"JSON",
            success: function (answer) {
                let item = answer;
                $("#idUser").val(item.id);
                $("#updateIden").val(item.identification);
                $("#updateName").val(item.name);
                $("#updateAddress").val(item.address);
                $("#updateCellPhone").val(item.cellPhone);
                $("#updateEmail").val(item.email);
                $("#updatePwd").val(item.password);
                $("#updateZone").val(item.zone);
                $("#updateType").val(item.type);
            }
        });
    } else if (formName == "productsAdmon"){
        console.log("llego al data charge");
        $.ajax({
            url:"http://localhost:8080/api/clothe/"+ idElement +"",
            //url: "http://150.230.86.149:80/api/clothe/"+ idElement +"",
            type:"GET",
            datatype:"JSON",
            success: function (answer) {
                //console.log("recibí respuesta");
                console.log(answer)
                let item = answer;
                $("#updateRef").val(item.reference);
                $("#updateCategory").val(item.category);
                $("#updateSize").val(item.size);
                $("#updateDes").val(item.description);
                $("#updateAva").val(item.availability);
                $("#updatePrice").val(item.price);
                $("#updateQua").val(item.quantity);
                $("#updatePhoto").val(item.photo);
            }
        });
    }

}
//EDIT an element (user or product) information
function editData(formName){
    if (formName=="updateUserForm"){
        let myData = {
            id: $("#idUser").val(),
            identification: $("#updateIden").val(),
            name: $("#updateName").val(),
            address: $("#updateAddress").val(),
            cellPhone: $("#updateCellPhone").val(),
            email: $("#updateEmail").val(),
            password: $("#updatePwd").val(),
            zone: $("#updateZone").val(),
            type: $("#updateType").val(),
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://localhost:8080/api/user/update",
            //url: "http://150.230.86.149:80/api/user/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            success: function (answer) {
                alert("Se ha actualizado con éxito");
                clearFields(formName);
            }
        });
    }else if (formName=="updateProductForm"){
        let myData = {
            reference: $("#updateRef").val(),
            category: $("#updateCategory").val(),
            size: $("#updateSize").val(),
            description: $("#updateDes").val(),
            availability: $("#updateAva").val(),
            email: $("#updateEmail").val(),
            price: $("#updatePrice").val(),
            quantity: $("#updateQua").val(),
            photography: $("#updatePhoto").val(),
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://localhost:8080/api/clothe/update",
            //url: "http://150.230.86.149:80/api/clothe/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            success: function (answer) {
                alert("Se ha actualizado con éxito");
                clearFields(formName);
            }
        });
    }
}
//DELETE an element (user or product)
function deleteData(formName, idElement){
    if (formName== "usersAdmon") {
        let myData = {
            id: idElement
        };
        let id = idElement;
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://localhost:8080/api/user/" + id + "",
            //url: "http://150.230.86.149:80/api/user/" + id + "",
            type: "DELETE",
            data: dataToSend,
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            success: function (answer) {
                showData(formName);
                alert("Se ha borrado con éxito");
            }
        });
    } else if (formName == "productsAdmon"){
        let myData = {
            reference: idElement
        };
        let reference= idElement;
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://localhost:8080/api/clothe/" + reference + "",
            //url: "http://150.230.86.149:80/api/clothe/" + reference + "",
            type: "DELETE",
            data: dataToSend,
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            success: function (answer) {
                showData(formName);
                alert("Se ha borrado con éxito");
            }
        });
    }
}
