class FavoriteBtnCtrl {
  constructor(User, Articles, $state) {
    'ngInject';

    this._User = User;
    this._Articles = Articles;
    this._$state = $state;

  }

  submit() {
    this.isSubmitting = true;

    if (!this._User.current) {
      this._$state.go('app.register');
      return;
    }

    // if (this.article.favorited) {
    //   this._Articles.unfavorite({slug: this.article.slug, count:--this.article.favoritesCount}).then(
    //     () => {
    //       this.isSubmitting = false;
    //       this.article.favorited = false;
         
    //     }
    //   )

    // } else {
      this._Articles.favorite({slug: this.article.slug, count: ++this.article.favoritesCount}).then(
        () => {
          this.isSubmitting = false;
          this.article.favorited = true;
         
        }
      )
    // }

  }

}

let FavoriteBtn= {
  bindings: {
    article: '='
  },
  transclude: true,
  controller: FavoriteBtnCtrl,
  templateUrl: 'components/buttons/favorite-btn.html'
};

export default FavoriteBtn;
