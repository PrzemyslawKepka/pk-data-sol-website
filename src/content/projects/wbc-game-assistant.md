---
title: "WBC Game Assistant"
description: "An interactive Streamlit app, aimed as a helper tool for playing a computer game."
categories: ["Web Application"]
technologies: ["Python", "Streamlit", "pandas", "Pillow", "HTML/CSS"]
github: "https://github.com/PrzemyslawKepka/wbc-game-assistant"
liveUrl: "https://wbc-game-assistant.onrender.com/"
image: "/images/projects/wbc-game-assistant/wbc-game-assistant-cover.png"
projectType: "side"
year: "2022"
industry: "Gaming"
lang: "en"
---

## Context

When I have briefly returned to play my childhood's favourite computer game, Warlords Battlecry, I have realized that the game is actually pretty complicated.

Many races, many units with different abilities, types of damage and resistance, it's just hard to grasp it all. And when you play in a multiplayer mode, with other people, it is reasonable to try to at least not be very terrible at playing the game, so your teammates cannot blame you all the time if the enemy team wins.

## Solution

So I've decided to help myself (and other players as well).

I built an interactive app, which in a highly visual way helps you pick up a strategy for the game.

### Core Features

- In the game you can play one of 16 races, so in the app you select your race and up to 5 enemy races
- Each race produce many different units, and these units are then displayed in the app with their images and statistics
- And every unit deals damage to other units, while at the same time there are different types of damage, and also each unit might be resistant or vulnarable to specific type of damage. So the core functionality of the app is to show matchups, which units might counter another, effectively helping you in forging your strategy for the game.

### Technical Implementation

- Pandas for wrangling data
- Streamlit for the main layout
- Extra HTML, embedded in Streamlit, to create visually appealing unit cards (and circumvent some of the Streamlit limitations on nested columns)

### Reception

I have shared the app with one of the active communities on Discord, and it got some positive feedback, with users claiming that the app is indeed useful (but as far as I'm aware it was not permanently adopted, as the community is rather small and very devoted, playing the game for many years, and knowing all the intricacies inside and out without any extra tools 😅).

## Real-world application

So what we basically do in this app is:
- We take source tabular data, load in it pandas, and there we perform standard data manipulation operations like filtering or sorting
- Then we display this data in a Streamlit app, where we use simple interface elements like checkboxes or filters
- And we want the app to look not so bad either, so we use some images and emoticons as well, trying to end up with reasonably pleasant layout, while at the same time acknowledging Streamlit limitations

So combining this with a rapid development, we get pretty standard use case for a Streamlit app. Only in this case our data comes from a computer game, but we swap with any business data and we're still ending up with a similar app, using exactly the same techniques and priciples. 

## Professional Takeaways

- So this project has helped me strengthen my Pandas and Streamlit skills, so that I can not only create functional apps, but at the same time I can make them visually appealing
- Doing this project was also pivotal for me in defining my internal tech stack, particularly to understand when Streamlit is a good fit. Personally I find this almost a textbook example of the framework utilization - the app is rather simple, but focused on data, so we're playing with the library's strength. We sprinkle a little bit of custom HTML code to make the app visually appealing, but we're not fighting against the framework, it's not an attempt to do more than it's capable of, but rather a reasonable extension. And at the same time we do not need much session state, and retaining the app state is usually the biggest pain in Streamlit, so here we avoid it at all, making the app fully functional, visually pleasant, but not too convoluted in terms of the code and its logic, making a perfect fit altogether.
