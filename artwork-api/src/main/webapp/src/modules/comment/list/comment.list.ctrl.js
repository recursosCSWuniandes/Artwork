/* To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function (ng) {
    var mod = ng.module('commentModule');
    mod.controller('commentListCtrl', ["$scope", 'comments', 'artwork', 'client', 'itemModel', 'Restangular', "$rootScope",
        function ($scope, comments, artwork, client, itemModel, Restangular, $rootScope) {   
            $scope.artwork = artwork;
            if($scope.artwork){
                $scope.artwork.isInWishlist = false;
                for(var j in $scope.artwork.items){
                    if($scope.artwork.items[j]){
                        if($scope.artwork.items[j].userName === $rootScope.usuario.$$state.value.userName){
                            $scope.artwork.isInWishlist = true;
                            $scope.artwork.idItem = $scope.artwork.items[j].id;
                            break;
                        }
                    }
                }
            }
            $scope.mean = 0;
            $scope.qualifications = [];
            $scope.alerts = [];
            var getAllComments = function (id) {
                comments.customGET("", {artworkId: id}).then(function (response) {
                    $scope.comments = response;
                });
            };
            $scope.currentPageC = 0;
            $scope.pageSizeC = 6;
            $scope.numberOfPages=function(){
                return Math.ceil($scope.comments.length/$scope.pageSizeC);                
            };
            $scope.increasePage = function(){
                $scope.currentPageC = $scope.currentPageC+1;
            };
            $scope.decreasePage = function(){
                $scope.currentPageC = $scope.currentPageC-1;
            };
            getAllComments($scope.artwork.id);
            $scope.comment = {};
            $scope.commentSent = {};
            $scope.submitComment = function (comment) {
                if(typeof comment.email !== 'undefined' & comment.email !== "" & typeof comment.description!== 'undefined' & comment.description !== ""){
                    $scope.commentSent.name = comment.email;
                    $scope.commentSent.comment = comment.description;
                    $scope.commentSent.artwork = $scope.artwork.id;
                    comments.post(angular.toJson($scope.commentSent), {artworkId: $scope.artwork.id}).then(function () {
                        getAllComments($scope.artwork.id);
                        $scope.comment.email = "";
                        $scope.comment.description = "";
                    });
                }else{
                    showMessage("Debe introducir ambos valores", "info");
                }
                
            };
            $scope.addToCart = function () {
                itemModel['name'] = artwork.name;
                itemModel['qty'] = $scope.quantity;
                itemModel['artwork'] = artwork;
                client[0].post("shopping/cart", JSON.stringify(itemModel));
                client[0].getList("shopping/cart").then(function () {
                    $scope.showSuccess("Obra agregada a carrito");
                    $scope.cartAdded = true;
                });
            };
            $scope.getArtworkQualificationsMean = function(){
                var qual = [];
                var mean = 0.0;
                if($scope.qualifications.length>0){
                    for(var i = 0; i < $scope.qualifications.length; i++ ){
                        var calificacion = $scope.qualifications[i];
                        if(calificacion.artwork.id===artwork.id){
                            qual.push(calificacion);
                            mean = mean + calificacion.qualification;
                        }
                    }
                    mean = mean/$scope.qualifications.length;
                }
                //return qual;
                return mean.toFixed(2);
            };
            $scope.isArtworkNotQualificated = function(){
                var userClient = $rootScope.usuario.$object.email;
                for(var i = 0; i < $scope.qualifications.length; i++ ){
                    var calificacion = $scope.qualifications[i];
                    if(calificacion.artwork.id===$scope.artwork.id && calificacion.userClient===userClient){
                        return false;
                    }
                }
                return true;
            };
            $scope.calificar = function() {
             var calificacionUsuario = {};
                calificacionUsuario['qualification'] = $scope.ratingValue;
                calificacionUsuario['userClient'] = $rootScope.usuario.$object.email;
                calificacionUsuario['artworkId'] = artwork.id;
                Restangular.all("qualifications").customPOST({}, 'crear', calificacionUsuario, {}).then(function (rc) {
                     $scope.getQualifications();
                });
            }; 
            $scope.getQualifications = function () {
                Restangular.all("qualifications").customGET('').then(function (response) {
                    if (response.length>0) {
                        $scope.qualifications = response;
                    }
                });
            };
            $scope.getQualifications();
            $scope.maxValue = 5;
            $scope.addToWishlist = function (artwork) {
                itemModel['name'] = artwork.name;
                itemModel['qty'] = 1;
                itemModel['artwork'] = artwork;
                itemModel['shoppingCart'] = false;
                client[0].post("shopping/wishlist", JSON.stringify(itemModel)).then(function(){
                    artwork.isInWishlist = true;
                });
            };
            $scope.removeWishlist = function (artwork) {
                itemModel['id'] = artwork.idItem;
                client[0].customDELETE("wishList/"+ artwork.idItem).then(function (rc) {
                    artwork.isInWishlist = false;
                });
            };
             $scope.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            };

            /* Función showMessage: Recibe el mensaje en String y
             * su tipo con el fin de almacenarlo en el array $scope.alerts.
             */
            function showMessage(msg, type) {
                var types = ["info", "danger", "warning", "success"];
                if (types.some(function (rc) {
                    return type === rc;
                })) {
                    $scope.alerts.push({type: type, msg: msg});
                }
            }

            $scope.showError = function (msg) {
                showMessage(msg, "danger");
            };

            $scope.showSuccess = function (msg) {
                showMessage(msg, "success");
            };
        }
    ]);
    //We already have a limitTo filter built-in to angular,
    //let's make a startFrom filter
    mod.filter('startFromC', function() {
        return function(input, start) {
            start = +start;
            if(input){
                return input.slice(start);
            }
        };
    });
})(window.angular);


