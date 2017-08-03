/*
	Events 
         In a Web Application, Events can occure at 3 levels .
            1) At Application Level ( Ex. Session_start event in Global.asax)
            2) At Page or WebForm Level ( Ex. Page_Load Event of Page)
            3) At Control Level( Ex. SelectedIndexChanged event of dropdownlist control)

        Web Application works on stateless protocol. Every time a request is made for a webform, 
        the following sequenece of events occur.

            1) Web Application creates an instance of the requested web form.
            2) PRocesses the events of Web Form.
            3) GEnerates the HTML & send the HTML back to the requested client.
            4) The Web Form gets destroyed and removed from the memory.




*/