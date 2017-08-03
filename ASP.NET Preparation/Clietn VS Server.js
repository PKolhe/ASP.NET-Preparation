/*

    Web Server - It is a software which runs as a service under OS. & which is responsible to take requests 
                 in the form of HTTP. Web server contains one OR more websites.
                 To create Websites, we need Web Server.
                 Example - IIS , Apache etc..

    HTTP : HTTP is the specification defined by w3 org which all users should follow on Web.
           HTTP is the communication protocal for web applications.

           URL = http://localhost:9000/SimpleTRaining/demo.aspx
           http- protocol
           localhost- local system
           9000 - Server address
           SimpleTraaining - Website name
           demo.aspx - program name or resource
           www - network

=========================================================================================================

    Client-Server Request-Response Travelling

    Client => Request for .aspx page => IIS Server ( Takes request and send that .aspx page to ASPX Engine, 
    ASPX Engine Executes this page & send RESPONSE back to Client). => Client

    How server identifies that program is server side or Client Side and also its relevant runtime ?

    => Based on Page Extention. For every extention there is a program called http handler in web server, 
    which will route the program to its relevant runtime.

    Rendering - The process of converting asp.net states into browser understandable format or html format 
    is called as Rendering.

    Every Web Application is state less application. => Stateless means It is an application when 
    every request is treated as new request then application is called as Stateless.
    This Stateful behavior can be provided by Code.

    Server-Side Code
        * Languages/frameworks include but are not limited to Ruby (Rails), Javascript (Node.js), 
          Python (Django), PHP, C#, and Java; but the list of possibilities is infinite. Any code that can run 
          on a computer and respond to HTTP requests can run a server.
        * Stores persistent data (user profiles, instatweets, mybook pages, etc.).
        * Cannot be seen by the user (unless something is terribly wrong).
        * Can only respond to HTTP requests for a particular URL, not any kind of user input.
        * Creates the page that the user finally sees (this is generally only true in web applications that 
          choose to render most of their layouts on the server).

    Client-Side Code
        * Languages used include: HTML, CSS, and Javascript. Nothing else. But don’t worry, there’s a million 
          frameworks and transpiles-to-[CSS|HTML|JS] languages to choose from (and keep yourself updated on) 
          anyway.
        * Parsed by the user’s browser.
        * Reacts to user input.
        * Can be seen and edited by the user in full.
        * Cannot store anything that lasts beyond a page refresh.
        * Cannot read files off of a server directly, must communicate via HTTP requests.
        * Creates the page that the user finally sees (this is generally only true in single page applications).

    2 Tier Architecture - 
        ~\ASP.NET Preparation\ASP.NET Preparation\2layer.jpg

    3 Tier Architecture
        ~\ASP.NET Preparation\ASP.NET Preparation\3 tier architecture.jpg

*/