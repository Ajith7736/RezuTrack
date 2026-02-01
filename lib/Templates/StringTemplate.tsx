export const StringTemp = ` <!DOCTYPE html>
    <html>
    <head>
        <meta  name="viewport" content="width=device-width" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        
        <style>
         * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;;
        }

        @page {
            padding: 20px;
        }

        body {
            width: 594.96pt;
            height: 840.96pt;
            font-family: 'inter', sans-serif;
            font-size: 11pt;
            color: #000;
        }

        h1,h2,h3{
            margin-bottom: 3px;
        }

        section{
            margin-top: 12px;
        }

        a {
            text-decoration : none;
            color : black;
        }

        .bold {
          font-weight: bold;  
        }

        hr{
            border : 1px solid black;
        }

        p, li {
            line-height: 1.4;
            margin-top: 5px;
        }

        .Profession {
            font-size : 15pt;
        }

        .project-heading {
            display : flex;
            justify-content : space-between;
        }

        .project-desc {
            font-size : 10pt;
        }

         .project-content {
            font-size : 11pt;
        }

        .links {
            display: flex;
            flex-wrap: wrap;
            gap : 10px
        }



        </style>
</head>
    <body>
    <div class='body'>
        <div>
            <h1>Ajith P</h1>
            <p><em>Ajith P</em></p>
        </div>

   
        <section>
            <p>
            <a class='links' href="">
            <i class="fab fa-github"></i>
            <h4>github</h4>
            </a>
            </p>
        </section>
        <section>
            <h3>SUMMARY</h3>
            <hr />
            <p>Full Stack Developer specializing in LLM-integrated web applications and scalable backend systems. Architected and deployed production applications using Next.js, Node.js, and Express.js on Vercel with PostgreSQL, MongoDB, and SQLite databases. Built AI-powered platforms leveraging Groq API, OpenAI API, and Vercel AI SDK that achieved 60% reduction in design time and 40% improvement in load performance. Deliver end-to-end solutions from database design through serverless deployment, with proven expertise in translating complex technical requirements into production-ready code.</p>
        </section>
        <section>
            <h3>SKILLS</h3>
            <hr />
            <div>
                <p><b>Languages -</b> Javascript, Typescript, Python, Java, SQL, HTML5, CSS3</p>
            </div>
        </section>
        <section>
        <h3>PROJECTS</h3>
          <hr />
           <div>
               <div class="project-heading">
                   <div>
                      <p><strong>GenUI builder </strong> - Powered UI Generation</p>
                   </div>
                <div>
                      <p >08/2025 - 09/2025</p>
                </div>
                </div>
                <div>
                    <p class="project-desc">Next.js | Node.js | MongoDB | Groq API | Vercel AI SDK | Vercel Deployment</p>
                  
                </div>
                <div>
                    <ul>
                        <li>Engineered an LLM-driven UI generation platform using Groq API and Vercel AI SDK that automated responsive component creation, cutting design time by 60%.</li>
                        <li>Integrated real-time AI streaming with Next.js server actions and MongoDB for state management, reducing preview load time by 40% across all users.</li>
                    </ul>
                </div>
           </div>
           <div>
               <div class="project-heading">
                   <div>
                       <p><strong>BugLab</strong> - For CyberSecurity Beginners</p>

                   </div>
                    <div>
                         <p>08/2025 - 09/2025</p>
                    </div>
                </div>
                <div>
                    <p class="project-desc">Next.js | Node.js | MongoDB | Vercel Deployment</p>
                </div>
                <div >
                    <ul class="project-content">
                        <li>Built a hands-on cybersecurity learning platform simulating real-world vulnerabilities (SQL Injection, XSS, CSRF, NoSQL Injection) with SQLite and MongoDB for dataset management</li>
                        <li>Designed automated scoring logic with Express.js backend validation and parameterized queries, enabling real-time evaluation of user actions across security labs</li>
                    </ul>
                </div>
           </div>
        </section>
        <section>
            <h3>LANGUAGES</h3>
           <hr />
            <div>
                <p>English - Proficient</p>
            </div>
        </section>
         <section>
            <h3 >EDUCATION</h3>
           <hr />
            <div>
                <div>
                    <p>IHRD Malampuzha,</p>
                    <p>BSC Computer Science</p>
                </div>
               <div>
                   <p>09/2022 – 04/2025 | Palakkad, Kerala</p>
               </div>
            </div>
        </section>
        <section>
          <h3>STRENGTH</h3>
           <hr />
            <div>
                <p><span>Tech Adaptability</span> - Rapid learner adept at mastering emerging technologies like AI/LLM integration, Next.js, and serverless architecture in minimal time.</p>
            </div>
            <div>
                <p><span>Communication</span> - Strong communicator skilled in translating technical challenges into actionable team goals.</p>
            </div>
        </section>
    </div>
   
    </body>
</html>`