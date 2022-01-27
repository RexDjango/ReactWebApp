import React, { useState, useEffect } from "react";
import { DashPostList } from "./index";
import {
  apiPostDetail,
  apiPostCount,
  apiBlogDetail,
  apiCreateComment,
  apiUserList,
} from "./lookup";
import {
  PostList,
  BlogList,
  GalleryList,
  AdminGalleryList,
  BlogmainList,
  CommentViewList,
  ProfileList,
} from "./list";
import { Post, CreateUserDetail } from "./detail";
import { GalleryCreate } from "./create";

export const CountContext = React.createContext();

export function DashPostComponent(props) {
  return <DashPostList />;
}

export function PostCountComponent() {
  const [postcount, setPostCount] = useState([]);

  useEffect(() => {
    const handleBackendLookup = (response, status) => {
      if (status === 200) {
        console.log("Post Count ", response);
        setPostCount(response.postcount);
      } else {
        alert("there was an error finding your post.");
      }
    };

    apiPostCount(handleBackendLookup);
  }, [setPostCount, postcount]);

  return postcount === null ? null : postcount;
}

export function PostComponent() {
  return <PostList />;
}

export function PostDetailComponent(props) {
  const { postId } = props;
  const [didLookup, setDidLookup] = useState(false);
  const [post, setPost] = useState(null);

  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      console.log(response);
      setPost(response);
    } else {
      alert("There was an error finding your post.");
    }
  };

  useEffect(() => {
    if (didLookup === false) {
      apiPostDetail(postId, handleBackendLookup);
      setDidLookup(true);
    }
  }, [postId, didLookup, setDidLookup]);

  return post === null ? null : <Post post={post} />;
}

export function PostListComponent() {
  return <PostList />;
}

export function AdminGalleryComponent(props) {
  const [newgalleries, setNewGalleries] = useState([]);
  const [galleryToEdit, setGalleryToEdit] = useState([]);

  const handleDidCreateGallery = (newgallery) => {
    let tempNewGallery = [...newgalleries];
    tempNewGallery.unshift(newgallery);
    setNewGalleries(tempNewGallery);
  };

  const handleEditDetail = (galleryeditdetail) => {
    console.log("<--galleryeditdetail:", galleryeditdetail);
    setGalleryToEdit(galleryeditdetail);
  };
  return (
    <div className="row">
      <GalleryCreate
        didCreateGallery={handleDidCreateGallery}
        galleryToEdit={galleryToEdit}
      />
      <div className="col-md-12">
        <AdminGalleryList
          newgalleries={newgalleries}
          {...props}
          didEditDetail={handleEditDetail}
        />
      </div>
    </div>
  );
}

//<-------- Website Components ---------->//
export function BlogComponent() {
  return <BlogList />;
}

export function GalleryComponent() {
  return <GalleryList />;
}

//<-------- BLog Components ---------->//
export function BlogMainComponent() {
  return <BlogmainList />;
}

export function CommentFormComponent() {
  const [blog, setBlog] = useState([]);
  const [hasBlog, setHasBlog] = useState(false);
  const txtmessage = React.createRef();
  const txtname = React.createRef();
  const txtemail = React.createRef();

  var path = window.location.pathname;
  var idRegex = /(?<blogid>\d+)/;
  var match = path.match(idRegex);
  var urlBlogId = match ? match.groups.blogid : -1;
  // const isDetail = `${blog.id}` === `${urlBlogId}`;

  useEffect(() => {
    if (hasBlog === false) {
      const BlogDetailLookup = (response, status) => {
        if (status === 200) {
          setBlog(response.blog);
          setHasBlog(true);
        }
      };
      apiBlogDetail(urlBlogId, "delete", BlogDetailLookup);
    }
  }, [urlBlogId, blog, hasBlog, setHasBlog, setBlog]);

  const CommentCreateLookup = (response, status) => {
    if (status === 201) {
      alert("Comment has been sent.");
    }
  };
  const handleComment = (event) => {
    event.preventDefault();
    const data = {
      fullname: txtname.current.value,
      email: txtemail.current.value,
      status: "pending",
      message: txtmessage.current.value,
      post: urlBlogId,
    };
    apiCreateComment(data, CommentCreateLookup);
    txtname.current.value = "";
    txtemail.current.value = "";
    txtmessage.current.value = "";
  };

  return (
    <div>
      <h4>Write a comment</h4>
      <form id="contactForm">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                ref={txtname}
                name="name"
                placeholder="Your Name"
                required
                data-error="Please enter your name"
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Email"
                id="email"
                className="form-control"
                ref={txtemail}
                name="name"
                required
                data-error="Please enter your email"
              />
              <div className="help-block with-errors"></div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <textarea
                className="form-control"
                id="message"
                placeholder="Your Comment"
                ref={txtmessage}
                rows="8"
                data-error="Write your message"
                required
              ></textarea>
              <div className="help-block with-errors"></div>
            </div>
            <div className="submit-button text-center">
              <button
                className="btn btn-primary"
                id="submit"
                type="submit"
                onClick={handleComment}
              >
                Send Comment
              </button>
              <button
                className="btn btn-primary ml-1"
                id="submit"
                type="submit"
                onClick={handleComment}
              >
                View Comments
              </button>
              <div id="msgSubmit" className="h3 text-center hidden"></div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </form>
      <CommentViewList />
    </div>
  );
}

export function CreateUserComponent() {
  const [user, setUser] = useState([]);
  const [hasuser, setHasUser] = useState(false);

  useEffect(() => {
    if (hasuser === false) {
      const handleUserLookup = (response, status) => {
        if (status === 200) {
          setUser(response.profilelist);
          setHasUser(true);
        }
      };
      apiUserList(handleUserLookup);
    }
  }, [user, setUser, hasuser, setHasUser]);

  const handleDidCreateUser = (newProfileList, status) => {
    if (status === 200) {
      const newprofile = newProfileList.profilelist;
      console.log("new profile", newprofile);
      setUser(newprofile);
    }
  };
  return (
    <div>
      <header>
        <div className="row">
          <div className="col-md-8">
            <h5 className="page_title float-left">User List</h5>
          </div>
          <div className="col-md-4">
            <button
              type="button"
              className="btn btn-primary btn-sm float-right"
              data-toggle="modal"
              data-target="#staticBackdrop"
            >
              Create new user
            </button>
          </div>
        </div>
      </header>

      {/* <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      > */}
      <CreateUserDetail didCreateUser={handleDidCreateUser} />
      {/* </div> */}

      <div className="user-content">
        <div className="row user-wrapper clearfix" id="user-button">
          <div className="col-md-12">
            <form>
              <div className="row">
                <div className="col-md-1">
                  <div className="form-group">
                    <label htmlFor="sell">Search by</label>
                  </div>
                </div>
                <div className="col-md-2 float-right">
                  <div className="form-group">
                    <select className="custom-select custom-select-md">
                      <option selected>Select option</option>
                      <option>Username</option>
                      <option>First Name</option>
                      <option>Last Name</option>
                      <option>Status</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group">
                    <input className="form-control"></input>
                  </div>
                </div>
              </div>
            </form>

            <ProfileList user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
