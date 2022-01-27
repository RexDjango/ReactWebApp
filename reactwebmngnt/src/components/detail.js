import React, { useState } from "react";
import { ActionBtn } from "./buttons";
import { apiGalleryDelete, apiCommenterDelete, apiCreateUser } from "./lookup";
import { baseurlforpic } from "../base_urlpath";

export function DashPostDetail(props) {
  const { post, didDelete } = props;

  const handlelinkEdit = (event) => {
    event.preventDefault();
    window.location.href = `posts-edit/${post.id}`;
  };

  const handlelinkView = (event) => {
    event.preventDefault();
    window.location.href = `posts-view/${post.id}`;
  };

  const handlePerformAction = (newActionPost, status) => {
    if (status === 200) {
      if (didDelete) {
        didDelete(newActionPost);
      }
    }
  };

  return (
    <tr key={post.id}>
      <td>{post.title}</td>
      <td>{post.reply}</td>
      <td>{post.timestamp}</td>
      <td>
        <button
          className="btn btn-warning btn-sm mr-1"
          onClick={handlelinkEdit}
        >
          edit
        </button>
        <button
          className="btn btn-primary btn-sm mr-1"
          onClick={handlelinkView}
        >
          view
        </button>
        <ActionBtn
          post={post}
          didPerformAction={handlePerformAction}
          action={{ type: "delete", display: "Delete" }}
        />
      </td>
    </tr>
  );
}

export function DashCommenterDetail(props) {
  const { commenter, didDeleteCommenter } = props;
  let classname = "badge badge-secondary badge-sm";
  if (commenter.status === "pending") {
    classname = "badge badge-secondary badge-sm";
  } else {
    classname = "badge badge-primary badge-sm";
  }

  const handleActionBackendEvent = (response, status) => {
    if ((status === 200 || status === 201) && didDeleteCommenter) {
      didDeleteCommenter(response, status);
    }
  };

  const handleCommenterDelete = (event) => {
    event.preventDefault();
    apiCommenterDelete(commenter.id, "delete", handleActionBackendEvent);
  };
  return (
    <tr key={commenter.id}>
      <td>{commenter.id}</td>
      <td>{commenter.fullname}</td>
      <td>{commenter.email}</td>
      <td>
        <a href="/" className={classname}>
          {commenter.status}
        </a>
      </td>
      <td>{commenter.formattimestamp}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={handleCommenterDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export function CommentDetail(props) {
  const { comment } = props;
  return (
    <React.Fragment>
      <div className="comment-head-dash clearfix" id="articlelist">
        <div className="commenter-name-dash float-left">{comment.fullname}</div>
        <div className="days-dash float-right">{comment.visitortimestamp}</div>
      </div>
      <p className="comment-dash">{comment.message}</p>
      <small className="comment-date-dash">{comment.commenttimestamp}</small>
      <hr />
    </React.Fragment>
  );
}

export function Post(props) {
  const { post, didcreatePost } = props;
  const [actionPost, setActionPost] = useState(props.post ? props.post : null);

  const handlelinkEdit = (event) => {
    event.preventDefault();
    window.location.href = `posts-edit/${post.id}`;
  };

  const handlelinkView = (event) => {
    event.preventDefault();
    window.location.href = `posts-view/${post.id}`;
  };

  const handlePerformAction = (newActionPost, status) => {
    if (status === 200) {
      didcreatePost(newActionPost);
      setActionPost(actionPost);
    } else if (status === 201) {
      if (didcreatePost) {
        didcreatePost(newActionPost);
        setActionPost(actionPost);
      }
    }
  };

  return (
    <div className="row view-article-row border-bottom pb-3">
      <div className="col-md-2 col-lg-1 view-article-status-padding">
        <span className="badge badge-success badge-sm">Active</span>
      </div>
      <div className="col-md-10 col-lg-11 view-article-title">
        <p>{post.content}</p>
        <small>Created {post.timestamp}</small>
      </div>
      <div className="col-md-12 offset-md-2 col-lg-4 offset-lg-0">
        <div className="view-article-action">
          <a
            className="btn btn-sm btn-light"
            href="/"
            role="button"
            onClick={handlelinkView}
          >
            <span>
              <img
                alt="View"
                src={require("../myimages/opened_folder_32px.png")}
                height={22}
                width={22}
                aria-hidden="true"
              />
              &nbsp;View
            </span>
          </a>

          <a
            className="btn btn-sm btn-light"
            href="/"
            role="button"
            onClick={handlelinkEdit}
          >
            <span>
              <img
                alt="Edit"
                src={require("../myimages/edit_32px.png")}
                height={22}
                width={22}
                aria-hidden="true"
              />
              &nbsp;Edit
            </span>
          </a>
          <ActionBtn
            post={actionPost}
            didPerformAction={handlePerformAction}
            action={{ type: "delete", display: "Delete" }}
          />
        </div>
      </div>
    </div>
  );
}

export function PostDetail(props) {
  const { post, didcreatePost } = props;
  const [actionpost, setActionpost] = useState(props.post ? props.post : null);

  const handlelinkEdit = (event) => {
    event.preventDefault();
    window.location.href = `posts-edit/${post.id}`;
  };

  const handlelinkView = (event) => {
    event.preventDefault();
    window.location.href = `posts-view/${post.id}`;
  };

  const handlePerformAction = (newActionpost, status) => {
    if (status === 200) {
      // console.log("show tweet");
      setActionpost(newActionpost);
      didcreatePost(actionpost);
    } else if (status === 201) {
      setActionpost(newActionpost);
      didcreatePost(actionpost);
    }
  };

  return (
    <div className="row view-article-row border-bottom pb-3">
      <div className="col-md-2 col-lg-1 view-article-status-padding">
        <span className="badge badge-success badge-sm">Active</span>
      </div>
      <div className="col-md-10 col-lg-11 view-article-title">
        <p>{post.content}</p>
        <small>Created {post.timestamp}</small>
      </div>
      <div className="col-md-12 offset-md-2 col-lg-4 offset-lg-0">
        <div className="view-article-action">
          <a
            className="btn btn-sm btn-light"
            href="/"
            role="button"
            onClick={handlelinkView}
          >
            <span>
              <img
                alt="View"
                src={require("../myimages/opened_folder_32px.png")}
                height={22}
                width={22}
                aria-hidden="true"
              />
              &nbsp;View
            </span>
          </a>

          <a
            className="btn btn-sm btn-light"
            href="/"
            role="button"
            onClick={handlelinkEdit}
          >
            <span>
              <img
                alt="Edit"
                src={require("../myimages/edit_32px.png")}
                height={22}
                width={22}
                aria-hidden="true"
              />
              &nbsp;Edit
            </span>
          </a>
          <ActionBtn
            post={actionpost}
            didPerformAction={handlePerformAction}
            action={{ type: "delete", display: "Delete" }}
          />
        </div>
      </div>
    </div>
  );
}

export function AdminGalleryDetail(props) {
  const { gallery, didClickDelete, didClickEdit } = props;

  const handleEditClick = (event) => {
    event.preventDefault();
    const editdata = {
      id: gallery.id,
      title: gallery.title,
      discrip: gallery.discrip,
      picture: gallery.picture,
    };
    // window.location.href = `/myadmin/gallery-edit/${gallery.id}`;
    didClickEdit(editdata);
  };

  const handleBackendEvent = (response, status) => {
    if ((status === 200 || status === 201) && didClickDelete) {
      didClickDelete(response, status);
    }
  };

  const handleDeleteClick = (event) => {
    event.preventDefault();
    apiGalleryDelete(gallery.id, "delete", handleBackendEvent);
  };

  return (
    <tr>
      <td>{gallery.id}</td>
      <td>{gallery.title}</td>
      <td>{gallery.discrip}</td>
      <td>{gallery.picture}</td>
      <td>
        <img
          src={`${baseurlforpic("pathname")}${gallery.picture}`}
          width="150"
          height="150"
          alt="mypicture"
        />
      </td>
      <td>
        <button className="btn btn-warning btn-sm" onClick={handleEditClick}>
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          action={{ type: "delete" }}
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

//<-------- Website Details ---------->//
export function BlogDetails(props) {
  const { blog } = props;

  const handleReadMore = (event) => {
    event.preventDefault();
    window.open(`/blog/blogdetail/${blog.id}`, "_blank");
    //window.location.href = `website/blogdetail/${props.id}`;
  };
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="blog-inner">
        <div className="blog-img">
          <img
            alt="View"
            src={blog.picture}
            height={200}
            width={400}
            aria-hidden="true"
          />
        </div>
        <div className="item-meta">
          <a href="/">
            <i className="fa fa-comments-o"></i> {blog.reply} Comment{" "}
          </a>
          <a href="/">
            <i className="fa fa-user-o"></i> Admin
          </a>
          <span className="dti">{blog.dtime}</span>
        </div>
        <h2>{blog.title}</h2>
        <p>{blog.descrip}</p>
        <a className="new-btn-d br-2" href="/" onClick={handleReadMore}>
          Read More{" "}
          <i className="fa fa-angle-double-right" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
}

export function GalleryDetail(props) {
  const { gallery } = props;

  return (
    <div className="col-md-3 col-sm-6">
      <div className="box-gallery">
        <img alt="pic" src={gallery.picture} />
        <div className="box-content">
          <h3 className="title">{gallery.title}</h3>
          <ul className="icon">
            <li>
              <a href={gallery.picture} height={100} width={100}>
                <i className="fa fa-picture-o" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function BlogMainDetail(props) {
  const { blog } = props;
  return (
    <article>
      <header>
        <h2>{blog.title}</h2>
      </header>
      <footer>
        <small>{blog.dtime}</small>
      </footer>
      <div className="lead">{blog.descrip}</div>
      <footer>
        {blog.tagname.map((item, index) => {
          return (
            <span className="badge badge-info" key={index}>
              {item.name}
            </span>
          );
        })}
      </footer>
    </article>
  );
}

export function CommentViewDetail(props) {
  const { comment } = props;

  return comment.visitor ? (
    <div>
      <hr />
      <div className="media bg-light">
        <span>
          <img
            alt="User"
            src="http://localhost:8000/media/male_user_100px.png"
            height={42}
            width={42}
            aria-hidden="true"
          />
        </span>
        <div className="media-body">
          <h5 className="mt-0">{comment.fullname}</h5>
          {comment.message}
          <h5>
            <small>{comment.commenttimestamp}</small>
          </h5>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <hr />
      <div className="media bg-light">
        <span>
          <img
            alt="User"
            src="http://localhost:8000/media/025.png"
            height={42}
            width={42}
            aria-hidden="true"
            classname="rounded-circle"
          />
        </span>
        <div className="media-body">
          <h5 className="mt-0">{comment.fullname}</h5>
          {comment.message}
          <h5>
            <small>{comment.commenttimestamp}</small>
          </h5>
        </div>
      </div>
    </div>
  );
}
// export function BlogCommentFormDetail(props){
//   const {blog}=props

//   var path=window.location.pathname
//   var idRegex=/(?<blogid>\d+)/
//   var match=path.match(idRegex)
//   var urlBlogId=match?match.groups.blogid:-1
//   const isDetail=`${blog.id}`===`${urlBlogId}`

//   console.log(blog.id)
//   const handleComment = (event) => {
//     event.preventDefault();

//   };
//   return (
//     <div>
//       <h4>Write a comment</h4>
//     <form id="contactForm">
//         <div className="row">
//         <div className="col-md-6">
//             <div className="form-group">
//                 <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" required data-error="Please enter your name"/>
//                 <div className="help-block with-errors"></div>
//             </div>
//         </div>
//         <div className="col-md-6">
//             <div className="form-group">
//                 <input type="text" placeholder="Your Email" id="email" className="form-control" name="name" required data-error="Please enter your email"/>
//                 <div className="help-block with-errors"></div>
//             </div>
//         </div>
//         <div className="col-md-12">
//             <div className="form-group">
//                 <textarea className="form-control" id="message" placeholder="Your Message" rows="8" data-error="Write your message" required></textarea>
//                 <div className="help-block with-errors"></div>
//             </div>
//             <div className="submit-button text-center">
//                 <button className="btn btn-primary" id="submit" type="submit" onClick={handleComment}>Send Message</button>
//                 <div id="msgSubmit" className="h3 text-center hidden"></div>
//                 <div className="clearfix"></div>
//             </div>
//         </div>
//         </div>
//     </form>
//     </div>
//   )
// }

export function CreateUserDetail(props) {
  const { didCreateUser } = props;

  const txtusername = React.createRef();
  const firstname = React.createRef();
  const contact = React.createRef();
  const password = React.createRef();
  const lastname = React.createRef();
  const email = React.createRef();
  const address = React.createRef();
  const userstatus = React.createRef();

  const handleCreateUser = (event) => {
    event.preventDefault();
    const mystatus = userstatus.current.value === "true" ? true : false;

    const data = {
      username: txtusername.current.value,
      firstname: firstname.current.value,
      contact: contact.current.value,
      password: password.current.value,
      lastname: lastname.current.value,
      email: email.current.value,
      location: address.current.value,
      status: mystatus,
    };
    const handleCreateuserLookup = (response, status) => {
      if (status === 200) {
        didCreateUser(response, status);
        alert("New user has been created");
      } else {
        alert("User has not been created");
      }
    };
    apiCreateUser(data, handleCreateuserLookup);
    txtusername.current.value = "";
    firstname.current.value = "";
    contact.current.value = "";
    password.current.value = "";
    lastname.current.value = "";
    email.current.value = "";
    address.current.value = "";
  };

  return (
    <div>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Create User
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form role="form">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      ref={txtusername}
                    />
                  </div>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      ref={firstname}
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact number</label>
                    <input type="text" className="form-control" ref={contact} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      ref={password}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      ref={lastname}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="text" className="form-control" ref={email} />
                  </div>
                  <div className="form-group">
                    <label>
                      Email Address
                      <select
                        ref={userstatus}
                        className="custom-select custom-select-md"
                      >
                        <option value="true">Not Active</option>
                        <option value="false">Active</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <label>Address</label>
                  <textarea
                    className="form-control"
                    rows="8"
                    ref={address}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreateUser}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
