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
 * Controller of products
 * @name productController
 * @author Victor Eduardo Barreto
 * @param {Object} $scope Scope
 * @param {Object} $http  Http
 * @param {Object} $location Locatioin
 * @date Alg 18, 2015
 * @version 1.0
 */
$app.controller('productController', function ($scope, $http, $location, $routeParams) {

    /**
     * Method for get products
     * @name getProducts
     * @author Victor Eduardo Barreto
     * @date Alg 18, 2015
     * @version 1.0
     */
    $scope.getProducts = function () {

        $scope.showLoader();

        // adjust parameters and add origin data.
        $param = $scope.configParam();

        $http.get($scope.server("/getProducts"), {params: $param}).success(function ($return) {

            // verify return data.
            $scope.checkResponse($return);

            $scope.rows = $return;
            $scope.hideLoader();
        });
    };

    /**
     * Method for get products
     * @name getProducts
     * @author Victor Eduardo Barreto
     * @date Alg 18, 2015
     * @version 1.0
     */
    $scope.getProduct = function () {

        if ($routeParams.id === null) {

            $location.path("/error/systemError/");
        }

        $scope.showLoader();

        // adjust parameters and add origin data.
        $param = $scope.configParam({sq_product: $routeParams.id});

        $http.get($scope.server("/getProduct"), {params: $param}).success(function ($return) {

            // verify return data.
            $scope.checkResponse($return);

            $scope.row = $return;
            $scope.hideLoader();
        });
    };

    /**
     * Method for get product types
     * @name getProductTypes
     * @author Victor Eduardo Barreto
     * @date Alg 19, 2015
     * @version 1.0
     */
    $scope.getProductTypes = function () {

        // adjust parameters and add origin data.
        $param = $scope.configParam();

        $http.get($scope.server("/getProductTypes"), {params: $param}).success(function ($return) {

            // verify return data.
            $scope.checkResponse($return);

            $scope.types = $return;

        });
    };

    /**
     * Method for add product
     * @name addProduct
     * @author Victor Eduardo Barreto
     * @date Alg 19, 2015
     * @version 1.0
     */
    $scope.addProduct = function () {

        $scope.showLoader();

        var input = document.getElementById("file");
        var fReader = new FileReader();

        fReader.readAsDataURL(input.files[0]);

        fReader.onloadend = function (event) {

            $scope.row.im_image = event.target.result;

            $param = $scope.configParam($scope.row);

            $http.post($scope.server("/addProduct"), $param).success(function ($return) {

                // verify return data.
                $scope.checkResponse($return);

                $scope.hideLoader();

                $location.path("/product/listProduct/");

                $scope.showFlashmessage("alert-success", $scope.constant.MSG0001);
            });

        };
    };

    /**
     * Method for up product
     * @name upProduct
     * @author Victor Eduardo Barreto
     * @date Alg 26, 2015
     * @version 1.0
     */
    $scope.upProduct = function () {

        $scope.showLoader();

        var input = document.getElementById("file");
        var fReader = new FileReader();

        fReader.readAsDataURL(input.files[0]);

        fReader.onloadend = function (event) {

            $scope.row.im_image = event.target.result;

            $param = $scope.configParam($scope.row);

            $http.post($scope.server("/upProduct"), $param).success(function ($return) {

                // verify return data.
                $scope.checkResponse($return);

                $scope.hideLoader();

                $location.path("/product/listProduct/");

                $scope.showFlashmessage("alert-success", $scope.constant.MSG0001);
            });

        };
    };

    /**
     * Method for activate product
     * @name activateProduct
     * @author Victor Eduardo Barreto
     * @param {int} $sq_product Product identifier
     * @date Alg 26, 2015
     * @version 1.0
     */
    $scope.activateProduct = function ($sq_product) {

        $scope.showLoader();

        $param = $scope.configParam({sq_product: $sq_product});

        $http.post($scope.server("/activateProduct"), $param).success(function ($return) {

            // verify return data.
            $scope.checkResponse($return);

            $scope.hideLoader();
        });
    };

    /**
     * Method for inactivate product
     * @name inactivateProduct
     * @author Victor Eduardo Barreto
     * @param {int} $sq_product Product identifier
     * @date Alg 26, 2015
     * @version 1.0
     */
    $scope.inactivateProduct = function ($sq_product) {

        $scope.showLoader();

        $param = $scope.configParam({sq_product: $sq_product});

        $http.post($scope.server("/inactivateProduct"), $param).success(function ($return) {

            // verify return data.
            $scope.checkResponse($return);

            $scope.hideLoader();
        });
    };

    /**
     * Method for get products by filter
     * @name getProductsByFilter
     * @author Victor Eduardo Barreto
     * @date Alg 27, 2015
     * @version 1.0
     */
    $scope.getProductsByFilter = function () {

        $scope.showLoader();

        // adjust parameters and add origin data.
        $param = $scope.configParam({sq_product_type: $routeParams.id});


        $http.get($scope.server("/getProductsByFilter"), {params: $param}).success(function ($return) {

            // verify return data.
            $scope.checkResponse($return);

            $scope.rows = $return;
            $scope.hideLoader();
        });
    };
});
