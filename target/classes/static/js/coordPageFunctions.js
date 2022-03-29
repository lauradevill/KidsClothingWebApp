//Load COORD information
let email = sessionStorage.getItem("email");
let password = sessionStorage.getItem("password");
$.ajax({
    url: "http://localhost:8080/api/user/" + email + "/" + password + "",
    //url: "http://150.230.86.149:80/api/user/" + email + "/" + password + "",
    type: "GET",
    datatype: "JSON",
    success: function (item) {
        console.log(item);
        let coordList = "<ul>";
        coordList += "<li><b>Identificación:</b> " + item.identification + "</li>";
        coordList += "<li><b>Nombre:</b> " + item.name + "</li>";
        coordList += "<li><b>N° Celular:</b> " + item.cellPhone + "</li>";
        coordList += "<li><b>Email:</b> " + item.email + "</li>";
        coordList += "<li><b>Zona:</b> " + item.zone + "</li>";
        coordList += "<li><b>Tipo:</b> " + item.type + "</li>";
        coordList += "</ul>";
            $("#coordData").append(coordList);
            let salesman = item.name;
            let zone = item.zone;
            sessionStorage.setItem("salesman", salesman);
            sessionStorage.setItem("zone", zone);
        }
});

//Shor Orders list
function orderList(){
    let zone = sessionStorage.getItem("zone");
    $.ajax({
        url: "http://localhost:8080/api/order/zona/" + zone + "",
        //url: "http://150.230.86.149:80/api/order/zona/" + zone + "",
        type: "GET",
        datatype: "JSON",
        success: function (items) {
            console.log(items);
            let ordersTable = "<table class=\"table table-striped table-responsive\">";
            ordersTable += "<th>Id</th>";
            ordersTable += "<th>Fecha de Registro</th>";
            ordersTable+= "<th>Asesor</th>";
            ordersTable += "<th>Estado</th>";
            ordersTable += "<th>Ver detalle</th>";

            for (i = 0; i < items.length; i++) {
                ordersTable += "<tr>";
                ordersTable += "<td><small>" + items[i].id + "</small></td>";
                ordersTable += "<td><small>" + items[i].registerDay + "</small></td>";
                ordersTable += "<td><small>" + items[i].salesMan.name + "</small></td>";
                ordersTable += "<td><small>" + items[i].status + "</small></td>";

                myTable += "<td> <button onclick='orderDetail(" + items[i].id + ")'>Ver detalle</button>";
                //myTable += "<td> <button onclick='deleteData(\"usersAdmon\"," + items[i].id + ")'>Borrar</button>";
                ordersTable += "</tr>";
            }
            ordersTable += "</table>";
            $("#ordersTable").append(ordersTable);
        }
    });
}