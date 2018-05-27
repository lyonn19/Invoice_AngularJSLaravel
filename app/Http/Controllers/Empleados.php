<?php


namespace App\Http\Controllers;
use App\Empleado;
use App\Cargo;
use Illuminate\Http\Request;
use App\Http\Requests;

class Empleados extends Controller
{
    public function index()
    {
        $employees = Empleado::all();

        if(!$employees){
            return \Response::json([
                'status' => false,
                'data' => [],
                'message' => 'Get all employees failed !'
            ]);
        }else{
            return \Response::json([
                'status' => true,
                'data' => $employees,
                'message' => 'Get all employees success !'
            ]);
        }
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request)
    {
        $employee = new Empleado();

        if ($request->hasFile('photo')) {

            $file = $request->file('photo');
            $folder = public_path('uploads');

            $filename = $file->getClientOriginalName();
            $pathfile1 = rand(100,10000).'-'.$filename;

            $ext = $file->getClientOriginalExtension();
            $allowed = array('jpg','png','gif');

            if(in_array($ext, $allowed)){

                $employee->fechaingreso = $request->input('fechaingreso');
                $employee->documentoident = $request->input('documentoident');
                $employee->nombrepersona = $request->input('nombrepersona');
                $employee->apellidopersona = $request->input('apellidopersona');
                $employee->telefonoprincipalpersona = $request->input('telefonoprincipalpersona');
                $employee->telefonosecundariopersona = $request->input('telefonosecundariopersona');
                $employee->celularpersona = $request->input('celularpersona');
                $employee->direccionpersona= $request->input('direccionpersona');
                $employee->correopersona = $request->input('correopersona');
                $employee->idcargo = $request->input('idcargo');
                $employee->fotoempleado = 'public/uploads/'.$pathfile1;

                $employee->save();

                $file->move($folder, $pathfile1);
                return response()->json([
                    'status' => true,
                    'message' => 'Add new member success !'
                ]);
            }else{
                return response()->json([
                    'status' => false,
                    'message' => 'Photo format wrong !'
                ]);
            }
        }else{

            $employee->fechaingreso = $request->fechaingreso;
            $employee->documentoident = $request->documentoident;
            $employee->nombrepersona = $request->nombrepersona;
            $employee->apellidopersona = $request->apellidopersona;
            $employee->telefonoprincipalpersona = $request->telefonoprincipalpersona;
            $employee->telefonosecundariopersona = $request->telefonosecundariopersona;
            $employee->celularpersona = $request->celularpersona;
            $employee->direccionpersona= $request->direccionpersona;
            $employee->correopersona = $request->correopersona;
            //$employee->fotoempleado  = $request->input('fotoempleado');
            $employee->idcargo = $request->idcargo;

            if($employee->save()){
                return response()->json([
                    'status' => true,
                    'message' => 'Add new employee success but not photo !'
                ]);
            }else{
                return response()->json([
                    'status' => false,
                    'message' => 'Create employee failed !'
                ]);
            }
        }
    }



    public function uploadImg(Request $request)
    {

        if ($request->hasFile('myFile')) {
            $file = $request->file('myFile');
            $folder = public_path('uploads');

            $filename = $file->getClientOriginalName();
            $pathfile = rand(100,10000).'-'.$filename;

            $ext = $file->getClientOriginalExtension();
            $allowed = array('jpg','png','gif');

            if(in_array($ext, $allowed)){
                $file->move($folder, $pathfile);
                return response()->json([
                    'path' => 'public/uploads/'.$pathfile,
                    'status' => true
                ]);
            }else{
                return response()->json([
                    'status' => false,
                    'message' => 'Photo format wrong !'
                ]);
            }
        }
    }

    public function edit($id)
    {
        $employee = Empleado::find($id);
        return response()->json($employee);
    }

    public function show($id){
        $employee_detail = Empleado::where('documentoident', '=' , $id)->get();
        return response()->json([
            'data' => $employee_detail,
            'message' => 'Show member success'
        ],200);
    }

    public function update(Request $request,$id)
    {
    	$employee = Empleado::find($id);

        $employee->fechaingreso = $request->input('fechaingreso');
        $employee->documentoident = $request->input('documentoident');
        $employee->nombrepersona     = $request->input('nombrepersona');
        $employee->apellidopersona = $request->input('apellidopersona');
        $employee->telefonoprincipalpersona = $request->input('telefonoprincipalpersona ');
        $employee->telefonosecundariopersona = $request->input('telefonosecundariopersona');
        $employee->celularpersona = $request->input('celularpersona');
        $employee->direccionperona= $request->input('direccionperona');
        $employee->correopersona = $request->input('correopersona');
        $employee->fotoempleado  = $request->input('fotoempleado');
        $employee->idcargo = $request->input('idcargo');


        if($employee->save()){
            return \Response::json([
                'status' => true,
                'message' => 'Update empleado success, have image !'
            ]);
        }else{
            return \Response::json([
                'status' => false,
                'message' => 'Update empleado failed !'
            ]);
        }
    }

    public function destroy($id)
    {
        $employee = Empleado::find($id);
        $employee->delete();
        return response()->json([
            'data' => $employee,
            'message' => 'Delete empleado success !'
        ]);
    }

    public function cargos()
    {
        $cargos = Cargo::all();
        return \Response::json([
            'status' => true,
            'data' => $cargos,
            'message' => 'Show cargos success'
        ]);
    }
}
