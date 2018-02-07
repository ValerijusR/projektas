angular.module('orderController', [])

	
	.controller('mainController', ['$scope','$http','Orders', function($scope, $http, Orders) {
		$scope.formData = {};
		$scope.loading = true;

		var menu = {
    'foodList': [{
        'name': 'Raugintų kopūstų sriuba su bulvėmis',
        'price': '0.20'
    }, {
        'name': 'Guliašas kiaulienos',
        'price': '1.22'
    }, {
        'name': 'Kepsnys „Berželis“',
        'price': '0.87'
    },
		{
				'name': 'Bulvių plokštainis',
				'price': '0.57'
		},
		{
        'name': 'Kepta paukštienos filė',
        'price': '1.50'
    },
		{
				'name': 'Kiaulienos kotletas',
				'price': '1.20'
		},
		{
				'name': 'Maltas paukštienos (kalakutienos) šnicelis',
				'price': '1.50'
		},
		{
				'name': 'Žuvies kepsnys',
				'price': '1.30'
		}],
    'valueSelected': {
        'name': 'Bulvių plokštainis su paukštiena',
        'price': '1.45'
    }
}

		$scope.selectedValue = menu['valueSelected'];
		$scope.foodList = menu['foodList'];

		
		Orders.get()
			.success(function(data) {
				$scope.orders = data;
				$scope.loading = false;
			});

		
		$scope.createOrder = function() {

			var order = {};
			
			if ($scope.formData.name != undefined) {
				$scope.loading = true;

				for(var i=0; i < menu.foodList.length; i++) {
					if(menu.foodList[i]['name'] == $scope.formData.name) {
						order = menu.foodList[i];
						break;
					}

				}
				
				Orders.create(order)

					
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; 
						$scope.orders = data; 
					});

					$scope.getTotal();
			}
		};

		
		$scope.deleteOrder = function(id) {
			$scope.loading = true;

			Orders.delete(id)
				
				.success(function(data) {
					$scope.loading = false;
					$scope.orders = data; 
				});

				$scope.getTotal();
		};

		


	}]);
