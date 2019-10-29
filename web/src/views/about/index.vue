<template>
  <div>
    <header class="header">
      <div class="top-bar container-fluid">
        <div class="actions">
          <a class="btn hidden-xs" @click="changeLanguage"><i class="fa fa-language" aria-hidden="true"></i>
            {{language}}
          </a>
          <a class="btn hidden-xs" :href="'mailto:' + basicInfo.email"><i class="fa fa-paper-plane"
                                                                          aria-hidden="true"></i>
            Hire Me
          </a>
          <a class="btn" href="#"><i class="fa fa-download" aria-hidden="true"></i> Download My Resume</a>
        </div>
        <!--//actions-->
        <ul class="social list-inline">
          <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
          <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
          <li><a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
          <li><a href="#"><i class="fa fa-github-alt" aria-hidden="true"></i></a></li>
          <li><a href="#"><i class="fa fa-skype" aria-hidden="true"></i></a></li>
        </ul>
        <!--//social-->
      </div>
      <!--//top-bar-->

      <div class="intro">
        <div class="container text-center">
          <img class="profile-image" src="./assets/images/profile-image.png" alt="">
          <h1 class="name">{{basicInfo.name}}</h1>
          <div class="title">{{basicInfo.title}}</div>
          <div class="profile">
            <p>{{basicInfo.profileInfo}}</p>
          </div>
          <!--//profile-->
        </div>
        <!--//container-->
      </div>
      <!--//intro-->

      <div class="contact-info">
        <div class="container text-center">
          <ul class="list-inline">
            <li class="email"><i class="fa fa-envelope"></i><a
              :href="'mailto:' + basicInfo.email">{{basicInfo.email}}</a></li>
            <li><i class="fa fa-phone"></i> <a :href="'tel:' + basicInfo.mobile">{{basicInfo.mobile}}</a></li>
            <li class="website"><i class="fa fa-globe"></i><a :href="basicInfo.website"
                                                              target="_blank">www.cnblogs.com</a></li>
          </ul>
        </div>
        <!--//container-->
      </div>
      <!--//contact-info-->

      <div class="page-nav-space-holder hidden-xs">
        <div id="page-nav-wrapper" class="page-nav-wrapper text-center">
          <div class="container">
            <ul id="page-nav" class="nav page-nav list-inline">
              <li><a class="scrollto" href="#skills-section">{{skills.navTitle}}</a></li>
              <li><a class="scrollto" href="#experiences-section">{{experiences.navTitle}}</a></li>
              <li><a class="scrollto" href="#projects-section">{{projects.navTitle}}</a></li>
              <li><a class="scrollto" href="#portfolio-section" v-if="portfolio && portfolio.portfolios">{{portfolio.navTitle}}</a>
              </li>
              <li><a class="scrollto" href="#eudcation-section">{{education.navTitle}}</a></li>
              <li><a class="scrollto" href="#contact-section">{{contact.navTitle}}</a></li>
            </ul>
            <!--//page-nav-->
          </div>
        </div>
        <!--//page-nav-wrapper-->
      </div>

    </header>
    <!--//header-->

    <div class="wrapper container">

      <section id="skills-section" class="skills-section section text-center">
        <h2 class="section-title">{{skills.sectionTitle}}</h2>
        <div class="top-skills">
          <!--<h3 class="subtitle">Top Skills</h3>-->
          <div class="row">
            <div class="item col-xs-12 col-sm-4" v-for="topSkill in skills.topSkills">
              <div class="item-inner">
                <div class="chart-easy-pie text-center">
                  <div class="chart-theme-1 chart" :data-percent="topSkill.percent"><span>{{topSkill.percent}}</span>%
                  </div>
                </div>
                <h4 class="skill-name">{{topSkill.name}}</h4>
                <div class="level">{{topSkill.level}}</div>
                <!--<div class="desc">{{topSkill.desc}}</div>-->
              </div>
              <!--//item-inner-->
            </div>
          </div>
          <!--//row-->
        </div>
        <!--//top-skills-->

        <!--
                <div class="other-skills">
                    <h3 class="subtitle">Other Skills</h3>
                    <div class="misc-skills">
                        <span class="skill-tag" v-for="otherSkill in skills.otherSkills">{{otherSkill.name}}</span>
                    </div>
                </div>-->
        <!--//other-skills-->

        <div class="skill-items">
          <div class="skill-item" v-for="skillItem in skills.skillItems">
            <span>{{skillItem.name}}</span>
          </div>
        </div>
      </section>

      <!--//skills-section-->
      <section id="experiences-section" class="experiences-section section">
        <h2 class="section-title">{{experiences.navTitle}}</h2>
        <div class="timeline">
          <div class="item" v-for="work in experiences.workExperiences">
            <div class="work-place">
              <h3 class="place">{{work.place}}</h3>
              <div class="location"><i class="fa fa-map-marker" aria-hidden="true"></i>{{work.location}}</div>
            </div>
            <div class="job-meta">
              <div class="title">{{work.title}}</div>
              <div class="industry">{{work.industry}}</div>
              <div class="time">{{work.time}}</div>
            </div>
            <!--//job-meta-->
            <div class="job-desc">
              <p>{{work.jobDesc}}</p>
            </div>
            <!--//job-desc-->
          </div>
          <!--//item-->
        </div>
        <!--//timeline-->
      </section>
      <!--//section-->

      <section id="projects-section" class="experiences-section section">
        <h2 class="section-title">{{projects.navTitle}}</h2>
        <div class="timeline">
          <div class="item" v-for="project in projects.projectExperiences">
            <div class="work-place">
              <h3 class="place">{{project.name}}</h3>
              <div class="location"><i class="fa fa-map-marker" aria-hidden="true"></i>{{project.location}}</div>
            </div>
            <div class="job-meta">
              <div class="title">{{project.title}}</div>
              <div class="industry">{{project.industry}}</div>
              <div class="time">{{project.time}}</div>
            </div>
            <!--//job-meta-->
            <div class="job-desc">
              <!--<span class="job-sub-title">{{projects.projectEnv}}</span>-->
              <p>{{project.env}}</p>
            </div>
            <div class="job-desc">
              <span class="job-sub-title">{{projects.projectDesc}}</span>
              <p>{{project.desc}}</p>
            </div>
            <div class="job-desc">
              <span class="job-sub-title">{{projects.responsibilityDesc}}</span>
              <p>{{project.responsibility}}</p>
            </div>
            <!--//job-desc-->
          </div>
          <!--//item-->
        </div>
        <!--//timeline-->
      </section>
      <!--//section-->

      <section id="portfolio-section" class="portfolio-section section" v-if="portfolio.portfolios">
        <h2 class="section-title">{{portfolio.sectionTitle}}</h2>
        <ul id="filters" class="filters clearfix">
          <li class="type active" data-filter="*">All</li>
          <li class="type" v-for="category in portfolio.categories" :data-filter="'.' + category.name">
            {{category.title}}
          </li>
        </ul>
        <!--//filters-->
        <div class="items-wrapper isotope row" v-if="portfolio.categories">
          <div :class="'item ' + portfo.category + ' col-md-3 col-xs-6' " v-for="portfo in portfolio.portfolios">
            <div class="item-inner">
              <figure class="figure">
                <img class="img-responsive" :src="portfo.img" alt=""/>
              </figure>
              <div class="content text-left">
                <h3 class="sub-title"><a target="_blank" href="portfo.url">{{portfo.title}}</a></h3>
                <div class="technique">{{portfo.technique}}</div>
                <div class="desc"><a target="_blank" :href="portfo.url">{{portfo.desc}}</a></div>
              </div>
              <!--//content-->
              <a class="link-mask" target="_blank" :href="portfo.url"></a>
            </div>
            <!--//item-inner-->
          </div>
        </div>
        <!--//item-wrapper-->

      </section>
      <!--//section-->

      <section id="eudcation-section" class="education-section section">
        <h2 class="section-title">{{education.sectionTitle}}</h2>
        <div class="row">
          <div class="item col-xs-12 col-sm-4" v-for="education in education.educations">
            <div class="item-inner">
              <h3 class="degree">{{education.educationBody}}</h3>
              <div class="education-body">
                {{education.degree}}
              </div>
              <!--//education-body-->
              <div class="time">{{education.time}}</div>
              <div class="desc">
                {{education.desc}}
              </div>
            </div>
            <!--//item-inner-->
          </div>
        </div>
        <!--//row-->
      </section>
      <!--//section-->

      <section id="contact-section" class="contact-section section">
        <h2 class="section-title">{{contact.sectionTitle}}</h2>
        <div class="intro">
          <img class="profile-image" src="assets/images/profile-image.png" alt="">
          <div class="dialog">
            <p>{{contact.notice}}</p>
            <p><strong>{{contact.provideServices}}</strong></p>
            <ul class="list-unstyled service-list">
              <li v-for="serv in contact.services"><i class="fa fa-check" aria-hidden="true"></i> {{serv.name}}</li>
            </ul>
            <p>{{contact.message}} <a :href="'mailto:' + basicInfo.email">{{basicInfo.email}}</a>
              {{contact.call}} <a :href="'tel:' + basicInfo.mobile">{{basicInfo.mobile}}</a>
              {{contact.thanks}}
            </p>
            <ul class="social list-inline">
              <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-github-alt" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-skype" aria-hidden="true"></i></a></li>
            </ul>
            <!--//social-->
          </div>
          <!--//diaplog-->
        </div>
        <!--//intro-->

      </section>
      <!--//section-->

    </div>
    <!--//wrapper-->

    <!--<footer class="footer text-center">-->
      <!--<div class="container">-->
        <!--<small class="copyright">Copyright &copy; 2018.Brilliant All rights reserved.-->
          <!--<a href="https://gitee.com/liuge1988/brilliant" target="_blank">{{basicInfo.sourceCode}}</a></small>-->
        <!--{{basicInfo.authorTitle}}:<a href="https://www.cnblogs.com/xifengxiaoma/" target="_blank">{{basicInfo.authorValue}}</a>-->
      <!--</div>-->
      <!--&lt;!&ndash;//container&ndash;&gt;-->
    <!--</footer>-->

  </div>
</template>
<script>
  // import "./assets/plugins/jquery-1.12.4.min.js";
  // import "./assets/plugins/bootstrap/js/bootstrap.min.js";
  // import "./assets/plugins/back-to-top.js";
  // import "./assets/plugins/jquery-scrollTo/jquery.scrollTo.min.js";
  // import "./assets/plugins/easy-pie-chart/dist/jquery.easypiechart.min.js";
  // import "./assets/plugins/imagesloaded.pkgd.min.js";
  // import "./assets/plugins/isotope.pkgd.min.js";
  // import "./assets/js/main.js";
  // import "./assets/js/demo/style-switcher.js";

  export default {
    name: 'resume',
    data(){
      return {
        dataSource:null,
        lang: 'zh_cn',
        language: null,
        basicInfo: null,
        experiences: null,
        projects: null,
        education: null,
        skills: null,
        portfolio: null,
        contact: null
      }
    },
    methods: {
      changeLanguage: function () {
        debugger
        var zh_cn = 'zh_cn'
        var en_us = 'en_us'
        if (this.lang == zh_cn) {
          this.lang = en_us
          this.language = "Chinese"
        } else {
          this.lang = zh_cn
          this.language = "英文简历"
        }
        var data = window.localStorage.getItem(this.lang)
        if (data != null) {
          data = JSON.parse(data)
          this.basicInfo = data.basicInfo
          this.experiences = data.experiences
          this.projects = data.projects
          this.education = data.education
          this.skills = data.skills
          this.portfolio = data.portfolio
          this.contact = data.contact
        }
      }
    },
    mounted() {
      this.changeLanguage();
    },
    created() {
      // document.title = `赤f蓝 - chelflan.cn`
      document.title = ` 生活记录 - chelflan.cn`
      let dataEn = {
        "basicInfo": {
          "name": "Wang Yuyan ♂ Female",
          "title": "☆ JAVA ☆ Systems Architect ☆ Devolopment Manager",
          "profileInfo": "I have great interested in science, physics and math since I was a girl. I still remember the first time I play computer in junior middle school, that made me excited. I began programming in senior middle school, I love it and determined to be a engineer in the future and I did. When I got my computer science degree at Babu University of Tianlong in 2011, I had worked for several company with Java Taijigramming. I learned a lot from the practices and I enjoyed it. As the saying goes, where there is a will, there is a way. Although there are seven years since I work, I know there still has a long way to go, and I am trying to be a better programmer.",
          "email": "wangyuyan@qq.com",
          "mobile": "12011012315",
          "website": "https://www.cnblogs.com/xifengxiaoma/",
          "authorTitle": "Author",
          "authorValue": "Zhaoyuyiqingchen",
          "sourceCode": "Source Code"
        },
        "experiences": {
          "navTitle": "Experiences",
          "sectionTitle": "Experiences",
          "workExperiences": [{
            "place": "Huashan Information Technology Co. Ltd.（1000-5000人）",
            "location": "Xian",
            "title": "Systems Architect",
            "industry": "Software/Service Taijivider",
            "time": "2017.9 — Present",
            "jobDesc": "As a system architect, involved in development cooperation projects, explained as Supply Taijicedure Optimize. The system based on UWB wireless location technology, aim to build the intelligent factory, optimize plant production process, ensure daily production plant equipment production line can be comprehensive management and monitoring. In the process of project development, to participate in the project system to adjust and optimize the structure design, standardizing the development processes of the team, participate in relevant to the needs of research and discussion, to complete the design and encoding of function modules, coordinate between products, development and testing work. Organize and participate in primary technology research and major obstacles. And if necessary, we also need go to the customer site to offer the related technical support and consultation and help the customer to use the system better."
          }, {
            "place": "Shaolin Network Technology Co. Ltd.（50-150人）",
            "location": "Henan",
            "title": "Systems Architect",
            "industry": "Internet/SaaS Taijivider",
            "time": "2014.3—2017.9",
            "jobDesc": "As the system architect, the head master of the pro cloud platform products, is responsible for all technical works related to the platform. Including participation in the pro cloud platform of the demand and market survey, completed the system architecture and design, to control the whole process of system development, development process and project related technical specifications, product development, coordinate between products, development and testing work. Organize and participate in primary technology research and major obstacles, lead the team to carry out the research of primary technologies and major obstacles to overcome, encourage team members to start training and knowledge sharing."
          }, {
            "place": "Wudang Cooperate.（1000-5000人）",
            "location": "Hubei",
            "title": "Devolopment Manager",
            "industry": "Babycare/ECommerce",
            "time": "2011.1—2014.3",
            "jobDesc": "Presided over the research and analysis of the field of Java EE rapid development platform, completed the system architecture design, product planning, module development, product construction and release of Songshan JAVA EE rapid development platform. Organize and participate in primary technology research and major obstacles, lead the team to carry out the research of primary technologies and major obstacles to overcome, encourage team members to have knowledge sharing."
          }]
        },
        "projects": {
          "navTitle": "Projects",
          "sectionTitle": "Projects",
          "projectEnv": "environment",
          "projectDesc": "Project Description",
          "responsibilityDesc": "Responsibility",
          "projectExperiences": [{
            "name": "Huashan Optmize System",
            "location": "Xian",
            "title": "Systems Architect",
            "industry": "Software/Service Taijivider",
            "time": "2017.9 — Present",
            "env": "Vue.js + Element + Spring Boot + Spring Cloud + Mybatis + RabbitMQ + Docker + Maven + Jenkins…",
            "desc": "Huashan system based on wireless location technology of UWB, provide scheduling dashboard, manager and monitor service of the production line. The system was separated by front and backend, communicate with JSON format. Using HTML5 front page, with the data binding framework simplifies the development of Angular JS, using Spring MVC + Spring + Mybatis backend architecture based on Spring, using Spring Boot to simplify the system configuration, Spring Cloud to support the micro service, to provide a best online API documents with Swagger.",
            "responsibility": "As a project architect, involved in the project system to adjust and optimize the structure design, participate in relevant to the needs of research and discussion, to complete the design and encoding related function modules, organize and participate in primary technology research and major obstacles."
          }, {
            "name": "Taiji Cloud Platform",
            "location": "Henan",
            "title": "Systems Architect",
            "industry": "Internet/SaaS provider",
            "time": "2014.3—2017.9",
            "env": "IDEA + Angular JS + Spring Boot + Spring MVC + Mybatis + FastDFS + Docker + Maven + Jenkins…",
            "desc": "Taiji Cloud platform is a cloud platform focused on aerospace, ship transportation, rail transportation and other large industries, aiming to provide full range of needs management, transaction management, project management, task collaboration, industry information and other services. The system used separation style between front and backend.The system was separated by front and backend, communicate with JSON format. Using pure HTML5 front page, with the Angular JS data binding framework to simplify the development, backend using Mainstream Architecture with Spring + Spring MVC Mybatis + Shiro, using the Maven project construction, using Jenkins to provide the continuous integration, using FastDFS to meet the needs of attachment and images, deployment using Docker container technology, to the simplify the deployment work.",
            "responsibility": "As the system architect of pro cloud platform, is responsible for architecture design, research and analysis of related products, collaborative product manager of the demand, form and lead the product development team to complete system development, arrange project development plan, to control the progress of system development, coordination of product development and testing team to work efficiently, lead and guide the team of key technologies and major obstacles to overcome."
          }, {
            "name": "Songshan Rapid JAVA EE Develop Platform",
            "location": "Hubei",
            "title": "Devolopment Manager",
            "industry": "Babycare/ECommerce",
            "time": "2015.1 - 2017.3",
            "env": "Eclipse + GEF + EMF + HTML5 + EXT JS + Spring MVC + Spring + Mybatis + Dubbo + Maven + Jenkins…",
            "desc": "Songshan JAVA EE rapid development platform is based on Eclipse RCP platform. It can quickly generate concise, easy to use, efficient and robust JAVA platform for business development based on simple visual configuration and modeling. The platform architecture with designer and runtime, the designer is a visual modeling designer based on the Eclipse platform can be completed including data modeling, business modeling, UI modeling, and menu modeling, the runtime is a JAVA EE system based on the excellent business. The function modules can be added by designer generated, which greatly reduces the threshold of development, reduce the cost of development.",
            "responsibility": "As the Department's Develop Manager, control the development of Songshan JAVA EE rapid platform. Carry out research and analysis of related products, completed the product planning, product research and development, and hold on the product construction and release. In the process of R & D, we carry out related technology research, overcome technical barriers, participate in the design and development of product functions, coordinate the internal work, track the progress of product development, and ensure the efficiency and quality of product development."
          }]
        },
        "education": {
          "navTitle": "Education",
          "sectionTitle": "Education",
          "educations": [{
            "educationBody": "Huashan University",
            "degree": "College/Bachelor",
            "time": "2007 - 2011",
            "desc": "Study at Babu University of Tianlong and got my Bachelor degree."
          }, {
            "educationBody": "Huashan Senior Middle School",
            "degree": "Senior Middle School Stuent",
            "time": "2001 - 2007",
            "desc": "Study at Shanxi Huashan Senior Middle School and graduated in 2007."
          }, {
            "educationBody": "Huashan Junior Middle School",
            "degree": "Junior Middle School Stuent",
            "time": "1995 - 2001",
            "desc": "Study at Shanxi Huashan Junior Middle School and graduated in 2004."
          }]
        },
        "skills": {
          "navTitle": "Skills",
          "sectionTitle": "Professional Skills",
          "topSkills": [{
            "name": "Java",
            "percent": "98",
            "level": "Expert, 8+ years",
            "time": "2016 - Present",
            "desc": "desc here."
          }, {
            "name": "Spring Boot",
            "percent": "97",
            "level": "Expert, 5+ years",
            "time": "2016 - Present",
            "desc": "desc here."
          }, {
            "name": "Spring Cloud",
            "percent": "95",
            "level": "Expert, 3+ years",
            "time": "2016 - Present",
            "desc": "desc here."
          }],
          "otherSkills": [{
            "name": "HTML5"
          }, {
            "name": "CSS3"
          }],
          "skillItems": [{
            "name": "☆ Know well about Java EE System and can choose the appropriate tools to meet the business requirement."
          }, {
            "name": "☆ Expert in Java，familiar with Java Memory，JVM optimize，DB optimize，familiar with Design Patterns."
          }, {
            "name": "☆ Skilled in use of  Spring Boot, Spring Cloud, Spring MVC, Spring Security, MyBatis , Spring Data JPA."
          }, {
            "name": "☆ Have a good charge of Vue.js, Element UI, HTML, CSS, JavaScript, AJAX, JQuery, axios, JSON and son."
          }, {
            "name": "☆ Expert in Eclipse Plugin Dev，familiar with Eclipse Platform, SWT, JFACE, GEF, GMF, OSGI and relative."
          }, {
            "name": "☆ Have a profound understanding of Agile Development and have good practice of agile in project before."
          }, {
            "name": "☆ Master Maven Build，Junit Testing，Nexus Private Server，Jenkins to provider continuous integration."
          }, {
            "name": "☆ Know well about database of MySQL, oracle, No SQL of Mongo DB, Cache of Redis and MQ of RabbitMQ."
          }, {
            "name": "☆ Know about the theory of Spring IOC and AOP, the theory of MyBatis, JPA, the theory of Tomcat Server."
          }, {
            "name": "☆ Familiar with the UML Modeling and the popular development mode, familiar with the use of Linux System."
          }, {
            "name": "☆ Know about the of knowledge of IaaS, PaaS, SaaS and the theory and usage of docker virtual technology."
          }, {
            "name": "☆ Familiar with the C and C++ programming language, have a good use of the various third part. technology."
          }]
        },
        "portfolio": {
          "navTitle": "Portfolio",
          "sectionTitle": "Portfolio",
          "categories": [{
            "name": "backend",
            "title": "Back-end",
            "desc": "Back-end"
          }, {
            "name": "frontend",
            "title": "Front-end",
            "desc": "Front-end"
          }],
          "portfolios": [{
            "img": "assets/images/portfolio/ployun.png",
            "title": "taiji cloud",
            "category": "backend",
            "technique": "Java",
            "desc": "A cloud platform for traffic and transportation industry.",
            "url": "http://www.ployun.cn/"
          }, {
            "img": "assets/images/portfolio/portfolio-1.jpg",
            "title": "kitty [Open Source]",
            "category": "backend",
            "technique": "Java",
            "desc": "Auth Mng System base on Spring Boot and Spring Cloud.",
            "url": "https://gitee.com/liuge1988/kitty"
          }, {
            "img": "assets/images/portfolio/portfolio-2.jpg",
            "title": "kitty-ui [Open Source]",
            "category": "frontend",
            "technique": "Vue.js",
            "desc": "Auth Mng System web base on Vue.js and Element UI.",
            "url": "https://gitee.com/liuge1988/kitty-ui"
          }, {
            "img": "assets/images/portfolio/portfolio-3.jpg",
            "title": "brilliant [Open Source]",
            "category": "frontend",
            "technique": "Vue.js",
            "desc": "Help designer and programmer build a brilliant online resume.",
            "url": "https://gitee.com/liuge1988/brilliant"
          }, {
            "img": "assets/images/portfolio/portfolio-4.jpg",
            "title": "Huashan System",
            "category": "backend",
            "technique": "Java",
            "desc": "supply optimize system base uwb and scan technology.",
            "url": "http://139.196.87.48:9002/kitty"
          }, {
            "img": "assets/images/portfolio/portfolio-5.jpg",
            "title": "Songshanshaolin",
            "category": "backend",
            "technique": "Java",
            "desc": "Java EE GUI Modeling Platform, modeling is devoloping.",
            "url": "http://139.196.87.48:9002/kitty"
          }, {
            "img": "assets/images/portfolio/portfolio-6.jpg",
            "title": "Liumai Visual Platform",
            "category": "backend",
            "technique": "Java",
            "desc": "Domain Modeling Platform, customize GUI Modleing Tools.",
            "url": "https://gitee.com/liuge1988/brilliant"
          }, {
            "img": "assets/images/portfolio/portfolio-7.jpg",
            "title": "Songshans WLAN",
            "category": "backend",
            "technique": "Java",
            "desc": "A WLAN device management and monitor java system.",
            "url": "https://gitee.com/liuge1988/brilliant"
          }]
        },
        "contact": {
          "navTitle": "Contact",
          "sectionTitle": "Get in Touch",
          "notice": "Welcome to my home page. I am working for a software company and often to be bussy with jobs. If you have any meets or questions, please touch me with the following ways.",
          "message": "Drop me a line at",
          "call": " or call me at",
          "thanks": "，thanks for visit.",
          "provideServices": "I can help with the following：",
          "services": [{
            "name": "Served as a CTO, handling the system devolopment and team mamagement."
          }, {
            "name": "To be a Architect, handling software devolopment and do teamwork."
          }, {
            "name": "As a Dev Manager, handling  software devolopment and do teamwork."
          }, {
            "name": "To be a PM, doing project management and make good practice in teamwork."
          }]
        }
      };
      let dataCh = {
        "basicInfo": {
          "name": "王语嫣 ♀女",
          "title": "☆ JAVA开发 ☆ 系统架构师 ☆ 技术经理",
          "profileInfo": "鄙人自小对科学、物理、数学等学科有独特的兴趣，初中时期开始接触电脑，开启了自己的计算机学习生涯。高中时期开始自学编程，并在高考时果断放弃了自己最擅长的中文专业，选择了计算机专业。2011年于天龙八部学院计算机科学与技术系毕业之后，一直主攻JAVA领域的开发和研究工作。本人做事勤恳、细心，富有工作责任心，喜欢与人交流。善于思考，学习理解和适应能力强。爱好户外爬山、跑步、篮球、羽毛球、游泳等。计算机方面专业基础扎实，项目实践经验丰富，思维反应快速敏捷，学习适应能力过硬，具备从事软件开发工作所需要的细心和耐心。我始终坚信唯有付出，方有收获，天道酬勤，想要成功，就得脚踏实地，比别人努力再努力。",
          "email": "wangyuyan@qq.com",
          "mobile": "12011012315",
          "website": "https://www.cnblogs.com/xifengxiaoma/",
          "authorTitle": "作者",
          "authorValue": "朝雨忆轻尘",
          "sourceCode": "源码下载"
        },
        "experiences": {
          "navTitle": "工作经验",
          "sectionTitle": "工作经验",
          "workExperiences": [{
            "place": "华山信息技术有限公司（1000-5000人）",
            "location": "西安",
            "title": "系统架构师 软件开发部",
            "industry": "计算机软件/服务供应商",
            "time": "2017.9 — 至今",
            "jobDesc": "作为系统架构师，参与华山项目的开发，项目主基于UWB无线定位技术或扫码技术，实现工厂智能化生产，优化工厂线上生产流程，保障工厂设备生产线的日常生产能够得到全面的管理和监控。项目开发过程中，参与系统的架构设计、调整和优化，制定和补充团队的开发流程和规范，参与相关需求的调研和讨论，完成相关功能模块的设计和编码，管理和规范产品的构建和发布流程，协调产品、开发、测试之间的工作。组织和参与关键技术的研究和重大障碍的攻克，活跃团队的知识培训和分享氛围。不定时的奔赴客户现场，进行相关的技术支持和咨询，帮助和引导客户更好的使用系统。"
          }, {
            "place": "武当网络技术有限公司（50-150人）",
            "location": "湖北",
            "title": "系统架构师 产品研发部",
            "industry": "互联网/云平台/SaaS供应商",
            "time": "2014.3—2017.9",
            "jobDesc": "作为武当的系统架构师，“武当太极云”平台产品的技术总负责人，负责“武当太极云”平台开发相关的一切技术性工作。其中主要包括参与“武当太极云”平台的前期需求调研和市场调查，完成“武当太极云”平台的整体系统架构设计，把控整个系统的开发进程，制定公司项目开发流程和相关技术规范，协调产品、开发、测试各团队进行高效的协同工作，组建和推进公司软件开发技术团队的培养,带领团队进行关键技术研究和重大障碍攻克，组织和指导团队成员进行知识培训和分享等等。"
          }, {
            "place": "嵩山少林集团（1000-5000人）",
            "location": "河南",
            "title": "研发经理 产品研发部",
            "industry": "少林武术/电子商务",
            "time": "2011.1—2014.3",
            "jobDesc": "作为公司的部门产品研发经理，主持对Java EE快速开发平台领域的研究与分析，组织队员完成“Nerpa”JAVA EE快速开发平台的前期需求调研，整体产品规划，系统架构设计，产品功能研发，产品最终的构建和发布。带领和组织研发团队，致力于研发出一款功能强大，界面美观，易于配置，易于维护，易于扩展，用户友好、性能优良的可视化JAVA EE快速开发平台，最终最大化的降低开发开发成本，降低开发人员的技术门槛。"
          }]
        },
        "projects": {
          "navTitle": "项目经验",
          "sectionTitle": "项目经验",
          "projectEnv": "技术环境",
          "projectDesc": "项目描述",
          "responsibilityDesc": "责任描述",
          "projectExperiences": [{
            "name": "华山智能化工厂系统",
            "location": "西安",
            "title": "系统架构师 软件开发部",
            "industry": "计算机软件/服务供应商",
            "time": "2017.9 — 至今",
            "env": "Vue.js + Element + Spring Boot + Spring Cloud + Mybatis + RabbitMQ + Docker + Maven + Jenkins…",
            "desc": "华山智能化工厂系统，基于UWB无线定位技术，收集工厂内各种物件的位置信息，管理订单的导入和订单生产的排班，监控生产线上各个工位的生产状况，保证设备装配所需物料的供给，并在工位出现故障的时候通过安灯发出警报等等。系统采用前后端分离，后台统一通过接口返回JSON数据，前端采用纯HTML5页面，配合数据绑定框架Vue.js简化开发，后端基于Spring MVC + Spring + Mybatis架构，采用Spring Boot简化系统配置，搭配Spring Cloud进行微服务的开发，使用RabbitMQ处理UWB消息，使用Swagger提供优秀的在线API文档，利用GIT进行源码的版本控制，采用Maven进行项目构建，使用Jenkins进行项目的持续集成，使用Docker容器技术进行部署，实现部署环境的简单快速的移植。",
            "responsibility": "作为项目系统架构师，参与项目系统的架构设计、调整和优化，制定和补充团队的开发流程和规范，参与相关需求的调研和讨论，完成相关功能模块的设计和编码，管理和规范产品的构建和发布流程，协调产品、开发、测试之间的工作。组织和参与关键技术的研究和重大障碍的攻克，活跃团队的知识培训和分享氛围。不定时的奔赴客户现场，进行相关的技术支持和咨询，帮助和引导客户更好的使用系统。"
          }, {
            "name": "武当太极云平台",
            "location": "湖北",
            "title": "系统架构师 产品研发部",
            "industry": "互联网/云平台/SaaS供应商",
            "time": "2014.3—2017.9",
            "env": "IDEA + Angular JS + Spring Boot + Spring MVC + Mybatis + FastDFS + Docker + Maven + Jenkins…",
            "desc": "“武当太极云”平台是一个专注于航空航天、船舶运输、轨道交通等大型行业的垂直领域云平台，旨在提供全流程化的需求管理、交易管理、项目管理、任务协同、行业资讯等系列服务。系统采用前后端分离，后台统一通过接口返回JSON数据，前端采用纯HTML5页面，配合数据绑定框架Angular JS简化开发，后端采用Spring MVC + Spring + Mybatis + Shiro的主流架构，采用Maven进行项目构建，使用Jenkins进行项目的持续集成， 采用FastDFS来满足图片和附件日增的存储需求，使用Docker容器技术进行部署，实现部署环境的简单快速的移植。",
            "responsibility": "作为“武当太极云”平台的系统架构师和技术总负责人，负责产品的整体架构设计，进行相关产品的研究与分析，协同产品经理完成前期需求调研，组建和带领产品研发团队完成系统的研发，安排项目开发计划，把控系统的开发进度，协调产品、开发、测试各团队进行高效的工作，带领和指导团队进行关键性技术研究和重大障碍的攻克等等。"
          }, {
            "name": "嵩山少林快速开发平台",
            "location": "河南",
            "title": "研发经理 产品研发部",
            "industry": "开发平台/电子商务",
            "time": "2011.1—2014.3",
            "env": "Eclipse + GEF + EMF + HTML5 + EXT JS + Spring MVC + Spring + Mybatis + Dubbo + Maven + Jenkins…",
            "desc": "嵩山少林快速开发平台是一个基于Eclipse RCP平台实现的，能够基于简单的可视化配置和建模，快速生成简洁、易用、高效、健壮业务系统的JAVA快速开发平台。整个平台架构由设计时和运行时两部分组成，设计时是基于Eclipse平台构建的可视化建模设计器，可以完成包括数据建模、业务建模、UI建模、菜单建模等整个建模流程，运行时是基于主流SSM框架和Ext JS架构的优秀JAVA EE基础系统，可高效的加入设计器生成的业务功能模块，使用平台的模板快速生成功能可以最大自动化生成业务功能模块各个层面的代码，极大的降低了配置工作，基于快速配置生成完整的JAVA EE代码，极大的降低了开发门槛，减少了开发成本。",
            "responsibility": "作为部门的研发经理，主持嵩山少林快速开发平台的开发。进行相关产品的研究与分析，主持Nerpa快速开发平台的架构设计，产品规划，产品研发，产品的构建发布。研发过程中进行相关技术研究，攻克技术障碍，参与产品功能的设计与开发，协调内部工作开展，跟踪产品研发进度，保证产品研发效率与质量。组织成员撰写产品所需的相关设计文档、开发文档和帮助文档。"
          }]
        },
        "education": {
          "navTitle": "教育经历",
          "sectionTitle": "教育经历",
          "educations": [{
            "educationBody": "华山大学",
            "degree": "大学/本科",
            "time": "2007 - 2011",
            "desc": "就读于华山大学，计算机科学与技术系，大学本科毕业，获学士学位。"
          }, {
            "educationBody": "华山中学",
            "degree": "中学生",
            "time": "2001 - 2007",
            "desc": "就读于陕西省华山中学，度过三年高中学习生涯，顺利完成相关学业。"
          }, {
            "educationBody": "华山小学",
            "degree": "小学生",
            "time": "1995 - 2001",
            "desc": "就读于陕西省华山小学，度过六年小学学习生涯，顺利完成相关学业。"
          }]
        },
        "skills": {
          "navTitle": "专业技能",
          "sectionTitle": "专业技能",
          "topSkills": [{
            "name": "Java",
            "percent": "98",
            "level": "Expert, 8+ years",
            "time": "2016 - Present",
            "desc": "desc here."
          }, {
            "name": "Spring Boot",
            "percent": "97",
            "level": "Expert, 5+ years",
            "time": "2016 - Present",
            "desc": "desc here."
          }, {
            "name": "Spring Cloud",
            "percent": "95",
            "level": "Expert, 3+ years",
            "time": "2016 - Present",
            "desc": "desc here."
          }],
          "otherSkills": [{
            "name": "HTML5"
          }, {
            "name": "CSS3"
          }],
          "skillItems": [{
            "name": "☆ 熟知JAVA EE体系，知晓JAVA体系中各个领域与层面所需的相关知识与技术，熟知JAVA EE历史发展进程。"
          }, {
            "name": "☆ 擅长JAVA语言，理解JAVA内存模型，JVM性能调优，数据库性能调优，对常用设计模式有较为深刻的了解。"
          }, {
            "name": "☆ 掌握前台开发，掌握Vue.js、Element UI、HTML、CSS、JavaScript、AJAX、JQuery等主流前端技术的使用。"
          }, {
            "name": "☆ 精通Eclipse插件开发，熟悉Eclipse平台，熟练掌握RCP相关的SWT、JFACE、GEF、GMF、OSGI等相关技术。"
          }, {
            "name": "☆ 熟悉敏捷开发模式，对敏捷开发有比较丰富的体验和深刻的理解，具备良好的敏捷团队组建和培养实践经验。"
          }, {
            "name": "☆ 熟练掌握使用Maven进行产品构建，使用Nexus搭建私服，使用Hudson、Jenkins进行持续化构建与部署。"
          }, {
            "name": "☆ 熟练掌握MySQL、Oracle等数据库，Mongo DB等No SQL，掌握Redis等缓存技术和RabbitMQ等消息中间件。"
          }, {
            "name": "☆ 深入理解Spring IOC与AOP原理，MyBatis、JPA等持久化原理，Tomcat服务器原理，Docker容器技术原理。"
          }, {
            "name": "☆ 掌握UML统一建模语言，了解常用的软件开发模式，擅长敏捷开发模式，熟悉Linux环境下常用命令的使用。"
          }, {
            "name": "☆ 熟悉云计算相关知识，掌握IaaS/PaaS/SaaS相关体系，掌握Docker容器虚拟化技术原理、环境搭建与运用。"
          }, {
            "name": "☆ 了解C、C++、汇编等语言，掌握DRUID/POI/BEETL/LUCENE/DOM4J/JSON/XSTREAM等等其他第三方技术。"
          }]
        },
        "portfolio": {
          "navTitle": "作品展示",
          "sectionTitle": "作品展示",
          "categories": [{
            "name": "backend",
            "title": "Back-end",
            "desc": "后端项目"
          }, {
            "name": "frontend",
            "title": "Front-end",
            "desc": "前端项目"
          }],
          "portfolios": [{
            "img": "assets/images/portfolio/ployun.png",
            "title": "武当云平台",
            "category": "backend",
            "technique": "Java",
            "desc": "专注于航空航天、船舶运输、轨道交通行业的垂直领域云平台。",
            "url": "http://www.ployun.cn/"
          }, {
            "img": "assets/images/portfolio/portfolio-1.jpg",
            "title": "kitty [开源项目]",
            "category": "backend",
            "technique": "Java",
            "desc": "基于Spring Boot和Spring Cloud实现的后台权限管理系统。",
            "url": "https://gitee.com/liuge1988/kitty"
          }, {
            "img": "assets/images/portfolio/portfolio-2.jpg",
            "title": "kitty-ui [开源项目]",
            "category": "frontend",
            "technique": "Vue.js",
            "desc": "Kitty 前端，基于 Vue + Element 实现的后台权限管理系统。",
            "url": "https://gitee.com/liuge1988/kitty-ui"
          }, {
            "img": "assets/images/portfolio/portfolio-3.jpg",
            "title": "brilliant [开源项目]",
            "category": "frontend",
            "technique": "Vue.js",
            "desc": "帮助专业技术、设计人员快速打造自己优质的个人网站、在线简历。",
            "url": "https://gitee.com/liuge1988/brilliant"
          }, {
            "img": "assets/images/portfolio/portfolio-4.jpg",
            "title": "华山智能化工厂",
            "category": "backend",
            "technique": "Java",
            "desc": "基于无线定位和扫码技术，优化工厂生产流程，实现智能化工厂。",
            "url": "http://139.196.87.48:9002/kitty"
          }, {
            "img": "assets/images/portfolio/portfolio-5.jpg",
            "title": "峨眉快速开发平台",
            "category": "backend",
            "technique": "Java",
            "desc": "基于领域建模的JAVA EE可视化建模平台，实现软件开发建模化。",
            "url": "http://139.196.87.48:9002/kitty"
          }, {
            "img": "assets/images/portfolio/portfolio-6.jpg",
            "title": "六脉可视化建模平台",
            "category": "backend",
            "technique": "Java",
            "desc": "基于领域建模概念，方便快速打造各种可视化建模工具的建模平台。",
            "url": "https://gitee.com/liuge1988/brilliant"
          }, {
            "img": "assets/images/portfolio/portfolio-7.jpg",
            "title": "嵩山少林WLAN网管系统",
            "category": "backend",
            "technique": "Java",
            "desc": "嵩山少林无线网管系统，监控网络设备状态，提供有效监控和管理。",
            "url": "https://gitee.com/liuge1988/brilliant"
          }]
        },
        "contact": {
          "navTitle": "联系方式",
          "sectionTitle": "联系方式",
          "notice": "我目前就职于一家软件企业，担任系统架构师的职务，主要带领公司研发团队进行软件项目的研发，项目进度的把控，技术团队的管理，团队任务的协调，系统上线运维的安排等工作。因为自己平时也喜欢参与编码，所以工作还是比较忙的，如果有什么需要，可以通过下面提供的方式联系我。",
          "message": "欢迎给我留言",
          "call": "或者致电",
          "thanks": "，感谢您的访问。",
          "provideServices": "提供服务：",
          "services": [{
            "name": "担任技术总监职务，主持公司系统的架构和研发，技术团队的管理和培养"
          }, {
            "name": "担任系统架构师职务，主持公司系统的架构和研发，技术团队的管理和培养"
          }, {
            "name": "担任技术经理职务，主持公司系统的架构和研发，技术团队的管理和培养"
          }, {
            "name": "担任项目经理职务，管理公司项目，培养技术团队，协调团队合作和研发工作"
          }]
        }
      };
      window.localStorage.setItem("zh_cn", JSON.stringify(dataCh));
      window.localStorage.setItem("en_us", JSON.stringify(dataEn));

    }
  }
</script>

<style scoped lang="scss">
  @import "./assets/plugins/bootstrap/css/bootstrap.min.css";
  @import "./assets/plugins/font-awesome/css/font-awesome.css";
  @import "./assets/css/styles.css";

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .author {
      width: 100%;
    }
  }
</style>
