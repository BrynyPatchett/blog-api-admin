/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/blog.css":
/*!*****************************!*\
  !*** ./src/styles/blog.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/navbar.css":
/*!*******************************!*\
  !*** ./src/styles/navbar.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/account.js":
/*!***************************!*\
  !*** ./src/js/account.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   jwtUser: () => (/* binding */ jwtUser),
/* harmony export */   logoutUser: () => (/* binding */ logoutUser),
/* harmony export */   user: () => (/* binding */ user)
/* harmony export */ });
const user = localStorage.getItem('userToken');

function logoutUser(){
    localStorage.removeItem('userToken');
    window.location.href = '/blog-api-admin/';
}

function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  // loggedin user
  const jwtUser = parseJwt(user)

/***/ }),

/***/ "./src/js/blogpost.js":
/*!****************************!*\
  !*** ./src/js/blogpost.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./account */ "./src/js/account.js");
/* harmony import */ var _styles_blog_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/blog.css */ "./src/styles/blog.css");


const title = document.getElementById("title");
const blogContent = document.getElementById("blog-content");
const search = new URLSearchParams(document.location.search)
const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click",updatePost)
const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", deletePost)
const errorDiv = document.getElementById("form-errors-container");
const blogid = search.get('id');
const form = document.getElementById("blog-form");
//if we are editing a blog post or creating a new one
if(blogid){
    saveButton.addEventListener("click",updatePost)
    deleteButton.addEventListener("click", deletePost)
    getpost();
}else{
    saveButton.addEventListener("click",createPost)
    deleteButton.hidden = true;
}

async function getpost() {

    try {
        const blogResponse = await fetch(`https://weak-honorable-degree.glitch.me/api/posts/${blogid}`)

        if (!blogResponse.ok) {
            throw new Error();
        }
        const blog = await blogResponse.json()
        blogContent.value = blog.content
        title.value = blog.title
    }
    catch (err) {
        console.log("error: " + err)
    }
}



async function deletePost(){
    try {
        const response = await fetch(`https://weak-honorable-degree.glitch.me/api/posts/${blogid}`, {
            method: 'DELETE', 
             headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
        if(!response.ok){
            const errorList = document.createElement('ul')
            if(response.status === 403){
                const errorElem = document.createElement('li')
                errorElem.textContent = "You do not have permission to edit this post";
                errorList.appendChild(errorElem)
            }
            errorDiv.replaceChildren(errorList)
            return;
            
        }else{
            window.location.href = '/blog-api-admin/';
        } 
    }
    catch (err) {
        console.log("error: " + err)
    }
}


async function updatePost(){
    const formData = new FormData(form);
    try {
        const response = await fetch(`https://weak-honorable-degree.glitch.me/api/posts/${blogid}`, {
            method: 'PUT', 
            body: JSON.stringify(Object.fromEntries(formData)),
             headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                
            }
        })
        if(!response.ok){
            const errorList = document.createElement('ul')
            if(response.status === 403){
                const errorElem = document.createElement('li')
                errorElem.textContent = "You do not have permission to edit this post";
                errorList.appendChild(errorElem)
            }
            errorDiv.replaceChildren(errorList)
            return
        }else{
            window.location.href = '/blog-api-admin/';
        } 
    }
    catch (err) {
        console.log("error: " + err)
    }
}

async function createPost(){
    const formData = new FormData(form);
    try {
        const response = await fetch(`https://weak-honorable-degree.glitch.me/api/posts`, {
            method: 'POST', 
            body: JSON.stringify(Object.fromEntries(formData)),
             headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                
            }
        })
        if(!response.ok){
            const errorList = document.createElement('ul')
            if(response.status === 403){
                const errorElem = document.createElement('li')
                errorElem.textContent = "You do not have permission to edit this post";
                errorList.appendChild(errorElem)
            }
            errorDiv.replaceChildren(errorList)
            return
        }else{
            window.location.href = '/blog-api-admin/';
        } 
    }
    catch (err) {
        console.log("error: " + err)
    }
}

/***/ }),

/***/ "./src/js/navbar.js":
/*!**************************!*\
  !*** ./src/js/navbar.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_navbar_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/navbar.css */ "./src/styles/navbar.css");
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./account */ "./src/js/account.js");


const currentPage = window.location.pathname;

const navbar = document.createElement('nav');
const accountDiv = document.createElement('div');
accountDiv.classList.add('accountDiv')

const home = document.createElement('a');
home.href = "/blog-api-admin/";
home.textContent = "Home"
home.classList.add('home')
home.classList.add('navItem')

if (_account__WEBPACK_IMPORTED_MODULE_1__.user) {
    const logout = document.createElement('div');
    logout.textContent = "Log Out"
    logout.classList.add('navItem')
    accountDiv.appendChild(logout)
    logout.onclick = _account__WEBPACK_IMPORTED_MODULE_1__.logoutUser;

} else {
    window.location.href = '/blog-api-admin/login';   
}

if (home.pathname === currentPage) {
    // console.log("singup")
    home.classList.add('active')
}

navbar.appendChild(home)
navbar.appendChild(accountDiv);
navbar.classList.add('navbar')
document.body.prepend(navbar)




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./src/js/blogpost.js");
/******/ 	__webpack_require__("./src/js/navbar.js");
/******/ 	__webpack_require__("./src/styles/index.css");
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/styles/blog.css");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvYmxvZ3Bvc3QuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBTzs7QUFFQTtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBUzs7Ozs7Ozs7Ozs7OztBQ2pCMkI7QUFDVDtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsOEZBQThGLE9BQU87O0FBRXJHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0EsMEZBQTBGLE9BQU87QUFDakc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsMEZBQTBGLE9BQU87QUFDakc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEk2QjtBQUNlO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksMENBQUk7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixnREFBVTs7QUFFL0IsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztVQ2pDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Jsb2ctYXBpLWFkbWluLy4vc3JjL3N0eWxlcy9ibG9nLmNzcz9kYjJmIiwid2VicGFjazovL2Jsb2ctYXBpLWFkbWluLy4vc3JjL3N0eWxlcy9pbmRleC5jc3M/NGU0MiIsIndlYnBhY2s6Ly9ibG9nLWFwaS1hZG1pbi8uL3NyYy9zdHlsZXMvbmF2YmFyLmNzcz82ZjZlIiwid2VicGFjazovL2Jsb2ctYXBpLWFkbWluLy4vc3JjL2pzL2FjY291bnQuanMiLCJ3ZWJwYWNrOi8vYmxvZy1hcGktYWRtaW4vLi9zcmMvanMvYmxvZ3Bvc3QuanMiLCJ3ZWJwYWNrOi8vYmxvZy1hcGktYWRtaW4vLi9zcmMvanMvbmF2YmFyLmpzIiwid2VicGFjazovL2Jsb2ctYXBpLWFkbWluL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Jsb2ctYXBpLWFkbWluL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ibG9nLWFwaS1hZG1pbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Jsb2ctYXBpLWFkbWluL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmxvZy1hcGktYWRtaW4vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9ibG9nLWFwaS1hZG1pbi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmxvZy1hcGktYWRtaW4vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImV4cG9ydCBjb25zdCB1c2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJUb2tlbicpO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9nb3V0VXNlcigpe1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VyVG9rZW4nKTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYmxvZy1hcGktYWRtaW4vJztcbn1cblxuZnVuY3Rpb24gcGFyc2VKd3QodG9rZW4pIHtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KFwiLlwiKVsxXTtcbiAgICBjb25zdCBiYXNlNjQgPSBiYXNlNjRVcmwucmVwbGFjZShcIi1cIiwgXCIrXCIpLnJlcGxhY2UoXCJfXCIsIFwiL1wiKTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cuYXRvYihiYXNlNjQpKTtcbiAgfVxuXG4gIC8vIGxvZ2dlZGluIHVzZXJcbiAgZXhwb3J0IGNvbnN0IGp3dFVzZXIgPSBwYXJzZUp3dCh1c2VyKSIsImltcG9ydCB7IGp3dFVzZXIgfSBmcm9tICcuL2FjY291bnQnO1xuaW1wb3J0ICcuLi9zdHlsZXMvYmxvZy5jc3MnXG5jb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIik7XG5jb25zdCBibG9nQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmxvZy1jb250ZW50XCIpO1xuY29uc3Qgc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhkb2N1bWVudC5sb2NhdGlvbi5zZWFyY2gpXG5jb25zdCBzYXZlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYXZlLWJ1dHRvblwiKTtcbnNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdXBkYXRlUG9zdClcbmNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVsZXRlLWJ1dHRvblwiKTtcbmRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlUG9zdClcbmNvbnN0IGVycm9yRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtLWVycm9ycy1jb250YWluZXJcIik7XG5jb25zdCBibG9naWQgPSBzZWFyY2guZ2V0KCdpZCcpO1xuY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmxvZy1mb3JtXCIpO1xuLy9pZiB3ZSBhcmUgZWRpdGluZyBhIGJsb2cgcG9zdCBvciBjcmVhdGluZyBhIG5ldyBvbmVcbmlmKGJsb2dpZCl7XG4gICAgc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix1cGRhdGVQb3N0KVxuICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlUG9zdClcbiAgICBnZXRwb3N0KCk7XG59ZWxzZXtcbiAgICBzYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGNyZWF0ZVBvc3QpXG4gICAgZGVsZXRlQnV0dG9uLmhpZGRlbiA9IHRydWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldHBvc3QoKSB7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBibG9nUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly93ZWFrLWhvbm9yYWJsZS1kZWdyZWUuZ2xpdGNoLm1lL2FwaS9wb3N0cy8ke2Jsb2dpZH1gKVxuXG4gICAgICAgIGlmICghYmxvZ1Jlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBibG9nID0gYXdhaXQgYmxvZ1Jlc3BvbnNlLmpzb24oKVxuICAgICAgICBibG9nQ29udGVudC52YWx1ZSA9IGJsb2cuY29udGVudFxuICAgICAgICB0aXRsZS52YWx1ZSA9IGJsb2cudGl0bGVcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiArIGVycilcbiAgICB9XG59XG5cblxuXG5hc3luYyBmdW5jdGlvbiBkZWxldGVQb3N0KCl7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly93ZWFrLWhvbm9yYWJsZS1kZWdyZWUuZ2xpdGNoLm1lL2FwaS9wb3N0cy8ke2Jsb2dpZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLCBcbiAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlclRva2VuJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYoIXJlc3BvbnNlLm9rKXtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKXtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvckVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICAgICAgZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBlZGl0IHRoaXMgcG9zdFwiO1xuICAgICAgICAgICAgICAgIGVycm9yTGlzdC5hcHBlbmRDaGlsZChlcnJvckVsZW0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJvckRpdi5yZXBsYWNlQ2hpbGRyZW4oZXJyb3JMaXN0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2Jsb2ctYXBpLWFkbWluLyc7XG4gICAgICAgIH0gXG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnIpXG4gICAgfVxufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBvc3QoKXtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL3dlYWstaG9ub3JhYmxlLWRlZ3JlZS5nbGl0Y2gubWUvYXBpL3Bvc3RzLyR7YmxvZ2lkfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsIFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmZyb21FbnRyaWVzKGZvcm1EYXRhKSksXG4gICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJUb2tlbicpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmKCFyZXNwb25zZS5vayl7XG4gICAgICAgICAgICBjb25zdCBlcnJvckxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IDQwMyl7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAgICAgICAgIGVycm9yRWxlbS50ZXh0Q29udGVudCA9IFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gZWRpdCB0aGlzIHBvc3RcIjtcbiAgICAgICAgICAgICAgICBlcnJvckxpc3QuYXBwZW5kQ2hpbGQoZXJyb3JFbGVtKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXJyb3JEaXYucmVwbGFjZUNoaWxkcmVuKGVycm9yTGlzdClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9ibG9nLWFwaS1hZG1pbi8nO1xuICAgICAgICB9IFxuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiICsgZXJyKVxuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUG9zdCgpe1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vd2Vhay1ob25vcmFibGUtZGVncmVlLmdsaXRjaC5tZS9hcGkvcG9zdHNgLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJywgXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShPYmplY3QuZnJvbUVudHJpZXMoZm9ybURhdGEpKSxcbiAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlclRva2VuJylcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYoIXJlc3BvbnNlLm9rKXtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKXtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvckVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICAgICAgZXJyb3JFbGVtLnRleHRDb250ZW50ID0gXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBlZGl0IHRoaXMgcG9zdFwiO1xuICAgICAgICAgICAgICAgIGVycm9yTGlzdC5hcHBlbmRDaGlsZChlcnJvckVsZW0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJvckRpdi5yZXBsYWNlQ2hpbGRyZW4oZXJyb3JMaXN0KVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2Jsb2ctYXBpLWFkbWluLyc7XG4gICAgICAgIH0gXG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnIpXG4gICAgfVxufSIsImltcG9ydCAnLi4vc3R5bGVzL25hdmJhci5jc3MnXG5pbXBvcnQgeyB1c2VyLGxvZ291dFVzZXIgfSBmcm9tIFwiLi9hY2NvdW50XCI7XG5jb25zdCBjdXJyZW50UGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuY29uc3QgbmF2YmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG5jb25zdCBhY2NvdW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5hY2NvdW50RGl2LmNsYXNzTGlzdC5hZGQoJ2FjY291bnREaXYnKVxuXG5jb25zdCBob21lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuaG9tZS5ocmVmID0gXCIvYmxvZy1hcGktYWRtaW4vXCI7XG5ob21lLnRleHRDb250ZW50ID0gXCJIb21lXCJcbmhvbWUuY2xhc3NMaXN0LmFkZCgnaG9tZScpXG5ob21lLmNsYXNzTGlzdC5hZGQoJ25hdkl0ZW0nKVxuXG5pZiAodXNlcikge1xuICAgIGNvbnN0IGxvZ291dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxvZ291dC50ZXh0Q29udGVudCA9IFwiTG9nIE91dFwiXG4gICAgbG9nb3V0LmNsYXNzTGlzdC5hZGQoJ25hdkl0ZW0nKVxuICAgIGFjY291bnREaXYuYXBwZW5kQ2hpbGQobG9nb3V0KVxuICAgIGxvZ291dC5vbmNsaWNrID0gbG9nb3V0VXNlcjtcblxufSBlbHNlIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYmxvZy1hcGktYWRtaW4vbG9naW4nOyAgIFxufVxuXG5pZiAoaG9tZS5wYXRobmFtZSA9PT0gY3VycmVudFBhZ2UpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInNpbmd1cFwiKVxuICAgIGhvbWUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbn1cblxubmF2YmFyLmFwcGVuZENoaWxkKGhvbWUpXG5uYXZiYXIuYXBwZW5kQ2hpbGQoYWNjb3VudERpdik7XG5uYXZiYXIuY2xhc3NMaXN0LmFkZCgnbmF2YmFyJylcbmRvY3VtZW50LmJvZHkucHJlcGVuZChuYXZiYXIpXG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9ibG9ncG9zdC5qc1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9uYXZiYXIuanNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc3R5bGVzL2luZGV4LmNzc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zdHlsZXMvYmxvZy5jc3NcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=