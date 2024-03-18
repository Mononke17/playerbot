# playerbot
A Nodejs-Server that provides Info about the players in a lolpro-players game.

Playerbot does not come with a ready-to-use database for looking up playeraccounts, so you need to make one after installation.


## Usage
1. make sure the dependencies ```typescript``` and ```nodejs``` are installed.
2. Clone this repo:```git clone https://github.com/Mononke17/playerbot```.
3. in the directory run: ```tsc``` to transpile it into valid javascript.
4. Insert your [Riot-Api-Key](https://developer.riotgames.com/) into **config.json** and change the other values to your liking.
5. Now generate a database. (You can skip the steps 6-8 if you already have one)
6. Go to [lolpros.gg/ladders](https://lolpros.gg/ladders). and scroll all the way to the bottom.
7. then save the website as a textfile in the playerbot directory, using your webbrowsers' menu or the common shortcut "control + s".
8. Run ```node index.js S filename``` and replace filename wth the path to the just-saved file. (this may take a several hours).
9. Run the server using ```node index.js```.
10. send a request to localhost:{configured port}/players and receive information.
  
