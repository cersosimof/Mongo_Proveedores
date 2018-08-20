$( document ).ready(function() {
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

$("#botonModificar").click(function() {
  alert('Proveedor modificado con exito.')
})

function eliminar(empresa) {
  if(confirm("Desea eliminar este registro?")){
 var nroExp = $('#expediente').val()
   location.href="/eliminar/"+nroExp+"/"+empresa;
  }
}




