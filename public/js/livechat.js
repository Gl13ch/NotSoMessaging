angular.module('MyApp', ["pubnub.angular.service"])

 .controller('ChatCtrl', function($scope, Pubnub) {
   $scope.channel = 'messages-channel';
   // Generating a random uuid between 1 and 100 using an utility function from the lodash library.
   $scope.uuid = Math.random(100).toString();
   Pubnub.init({
         publish_key: 'pub-c-d8776643-9fc5-489c-abd1-8b5429cddd50',
         subscribe_key: 'sub-c-7b9d23c0-56d7-11ec-931a-1addb9510060',
         uuid: $scope.uuid
       });

       // Send the messages over PubNub Network
    $scope.sendMessage = function() {
       // Don't send an empty message
       if (!$scope.messageContent || $scope.messageContent === '') {
            return;
        }
        Pubnub.publish({
            channel: $scope.channel,
            message: {
                content: $scope.messageContent,
                sender_uuid: $scope.uuid,
                date: new Date()
            },
            callback: function(m) {
                console.log(m);
            }
        });
        // Reset the messageContent input
        $scope.messageContent = '';

    }

    $scope.messages = [];

// Subscribing to the ‘messages-channel’ and trigering the message callback
Pubnub.subscribe({
  channel: $scope.channel,
  triggerEvents: ['callback']
});

// Listening to the callbacks
$scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function (ngEvent, m) {
  $scope.$apply(function () {
      $scope.messages.push(m)
  });
});

// A function to display a nice uniq robot avatar
$scope.avatarUrl = function(uuid){
  return 'http://robohash.org/'+uuid+'?set=set2&bgset=bg2&size=70x70';
};
 });
