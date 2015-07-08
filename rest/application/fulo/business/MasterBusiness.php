<?php

/*
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

namespace fulo\business;

/**
 * Class to keep generic functions for business
 * @name MasterBusiness
 * @author Victor Eduardo Barreto
 * @date Apr 12, 2015
 * @version 1.0
 */
abstract class MasterBusiness {

    /**
     * Method for remove special char of data
     * @name removeSpecialChar
     * @author Victor Eduardo Barreto
     * @param object or array or string $data Data to remove special char
     * @date Apr 12, 2015
     * @version 1.0
     */
    protected function removeSpecialChar (& $data) {

        try {

            # verify the type of variable.
            # array.
            if (is_array($data)) {

                foreach ($data as $key => $value) {
                    $data->$key = preg_replace("/[^a-zA-Z0-9_@.,áàãâéêíóôõúüçÁÀÃÂÉÊÍÓÔÕÚÜÇ ]/", "", $value);
                }

                # object.
            } elseif (is_object($data)) {

                foreach ($data as $key => $value) {
                    $data->$key = preg_replace("/[^a-zA-Z0-9_@.,áàãâéêíóôõúüçÁÀÃÂÉÊÍÓÔÕÚÜÇ ]/", "", $value);
                }

                # other types.
            } else {

                $data = preg_replace("/[^a-zA-Z0-9_@.,áàãâéêíóôõúüçÁÀÃÂÉÊÍÓÔÕÚÜÇ ]/", "", $data);
            }
        } catch (Exception $ex) {

            throw $ex;
        }
    }

    /**
     * Method for validate the credential and ip of user
     * @name validateOrigin
     * @author Victor Eduardo Barreto
     * @param object $data Data of request
     * @return bool FALSE case the data is fake
     * @date June 15, 2015
     * @version 1.0
     */
    protected function validateOrigin (& $data) {

        try {

            # verify if arrived is array.
//        if (is_array($data) && !empty($data)) {
//
//            $object = new \stdClass();
//
//            # change array to object.
//            foreach ($data as $key => $value) {
//
//                $object->$key = $value;
//            }
//
//            # save object in $data;
//            $data = $object;
//        }
            if (!empty($data->origin)) {

                # decrypt data secret.
                $secret = $this->decrypt($data->origin);

                # add decrypted secret in data.
                foreach ($secret as $key => $value) {

                    $data->$key = $value;
                }
            }

            echo REMOTE_ADDR;

            # validate origin ip.
            if ($_SERVER['REMOTE_ADDR'] != $data->origin_no_ip) {

                # stop the request.
                echo json_encode('sem data');
                \Slim\Slim::getInstance()->stop();
            }
        } catch (Exception $ex) {

            throw $ex;
        }
    }

    /**
     * Method for encrypt data
     * @name encrypt
     * @author Victor Eduardo Barreto
     * @param string $data Data for encryption
     * @return string Encrypted data
     * @date Jul 08, 2015
     * @version 1.0
     */
    protected function encrypt ($data) {

        try {

            return trim(
                base64_encode(
                    mcrypt_encrypt(
                        MCRYPT_RIJNDAEL_256, ENCRYPT_SALT, $data, MCRYPT_MODE_ECB, mcrypt_create_iv(
                            mcrypt_get_iv_size(
                                MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB
                            ), MCRYPT_RAND
                        )
                    )
                )
            );
        } catch (Exception $ex) {

            throw $ex;
        }
    }

    /**
     * Method for deencrypt data
     * @name decrypt
     * @author Victor Eduardo Barreto
     * @param string $data Data for decryption
     * @return string decrypted data
     * @date Jul 08, 2015
     * @version 1.0
     */
    protected function decrypt ($data) {

        try {

            return trim(
                mcrypt_decrypt(
                    MCRYPT_RIJNDAEL_256, ENCRYPT_SALT, base64_decode($data), MCRYPT_MODE_ECB, mcrypt_create_iv(
                        mcrypt_get_iv_size(
                            MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB
                        ), MCRYPT_RAND
                    )
                )
            );
        } catch (Exception $ex) {

            throw $ex;
        }
    }

}
