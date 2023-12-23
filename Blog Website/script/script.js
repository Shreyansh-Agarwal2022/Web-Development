//For Table of Contents arrow

const blogIndex = document.getElementById("blog-index-visible");
const blogIndexList = document.getElementById("blog-index");
let blogIndexDirection = true;

blogIndex.addEventListener("click", function() {
    if (blogIndexDirection) {
        blogIndexDirection = false;
        blogIndex.style.transform = "rotate(180deg)";
        blogIndexList.style.display = "none";
    }
    else {
        blogIndexDirection = true;
        blogIndex.style.transform = "rotate(0deg)";
        blogIndexList.style.display = "block";
    }
});