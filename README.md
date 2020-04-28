# Adventure Capitalist Game

## Description

Introducing the latest galactic business simulator *Astral Tycoon*, where you can generate antimatter by simply idly clicking! No worries, antimatter is this planet's currency and energy source, nothing nefarious to see here. The game gives you a single investment industry to kickoff your success in this alien world. As your money grows you can add to your empire by adding more of the same industry or venturing forth and aquiring other more costly industries. The more you buy, the more addictive the game becomes. You will soon find yourself anxious for the timers to countdown, and that's no fun. Never fear! You can also hire managers to look over sectors of your industry. The managers even take care of your industries while you are away. Still too tedious? Avoid stagnation of your empire by investing in upgrades to multiply your industries' production. Your team in *Astral Tycoon* is looking forward to meeting you! Now blast off into the infinite beyond!

## Features

- Simple Auth System
- Buy and Upgrade Businesses
- Make Money While Away
- Hire Managers
- Several Businesses To Choose From


## Tech Stack

I built a full stack solution.

The Tech Stack is:
- NodeJS
- ReactJS
- Redux
- Thunk
- Reselect

The approach was more event-driven than using a game loop.

## Getting Started Guide

To run the app start node first:
```bash
cd server
yarn install
yarn start
```

Then run the client side:
```bash
cd client
yarn install
yarn start
```


## Reasoning behind tech and architectual choices

This architecture prioritizes running mostly on the client with backups to the server. The server is mostly used for database access. The server was intended to keep a backup of the client's state. The client runs most of the processing of events and persists it's state in localstorage. On a timer the client would have sent this saved state to the server. This allows for the user to change devices and keep playing. Unfortunately, this solution also makes it easy for the player to cheat. The player persistence on the server side is saved via username/JWT tokens that require no password.

I chose React for the front-end since that is what framework I am most productive in. I chose to use components over hooks simply for productivity reasons. I could still easily create HOC without hooks. I chose Redux for making it easier to manage a global state. I chose thunk to help create asyncronous actions which in turn allowed me to compose events that created dynamic views. Overall, I chose multiple reducers to help with file sizes and splitting the code into more manageable chunks at the cost of having a bit of code smell. It may have been better off to use a single reducer given the size of the project.

Having the front-end do most of the calculations was to help alleviate potential server costs. I imagined managing multiple timers while having a few hundred thousand users on the system to be costly compared to the end user using their own device for processing. The trade off is lack of protection against hackers. If server cost wasn't a problem or we needed protection I would have kept all the timers server-side and connected the front and back via websockets.

For the backend I used NodeJS, TypeDI for dependecy injection, Winston for the logger, Express for the routing, and NeDB for the in-memory database. I chose them for the purpose of my own efficiency. NeDB has a similar syntax to using Mongoose, unfortunately it doesn't come with modeling the same way Mongoose does. I organized the app in a bulletproof node fashion with API, config, db, loaders, and services grouped together respectively. Using this method makes it extremely easy to extend the API, create new services, and even add models for a proper database. For the authentication of the API, I created a simple JWT checker middleware and plugged it into the appropriate routes. The current build of the game allows you to create new industries, buy upgrades, and hire managers in the database and the user would acquire them immediately.


## Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project.

When I first started building this app, I investigated the implementation details since I have never played this style of game before. So I started with the frontend by mapping out how it would all work. While this is a simple working solution, at first I was planning to go full-on Event Sourcing. I decided that the complexity of that plan would go far beyond the scope and limited time frame of this challenge. Also, building the app this way means there is practically no lag for the player outside of initial loading times. Due to the time constraints, I was not able to: implement a decent UI/UX, fully get rid of server bugs, and utilize the login API for transfering player saved data across accounts. I was also working on a way to implement database versioning so the user would easily get new updates like adding more industries, etc. I initially started out with test driven development. Even though I tested most of the main functionality on the frontend, I regret not continuing it throughout the app due to unfamiliarity with this type of game.

With the knowledge I have now, I wish to have started on the backend with tests. Then I would have made the app fully Event Sourced with domain-driven design where I would move the state from the frontend to the backend as events. This would have allowed React a bit more breathing room and less code smell for creating views. Rather than using a REST API I would have streamed events through a pub/sub using websockets or a service-like Pusher. Then I would have pushed the events to a message bus for services to act upon them. The server would have been used as an API gateway to other microservices where the Commands and Queries would get split using CQRS pattern. I would structure everything using a repository or domain-hex pattern to give separation of concerns and allow better HOF for reusability. In return, this would allow us to write better tests through mocks, closely monitor user actions to prevent cheating, create better logs, and rebuild their entire game play. While the current app is built a bit monolithicly, the Event Source architecture would allow more horizontal scaling. Overall, I think Event Sourcing would have been a better fit for this project given more time to properly plan.

## Link to the hosted application if applicable

