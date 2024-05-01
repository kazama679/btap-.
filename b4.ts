class User {
    id: number;
    posts: Post[];
    followers: User[];

    constructor(id: number) {
        this.id = id;
        this.posts = [];
        this.followers = [];
    }

    createPost(content: string): void {
        const post = new Post(this.id, content);
        this.posts.push(post);
    }

    comment(postId: number, content: string, parentId?: number): void {
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
            } else {
                console.log("Không tìm thấy bình luận");
            }
        } else {
            const comment = new CommentNode(this.id, content);
            post.comments.push(comment);
        }
    }

    follow(user: User): void {
        this.followers.push(user);
    }

    likePost(postId: number): void {
        const post = this.posts.find(post => post.id === postId);
        if (post) {
            post.addLike(this);
        } else {
            console.log("Bài đăng không được tìm thấy");
        }
    }

    viewFeed(): void {
        this.followers.forEach(user => {
            console.log(`Bài đăng từ người dùng ${user.id}:`);
            user.posts.forEach(post => {
                console.log(`Bài đăng ${post.id}: ${post.content}`);
            });
        });
    }
}

class Post {
    id: number;
    userId: number;
    content: string;
    likes: User[];
    comments: CommentNode[];

    constructor(userId: number, content: string) {
        this.id = Math.floor(Math.random() * 1000); 
        this.content = content;
        this.userId = userId;
        this.likes = [];
        this.comments = [];
    }

    addLike(user: User): void {
        this.likes.push(user);
    }

    addComment(comment: CommentNode): void {
        this.comments.push(comment);
    }
}

class CommentNode {
    id: number;
    userId: number;
    content: string;
    replies: CommentNode[];

    constructor(userId: number, content: string) {
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