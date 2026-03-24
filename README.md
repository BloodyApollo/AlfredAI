# Hackathon 2 Prep

## DEDICATED ARTIFICIAL INTELLIGENCE FOR STUDENTS IN COMPUTING: ALFRED  
**Autonomous Learning Framework for Reasoning, Explanation & Decision-making**

---

## Problem Statement

Industry leaders, such as Apple, Samsung, Google, and non-profit startups like OpenAI, have come up with their own versions of Artificial Intelligence. These have one broad purpose: assist (or completely replace) people in their daily lives by enabling them to sublet their mundane and sometimes essential human tasks, so they can focus on other things.

These AI products detrimentally affect one particular population the most: students, especially those in Science and Technology fields. Course Guidelines are updated to provide clear guidelines and boundaries concerning the use of AI in a completely separate section.

Realistically, people in this field are not particularly interested in reading; we mainly want to just get the work done. It's understandable; student life is exhausting, there are more important matters to attend to, causing people to miss or even sometimes ignore these specifications. Even for those who actively follow these guidelines, it’s possible to spiral into being completely dependent on it.

Our solution: a dedicated AI for students, which would guide their learning without replacing their own efforts and input, ensuring they can still experience it without becoming mindless, AI-dependent “bots” themselves. It’s a very real (and potentially dangerous) issue; using too much AI actually harms the brain function in individuals (Mineo, L. (2025, November 13). Is AI dulling our minds? Harvard Gazette. https://news.harvard.edu/gazette/story/2025/11/is-ai-dulling-our-minds//).

---

## Requirements

### Functional Requirements

1. The system must allow users upload documents  
2. The system must allow users to enter reuquests in the form of typed text
3. The system must be able to scrape the internet for relevant data and information  
4. The system must provide relevant website links and information upon request  

   a. The system must be able to compile a set of resources on the internet relevant to the request  

5. The system must deny requests beyond the the limitations specified in the course and assignment guidelines  

   a. The system must redirect the user’s request and guide them through it without replacing their own input  
   b. The system must deny any requests for bypassing the restrictions  

6. The system must not store any sensitive information locally  

---

### Non-Functional Requirements

1. The interface should be simple and direct  

   a. The interface should only have essential elements on screen  
   b. The interface should have useful links for students  

   https://news.harvard.edu/gazette/story/2025/11/is-ai-dulling-our-minds/

   i. The useful links include and are not necessarily limited to: university page, D2L homepage, MRU graduate etc.  

2. The interface should accessible  

   a. The interface should keep the use of colours to a minimum  

   i. The interface should make use of a monochrome color scheme  
   ii. The interface should not have any flashing lights  
   iii. The interface should not have any sudden changes on the screen  

   b. The interface should not use sound for important information or cues  

3. The interface should provide a brief introduction to the system  

   a. A brief description of the reason the system was created (problem statement)  
   b. Highlight the broad use case scenarios the system can help with  
   c. The system must provide a formal declaration of its limitations  

   i. Limitations include: the system’s guidelines based on student use cases and the technological limitations of the system itself  

4. The system should have some human essence to it  

   a. address the user by name, welcome the user to the system with a warm greeting  

   i. The name should asked for upfront after the greetings  

---

## MoSCoW Prioritazation

### Must-Have

1. External AI (ChatGPT or Gemini) integration  

   a. Work as a base for the system  
   b. Specified instructions to meet the required standard and behaviour of the system  

2. Internet scraping capabilities  

   a. To gather information from the internet to aid learning  
   b. To provide links to useful websites  

---

### Should-Have

1. Physical and Mental health suggestions  

   a. To aid the student in maintaining their short-term and long-term wellbeing  
   b. Sensitive information outsourcing to secure services  

   i. All passwords, usernames, emails, and similar information should be stored in an external, secure platform  
   ii. The information should be entered on secure service  

---

### Could-Have

1. Course load and planning help  
2. MyMRU integration  

   a. Gather information current schedules, courses and grades  
   b. To bypass the need to enter academic information manually  

3. Personal schedule optimization suggestions  
4. Animated interface, in coherence with accessibility requirements  

---

## T-Shirt Sizing (Effort Estimation)

### Small

a. Specifying the student restrictions  
b. Health suggestion specification  

---

### Medium

a. Document upload support  
b. external AI integration  
c. Sensitive Information outsourcing  

---

### Large

a. Interface design  
b. MyMRU integration  

---

## Stakeholder Feedback

**A.**  
“I love that it would allow me to upload my course guidelines so the experience is totally personalized to me and my class. This will both save me time and allow me to finish my assignments efficiently. This keeps me from feeling overwhelmed during the semester so I can focus on understanding the material, instead of trying to fix my mental health.”  
(Gaurik’s friend, personal communication, March 21, 2026)

This is a formal statement by a fourth year MRU student. She has a lot of coursework that has strict guidelines and finds them hard to keep track of. She noted that this tool would be a significant help that would neither hinder her learning nor stunt her growth. She also mentioned the overwhelm that is common amongst the student body and how our solution can help her and other students.  
She inspired the additional guideline tracking feature.

---

**B.**  
“It’s kind of weird that it is ‘your tutor and your schedule manager.’ It would definitely be useful but that sounds way too complex to build at this time. I also would likely not use it because it’s trying to achieve everything while not being complete in any of that.”  
(Gaurik’s friend, Personal Communication, March 21, 2026)

This was a classmate's feedback upon being introduced to the features we plan to add to the system. He noted that it’s an unrealistic goal to build this system in the time frame and also that it’s not very helpful with what its meant to do.  
His suggestion led to the decision that the MRU integration should not be a core feature and that AI integration should be focused on and refined.

---

## Architecture Decision

### Layered Client–Server Architecture

The system has a decent amount of complexity that is not enough to warrant the use of Microservice architecture which could require an astronomical amount of effort and time is not feasible with three people working over 4 weeks. However, a combination of architecture models would be the best approach for this project.

The reasoning is as follows:

1. This approach would avoid unnecessary complexity by having to put everything in a single architectural style, if possible at all.  
2. The client-server being the overall architectural style with layered architecture to add distinctions the implementation would be the most feasible approach  

   a. The client (frontend) will constitute and be responsible for the User Interface and interaction.  
   b. The server (backend) will handle all the logic, data processing and integrations.  

   i. The backend is implemented with internal distinction implemented as layered architecture.  

Using multiple architectures reduces complexity and mixing up of logic and code, making division of responsibilities clearer and easier to communicate and understand.

---

## Tools and Training Plan

### Familiar

1. Visual Studio Code – code editor for writing and managing the project  
2. Git – version control for tracking changes in code  
3. GitHub – hosting repository and enabling team collaboration  
4. HTML – base design for the website UI  

---

### Fairly familiar (Minimal training required)  
Expected to learn latest by Sunday, March 22, 2026)

1. CSS – for the non-essential design of the website UI  
2. JavaScript and Libraries – for backend logic and potential UI implementation  

---

### Unfamiliar Tools (Require learning)  
Expected to learn as required throughout Week 2  

1. Google Gemini API – AI model for generating responses and recommendations  
2. Firebase Authentication – secure user login and credential management  
3. Firebase Firestore – cloud database for storing user data and app data
  