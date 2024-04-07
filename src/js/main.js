
import '../styles/blog.css'
import { jwtUser } from './account';
const content = document.body.querySelector(".content");
const createButton = document.getElementById("create-post-button");
createButton.addEventListener("click", () => {
    window.location.href = `./blog`;
})

async function getposts() {
    if(jwtUser){
    const userId = jwtUser.sub 
    try {
        const response = await fetch(`https://weak-honorable-degree.glitch.me/api/users/${userId}`, {headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        }})
        if (!response.ok) {
            throw Error(response.status)
        }
        const data = await response.json()
        const blogList = document.createElement('div')
        blogList.classList.add('blog-list')
        
        data.posts.forEach(blog => {
            const blogItem = document.createElement('div')
            blogItem.classList.add('blog')
            const blogLink = document.createElement('a')
            blogLink.classList.add('blog-link')
            blogLink.href = `./blog?id=${blog._id}`;
            const blogInfo = document.createElement('div')
            blogInfo.classList.add('blog-info')

            const blogTitle = document.createElement('h2')
            blogTitle.textContent = blog.title;

            const blogAuthor = document.createElement('p')
            blogAuthor.textContent = blog.author.username;

            const blogText = document.createElement('div')
            blogText.classList.add('blog-text')

            const blogContent = document.createElement('p')
            blogContent.textContent = blog.content;


            const blogStatus = document.createElement('i')
            blogStatus.textContent = blog.status;
            if(blog.status === "Published"){
                blogStatus.classList.add('blog-published')
            }else{
                blogStatus.classList.add('blog-unpublished')
            }
            

            blogText.appendChild(blogContent)
            blogInfo.appendChild(blogTitle);
            blogInfo.appendChild(blogAuthor);
            blogLink.appendChild(blogInfo)
            blogLink.appendChild(blogText)
            blogLink.appendChild(blogStatus)
            blogItem.appendChild(blogLink)
            blogList.appendChild(blogItem)

        });
        console.log(blogList)
        content.appendChild(blogList)
    }
    catch (err) {
        console.log("error: " + err)
    }
}
}

getposts();