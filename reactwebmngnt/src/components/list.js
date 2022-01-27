import React, { useEffect, useState, useContext } from "react";
import {
  apiDashPostList,
  apiPostList,
  apiGalleryList,
  apiBlogList,
  apiCommentList,
} from "./lookup";
import {
  DashPostDetail,
  Post,
  BlogDetails,
  GalleryDetail,
  AdminGalleryDetail,
  DashCommenterDetail,
  CommentDetail,
  BlogMainDetail,
  CommentViewDetail,
} from "./detail";
import { CountContext } from "./components";

export function DashPostList() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [commenters, setCommenters] = useState([]);

  useEffect(() => {
    const myCallback = (response, status) => {
      if (status === 200) {
        setPosts(response.post);
        setCommenters(response.commenter);
        setComments(response.comments);
      }
    };
    apiDashPostList(myCallback);
  }, []);

  const handleDidDelete = (props) => {
    const listinit = props.postlist;
    setPosts(listinit);
  };

  const handleDeleteCommenter = (props) => {
    const commenterlist = props.commenterlist;
    setCommenters(commenterlist);
  };

  const handleViewArticle = (event) => {
    event.preventDefault();
    window.location.href = `/myadmin/viewarticle/`;
  };

  const handleViewComment = (event) => {
    event.preventDefault();
    window.location.href = `/myadmin/comments/`;
  };

  const handleNewArticle = (event) => {
    event.preventDefault();
    window.location.href = "/myadmin/post/";
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-7 dashboard-left-cell">
          <div className="dashboard-content-con">
            <header className="clearfix">
              <h5 className="page_title float-left">Articles</h5>
              <a
                href="/"
                className="btn btn-primary btn-sm float-right"
                onClick={handleNewArticle}
              >
                Create new article
              </a>
            </header>
            <table className="table table-striped table-md table-borderless table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>replies</th>
                  <th>date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((item, index) => {
                  return (
                    <DashPostDetail
                      post={item}
                      didDelete={handleDidDelete}
                      key={index}
                    />
                  );
                })}
              </tbody>
            </table>
            <div className="clearfix">
              <a
                href="/"
                className="float-right text-link"
                onClick={handleViewArticle}
              >
                view all articles
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-5 dashboard-right-cell">
          <div className="dashboard-content-con">
            <header>
              <h5 className="page_title">Comments</h5>
            </header>
            {comments.map((item, index) => {
              return <CommentDetail comment={item} key={index} />;
            })}
            <div className="clearfix">
              <a
                href="/"
                className="float-right text-link"
                onClick={handleViewComment}
              >
                view all comments
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 dashboard-bottom-cell">
          <div className="dashboard-content-con">
            <header>
              <h5 className="page_title">Commenters</h5>
            </header>
            <table className="table table-striped table-md table-borderless table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {commenters.map((item, index) => {
                  return (
                    <DashCommenterDetail
                      didDeleteCommenter={handleDeleteCommenter}
                      commenter={item}
                      key={index}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PostList() {
  const [posts, setPosts] = useState([]);
  const [postDidSet, setPostDidSet] = useState(false);
  const counContext = useContext(CountContext);

  useEffect(() => {
    if (postDidSet === false) {
      const handlePostListLookup = (response, status) => {
        if (status === 200) {
          setPosts(response.postlist);
          setPostDidSet(true);
          const postcount = posts;
          console.log("response", postcount.postcount);
          counContext.countDispatch(posts.postcount);
        } else {
          alert("There was an error");
        }
      };
      apiPostList(handlePostListLookup);
    }
  }, [posts, setPosts, postDidSet, counContext]);

  const handleDidRepost = (posts) => {
    const updatepostsInit = posts.postlist;
    console.log("(1) updatepostsInit", updatepostsInit);
    setPosts(updatepostsInit);
    console.log("(2) updatepostsInit", updatepostsInit);
  };

  return (
    <React.Fragment>
      {posts.map((item, index) => {
        return <Post post={item} didcreatePost={handleDidRepost} key={index} />;
      })}
    </React.Fragment>
  );
}

export function AdminGalleryImage(props) {
  const { imgurl } = props;
  return (
    <span>
      <img alt="" src={imgurl} height="150" width="150" />
    </span>
  );
}

export function AdminGalleryList(props) {
  const { didEditDetail } = props;
  const [galleryInit, setGalleryInit] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [galleryDidSet, setGalleryDidSet] = useState(false);

  useEffect(() => {
    const final = [...props.newgalleries].concat(galleryInit);
    if (final.length !== galleries.length) {
      setGalleries(final);
    }
  }, [props.newgalleries, galleries, galleryInit]);

  useEffect(() => {
    if (galleryDidSet === false) {
      const handleGalleryListLookup = (response, status) => {
        if (status === 200) {
          setGalleryInit(response.gallerylist);
          setGalleryDidSet(true);
        } else {
          alert("There was an error");
        }
      };
      apiGalleryList(handleGalleryListLookup);
    }
  }, [galleryInit, galleryDidSet, setGalleryDidSet]);

  const handleClickDelete = (newActionGallery, status) => {
    if (status === 200) {
      const newGallery = newActionGallery.gallerylist;
      setGalleryInit(newGallery);
    }
  };

  const handleEditData = (galleryedit) => {
    console.log("<----list::galleryedit::", galleryedit);
    didEditDetail(galleryedit);
  };

  return (
    <table className="table table-striped table-md table-borderless table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>picture url</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {galleries.map((item, index) => {
          return (
            <AdminGalleryDetail
              didClickDelete={handleClickDelete}
              didClickEdit={handleEditData}
              gallery={item}
              key={index}
            />
          );
        })}
      </tbody>
    </table>
  );
}

//<---------------- Website List -------------->//
export function BlogList(props) {
  const [blog, setBlog] = useState([]);
  const [didBlog, setDidiBlog] = useState(false);

  useEffect(() => {
    if (didBlog === false) {
      const handlePostListLookup = (response, status) => {
        if (status === 200) {
          setBlog(response.postlist);
          setDidiBlog(true);
        }
      };
      apiPostList(handlePostListLookup);
    }
  }, [blog, setBlog, didBlog, setDidiBlog]);

  return (
    <div className="row">
      {blog.map((item, index) => {
        return <BlogDetails blog={item} key={index} />;
      })}
    </div>
  );
}

export function GalleryList(props) {
  const [gallery, setGallery] = useState([]);
  const [didgallery, setDidGallery] = useState(false);

  useEffect(() => {
    if (didgallery === false) {
      const handleGalleryListLookup = (response, status) => {
        if (status === 200) {
          setGallery(response.gallerylist);
          setDidGallery(true);
        }
      };
      apiGalleryList(handleGalleryListLookup);
    }
  }, [gallery, setGallery, didgallery]);

  return (
    <div className="popup-gallery row clearfix">
      {gallery.map((item, index) => {
        return <GalleryDetail gallery={item} key={index} />;
      })}
    </div>
  );
}

//<---------------- Blog Main -------------->//
export function BlogmainList() {
  const [blog, setBlog] = useState([]);
  const [hasblog, setHasBlog] = useState(false);

  useEffect(() => {
    if (hasblog === false) {
      const handleBackendLookup = (response, status) => {
        if (status === 200) {
          setBlog(response.bloglist);
          setHasBlog(true);
        }
      };
      apiBlogList(handleBackendLookup);
    }
  }, [blog, setBlog, hasblog]);

  return (
    <div>
      {blog.map((item, index) => {
        return <BlogMainDetail blog={item} key={index} />;
      })}
    </div>
  );
}

export function CommentViewList() {
  const [comment, setComment] = useState([]);
  const [hascomment, setHasComment] = useState(false);

  useEffect(() => {
    if (hascomment === false) {
      const handleBackenLookup = (response, status) => {
        if (status === 200) {
          setComment(response.results);
          setHasComment(true);
        }
      };
      apiCommentList(handleBackenLookup);
    }
  }, [comment, setComment, hascomment, setHasComment]);

  return (
    <div>
      {comment.map((item, index) => {
        return <CommentViewDetail comment={item} key={index} />;
      })}
    </div>
  );
}

export function ProfileList(props) {
  const { user } = props;

  return (
    <div className="table-responsive-sm">
      <table
        className="table table-bordered table-sm table-hover"
        cellSpacing="0"
        width="100%"
      >
        <caption>List of all users</caption>
        <thead className="thead-light">
          <tr>
            <th>Action</th>
            <th>Profile</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {user.map((item, index) => {
            return (
              <tr key={index}>
                <td className="action-btn">
                  <a href="/" className="action-i">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </a>
                  <a href="/" className="action-d">
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </td>
                <td>
                  <img
                    src="http://localhost:8000/media/dog.jpg"
                    className="rounded-circle"
                    area-hidden="true"
                    height="48"
                    width="48"
                    alt="mypicture"
                  />
                </td>
                <td>{item.username}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>rex.v.talacay@gmail.com</td>
                <td>09273838125</td>
                <td>Address</td>
                <td>
                  <span className="badge badge-danger p-1">Not active</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
