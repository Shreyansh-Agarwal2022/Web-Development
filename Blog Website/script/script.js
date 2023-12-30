//For Table of Contents arrow
const blogIndex = document.getElementById("blog-index-visible");
const blogIndexList = document.getElementById("blog-index");
let blogIndexDirection = true;

//Event-Listener for table of contents to show and hide on click of an arrow button
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
