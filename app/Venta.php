<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Venta extends Model
{
    protected $table = 'empleados';
    protected $primaryKey = 'documentoident';
    public $incrementing = false;
    protected $fillable = array(
        'documentoident',
        'fechaingreso',
        'nombrepersona',
        'apellidopersona',
        'telefonoprincipalpersona',
        'telefonosecundariopersona',
        'celularpersona',
        'direccionpersona',
        'correopersona',
        'idcargo',
        'fotoempleado',
        'salarioempleado');
    public $timestamps = false;

}
