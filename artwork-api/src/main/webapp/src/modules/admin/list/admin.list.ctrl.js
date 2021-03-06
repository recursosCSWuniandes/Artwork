/*
 The MIT License (MIT
 Copyright (c) 2015 Los Andes Universit
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
(function (ng) {

    var mod = ng.module("adminModule");

    mod.controller("adminListCtrl", ["$scope", '$state', 'admins', '$stateParams',
        function ($scope, $state, admins, $params) {
            $scope.records = admins;

            //Paginación
            this.itemsPerPage = $params.limit;
            this.currentPage = $params.page;
            this.totalItems = admins.totalRecords;

            this.pageChanged = function () {
                $state.go('adminList', {page: this.currentPage});
            };

            $scope.actions = {
                refresh: {
                    displayName: 'Refresh',
                    icon: 'refresh',
                    fn: function () {
                        $state.reload();
                    }
                },
                prizes:{
                 displayName: 'Prizes',
                 icon: 'list',
                 fn: function(){
                  $state.go('prizeList');
                 }
                }
            };
        }]);
})(window.angular);
