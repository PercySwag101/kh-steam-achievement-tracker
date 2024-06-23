# Kingdom Hearts Steam Achievement Tracker
A tool made with SvelteKit to make it slightly less of a headache to figure out which achievements you actually have for each game.

If you're also sick of the lists featuring 100s of achievements from different games then this tool might work for you.

The code here isn't particularily pretty, so you have been warned.

If I find that people actually use this tool then I'll look into styling it a bit better, providing better error-handling, adding filters, and other things the community might want a tool like this to have.

## Notes
In order to actually get this to run locally you'll need a Steam API key. [Get one here if you don't have one](https://steamcommunity.com/dev). Then follow the `.env.example` file and create a `.env`-file with your API key and you should be gold.


## Known issues
- Some achievements don't have their descriptions. I haven't really looked into it further than that for some reason the Steam API just isn't giving me them.