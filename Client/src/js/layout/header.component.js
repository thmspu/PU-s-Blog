class AppHeaderCtrl {
  constructor(AppConstants, User, $scope ,$rootScope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.currentUser = User.current;

    $scope.$watch('User.current', (newUser) => {
      this.currentUser = newUser;
    })

    $scope.img = "home-bg.jpg";
   
    $scope.emitF1 = function() {
     $scope.$emit('tabImage', 1);
    };

    $scope.emitF2 = function() {
     $scope.$emit('tabImage', 2);
    };

    $scope.emitF3 = function() {
     $scope.$emit('tabImage', 3);
    };

     $scope.emitF4 = function() {
     $scope.$emit('tabImage', 4);
    };

    $rootScope.$on('tabImage', function(e, a) {
       switch(a) {
        case 1: $scope.img = "home-bg.jpg"; break;
        case 2: $scope.img = "about-bg.jpg"; break;
        case 3: $scope.img = "contact-bg.jpg"; break;
        case 4: $scope.img = "post-bg.jpg"; break;
        default: return;
       }
    });
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;
