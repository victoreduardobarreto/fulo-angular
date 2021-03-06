/**
 * URL de acesso ao servidor RESTful
 * @type String
 */
SERVER_URL = "http://fulo.rest";

/**
 * Criação ao $app que é o modulo que representa toda a aplicação
 * @type angular.module.angular-1_3_6_L1749.moduleInstance
 */
var $app = angular.module('app', ['ngRoute', 'angular-loading-bar', 'moduleServices', 'ui.utils.masks']);

/**
 * Config
 * @param {object} $routeProvider Routes
 * @param {object} $httpProvider Providers
 */
$app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

        /**
         * Config the route provider.
         */
        $routeProvider.
                when('/', {templateUrl: 'app/view/general/main.html'}).
                when('/error/systemError', {templateUrl: 'app/view/error/systemError.html'}).
                when('/contact', {templateUrl: 'app/view/general/contact.html'}).
                when('/customer/addCustomer', {templateUrl: 'app/view/customer/addCustomer.html', controller: 'customerController'}).
                when('/customer/upCustomer', {templateUrl: 'app/view/customer/upCustomer.html', controller: 'customerController'}).
                when('/customer/mainCustomer', {templateUrl: 'app/view/customer/mainCustomer.html', controller: 'customerController'}).
                when('/customer/orderCustomer', {templateUrl: 'app/view/customer/orderCustomer.html', controller: 'customerController'}).
                when('/user/addUser', {templateUrl: 'app/view/user/addUser.html', controller: 'userController'}).
                when('/user/upUser/:id', {templateUrl: 'app/view/user/upUser.html', controller: 'userController'}).
                when('/user/listUser', {templateUrl: 'app/view/user/listUser.html', controller: 'userController'}).
                when('/product/listProduct', {templateUrl: 'app/view/product/listProduct.html', controller: 'productController'}).
                when('/product/addProduct', {templateUrl: 'app/view/product/addProduct.html', controller: 'productController'}).
                when('/product/upProduct/:id', {templateUrl: 'app/view/product/upProduct.html', controller: 'productController'}).
                when('/product/detailProduct', {templateUrl: 'app/view/product/detailProduct.html', controller: 'productController'}).
                when('/product/filterProduct/:id', {templateUrl: 'app/view/product/filterProduct.html', controller: 'productController'}).
                when('/product/listProductType', {templateUrl: 'app/view/product/listProductType.html', controller: 'productController'}).
                when('/product/addProductType', {templateUrl: 'app/view/product/addProductType.html', controller: 'productController'}).
                when('/product/upProductType/:id', {templateUrl: 'app/view/product/upProductType.html', controller: 'productController'}).
                when('/purchase/cart', {templateUrl: 'app/view/purchase/cart.html', controller: 'purchaseController'}).
                when('/purchase/wishList', {templateUrl: 'app/view/purchase/wishList.html', controller: 'purchaseController'}).
                when('/purchase/confirmOrder', {templateUrl: 'app/view/purchase/confirmOrder.html', controller: 'purchaseController'}).
                otherwise({redirectTo: '/'});

        /*
         * Remove cors.
         * $httpProvider.defaults.headers.common = {};
         * $httpProvider.defaults.headers.put = {};
         * $httpProvider.defaults.headers.patch = {};
         */
        $httpProvider.defaults.headers.post = {};

        //configura o RESPONSE interceptor, usado para exibir o ícone de acesso ao servidor
        // e a exibir uma mensagem de erro caso o servidor retorne algum erro
//        $httpProvider.interceptors.push(function ($q, $rootScope) {
//
//            return function (promise) {
//
//                //Always disable loader
//                $rootScope.hideLoader();
//
//                return promise.then(function (response) {
//
//                    // do something on success
//                    return(response);
//                },
//                        function (response) {
//
//                            // do something on error
//                            $data = response.data;
//
//                            $error = $data.error;
//
//                            console.error($data);
//
//                            if ($error && $error.text)
//                                alert("ERROR: " + $error.text);
//                            else {
//
//                                if (response.status = 404)
//                                    alert("Erro ao acessar servidor. Página não encontrada. Veja o log de erros para maiores detalhes");
//                                else
//                                    alert("ERROR! See log console");
//                            }
//
//                            return $q.reject(response);
//                        });
//            };
//        });
    }]);

/**
 * Run
 * @param {object} $rootScope
 * @param {object} $http
 */
$app.run(['$rootScope', '$http', function ($rootScope, $http) {

//        $rootScope.messages = [];

        /**
         * Method for compose the URL of server REST.
         * @name server
         * @author Victor Eduardo Barreto
         * @param {string} $url URL to complete address
         * @return {string} Complete address of server.
         * @date Apr 4, 2015
         * @version 1.0
         */
        $rootScope.server = function ($url) {
            return SERVER_URL + $url;
        };

        /**
         * Method configure origin parameters
         * @name configParam
         * @author Victor Eduardo Barreto
         * @param {obj} $data Data to send
         * @return Data with origin configured
         * @date Jul 8, 2015
         * @version 1.0
         */
        $rootScope.configParam = function ($data, $method = null) {

            // if no arrived data, make a new object.
            (!$data) ? $data = {} : '';

            // inset secret and origin data.
            $data.secret = sessionStorage.getItem('secret');
            $data.origin = sessionStorage.getItem('origin');
            return $data;

        };

        /**
         * Method to get server secret and constants
         * @name getBasic
         * @author Victor Eduardo Barreto
         * @param {string} $return Object with secret and constants
         * @date Jul 8, 2015
         * @version 1.0
         */
        $http.get($rootScope.server("/getBasic")).success(function ($return) {

            // save secret in session.
            // save constants in variable.
            sessionStorage.setItem('secret', $return.secret);
            $rootScope.constant = $return.constants;
            $rootScope.types = $return.productTypes;
        });

        /**
         * Method to show or hide passowrd field and change button
         * @name showhidePass
         * @author Victor Eduardo Barreto
         * @date Alg 7, 2015
         * @version 1.0
         */
        $rootScope.showhidePass = function () {

            var $type = $('.password').prop('type');

            if ($type === 'password') {

                $('.password').prop('type', 'text');
                $('#switchPass').removeClass('glyphicon-eye-close');
                $('#switchPass').addClass('glyphicon-eye-open');

            } else {

                $('.password').prop('type', 'password');
                $('#switchPass').removeClass('glyphicon-eye-open');
                $('#switchPass').addClass('glyphicon-eye-close');
            }
        };

        /**
         * Adjust variable to cart, and get and save data in session.
         */
        if (sessionStorage.getItem('cart')) {

            $rootScope.cart = JSON.parse(sessionStorage.getItem('cart'));
            $rootScope.cart.nu_cart = $rootScope.cart.length;
        } else {
            $rootScope.cart = [];
        }

    }]);

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
$app.filter('startFrom', function () {

    return function (input, start) {

        if (input == null)
            return null;
        start = +start; //parse to int

        return input.slice(start);
    };
});
