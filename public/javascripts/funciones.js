// function eliminar(id, nroExp) {
//    if(confirm("Desea eliminar este registro?")){
//     location.href="/eliminar/"+nroExp+"/"+id;
//    }
// }


  $('#tags').click(function() {
    var ramosEmpresas = [];
    // var nombresEmpresas = [];

  $.ajax({
    method: "POST",
    url: "/buscarRamo",  
    success: function(data) {
    var ramos = JSON.parse(data);
    superArray = []
    for(var i = 0; i < ramos.length; i++ ) {
      var todosLosRamos = ramos[i]._id.split(',')
      for(var x = 0; x < todosLosRamos.length; x++ ) {
        var ramoEmpresa = todosLosRamos[x];

        if(ramoEmpresa[0] == " ") {
        ramoEmpresa = ramoEmpresa.split("");
        ramoEmpresa.shift()
        ramoEmpresa = ramoEmpresa.join("")
        }

        var pregunta = ramosEmpresas.indexOf(todosLosRamos[x])
        if(pregunta === (-1)) {
          ramosEmpresas.push(ramoEmpresa)
        }
      }
    }}

  })



//    $.ajax({
//     method: "POST",
//     url: "/buscarEmpresas",  
//     success: function(data) {
//       var empresas = JSON.parse(data);
//       for(var i = 0; i < empresas.length; i++ ) {
//         nombresEmpresas.push(empresas[i].nombre)
//       }
//     }
//  });

    $( "#tags" ).autocomplete({
      source: ramosEmpresas,
      select: function(event, ui) {   
          location.href="/ver/" + ui.item.value;
      }
    });

    $( "#ramo" ).autocomplete({
      source: ramosEmpresas
    });

//     $( "#agregaEmpresa, #buscadorModif" ).autocomplete({
//       source: nombresEmpresas
//     });

    });



