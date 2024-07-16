import React from "react";
import { useParams, Link } from "react-router-dom";

function PostPage({ posts, handleDelete }) {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">EditPost</button>
            </Link>
            <button
              className="deleteButton"
              onClick={(id) => handleDelete(post.id)}
            >
              Delete post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Home page</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
}

export default PostPage;
