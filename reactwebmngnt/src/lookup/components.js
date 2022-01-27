import { baseurl } from "../base_urlpath";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function fetchLookup(method, endpoint, callback, data) {
  let uploadData;
  if (data) {
    uploadData = data;
  }

  fetch(`${baseurl("pathname")}${endpoint}`, {
    method: "POST",
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      "X-Requested-With": "XMLHttpRequest",
    },
    body: uploadData,
  })
    .then((res) => {
      if (res.status === 403) {
        const detail = res.detail;
        if (detail === "Authentication credentials were not provided.") {
          if (window.location.href.indexOf("login") === -1) {
            window.location.href = "/login?showLoginRequired=true";
          }
        }
      }
      // Examine the text in the response
      res.json().then(function (data) {
        callback(data, res.status);
      });
    })
    .catch((error) => {
      callback({ message: "The request was an error" }, 400);
    });
}

export function backendLookup(method, endpoint, callback, data) {
  let jsonData;
  if (data) {
    jsonData = JSON.stringify(data);
  }
  console.log("<---mybaseurl:", baseurl("pathname"));
  const xhr = new XMLHttpRequest();
  const url = `${baseurl("pathname")}${endpoint}`;
  xhr.responseType = "json";
  const csrftoken = getCookie("csrftoken");
  console.log("method & url", method, url);
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/json");
  if (csrftoken) {
    // xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
  }
  xhr.onload = function () {
    if (xhr.status === 403) {
      const detail = xhr.response.detail;
      if (detail === "Authentication credentials were not provided.") {
        if (window.location.href.indexOf("login") === -1) {
          window.location.href = "/login?showLoginRequired=true";
        }
      }
    }
    callback(xhr.response, xhr.status);
    console.log("-(1)--post->lookup->components", xhr.response, data);
  };
  xhr.onerror = function (e) {
    callback({ message: "The request was an error" }, 400);
  };
  console.log("-(2)--post->lookup->components backendLookup", url, jsonData);
  xhr.send(jsonData);
}
