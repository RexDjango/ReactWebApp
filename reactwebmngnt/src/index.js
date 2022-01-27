import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  DashPostComponent,
  PostDetailComponent,
  PostComponent,
  PostCountComponent,
  BlogComponent,
  GalleryComponent,
  AdminGalleryComponent,
  BlogMainComponent,
  CommentFormComponent,
  CreateUserComponent,
  ServicesComponent,
} from "./components";
import * as serviceWorker from "./serviceWorker";

const e = React.createElement;
const dashpostsEl = document.getElementById("dashboard");
if (dashpostsEl) {
  console.log("dashboard");
  ReactDOM.render(e(DashPostComponent, dashpostsEl.dataset), dashpostsEl);
}

const galleryEl = document.getElementById("gallery-list");
if (galleryEl) {
  ReactDOM.render(e(GalleryComponent, galleryEl.dataset), galleryEl);
}

const admingalleryEl = document.getElementById("admin-gallery-list");
if (admingalleryEl) {
  ReactDOM.render(
    e(AdminGalleryComponent, admingalleryEl.dataset),
    admingalleryEl
  );
}

const webblogEl = document.getElementById("website-blog");
if (webblogEl) {
  console.log("web-blog");
  ReactDOM.render(e(BlogComponent, webblogEl.dataset), webblogEl);
}

const postlistEl = document.getElementById("article-list");
if (postlistEl) {
  console.log("article-list");
  ReactDOM.render(e(PostComponent, postlistEl.dataset), postlistEl);
}

const postCountEl = document.getElementById("article-count");
if (postCountEl) {
  console.log("article-count");
  ReactDOM.render(e(PostCountComponent, postCountEl.dataset), postCountEl);
}

const blogmainlistEl = document.getElementById("blog-main");
if (blogmainlistEl) {
  ReactDOM.render(e(BlogMainComponent, blogmainlistEl.dataset), blogmainlistEl);
}

const blogcommentEl = document.getElementById("comment-form");
if (blogcommentEl) {
  ReactDOM.render(
    e(CommentFormComponent, blogcommentEl.dataset),
    blogcommentEl
  );
}

const serviceEl = document.getElementById("services");
if (serviceEl) {
  ReactDOM.render(e(ServicesComponent, serviceEl.dataset), serviceEl);
}

const createuserEl = document.getElementById("users");
if (createuserEl) {
  ReactDOM.render(e(CreateUserComponent, createuserEl.dataset), createuserEl);
}

const postDetailElements = document.querySelectorAll(".post-detail");
postDetailElements.forEach((container) => {
  const myComponent = e(PostDetailComponent, container.dataset);
  ReactDOM.render(
    <React.StrictMode>{myComponent}</React.StrictMode>,
    container
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
