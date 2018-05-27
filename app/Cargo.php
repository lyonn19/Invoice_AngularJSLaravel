<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    protected $primaryKey = 'idcargo';
    public $incrementing = false;
    protected $fillable = array('idcargo', 'nombrecargo');
    public $timestamps = false;
}
