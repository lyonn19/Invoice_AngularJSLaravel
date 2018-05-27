/**
 * Created by Leonardo on 11/17/2016.
 */

$(document).ready(function(){
    console.log('Hola Mundo');
    $('#btn_add').click(function(){
        agregar();
    });
    $('#bt_del').click(function(){
        eliminar(id_fila_selected);
    });
});

var count = 0;
var id_fila_selected = [];
function agregar(){
    count++;
    var fila = '<tr class="selecccionada" id="fila'+count+'" onclick="seleccionar(this.id);"><td><input type="text" class="form-control" placeholder="Bodega" id="bodega"></td><td><input type="text" class="form-control" placeholder="Codigo Producto" id="codproducto"></td><td><input type="text" class="form-control" placeholder="Cantidad" id="cantidad"></td><td><input type="text" class="form-control" placeholder="Detalle" id="detalle"></td><td><input type="text" class="form-control" placeholder="PVP Unitario" id="pvpunitario"></td><td><input type="text" class="form-control" placeholder="IVA" id="ivaa"></td><td><input type="text" class="form-control" placeholder="Total" id="totala"></td></tr>';
    $('#tabla').append(fila);
}

function seleccionar(id_fila){
    if($('#'+id_fila).hasClass('seleccionada')){
        $('#'+id_fila).removeClass('seleccionada');
    }
    else{
        $('#'+id_fila).addClass('seleccionada');
    }
    id_fila_selected=id_fila;
}

function eliminar(id_fila){
    $('#'+id_fila).remove();
}


