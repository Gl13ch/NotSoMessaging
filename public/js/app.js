const app = angular.module('MyApp', []);

// app.factory('storageService', ['$rootScope', function($rootScope) {
//
//     return {
//         get: function(key) {
//             return localStorage.getItem(key);
//         },
//         set: function(key, data) {
//             localStorage.setItem(key, data);
//         }
//     };
// }]);

app.controller('MyController', ['$http', '$window', function($http, $scope, $window){
    this.name = null;
    this.content = null;
    this.createdAt = null;
    this.indexOfEditFormToShow = null;
    this.loggedInUser = false;
    const controller = this;
    $scope.toggleLogin = true;
    // date = new Date();

    this.createMessage = function(){
        $http({
            method:'POST',
            url: 'https://agile-temple-00865.herokuapp.com/messages/',
            data: {
                name: this.name,
                content: this.content,
                createdAt: this.createdAt
            }
        }).then(function(response){
          console.log(response);
             controller.getMessages(); //get all todos when new element is added
        }, function(){
            console.log('error');
        });
    }

    this.getMessages = function(){
        $http({
            method:'GET',
            url: 'https://agile-temple-00865.herokuapp.com/messages/',
        }).then(function(response){
            controller.messages = response.data; //set value on success
        }, function(){
            console.log('error');
        });
    };

    this.deleteMessage = function(message){
    $http({
        method:'DELETE',
        url: 'https://agile-temple-00865.herokuapp.com/messages/' + message._id
    }).then(
        function(response){
            controller.getMessages();
        },
        function(error){

        }
    );
  }
  this.getMessages(); //call immediately once controller is instantiated to test

  this.editMessage = function(message){
    $http({
        method:'PUT',
        url: 'https://agile-temple-00865.herokuapp.com/messages/' + message._id,
        data: {
          content: this.updatedContent
        }
    }).then(
        function(response){
            controller.getMessages();
            controller.indexOfEditFormToShow = null;
        },
        function(error){
      }
    );
  }

  this.signup = function(){
    $http({
        url:'https://agile-temple-00865.herokuapp.com/users',
        method:'POST',
        data: {
            username: this.signupUsername,
            password: this.signupPassword
        }
    }).then(function(response){
        controller.loggedInUser = response.data;
    })
  }

  this.login = function(){
  $http({
      url:'https://agile-temple-00865.herokuapp.com/sessions',
      method:'POST',
      data: {
          username: this.loginUsername,
          password: this.loginPassword
      }
  }).then(function(response){
      if(response.data.username){
        // console.log(response.data);
        controller.loggedInUser = response.data;
        // $window.localStorage.setItem('data', 'response.data.username')

      } else {
        controller.loginUsername = null;
        controller.loginPassword = null;
      }
    })
  }

  $http({
      method:'GET',
      url:'https://agile-temple-00865.herokuapp.com/sessions'
  }).then(function(response){
      // console.log(response);
      // let data = $window.localStorage.getItem('data')
      // if (controller.loggedInUser !== false) {
        // response.data = JSON.parse(data);
      // }
  });

  this.logout = function(){
    $http({
        url:'https://agile-temple-00865.herokuapp.com/sessions',
        method:'DELETE'
    }).then(function(){
      controller.loggedInUser = false;
      // $window.localStorage.removeItem('data')
    })
  }

}
]
);

//localStorage =============================================

// app.factory('$localstorage', ['$window', function($window) {
//   return {
//     set: function(this.loggedInUser, true) {
//       $window.localStorage[this.loggedInUser] = true;
//     },
//     get: function(this.loggedInUser, true) {
//       return $window.localStorage[this.loggedInUser] || true || false;
//     },
//     setObject: function(this.loggedInUser, true) {
//       $window.localStorage[this.loggedInUser] = JSON.stringify(true);
//     },
//     getObject: function(this.loggedInUser, true) {
//       if($window.localStorage[this.loggedInUser] != undefined){
//           return JSON.parse($window.localStorage[this.loggedInUser]);
//       }else{
//         return true || false;
//       }
//     },
//     remove: function(this.loggedInUser){
//       $window.localStorage.removeItem(this.loggedInUser);
//     },
//     clear: function(){
//       $window.localStorage.clear();
//     }
//   }
// }]);

// PUBNUB ===========================================

// app.controller('ChatCtrl', function($scope, Pubnub) {
//     $scope.channel = 'messages-channel';
//     // Generating a random uuid between 1 and 100 using an utility function from the lodash library.
//     $scope.uuid = Math.random(100).toString();
//     Pubnub.init({
//           publish_key: 'pub-c-d8776643-9fc5-489c-abd1-8b5429cddd50',
//           subscribe_key: 'sub-c-7b9d23c0-56d7-11ec-931a-1addb9510060',
//           uuid: $scope.uuid
//         });
//
//         // Send the messages over PubNub Network
//      $scope.sendMessage = function() {
//         // Don't send an empty message
//         if (!$scope.messageContent || $scope.messageContent === '') {
//              return;
//          }
//          Pubnub.publish({
//              channel: $scope.channel,
//              message: {
//                  content: $scope.messageContent,
//                  sender_uuid: $scope.uuid,
//                  date: new Date()
//              },
//              callback: function(m) {
//                  console.log(m);
//              }
//          });
//          // Reset the messageContent input
//          $scope.messageContent = '';
//
//      }
//
//      $scope.messages = [];
//
//  // Subscribing to the ‘messages-channel’ and trigering the message callback
//  Pubnub.subscribe({
//    channel: $scope.channel,
//    triggerEvents: ['callback']
//  });
//
//  // Listening to the callbacks
//  $scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function (ngEvent, m) {
//    $scope.$apply(function () {
//        $scope.messages.push(m)
//    });
//  });
//
//  // A function to display a nice uniq robot avatar
//  $scope.avatarUrl = function(uuid){
//    return 'http://robohash.org/'+uuid+'?set=set2&bgset=bg2&size=70x70';
//  };
//   });
