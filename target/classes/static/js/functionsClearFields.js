//-----------------------------------------------------------------------------------------------------
//Clear fields in the forms
function clearFields(formName){
    if (formName == "logInForm"){
        $("#userEmail").val("");
        $("#userPassword").val("");
    }else if (formName == "registerUserForm"){
        $("#newIden").val("");
        $("#newName").val("");
        $("#newBDay").val("");
        $("#newMonthBDay").val("");
        $("#newAddress").val("");
        $("#newCellPhone").val("");
        $("#newEmail").val("");
        $("#newPwd").val("");
        $("#zone").val("");
        $("#type").val("");
    }else if (formName == "updateUserForm"){
        $("#idUser").val("");
        $("#updateIden").val("");
        $("#updateName").val("");
        $("#updateBDay").val("");
        $("#updateMonthBDay").val("");
        $("#updateAddress").val("");
        $("#updateCellPhone").val("");
        $("#updateEmail").val("");
        $("#updatePwd").val("");
        $("#updateZone").val("");
        $("#updateType").val("");
    }else if (formName == "registerProductForm"){
        $("#newRef").val("");
        $("#newCategory").val("");
        $("#newSize").val("");
        $("#newDes").val("");
        $("#newAva").val("");
        $("#newPrice").val("");
        $("#newQua").val("");
        $("#newPhoto").val("");
    }else if (formName=="updateProductForm"){
        $("#updateRef").val("");
        $("#updateCategory").val("");
        $("#updateSize").val("");
        $("#updateDes").val("");
        $("#updateAva").val("");
        $("#updateEmail").val("");
        $("#updatePrice").val("");
        $("#updateQua").val("");
        $("#updatePhoto").val("");
    }else if (formName=="admForm"){
        $("#admEmail").val("");
        $("#admPassword").val("");
    }else if (formName=="orderForm"){
        $("#newRDay").val("");
        $("#newStatus").val("");
        $("#newSalesman").val("");
     }
}
