app.service ('GiphyService', ['$http', function($http){
    console.log('giphy service loaded');

    var self = this;
    self.answers = {url: ''}

    self.results = { list: []}

    //search functions 
    self.search = function (search) {
      const config = {
        params: {
            q: search 
        }
      };
      $http.get('/giphy/search', config)
        .then(function(response){
          // self.pagination = response.data.pagination.offset;
          // self.count = response.data.pagination.count;
          self.results.list = response.data.data;
          console.log(self.results);
        });
    }

    //random functions
    self.random = function () {
      $http.get('/giphy/random')
      .then(function(response){
        self.answers.url = response.data.data.image_url;
        console.log('response from service', self.answers.url);
      });
    }

}])//end controller