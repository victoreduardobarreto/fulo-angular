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

/**
 * Domain Controller
 */

/**
 * Set a better name for domain business.
 */
use \fulo\business\DomainBusiness as DomainBusiness;

/**
 * Method for get domain profiles
 * @name getProfiles
 * @author Victor Eduardo Barreto
 * @return json Data of users
 * @date Jun 19, 2015
 * @version 1.0
 */
$app->get("/getProfiles", function () {

    try {

        $business = new DomainBusiness();

        $data = \Slim\Slim::getInstance()->request()->params();

        echo json_encode($business->getProfiles($data));
    } catch (Exception $ex) {

        throw $ex;
    }
});

/**
 * Method for get constants for frontend
 * @name getConstants
 * @author Victor Eduardo Barreto
 * @return json Data of users
 * @date Jul 5, 2015
 * @version 1.0
 */
$app->get("/getConstants", function () {

    try {

        ########### TODO; Implementar segurança sem estar logado usando hash. ##########
        # load constants file
        $constant = parse_ini_file('./application/config/constants.ini', true);

        # merge constants for frontend.
        $constants = array_merge($constant['frontend'], $constant['both']);

        echo json_encode($constants);
    } catch (Exception $ex) {

        throw $ex;
    }
});
