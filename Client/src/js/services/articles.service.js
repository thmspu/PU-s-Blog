export default class Articles {
  constructor(AppConstants, $http, $q, User) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
    this._User = User;

  }

  /*
    Config object spec:

    {
      type: String [REQUIRED] - Accepts "all", "feed"
      filters: Object that serves as a key => value of URL params (i.e. {author:"ericsimons"} )
    }
  */
  query(config) {
    // Create the $http object for this request
    let request = {
      url: this._AppConstants.apii + '/feed',
      method: 'GET',
      params: config.filters ? config.filters : null
    };
    return this._$http(request).then((res) => res.data);
  }

  get(slug) {
    let deferred = this._$q.defer();

    if (!slug.replace(" ", "")) {
      deferred.reject("Article slug is empty");
      return deferred.promise;
    }

    this._$http({
      url: this._AppConstants.apii + '/articles/' + slug,
      method: 'GET'
    }).then(
      (res) => {  deferred.resolve(res.data);},
      (err) => deferred.reject(err)
    );

    return deferred.promise;
  }

  destroy(slug) {
    return this._$http({
      url: this._AppConstants.apii + '/articles/' + slug,
      method: 'DELETE'
    })
  }

  save(article) {
    let request = {};
    if (article.slug) {
      request.url = `${this._AppConstants.apii}/articles/${article.slug}`;
      request.method = 'PUT';
      delete article.slug;

    } else {
      
      request.url = `${this._AppConstants.apii}/articles`;
      request.method = 'POST';
    }
    let passObj = article;
    passObj.author = {};
    passObj.author.username = this._User.current.username;
    passObj.author.bio = this._User.current.bio;
    passObj.author.image = this._User.current.image;
    passObj.author.following = this._User.current.following;
    
    
    request.data = { article: passObj };

    return this._$http(request).then((res) => {console.log(res.data);return res.data;});
  }


  favorite(obj) {
    return this._$http({
      url: this._AppConstants.apii + '/articles/favorite/' + obj.slug + '/'+obj.count ,
      method: 'POST'
    })
  }

  unfavorite(obj) {
    return this._$http({
      url: this._AppConstants.apii + '/articles/favorite/' + obj.slug + '/'+obj.count,
      method: 'DELETE'
    })
  }


}
