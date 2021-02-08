import os 
import sys
import discord 
import json
import asyncio
import unittest
from discord.ext import commands
from os.path import isfile
import re
import platform
import Tio
from io import BytesIO
import urllib.parse

with open('C:/Users/epicb/Desktop/Socket/global-settings.json') as settings: 
    data = json.load(settings)


bot = commands.Bot(command_prefix=">")

bot.remove_command('help')
    

@bot.command(name="exec", description="Execute code from many different languages using tio.run", aliases=['run', 'eval', 'execute', 'evaluate'])
async def exec(ctx, language, *, code):
        
    
    quickmap = {
    'asm': 'assembly',
    'c#': 'cs',
    'c++': 'cpp',
    'csharp': 'cs',
    'f#': 'fs',
    'fsharp': 'fs',
    'js': 'javascript',
    'nimrod': 'nim',
    'py': 'python',
    'q#': 'qs',
    'rs': 'rust',
    'sh': 'bash',
    }
    text = code
    start = "None"
    end = "None"
    
    
    if ctx.message.attachments:
        file = ctx.message.attachments[0]
        if file.size > 20000:
            return await ctx.send("⚠️ **The file you provided was too large for us to handle!**")
        buffer = BytesIO()
        await ctx.message.attachments[0].save(buffer)
        text = buffer.read().decode('utf-8')
    elif code.strip('`'):
        text = code.strip('`')
        firstLine = text.splitlines()[0]
        if re.fullmatch(r'( |[0-9A-z]*)\b', firstLine):
            text = text[len(firstLine)+1:]
            
        if text is None:
            return await ctx.send('🛑 **You did not provide any code to execute, please be aware the code must be in code blocks.**')  
        
    
    if language in quickmap: 
        language = quickmap[language]      
    
    site = Tio.Tio()
    request = site.new_request(language, text)
    result = site.send(request)
    
    if "could not be found on the server." in result:
        return await ctx.channel.send("🛑 **That language was not found, try >help exec languages**")
    

    
    if len(result) > 1992 or result.count('\n') > 40:
        link = await paste(result)
        
        if link is None:
            return await ctx.send("⚠️ **The console output was too long and the system failed to create a paste of it, please retry with a shorter output.**")
        return await ctx.send(f"✅ **The console output was too long, don't worry, a paste was created for you here: {link}**")
    
    zero = '\N{zero width space}'
    result = re.sub('```', f'{zero}`{zero}`{zero}`{zero}', result)
    embedVar = discord.Embed(title=f"Tio.run Execution ({language})", description=f"```{result}```", color=discord.Color(0x1055d3))
    return await ctx.channel.send(embed=embedVar)
    

#Token fetched from token.json, in turn also used for JS client, js uses the json object when intializing config
bot.run(data["token"]) 


def get_raw(link):
    """Returns the url for raw version on a hastebin-like"""

    link = link.strip('<>/') # Allow for no-embed links

    authorized = (
        'https://hastebin.com',
        'https://gist.github.com',
        'https://gist.githubusercontent.com'
    )

    if not any([link.startswith(url) for url in authorized]):
        raise commands.BadArgument(message=f"I only accept links from {', '.join(authorized)}. (Starting with 'http').")

    domain = link.split('/')[2]

    if domain == 'hastebin.com':
        if '/raw/' in link:
            return link
        token = link.split('/')[-1]
        if '.' in token:
            token = token[:token.rfind('.')] # removes extension
        return f'https://hastebin.com/raw/{token}'
    else:
        # Github uses redirection so raw -> usercontent and no raw -> normal
        # We still need to ensure we get a raw version after this potential redirection
        if '/raw' in link:
            return link
        return link + '/raw'

async def paste(text):
    """Return an online bin of given text"""

    async with aiohttp.ClientSession() as aioclient:
        post = await aioclient.post('https://hastebin.com/documents', data=text)
        if post.status == 200:
            response = await post.text()
            return f'https://hastebin.com/{response[8:-2]}'

        # Rollback bin
        post = await aioclient.post("https://bin.drlazor.be", data={'val':text})
        if post.status == 200:
            return post.url
