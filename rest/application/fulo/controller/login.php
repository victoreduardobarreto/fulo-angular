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
 * Method for login in the system
 * @name login
 * @author Victor Eduardo Barreto
 * @var $app object Slim instance
 * @return bool Result of procedure
 * @date Apr 17, 2015
 * @version 1.0
 */
$app->post("/login", function () {

    try {

        $business = MasterController::getLoginBusiness();

        echo json_encode($business->doLogin());
    } catch (Exception $ex) {

        throw $ex;
    }
});

/**
 * Method for logoff in the system
 * @name logoff
 * @author Victor Eduardo Barreto
 * @var $app object Slim instance
 * @return bool Result of procedure
 * @date Apr 17, 2015
 * @version 1.0
 */
$app->post("/logoff", function () {

    try {

        $business = MasterController::getLoginBusiness();

        echo json_encode($business->doLogoff());
    } catch (Exception $ex) {

        throw $ex;
    }
});
