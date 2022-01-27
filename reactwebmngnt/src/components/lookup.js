import { backendLookup, fetchLookup } from "../lookup";

export function apiDashPostList(callback) {
  backendLookup("GET", "api/dashposts/", callback);
}

export function apiPostList(callback) {
  backendLookup("GET", "api/postlist/", callback);
}

export function apiBlogList(callback) {
  backendLookup("GET", "api/bloglist", callback);
}

export function apiPostDetail(postId, callback) {
  backendLookup("GET", `api/posts-view/${postId}`, callback);
}

export function apiPostEdit(postId, callback) {
  backendLookup("GET", `api/posts-edit/${postId}`, callback);
}

export function apiPostDelete(postId, action, callback) {
  const data = { id: postId, action: action };
  backendLookup("POST", "api/post-delete/", callback, data);
}

export function apiPostCount(callback) {
  backendLookup("GET", "api/post-count/", callback);
}

export function apiGalleryList(callback) {
  backendLookup("GET", "api/gallerylist", callback);
}

export function apiGalleryCreate(newGallery, callback) {
  fetchLookup("POST", "api/create-gallery/", callback, newGallery);
}

export function apiGalleryDelete(galleryId, action, callback) {
  const data = { id: galleryId, action: action };
  backendLookup("POST", "api/gallerydelete/", callback, data);
}

export function apiCommenterDelete(commenterId, action, callback) {
  const data = { id: commenterId, action: action };
  backendLookup("POST", "api/commeterdelete/", callback, data);
}

export function apiBlogDetail(blogId, action, callback) {
  const data = { id: blogId, action: action };
  backendLookup("POST", "api/blogdetail/", callback, data);
}

export function apiCreateComment(data, callback) {
  backendLookup("POST", "api/savecomment/", callback, data);
}

export function apiCommentList(callback) {
  backendLookup("GET", "api/commentviewlist/", callback);
}

export function apiCreateUser(data, callback) {
  backendLookup("POST", "api/create-user/", callback, data);
}

export function apiUserList(callback) {
  backendLookup("GET", "api/profilelist/", callback);
}

export function apiServices(callback) {
  backendLookup("GET", "apiservices/laboratory/", callback);
}
