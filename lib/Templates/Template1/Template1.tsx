import { ResumeContentProps } from "@/types/types";
import { Image } from "../Image";
import { ProfileSection } from "../ProfileSection";

export function Template1(userdata: Partial<ResumeContentProps> | null): string {

    return /*html*/`
    <!DOCTYPE html>
    <html>
    <head>
        <meta  name="viewport" content="width=device-width" />
       <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
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
            font-family: "Karla", sans-serif;
            font-style: normal;
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

        .flex-space {
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
        
        .icon {
            margin-right : 5px;
        }

        .img-style {
    height:  120px;
    width: 120px;
    border-radius: 50%;
}

        </style>
</head>
    <body>
    <div class='body'>
        <div class='flex-space'>
            <div>
                <h1>${userdata?.fullname || ''}</h1>
                <p><em>${userdata?.professionaltitle || ''}</em></p>
                 <section>
            <p class='links'>${ProfileSection(userdata)}</p>
        </section>
            </div>

            <div>
               ${Image(userdata?.profilepic)}
            </div>
        </div>
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
                      <p><b>GenUI builder </b> - Powered UI Generation</p>
                   </div>
                <div>
                      <p>08/2025 - 09/2025</p>
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
        </section>
        <section>
            <h3>LANGUAGES</h3>
           <hr />
            <div>
                <p><b>English -</b> Proficient</p>
            </div>
        </section>
         <section>
            <h3 >EDUCATION</h3>
           <hr />
            <div class='flex-space'>
                <div>
                    <p><b>IHRD Malampuzha </b>, BSC Computer Science</p>
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
                <p><b>Tech Adaptability</b> - Rapid learner adept at mastering emerging technologies like AI/LLM integration, Next.js, and serverless architecture in minimal time.</p>
            </div>
            <div>
                <p><b>Communication</b> - Strong communicator skilled in translating technical challenges into actionable team goals.</p>
            </div>
        </section>
    </div>
   
    </body>
</html>
    `

}

