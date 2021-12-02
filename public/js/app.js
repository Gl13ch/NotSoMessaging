const app = angular.module('MyApp', []);

app.controller('MyController', ['$http', function($http){
    this.name = null;
    this.content = null;
    this.indexOfEditFormToShow = null;
    const controller = this;

    this.createMessage = function(){
        $http({
            method:'POST',
            url: 'http://localhost:3000/messages/',
            data: {
                name: this.name,
                content: this.content
            }
        }).then(function(response){
             controller.getMessages(); //get all todos when new element is added
        }, function(){
            console.log('error');
        });
    }

    this.getMessages = function(){
        $http({
            method:'GET',
            url: 'http://localhost:3000/messages/',
        }).then(function(response){
            controller.messages = response.data; //set value on success
        }, function(){
            console.log('error');
        });
    };

    this.deleteMessage = function(message){
    $http({
        method:'DELETE',
        url: 'http://localhost:3000/messages/' + message._id
    }).then(
        function(response){
            controller.getMessages();
        },
        function(error){

        }
    );
  }

  this.editMessage = function(message){
    $http({
        method:'PUT',
        url: 'http://localhost:3000/messages/' + message._id,
        data: {
          // name: this.name,
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

    this.getMessages(); //call immediately once controller is instantiated to test

    }
  ]
);
