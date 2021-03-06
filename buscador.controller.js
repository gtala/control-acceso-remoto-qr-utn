(function () {
    'use strict';

    angular
        .module('buscadorApp')
        .controller('buscadorController', buscadorController)
    buscadorController.$inject = ['$scope', '$interval', 'QrScanner'];

    function buscadorController($scope, $interval, QrScanner) {
        //console.log(QrScanner)
        init();

        function init() {
            $scope.data = {};
            $scope.doRequest = true;

            var notFoundImg = 'data:image/png;base64,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';
            $scope.data.imgData = notFoundImg;

            const client = stitch.Stitch.initializeDefaultAppClient('buscadorutn-irarn');
            const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('buscador');

            var doQuery = () =>
                db.collection('examenes').find({}, {
                    limit: 100
                }).asArray()


            var updateData = () => {

                const query = {
                    "owner_id": "5d2b68d90bee4f2bbdd35386"
                };

                const update = {
                    "$set": {
                        "match": $scope.match
                    }
                };
                const options = {
                    "upsert": false
                };

                db.collection('examenes').updateOne(query, update, options).then(() => $scope.doRequest = true).catch(errFunc);
            }

            var queryCallback = docs => {

                console.log("Found docs", docs[0]);
                var data = docs[0];

                $scope.data.imgData = data.value;
                var image = document.getElementsByTagName('img')[0];

                QrScanner.scanImage(image).then(
                    result => {
                        $scope.result = result;
                        $scope.match = result == data.value_bluetooth;
                    }
                ).catch(error => {
                    console.log(error || 'No QR code found.');
                  //  $scope.data.imgData = notFoundImg;
                    $scope.match = false
                }).finally(() => {
                    const credential = new stitch.UserApiKeyCredential("Zwnedcd9uCH4xS3UuljVNJCiXvHQKaYVtTl32tHGa8RrCpBzNiajUO3v5lly8Hcf")
                    client.auth.loginWithCredential(credential).then(updateData)
                    console.log("updated!")
                });
            }

            var errFunc = err => {
                console.error(err)
            }

            $interval(miFuncion, 500);

            function miFuncion() {
                if ($scope.doRequest) {
                    $scope.doRequest = false;
                    const credential = new stitch.UserApiKeyCredential("Zwnedcd9uCH4xS3UuljVNJCiXvHQKaYVtTl32tHGa8RrCpBzNiajUO3v5lly8Hcf")
                    client.auth.loginWithCredential(credential).then(doQuery).then(queryCallback).catch(errFunc);
                }
            }

            miFuncion()

        }
    }
}());