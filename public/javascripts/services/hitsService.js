angular.module('ibnd').factory('Hits', ['$resource',
    function($resource) {
        return $resource('hit/', {}, {
            list: {
                method: 'GET',
                isArray: true
            }
            ,
            // get: {
            //     method: 'GET',
            //     params: {
            //         id: '@id'
            //     },
            //     isArray: false
            // },
            // update: {
            //     method: 'PUT',
            //     data:   '@contract',
            //     params: {
            //         id: '@contract.id'
            //     },
            //     isArray: false
            // },
            create: {
                method: 'POST',
                isArray: false
            },
            delete: {
                method: 'DELETE',
                params: {
                    id: '@id'
                },
                isArray: false
            }
        });
    }
]);
