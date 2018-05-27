var app = angular.module('TestApp');

app.controller('EmployeeController', function($window, $state, $stateParams, $scope, $http, API_URL, API_DELETE, API_URL1){


    /*Scope Structures */
    $scope.Employee = {};

    $scope.EmployeeEdit = {};

    $scope.EmployeeView = {};

    /*Declaracion de Regex Patterns */
    $scope.docIdent = /^[1-9]{10}$/;

    $scope.patternApha =/^[a-zA-Z\s]*$/;

    $scope.phone = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;

    $scope.address =/\w/;

    /*Funciones */
    $scope.imageUpload = function(event){
        var files = event.target.files;
        var file = files[files.length-1];
        $scope.file = file;
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(file);
    };

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function(){
            $scope.step = e.target.result;
        })
    };

    $scope.create = function(event){
        $http.get(API_URL1+"/cargos")
            .success(function(response){
                if(response.status){
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth()+1; //January is 0!
                    var yyyy = today.getFullYear();

                    console.log(response.data);
                    $scope.Employee.cargos = response.data;
                    today = mm+'/'+dd+'/'+yyyy;
                    $scope.Employee.fechaingreso = today;
                }
            });
    };
    
    $scope.showall = function(){
        $http.get(API_URL)
            .success(function(response){
                if(response.status){
                console.log(response);
                $scope.employees = response.data;
            }
        });
    };


    $scope.add = function(){

        console.log($scope.Employee.fechaingreso);
        $http({
            method: 'POST',
            url: API_URL,
            headers: {'Content-Type': undefined },
            data: {
                fechaingreso: $scope.Employee.fechaingreso,
                documentoident: $scope.Employee.documentoident,
                idcargo: $scope.cargo.idcargo,
                apellidopersona: $scope.Employee.apellidopersona,
                nombrepersona: $scope.Employee.nombrepersona,
                telefonoprincipalpersona: $scope.Employee.telefonoprincipalpersona,
                telefonosecundariopersona: $scope.Employee.telefonosecundariopersona,
                celularpersona: $scope.Employee.celularpersona,
                direccionpersona: $scope.Employee.direccionpersona,
                correopersona: $scope.Employee.correopersona,
                photo: $scope.files
            },
            transformRequest: function (data, headersGetter) {
                var fd = new FormData();
                angular.forEach(data, function (value, key) {
                    fd.append(key, value);
                });
                var headers = headersGetter();
                delete headers['Content-Type'];
                return fd;
            }

        }).success(function(response){
            if(response.status){
                $(".modal").modal("hide");
                console.log(response);
                $state.reload();
            }else{
                alert(response.message);
            }
        });
    };

    $scope.edit = function(id){
        $http.get(API_DELETE + id).success(function(response){
            console.log(response.data[0]);
            $scope.EmployeeEdit = response.data[0];
        });
        $http.get(API_URL1+"/cargos")
            .success(function(response){
                if(response.status){
                    console.log(response.data);
                    $scope.EmployeeEdit.cargos = response.data;
                }
         });
    };

    $scope.uploadImg = function(){
        $http({
            method: 'POST',
            url: API_URL,
            headers: {'Content-Type': undefined},
            data: $scope.EmployeeEdit,
            transformRequest: function (data, headersGetter) {
                var fd = new FormData();
                angular.forEach(data, function (value, key) {
                    fd.append(key, value);
                });
                var headers = headersGetter();
                delete headers['Content-Type'];
                return fd;
            }
        }).success(function(response){
            if(response.status){
                $scope.EmployeeEdit.photo = response.path;
            }else{
                alert(response.message);
            }
        })
    };

    $scope.update = function(){
        $http({
            method: 'PUT',
            url: API_URL + $scope.EmployeeEdit.documentoident,
            data:{
                documentoident: $scope.EmployeeEdit.documentoident,
                idcargo: $scope.EmployeeEdit.idcargo,
                apellidopersona: $scope.EmployeeEdit.apellidopersona,
                nombrepersona: $scope.EmployeeEdit.nombrepersona,
                telefonoprincipalpersona: $scope.EmployeeEdit.telefonoprincipalpersona,
                telefonosecundariopersona: $scope.EmployeeEdit.telefonosecundariopersona,
                direccionpersona: $scope.EmployeeEdit.direccionpersona,
                correopersona: $scope.EmployeeEdit.correopersona,
                celularpersona: $scope.EmployeeEdit.celularpersona,
                fotopersona: $scope.EmployeeEdit.fotopersona
            }
        }).success(function(response){
            if(response.status){
                $(".modal").modal("hide");
                $state.reload();
            }else{
                alert(response.message);
            }
        })
    };

    $scope.remove = function(id, index){
        var deleteUser = $window.confirm('Estas seguro que quieres eliminar al empleado?');
        if(deleteUser){
            $http({
                method: 'DELETE',
                url: API_DELETE + id,
            }).success(function(response){
                $scope.employees.splice(index, 1);
            })
        }
    };

    $scope.view = function (id){
        $http.get(API_DELETE + id).success(function(response){
            console.log(response.data[0]);
            $scope.EmployeeView = response.data[0];
        });
    };
});