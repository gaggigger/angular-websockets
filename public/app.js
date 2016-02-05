(function () {
    'use strict';

    angular.module('app', [])
        .controller('HomeController', [HomeController])
        .directive('chatRoom', [chatRoom]);

    function chatRoom() {

        var self = {};

        self.restrict = 'E';
        self.template = '<h2>Chat Room</h2>' +
            '<textarea ng-model="chatResponse" rows="10" cols="50" readonly></textarea>' +
            '<br/>' +
            '<label>Type Message Below:</label>' +
            '<br/>' +
            '<textarea ng-model="chatRequest" row="3" cols="50"></textarea>' +
            '<br/>' +
            '<button ng-click="sendMessage()">Send</button>';
        self.link = linkFn;

        function linkFn($scope, $element, $attributes) {

            var socket = io();

            $scope.chatResponse = '';

            $scope.sendMessage = sendMessage;

            function sendMessage() {

                socket.emit('chat message', $scope.chatRequest);

                $scope.chatRequest = '';

            }

            socket.on('chat message', function (msg) {

                $scope.$apply(displayChatMessage);

                function displayChatMessage() {

                    $scope.chatResponse += msg + '\n';

                }

            });

        }

        return self;

    }

    function HomeController() {

        var self = this;


        self.message = "Welcome to the angular-websocket mini example!";

    }

    angular.bootstrap(document, ['app']);

})();