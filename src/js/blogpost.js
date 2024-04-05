import { jwtUser } from './account';
import '../styles/blog.css'
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
        const blogResponse = await fetch(`http://localhost:3000/api/posts/${blogid}`)

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
        const response = await fetch(`http://localhost:3000/api/posts/${blogid}`, {
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
            window.location.href = '..';
        } 
    }
    catch (err) {
        console.log("error: " + err)
    }
}


async function updatePost(){
    const formData = new FormData(form);
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${blogid}`, {
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
            window.location.href = '/';
        } 
    }
    catch (err) {
        console.log("error: " + err)
    }
}

async function createPost(){
    const formData = new FormData(form);
    try {
        const response = await fetch(`http://localhost:3000/api/posts`, {
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
            window.location.href = '/';
        } 
    }
    catch (err) {
        console.log("error: " + err)
    }
}