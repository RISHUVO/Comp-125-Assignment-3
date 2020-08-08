/* Author: Md Rashedul Islam
   Date  : Aug 07, 2020
   Description: JavaScript file for html page*/
   
(function(){

    function highlightActiveLink(id) 
    {
        let navAnchors = document.querySelectorAll("li a");

        for (const anchor of navAnchors) 
        {
         anchor.className = "nav-link";
        }

        for (const anchor of navAnchors) 
        {
            let anchorString = anchor.getAttribute("id");

            if (id === anchorString)
            {
                anchor.className = "nav-link active";
            }
        }
    }


    // named function     
    function loadContent()
    {
        highlightActiveLink();
        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - sets the type of the message to be read as JSON
        XHR.responseType = 'json';

        // step 3 - configures the message
        XHR.open("GET", "./Scripts/paragraphs.json")

        // step 4 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                //stores the JSON content of the AboutMe object
                let Contents = XHR.response.paragraphs;

                //calls the appropriate function to load contents based on the title of the page
                switch (document.title) {
                    case "aboutMe":
                        aboutMeText(Contents[0]);
                        break;
                    case "Projects":
                        ProjectsDescription(Contents[1]);
                        break;
                    default:
                        break;
                }
            }
                
        });

        loadFooter();

    }
    function aboutMeText(aboutMe)
    {
        //sets values from the read JSON array's first object appropriately  
        document.getElementsByTagName("h2")[0].innerText = aboutMe.id;
        document.getElementsByTagName("h2")[1].innerText = aboutMe.missionid;
        document.getElementsByTagName("p")[0].innerText = aboutMe.introduction;
        document.getElementsByTagName("blockquote")[0].innerText = aboutMe.missionStatement;
        document.getElementsByTagName("h2")[2].innerText = aboutMe.hobbiesid;

    }
    function ProjectsDescription(projectsContent)
    {
        //sets values from the read JSON array's second object appropriately
        document.getElementById("pro1").innerText = projectsContent.project1;
        document.getElementById("pro2").innerText = projectsContent.project2;
        document.getElementById("pro3").innerText = projectsContent.project3;
        
    }

    function loadHeader()
    {
        console.info("Header loading...");

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./views/partials/header.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let header = document.getElementsByTagName("header")[0];

                let headerData = XHR.responseText;

                header.innerHTML = headerData;
                
                loadContent();
            }
        });
    }
    function loadFooter()
    {
        console.info("Footer Loading...");

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./views/partials/footer.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let footer = document.getElementsByTagName("footer")[0];

                let footerData = XHR.responseText;

                footer.innerHTML = footerData;
            }
        });
    }

    function Start()
    {
        console.log('%cApp Started...', "color:black; font-size: 16px;");   

       loadHeader();
       //loadContent();
       //loadFooter();
    }
    
    window.addEventListener("load", Start);

})();
