const app = angular.module('MyApp', []);

app.controller('MyController', ['$http', function($http){
    this.name = null;
    this.content = null;
    this.indexOfEditFormToShow = null;
    this.loggedInUser = false;
    const controller = this;

    this.createMessage = function(){
        $http({
            method:'POST',
            url: 'https://agile-temple-00865.herokuapp.com/messages/',
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
          controller.loggedInUser = response.data;
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
      console.log(response);
  });

  this.logout = function(){
    $http({
        url:'https://agile-temple-00865.herokuapp.com/sessions',
        method:'DELETE'
    }).then(function(){
        controller.loggedInUser = false;
    })
  }


    }
  ]
);
