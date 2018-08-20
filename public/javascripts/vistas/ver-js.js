var porcentajes = document.querySelectorAll(".limitarDecimales");
        for(var i = 0; i < porcentajes.length; i++ ) {
          if(porcentajes[i].innerHTML > 71) {
            porcentajes[i].style.color = "green"
          } else if ((40 < porcentajes[i].innerHTML) && (porcentajes[i].innerHTML < 70)) {
            porcentajes[i].style.color = "orange"
          } else if (porcentajes[i].innerHTML < 39) {
            porcentajes[i].style.color = "red"
          }
        }


        $( document ).ready(function() {
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
