"use strict";
class User {
    constructor(id) {
        this.id = id;
        this.posts = [];
        this.followers = [];
    }
    createPost(content) {
        const post = new Post(this.id, content);
        this.posts.push(post);
    }
    comment(postId, content, parentId) {
        const post = this.posts.find(post => post.id === postId);
        if (!post) {
            console.log("Không tìm thấy bài đăng");
            return;
        }
        if (parentId !== undefined) {
            const comment = new CommentNode(this.id, content);
            const parentComment = post.comments.find(comment => comment.id === parentId);
            if (parentComment) {
                parentComment.replies.push(comment);
            }
            else {
                console.log("Không tìm thấy bình luận");
            }
        }
        else {
            const comment = new CommentNode(this.id, content);
            post.comments.push(comment);
        }
    }
    follow(user) {
        this.followers.push(user);
    }
    likePost(postId) {
        const post = this.posts.find(post => post.id === postId);
        if (post) {
            post.addLike(this);
        }
        else {
            console.log("Bài đăng không được tìm thấy");
        }
    }
    viewFeed() {
        this.followers.forEach(user => {
            console.log(`Bài đăng từ người dùng ${user.id}:`);
            user.posts.forEach(post => {
                console.log(`Bài đăng ${post.id}: ${post.content}`);
            });
        });
    }
}
class Post {
    constructor(userId, content) {
        this.id = Math.floor(Math.random() * 1000);
        this.content = content;
        this.userId = userId;
        this.likes = [];
        this.comments = [];
    }
    addLike(user) {
        this.likes.push(user);
    }
    addComment(comment) {
        this.comments.push(comment);
    }
}
class CommentNode {
    constructor(userId, content) {
        this.id = Math.floor(Math.random() * 1000);
        this.userId = userId;
        this.content = content;
        this.replies = [];
    }
}
const user1 = new User(1);
const user2 = new User(2);
user1.createPost("Hello world!");
user2.follow(user1);
user2.viewFeed();
user2.likePost(user1.posts[0].id);
user1.comment(user1.posts[0].id, "Hay này");
user1.comment(user1.posts[0].id, "ok bro");
user2.viewFeed();
