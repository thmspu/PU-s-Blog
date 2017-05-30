class CommentCtrl {
  constructor(User) {
    'ngInject';

    if (User.current) {
      this.canModify = true;
    } else {
      this.canModify = false;
    }

  }
}

let Comment = {
  bindings: {
    data: '=',
    deleteCb: '&'
  },
  controller: CommentCtrl,
  templateUrl: 'article/comment.html'
};

export default Comment;
