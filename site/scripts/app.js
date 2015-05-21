console.log ("#Gaby: Cargo app.js");
// Inyectando el modulo de ui-router
// como parametro del arreglo de objetos del modulo
var modulo1=
	angular.module("reeditgam",['ui.router','hSweetAlert']);
// Configurando las rutas
// Recibe un arreglo de elementos 
modulo1.config(
	['$stateProvider',
	'$urlRouterProvider',
	function($stateProvider,$urlRouterProvider){
		//Iniciando rutina de configuracion
		// Creando ruta /home
		$stateProvider.state('home',{
			// Definiendo estado como un objeto
			url:"/home",  // Url que dedine el estado
			templateUrl: "/home.html",  //Plantilla base para el estado
			controller: "mainCtrl"
		});
		// Creando ruta de visualizacion de Post
		$stateProvider.state('posts',{
			url: "/posts/{id}",
			templateUrl: "/posts.html",
			controller: "postsCtrl"
		});

		//Url por defecto
		$urlRouterProvider.otherwise('home');
	}]);


//CREANDO UN SERVICIO del tipo factory
modulo1.factory('posts',[function(){
// cuerpo del factory llamado post
var o= {
posts : [
   {
     title: "post 1", upvotes: 15,
     comments: [
        {author: "Karina", body:"Esto esta de pelos.",
        upvotes:3},
        {author: "Gamaliel", body:"Esto es basura.",
        upvotes:0}]
    },
    {
     title: "post 2", upvotes: 4,
     comments: [
        {author: "Coco", body:"Esto es asombroso.",
        upvotes:5},
        {author: "Cristian", body:"Esto esta aburrido.",
        upvotes:1}]
    }
         ]
     };
     //retornando objeto de datos persistentes
     return o;
}]);
	//CREANDO CONTROLADOR
	// dependcy injection
	// Creando controlador 
modulo1.controller("mainCtrl",[
	'$scope','posts','sweet',  // Inyectando factory post
	function($scope, posts,sweet){
		$scope.test = "Hola Angular";

		//Modelo al cual se le asigna 
		//el resultado del factory
		$scope.posts = posts.posts;
	  
		//Metodo del controlador

		$scope.addPost = function(){
			if(!$scope.title || $scope.title === "")
			{
              sweet.show("NO se permite postear titulos vacios")
              return;
			}
		$scope.posts.push(
			{
				title:$scope.title,
				link:$scope.link,
			 upvotes: 0,
			 comments : [{
			 	author : "Gustavo",
			 	body: "Me gusto ese link.",
			 	upvotes: 0},
			 	{
			 		author:"Keila",
			 		body: "Awesome link.",
			 		upvotes: 2
			 	}]
			});
           //Two-way data bindingit
           $scope.title = "";
            $scope.link = "";
	    };	
	    //metodo que incrementa
	    // el voto de un post en una unidad
	    $scope.incrementUpvotes = function(post){
             post.upvotes += 1;
	    }
	}]);
// Crando controlador postsCtrl
modulo1.controller("postsCtrl", [
	'$scope',
	'$stateParams',
	'posts', function($scope, $stateParams, posts){
		$scope.incrementUpvotes = function (comment){
			comment.upvotes += 1;
		};
		//cuerpo del controlador
		//Obteniendo el parametro id de los parametros del estado 
		//de la ruta y pasandolo como argumento al objeto del factory
		$scope.post = posts.posts[$stateParams.id];
		
	}]);