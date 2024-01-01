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

//Selecting Main of the body of HTML page
const main = document.getElementsByTagName('main')[0];
const tableOfContents = document.getElementById("table-of-contents");

function insertImage() {
    const form = document.getElementById("insert-image");
    const image = document.createElement("img");
    const url = document.getElementById("image-url").value;
    const width = document.getElementById("image-width").value;
    const height = document.getElementById("image-height").value;
    if (url === "" || width === "" || height === "")
    {
        alert("Please Enter the all details for the image");
    }
    else 
    {
        image.src=url;
        image.width=width+"px";
        image.height=height+"px";
        image.alt="Blog Image";
        image.id="blog-image";
        tableOfContents.parentNode.insertBefore(image,tableOfContents);
        form.remove();
    }
}

const contentText = document.getElementById("content-text");
const contentType = document.getElementById("content-type");
let currentHeading = 1;

//Clear the text in the conent-text
function clearContent() {
    contentText.innerText = "";
}

//Function to add element in main
function addElementToMain() {
    let value = contentType.value;
    let text = contentText.innerText;
    if (text === "") {
        alert("Please Enter some text in the textbox");
    }
    else if (value === "para"){
        let boldOpenCount = (text.match(/<b>/g) || []).length;
        let boldCloseCount = (text.match(/<\/b>/g) || []).length;
        if (boldOpenCount !== boldCloseCount) {
            alert("<b> and </b> tags were not correctly opened or closed. Please try again.");
            return;
        }
        let para = document.createElement("p");
        para.classList.add("blog-paragraph");
        para.contentEditable = "true";
        if (boldOpenCount === 0) {
            para.appendChild(document.createTextNode(text));
            main.append(para);
            return;
        }
        let startIndex = 0;
        let endIndex = 0;
        for (let i = 0; i < boldOpenCount; i++) {
            startIndex = text.indexOf("<b>", endIndex);
            if (startIndex === -1) {
                alert("<b> and </b> tags were not correctly opened or closed. Please try again.");
                return;
            }
            para.appendChild(document.createTextNode(text.slice(endIndex, startIndex)));
            endIndex = text.indexOf("</b>", startIndex);
            if (endIndex === -1) {
                alert("<b> and </b> tags were not correctly opened or closed. Please try again.");
                return;
            }
            let boldContent = document.createTextNode(text.slice(startIndex + 3, endIndex));
            let boldElement = document.createElement("b");
            boldElement.appendChild(boldContent);
            para.appendChild(boldElement);
            endIndex += 4;
        }
        para.appendChild(document.createTextNode(text.slice(endIndex)));
        main.append(para);
    }
    else if (value === "heading") {
        let heading = document.createElement("h4");
        heading.classList.add("blog-heading");
        heading.id = `heading${currentHeading}`;
        heading.innerText = text;
        heading.contentEditable = "true";
        currentHeading++;
        main.append(heading);
    }
    else if (value === "img") {
        const image = document.createElement("img");
        let split = text.split(";;;");
        if (split.length !== 3) {
            alert("Image Inserting Format : url;;;width(in px);;;height(in px");
        }
        else {
            image.src = split[0];
            image.width = split[1]+"px";
            image.height = split[2]+"px";
            image.loading = "lazy";
            main.append(image);
        }
    }
    else if (value === "list") {
        let contentList = document.createElement("ol");
        let split = text.split(";;;");
        for(let i=0;i<split.length;i++) {
            contentList.innerHTML += `<li><span>${split[i]}</span></li>`;
        }
        main.append(contentList);
    }
    else if (value === "iframe") {
        main.innerHTML += text;
    }
    else {
        alert("Incorrect Option Selected");
    }
    clearContent();
    //TODO : add functionality to add links in paragraph and add logic to add indent in non-first paragraph.
}

let editDone = false;

//Executes after submit button clicked. It removes form section from HTML file and generates HTML for main part of the blog
function getBlog() {
    const formSection = document.getElementById("write-content");
    formSection.remove();
    let headings = document.getElementsByClassName("blog-heading");
    let listElement = null;
    let temp = null;
    for(let i=1;i<headings.length;i++) {
        listElement = document.createElement("li");
        temp = headings[i].innerText;
        listElement.innerHTML = `<a href="#heading${i}">${temp}</a>`;
        blogIndexList.appendChild(listElement);
    }
    for(let i=0;i<main.childNodes.length;i++) {
        main.childNodes[i].contentEditable = "false";
    }

    //TODO : change it to generate a text file of content in main
    main.innerHTML+= `<a onclick="this.href='data:text/html;charset=UTF-8,'+encodeURIComponent(document.documentElement.outerHTML)" href="#" download="write.html" style="margin: 20px auto;padding: 5px;background-color:white;color:black;font-family:Arial">Download</a>`;
    editDone = true;
}

// Event delegation - listen for clicks on the #main container
main.addEventListener('click', function (event) {
    const target = event.target;

    // Check if the clicked element has the deletable-content class
    if(!["blog-title","blog-date","blog-image","table-of-contents","blog-index-visible","blog-index-heading"].includes(target.id)) 
    {
        let clickCount = parseInt(target.getAttribute('data-click-count')) || 0;
        let lastClickTime = parseInt(target.getAttribute('data-last-click-time')) || 0;

        const currentTime = new Date().getTime();

        // Reset click count if more than 1 second has passed since the last click
        if (currentTime - lastClickTime > 1000) {
            clickCount = 1;
        } else {
            clickCount++;
        }

        target.setAttribute('data-click-count', clickCount);
        target.setAttribute('data-last-click-time', currentTime);

        if (clickCount === 3 && !editDone) {
            target.remove();
        }
    }
});

// On clicking close div in pop-up, it closes that pop-up (i.e. delete that pop-up section)
function closePopup() {
    const popup = document.getElementById("instructions-pop-up");
    popup.remove();
}
