# <p align="center"><a href="https://smart-trip-alpha.vercel.app/"><img width="350" src="./public/logo.png"></a></p>

<p align="center"> Create, customize, and optimize your itineraries with this free AI trip planner. <a href="https://smart-trip-alpha.vercel.app/">Try this out now!</a></p>

## Table of Contents
- [What this does](#what-this-does)
- [GIF Demonstration](#gif-demonstration)
- [Note](#note)
- [Built With](#built-with)
- [Author](#author)
- [Deployment](#deployment)
- [Reflection](#reflection)

## What this does?

Utilizing Gemini AI to provide users with their ideal travel plan for any destination around the world based on their preferences.

## GIF Demonstration

### Landing page
![smart-trip1](https://github.com/user-attachments/assets/ac347a37-80ad-490e-b0bd-ab3ad2afa797)

### Create a new plan flow
![smart-trip2](https://github.com/user-attachments/assets/c64b91ce-61ea-4ddb-8408-5aedec3f00aa)

### Dashboad page & Plan page
![smart-trip3](https://github.com/user-attachments/assets/5308f665-68be-4cd5-ba22-b32d0d81eb41)

![smart-trip4](https://github.com/user-attachments/assets/88645913-8680-4f6e-b3bb-481de9b7b33d)

## Note

I was using the Google Places API carelessly, and suddenly, the bill surpassed $200 in no time while I was testing it. Luckily, Google Cloud Platform provides $200 in free credits monthly for that service, but that was too much for just my testing alone. The main elements I used the Google Places API for were an autocomplete component for location names when users input their preferences, and another for fetching images from Place Photos. The bulk of the cost, almost 99% of the budget, came from Places API Place Photo and (mostly) Text Search.

Since the image URLs provided by Gemini were mostly non-functional, I had to find another way to render the images. What I did was fetching place information from the Places API Text Search using the given place name, then gather a list of photos from the output to render using the Places Photo API. The mistake I made was fetching images for every plan and trip using the `useEffect` hook, causing the images to be fetched again whenever those components were re-rendered. Caching would be helpful in this case, since it will help reducing the number of request of Places API Text Search. However, it wouldn't reduce the cost from Places Photo since the that one's billing is based on when the images are rendered (charged per pixel, tracked through the API key that's required in the image URL).

I ended up disabling that part for now and using placeholders for those images instead. It was a valuable (and costly, haha) learning experience. I'll come up with a better solution without relying too much on Google Cloud Platform services.

## Built With
- Next.js
- Tailwind CSS
- Redux Toolkit
- shadcn/ui
- Google Generative AI
- OAuth
- Google Firebase

## Author

Phot Koseekrainiramon
- [LinkedIn](https://www.linkedin.com/in/phot-kosee/)
- [GitHub](https://github.com/photkosee)

## Deployment

This project is deployed to Vercel:

https://smart-trip-alpha.vercel.app/

## Reflection

### Back to shadcn/ui
The first time I used this library was when I worked on my portfolio projects a long time ago, but then I started leaning toward NextUI and experimenting with many other UI libraries in my recent projects. However, when working with Tailwind CSS, I can't deny that shadcn/ui is the most suitable library. Another reason I want to use this library again is that it's trending due to news about Vercel's v0, which uses AI to enhance the workflow of Next.js and shadcn/ui. And yes, this library hasn't disappointed me in how easy it is to customize with Tailwind CSS, along with the strong support from its community.

### Gemini AI API
I might be a bit late to the AI trend, but one of the reasons I’m working on this project is mainly because I want to try utilizing this AI API, and it’s free! My next project will be a big one for me, as I plan to use Gemini and implement some Retrieval-Augmented Generation (RAG) to build a course recommender for a university. I’m planning to develop a multi-model system, but I’ll leave the details out until I’m closer to completing that project. Overall, connecting and interacting with the AI has been quite straightforward. I’ve seen some people use libraries to connect the AI on the client side, but I decided not to follow that route and instead handle the connection on the backend for better security. Next.js suits this purpose well since it allows me to work on both the frontend and backend within the same project (framework).

### Google Authentication
I initially tried implementing NextAuth, and it was much easier than I expected, thanks to the extensive documentation and articles. However, since I only plan to implement Google sign-in and nothing else, a library like OAuth became a more straightforward, direct, and simpler solution for my use case, which is why I decided to switch to it.

### Google Firebase
So far, setting up Firestore in the project has been much easier than I expected, including performing CRUD actions to add new documents to the database. I’m starting to think I should have used this all along.

### Switch from useContext API to Redux
At first, I implemented a context for tracking the form data when creating a new trip using the useContext API, since I planned to only use it in one route. However, since I’ll be adding a few more states for authentication, I decided to switch to Redux (I wanted to work with it because I haven't touched it for a while). Although it requires a bit more setup, it will be easier to manage as I implement more global states in the future.

### Zustand vs Redux
The first global state management tool I ever used was Redux. Later, I tried Zustand in the last few projects, and I realized how much simpler Zustand is compared to Redux. The amount of work and code required to set up and use Redux is quite tedious compared to Zustand. I haven’t had the chance to work on a large-large production project yet, so Redux might be better in that scenario. However, so far, I would give a plus to Zustand since I haven’t encountered any use cases where Redux offers something that Zustand cannot.

### Funny Mistakes
- I spent quite some time figuring out what went wrong with the way I connected to Gemini AI, as I had made it work before when using React. The issue was simple: the environment variable wasn’t being fetched because I added it to the wrong file and used the wrong naming format. I typically add a `.env` file myself, but Next.js already has its own `.env.local` file. Additionally, environment variables should have the `NEXT_PUBLIC_` prefix. Switching between different frameworks can make it easy to overlook small details like these.
- Suddenly, the way every page was rendered looked different from usual—every element seemed compressed. I thought I had added something strange to the layout but couldn’t find the cause, as everything looked normal in inspection mode. In the end, it turned out I had accidentally zoomed out the page, and it was easily fixed by zooming back in.

### Hydration
Once I tried to implement an authentication slice that retrieves data from `localStorage` and uses it in a component, this issue arose. Since `localStorage` cannot be accessed from the server side, it caused a content mismatch between the client and server. The issue can easily be solved by dynamically importing the component using `next/dynamic`, which provides the option to disable server-side rendering. I did this for the `Header` component; however, next time, I'll try working with cookies, as that approach doesn't have this issue. Additionally, having the header render last is not ideal in my opinion.

### Image Component from Next.js
Next.js has its own way to optimize images for performance by lazy loading and automatically resizing images based on device size. However, this native component doesn't seem to work properly when loading images from a third party, such as Google Place Photos in this case. It only works if you set the `unoptimized` prop, but then what's the point of using this image component if it cannot perform its intended function? It does work fine with static images.

### Some Problems after Deployment
Sometimes, I encounter a 504 error when trying to create a new plan, but no meaningful errors are shown. Initially, I thought the issue was due to Gemini occasionally responding with an invalid JSON format, causing an error. It took me a while to figure out that the cause was actually out of my control. With Vercel’s free plan for site deployment, there’s a limited time for backend requests, which is why I only experience the error when a request takes too long. I can think of two solutions: upgrade the plan, or move the logic to the frontend since the part involving chatting with Gemini can be handled there (although this isn’t recommended). Oh, or hosting the backend elsewhere.

I just got another idea of implementing a webhook which could have solved this issue as well.

15/10/2024: I was fixing the screen flickering/shaking while scrolling on some specific browser on mobile and found out that this project of mine also has that issue when scrolling the landing page on iPad (only when open from LinkedIn). I found out that the reason behind this is due to how I set the Image in the hero section having width auto change according to the viewport height (I set its classname as `w-[60vh]`). It only cause an issue once you open it on LinkedIn from an iPad because the viewport from that is changing when scrolling. LinkedIn provides its on footer that will hide itself once you scroll down but will return once you scroll up. And that causes the viewport to keep changing making the image chaning its width accordingly. And that increased area effect the text next to it, it's wrapped into a new line! This is why the screen seems to be flickering/shaking because the height of some sections on the page keep changing. I might need to come up with a better word to descript the behavior but I will put a video here later. But well, what a good lesson to learn again, and now I know!


https://github.com/user-attachments/assets/086a0deb-f4d9-4ea3-bd0f-27470147421d

