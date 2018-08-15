function eliminar(empresa) {
   if(confirm("Desea eliminar este registro?")){
  var nroExp = $('#expediente').val()
    location.href="/eliminar/"+nroExp+"/"+empresa;
   }
}


$('#tags, #ramo').click(function() {
var ramosEmpresas = [];
  $.ajax({
    method: "POST",
    url: "/buscarRamo",  
    success: function(data) {
    var ramos = JSON.parse(data);
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
      }
      $( "#tags" ).autocomplete({
        source: ramosEmpresas,
        select: function(event, ui) {   
            location.href="/ver/" + ui.item.value;
        }
      });
    
      $( "#ramo" ).autocomplete({
        source: ramosEmpresas
      });
    }
  })
})


$('#agregaEmpresa, #buscadorModif').click(function() {
  $.ajax({
    method: "POST",
    url: "/buscarEmpresas",  
    success: function(data) {
      var nombresEmpresas = JSON.parse(data);
      $( "#agregaEmpresa, #buscadorModif" ).autocomplete({
        source: nombresEmpresas
      });
    }
  })
})








