// $("#botonAlta").click(function() {
//     alert('Gracias por la informacion, se actualizaran los promedios de participacion de las empresas.')
//   });








function validar () {

    //VALIDAR CORREO
    var correo = $("#idCorreo").val().split("");
    var count = 0;

    for (i = 0; i < correo.length; i++) {
        if((correo[i] == "@") || (correo[i] == ".")) {
            var count = count + 1;
        }
    };
    console.log('pepe')
    if(count >= 2) {
        count = 1;
    } else {
        count = 0
    }

    if(count == 0) {
        alert("Corroborar correo electronico");
        return false
    } else {
        alert("Proveedor ingresado en base de datos")
        return true
    }


}