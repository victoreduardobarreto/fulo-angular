/*
 * Copyright (C) 2014
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

 /* global $app */

/**
 * Controller of clients
 * @name userController
 * @author Victor Eduardo Barreto
 * @param {Object} $scope Scope
 * @param {Object} $http  Http
 * @param {Object} $routeParams Route
 * @param {Object} $location Locatioin
 * @param {Object} $services Services
 * @date Apr 3, 2015
 * @version 1.0
 */
 $app.controller('userController', function ($scope, $http, $routeParams, $location, $services) {

    /**
     * variables for pagination.
     */
     $scope.currentPage = 0;
     $scope.pageSize = 10;

    /**
     * Method for control the pagination
     * @name numberOfPages
     * @author Victor Eduardo Barreto
     * @date Apr 3, 2015
     * @version 1.0
     */
     $scope.numberOfPages = function () {
     	return Math.ceil($scope.rows.length / $scope.pageSize);
     };

    /**
     * Method for load all users
     * @name getUsers
     * @author Victor Eduardo Barreto
     * @date Apr 3, 2015
     * @version 1.0
     */
     $scope.getUsers = function () {

        $param = $scope.configParam();

        $http.get($scope.server("/getUsers"), {params: $param}).success(function ($return) {
            $services.checkResponse($return);
            $scope.rows = $return;
        });
    };

    /**
     * Method for load one user
     * @name getUser
     * @author Victor Eduardo Barreto
     * @date Apr 3, 2015
     * @version 1.0
     */
     $scope.getUser = function () {

     	if ($routeParams.id === null) {

     		$location.path("/error/systemError/");
     	}

        // adjust parameters and add origin data.
        $param = $scope.configParam({sq_person: $routeParams.id});

        $http.get($scope.server("/getUser"), {params: $param}).success(function ($return) {

            // verify return data.
            $services.checkResponse($return);

            $scope.row = $return;
        });
    };

    /**
     * Method for add user
     * @name addUser
     * @author Victor Eduardo Barreto
     * @date May 13, 2015
     * @version 1.0
     */
     $scope.addUser = function () {

        // adjust parameters and add origin data.
        $param = $scope.configParam($scope.row);

        // validate passwords
        if ($scope.row.ds_password === $scope.row.re_password) {

        	$http.post($scope.server("/addUser"), $param).success(function ($return) {

        		$services.checkResponse($return);

        		$location.path("/user/listUser");

        		$services.showFlashmessage("alert-success", $scope.constant.MSG0001);
        	});
        } else {
        	$services.showFlashmessage("alert-warning", $scope.constant.MSG0003);
        }
    };

    /**
     * Method for update data user
     * @name upUser
     * @author Victor Eduardo Barreto
     * @date May 09, 2015
     * @version 1.0
     */
     $scope.upUser = function () {

     	$param = $scope.configParam($scope.row);

     	$http.post($scope.server("/upUser"), $param).success(function ($return) {

            // verify return data.
            $services.checkResponse($return);

            $location.path("/user/listUser");

            $services.showFlashmessage("alert-success", $scope.constant.MSG0001);
        });
     };

    /**
     * Method for inactivate user
     * @name inactivateUser
     * @author Victor Eduardo Barreto
     * @param {int} $sq_user Identifier of user
     * @date Jul 22, 2015
     * @version 1.0
     */
     $scope.inactivateUser = function ($sq_user) {

        // adjust parameters and add origin data.
        $param = $scope.configParam({sq_user: $sq_user});

        $http.post($scope.server("/inactivateUser"), $param).success(function ($return) {

            // verify return data.
            $services.checkResponse($return);

            /* if the customer deactivate his account, do logoff */
            if ($sq_user == $scope.user.sq_user) {
            	$scope.logoff();
            }
        });
    };

    /**
     * Method for activate user
     * @name activateUser
     * @author Victor Eduardo Barreto
     * @param {int} $sq_user Identifier of user
     * @date Jul 22, 2015
     * @version 1.0
     */
     $scope.activateUser = function ($sq_user) {

        // adjust parameters and add origin data.
        $param = $scope.configParam({sq_user: $sq_user});

        $http.post($scope.server("/activateUser"), $param).success(function ($return) {

            // verify return data.
            $services.checkResponse($return);
        });
    };

    /**
     * Method for get user profile
     * @name getProfiles
     * @author Victor Eduardo Barreto
     * @date Jun 19, 2015
     * @version 1.0
     */
     $scope.getProfiles = function () {

        // adjust parameters and add origin data.
        $param = $scope.configParam();

        $http.get($scope.server("/getProfiles"), {params: $param}).success(function ($return) {

            // verify return data.
            $services.checkResponse($return);

            $scope.profiles = $return;
        });
    };

    /**
     * Method for up address
     * @name upAddress
     * @author Victor Eduardo Barreto
     * @date Jul 29, 2015
     * @version 1.0
     */
     $scope.upAddress = function () {

        // adjust parameters and add origin data.
        $param = $scope.configParam($scope.row);

        $http.post($scope.server("/upAddress"), $param).success(function ($return) {

            // verify return data.
            $services.checkResponse($return);

            // insert current data in session and user variable.
            sessionStorage.setItem('user', JSON.stringify($scope.user));
            $services.showFlashmessage('alert-success', $scope.constant.MSG0001);
            $location.path("/user/listUser");
        });
    };
});
