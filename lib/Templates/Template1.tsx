export const Template1 = `
     <!DOCTYPE html>
    <html>
    <head>
       <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <style>

        @page {
              size: A4;
            }

        *{
            margin:0;
            padding: 0;
        }

        body{     
            padding: 45px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            font-family: 'Inter', sans-serif;
            font-size: 1.2rem;
            justify-content: center;
        }

        a{
        text-decoration : none;
        color : black;
        }

        .header{
          color: black;
          font-size: 1.3rem;
        }

        .Name{
            font-size: 2rem;
            font-weight: 800;
        }

        .contents{
         font-size: 1rem;
        }

        .professional-title{
            font-style: italic;
        }

        .heading{
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .subtitle{
        font-size:.9rem;
        }

        .personal-details{
            display: flex;
            gap: 10px;
            font-size: 15px;
        }
        .border-line{
            background-color: black;
            width: full;
            height: 1.5px;
        }
        .sections{
            display: flex;
            flex-direction: column;
            gap: 3px;
        }
        .skill-title{
            font-weight: 700;
        }
        .skills-content {
            display: flex;
            gap: 3px;
        }
        .project-heading{
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .project-maintitle{
            display: flex;
            justify-content: space-between;
        }
        .project-title{
            font-weight: bold;
        }
        .project-date{
            color: gray;
        }
        .project-content{
            padding-left: 15px;
        }
        .language{
            display: flex;
            align-items: center;
            gap: 5px
        }
        .language-name{
            font-weight: bold;
        }
        .education-institute{
            font-weight: bold;
        }
        .education{
            display: flex;
            justify-content: space-between;
        }
        .education-detail{
            display: flex;
            gap: 3px
        }
        .strength-name{
            font-weight: bold;
        }
        .strength{
            display: flex;
            gap:3px;
        }
        </style>
</head>
    <body>
        <div class="heading">
             <h2 class="Name">Ajith P</h2>
             <p class="professional-title">Full Stack Developer</p>
        </div>
        <div class="personal-details">
            <p>ajith.aju39502@gmail.com</p>
            <p>|</p>
            <p>+91 7736696075</p>
            <p>|</p>
            <p>Palakkad, Kerala, India</p>
            <p>|</p>
            <a href="https://www.google.com" target="_blank">Github</a>
            <p>|</p>
            <p>LinkedIn</p>
        </div>
        <div class="profile-summary sections">
            <h3 class="header">PROFILE</h3>
            <div class="border-line"></div>
            <p class="contents">Full Stack Developer specializing in LLM-integrated web applications and scalable backend systems. Architected and deployed production applications using Next.js, Node.js, and Express.js on Vercel with PostgreSQL, MongoDB, and SQLite databases. Built AI-powered platforms leveraging Groq API, OpenAI API, and Vercel AI SDK that achieved 60% reduction in design time and 40% improvement in load performance. Deliver end-to-end solutions from database design through serverless deployment, with proven expertise in translating complex technical requirements into production-ready code.</p>
        </div>
        <div class="profile-skills sections">
            <h3 class="header">SKILLS</h3>
            <div class="border-line"></div>
            <div class="skills-content ">
                <p class="skill-title">Languages</p>
                <p>-</p>
                <p class="skill-desc contents">Javascript, Typescript, Python, Java, SQL, HTML5, CSS3</p>
            </div>
            <div class="skills-content">
                <p class="skill-title">Frontend</p>
                <p>-</p>
                <p class="skill-desc contents">React, NextJS, Redux, Tailwind CSS, Framer Motion</p>
            </div>
            <div class="skills-content">
                <p class="skill-title">Backend</p>
                <p>-</p>
                <p class="skill-desc contents">Node.js, Express.js, REST APIs</p>
            </div>
            <div class="skills-content">
                <p class="skill-title">Databases</p>
                <p>-</p>
                <p class="skill-desc contents">MongoDB, PostgreSQL, SQLite</p>
            </div>
            <div class="skills-content">
                <p class="skill-title">AI & LLM Tools</p>
                <p>-</p>
                <p class="skill-desc contents">Vercel AI SDK, Groq API, OpenAI API, AI Model Integration</p>
            </div>
            <div class="skills-content">
                <p class="skill-title">Tools & Platforms</p>
                <p>-</p>
                <p class="skill-desc contents">Git, GitHub, Figma</p>
            </div>
        </div>
        <div class="profile-projects sections">
            <h3 class="header">PROJECTS</h3>
           <div class="border-line"></div>
           <div class="project">
               <div class="project-maintitle">
                   <div class="project-heading">
                      <p class="project-title">GenUI builder,</p>
                      <p class="project-desc subtitle">AI-Powered UI Generation</p> 
                   </div>
                <div>
                      <p class="project-date contents">08/2025 - 09/2025</p>
                </div>
                </div>
                <div class="project-subheading subtitle">
                    <p>Next.js | Node.js | MongoDB | Groq API | Vercel AI SDK | Vercel Deployment</p>
                  
                </div>
                <div class="project-content contents">
                    <ul>
                        <li>Engineered an LLM-driven UI generation platform using Groq API and Vercel AI SDK that automated responsive component creation, cutting design time by 60%.</li>
                        <li>Integrated real-time AI streaming with Next.js server actions and MongoDB for state management, reducing preview load time by 40% across all users.</li>
                    </ul>
                </div>
           </div>
           <div class="project">
               <div class="project-maintitle">
                   <div class="project-heading">
                       <p class="project-title">BugLab,</p>
                    <p class="project-desc subtitle">For CyberSecurity Beginners</p>
                   </div>
                    <div>
                         <p class="project-date">08/2025 - 09/2025</p>
                    </div>
                </div>
                <div class="project-subheading subtitle">
                    <p>Next.js | Node.js | MongoDB | Vercel Deployment</p>
                </div>
                <div class="project-content contents">
                    <ul>
                        <li>Built a hands-on cybersecurity learning platform simulating real-world vulnerabilities (SQL Injection, XSS, CSRF, NoSQL Injection) with SQLite and MongoDB for dataset management</li>
                        <li>Designed automated scoring logic with Express.js backend validation and parameterized queries, enabling real-time evaluation of user actions across security labs</li>
                    </ul>
                </div>
           </div>
        </div>
        <div class="profile-languages sections">
            <h3 class="header">LANGUAGES</h3>
            <div class="border-line"></div>
            <div class="language">
                <p class="language-name contents">English</p>
                <p>-</p>
                <p class="language-level contents">Proficient</p>
            </div>
            <div class="language">
                <p class="language-name contents">Malayalam</p>
                <p>-</p>
                <p class="language-level contents">Native</p>
            </div>
            <div class="language">
                <p class="language-name contents">Tamil</p>
                <p>-</p>
                <p class="language-level contents">Conversational</p>
            </div>
            <div class="language">
                <p class="language-name contents">Hindi</p>
                <p>-</p>
                <p class="language-level contents">Conversational</p>
            </div>
        </div>
         <div class="profile-educations sections">
            <h3 class="header">EDUCATION</h3>
            <div class="border-line"></div>
            <div class="education">
                <div class="education-detail">
                     <p class="education-institute contents">IHRD Malampuzha,</p>
                <p class="education-stream contents">BSC Computer Science</p>
                </div>
               <div class="education-detail contents">
                   <p class="year">09/2022 – 04/2025</p>
                   <p>|</p>
                   <p>Palakkad, Kerala</p>
               </div>
            </div>
        </div>
          <div class="profile-strengths sections">
            <h3 class="header">STRENGTH</h3>
            <div class="border-line"></div>
            <div class="strength contents">
                <p><span class="strength-name">Tech Adaptability</span> - Rapid learner adept at mastering emerging technologies like AI/LLM integration, Next.js, and serverless architecture in minimal time.</p>
            </div>
            <div class="strength contents">
                <p><span class="strength-name">Communication</span> - Strong communicator skilled in translating technical challenges into actionable team goals.</p>
            </div>
            </div>
    </body>
</html>
    `
