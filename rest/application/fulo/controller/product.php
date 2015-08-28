<?php

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

use fulo\controller\MasterController as MasterController;

/**
 * Method for get products
 * @name getProducts
 * @author Victor Eduardo Barreto
 * @var $app object Slim instance
 * @return object Data products
 * @date Alg 18, 2015
 * @version 1.0
 */
$app->get("/getProducts", function () {

    try {

        $business = MasterController::getProductBusiness();

        echo json_encode($business->getProducts());
    } catch (Exception $ex) {

        throw $ex;
    }
});

/**
 * Method for get product
 * @name getProduct
 * @author Victor Eduardo Barreto
 * @var $app object Slim instance
 * @return object Data products
 * @date Alg 24, 2015
 * @version 1.0
 */
$app->get("/getProduct", function () {

    try {

        $business = MasterController::getProductBusiness();

        echo json_encode($business->getProduct());
    } catch (Exception $ex) {

        throw $ex;
    }
});

/**
 * Method for get product types
 * @name getProductTypes
 * @author Victor Eduardo Barreto
 * @var $app object Slim instance
 * @return object Data product types
 * @date Alg 19, 2015
 * @version 1.0
 */
$app->get("/getProductTypes", function () {

    try {

        $business = MasterController::getProductBusiness();

        echo json_encode($business->getProductTypes());
    } catch (Exception $ex) {

        throw $ex;
    }
});

/**
 * Method for add product
 * @name addProduct
 * @author Victor Eduardo Barreto
 * @var $app object Slim instance
 * @return bool Result of procedure
 * @date Alg 19, 2015
 * @version 1.0
 */
$app->post("/addProduct", function () {

    try {

        $business = MasterController::getProductBusiness();

        echo json_encode($business->addProduct());
    } catch (Exception $ex) {

        throw $ex;
    }
});

/**
 * Method for up product
 * @name upProduct
 * @author Victor Eduardo Barreto
 * @var $app object Slim instance
 * @return bool Result of procedure
 * @date Alg 26, 2015
 * @version 1.0
 */
$app->post("/upProduct", function () {

    try {

        $business = MasterController::getProductBusiness();

        echo json_encode($business->upProduct());
    } catch (Exception $ex) {

        throw $ex;
    }
});

/**
 * Method for activate product
 * @name activateProduct
 * @author Victor Eduardo Barreto
 * @var $app object Slim instance
 * @return bool Result of procedure
 * @date Alg 26, 2015
 * @version 1.0
 */
$app->post("/activateProduct", function () {

    try {

        $business = MasterController::getProductBusiness();

        echo json_encode($business->activateProduct());
    } catch (Exception $ex) {

        throw $ex;
    }
});

/**
 * Method for inactivate product
 * @name inactivateProduct
 * @author Victor Eduardo Barreto
 * @var $app object Slim instance
 * @return bool Result of procedure
 * @date Alg 26, 2015
 * @version 1.0
 */
$app->post("/inactivateProduct", function () {

    try {

        $business = MasterController::getProductBusiness();

        echo json_encode($business->inactivateProduct());
    } catch (Exception $ex) {

        throw $ex;
    }
});

/**
 * Method for get products by filter
 * @name getProductsByFilter
 * @author Victor Eduardo Barreto
 * @var $app object Slim instance
 * @return object Data products
 * @date Alg 27, 2015
 * @version 1.0
 */
$app->get("/getProductsByFilter", function () {

    try {

        $business = MasterController::getProductBusiness();

        echo json_encode($business->getProductsByFilter());
    } catch (Exception $ex) {

        throw $ex;
    }
});
