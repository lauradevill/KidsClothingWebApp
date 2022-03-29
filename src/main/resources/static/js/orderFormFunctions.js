//FILL OUT salesman field in orderForm
function fillOutFields(){
    let salesman = sessionStorage.getItem("salesman");
    $("#newSalesman").val(salesman);

    let today = new Date(); //Today date
    let month = today.getMonth() + 1; //Obtaining month
    let day = today.getDate(); //Obtaining day
    let year = today.getFullYear(); //Obtaining year

    if(day < 10) day ='0'+ day; //Add zero if day < 10
    if(month < 10) month ='0' + month //Add zero if month < 10

    $("#newRDay").val(year + "-" + month + "-" + day);
    console.log(year + "-" + month + "-" + day);
}
//BRING ALL PRODUCTS and PAINT them in orderForm
function bringProducts(){
    $.ajax({
        url: "http://localhost:8080/api/clothe/all",
        //url: "http://150.230.86.149:80/api/clothe/all",
        type: "GET",
        datatype: "JSON",
        success: function (items) {
            console.log(items);
            productsGalery(items);
        }
    });
}
//PAINT PRODUCTS in orderForm
function productsGalery(products){
    let myProducts='<div class="container"><div class="row">';
    for(let i = 0; i < products.length; i++){
        myProducts+=`
             <div class="card m-2" style="width: 18rem;">
                 <img class="card-img-top" src="${products[i].photography}" alt="Card image">
                 <div class="card-body">
                     <h5 class="card-title">Referencia: ${products[i].reference}</h5>
                     <h6 class="card-subtitle mb-2 text-muted">Categoría: ${products[i].category}</h6>
                     <h6 class="card-subtitle mb-2 text-muted">Talla: ${products[i].size}</h6>
                     <h6 class="card-subtitle mb-2 text-muted">Disponible: ${products[i].availability}</h6>
                     <h6 class="card-subtitle mb-2 text-muted">Precio: $ ${products[i].price}</h6>
                     <p class="card-text">${products[i].description}</p>
                                   
                     <button onclick='addProduct("${products[i].reference}")'>Agregar</button>
                 </div>
             </div>`
    }
    myProducts+="</div></div>";
    $("#products").append(myProducts);
}
//ADD a PRODUCT in a table in order to see which products are going to be added to order
function addProduct(id){
    $("#quantity").focus();
    $.ajax({
        url: "http://localhost:8080/api/clothe/" + id + "",
        //url: "http://150.230.86.149:80/api/clothe/" + id + "",
        type: "GET",
        datatype: "JSON",
        success: function (item) {
            let newRow = "<tr>";
            newRow += "<td id='cell'>" + item.reference + "</td>";
            newRow += "<td><small>" + item.category + "</small></td>";
            newRow += "<td><small>" + item.size + "</small></td>";
            newRow += "<td><small>" + item.availability + "</small></td>";
            newRow += "<td><small>" + item.price + "</small></td>";
            newRow += "<td><small>" + item.description + "</small></td>";
            newRow += "<td id='quantity'><small><input type=\"number\" class=\"form-control\" id=\"quantities\"></small></td>";
            newRow += "<td><button onclick='$(this).closest(\"tr\").remove();'>Eliminar</button>";
            newRow += "</tr>"
            $("#orderTable").append(newRow);
        }
    });
}
//OBTEIN product reference and clothe from the table: orderTable
function obteinClothesFromOrderTable(){
    let table = document.getElementById("orderTable");
    let reference;
    let products = {};
    //console.log (table);
    //console.log(table.rows.length);
    //console.log(table.rows[1].cells[0].innerHTML);

    for (let i = 1; i < table.rows.length; i++) {
        reference = table.rows[i].cells[0].innerHTML;

        $.ajax({
            url: "http://localhost:8080/api/clothe/" + reference + "",
            //url: "http://150.230.86.149:80/api/clothe/" + reference + "",
            type: "GET",
            datatype: "JSON",
            success: function (item) {
                //console.log(item);
                sessionStorage.setItem("product", JSON.stringify(item));
            }
        });
        let product = JSON.parse(sessionStorage.getItem("product"));
        console.log(reference);
        console.log(product);
        products.reference = product;
        console.log(products);
    }
    return products;
}
//OBTEIN reference and quantities from the table: orderTable in orderForm.html
function obteinQuantitiesFromOrderTable(){
    let table = $("#orderTable");
    let reference;
    let quantities;
    for (let i = 1; i < table.length; i++) {
        reference = table.rows[i].cells[0].innerText;
        quantities = table.rows[i].cells[6].innerText;
    }
    return {reference : quantities};
}
//SEND an ORDER in orderForm.html
function sendOrder(formName){
    let salesman = JSON.parse(sessionStorage.getItem("user"));
    console.log(salesman);
    console.log(obteinClothesFromOrderTable());
    let myData = {
        registerDay:$("#newRDay").val(),
        status:$("#newStatus").val(),
        salesMan: salesman,
        products: obteinClothesFromOrderTable(),
        quantities: obteinQuantitiesFromOrderTable(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://localhost:8080/api/order/new",
        //url: "http://150.230.86.149:80/api/order/new",
        type: "POST",
        data: dataToSend,
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        success: function (answer) {
            console.log(answer);
            alert("Su orden se ha enviado con exito " + "N° Orden: "+ answer.id);
            clearFields(formName);
        }
    });
}