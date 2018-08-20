function eliminar(empresa) {
   if(confirm("Desea eliminar este registro?")){
  var nroExp = $('#expediente').val()
    location.href="/eliminar/"+nroExp+"/"+empresa;
   }
}














