/*
    Page Navigation Techniques

    1) HyperLink Control:

        The HyperLink control creates links on a web page that allow users to move from page to page in 
        your application. The HyperLink control can display clickable text or an image. 
        Unlike most ASP.NET controls, the HyperLink control does not raise an event in server code 
        when users click it. Instead, the control simply performs navigation.
        
        Text - text 
        CssClass - styles of control
        NavigateUrl - Specifies the URL of the page to which you want to link.
        Target - Indicates the ID of a target window or frame in which to display the linked page. 

    2) Response.Redirect(): 
    
            ~\ASP.NET Preparation\ASP.NET Preparation\Response.Redirect Vs Server.Transfer.PNG
        
        Hyperlink control does not execute server side events, so when we want click event in code then 
        we need to use LinkButton, Button, ImageButton etc server controls, and then we can write Click 
        event of these control. In this click event we can call response.Redirect() to execute server side 
        request.

        1) When user clicks on button, webserver receives a request for redirection.
            Client => Redirection Postback Request => Web Sever 

        2) A Server then sends Response Header to Client.
            Server => Response Header => Client 
        
        3) Client then automatically issues a GET request to the server.
            Client => GET Request for new page => Web Sever 

        4) Then server serves the new page.
            Server => Web Server Response(new page) => Client

        Important Notes - 
        
        1) Response. redirect() can be used to navigate pages/websites on the same web server 
           OR on different Web server.
        2) Browser remembers the history.
        3) We can pass parameters from one page to other page using querystring.
        
        It has 2 overloaded methods - Response.Redirect(string URL), 
                                      Response.Redirect(string URL, bool endResponse)
                                      endResponse - Whetherexecution os current page should terminate or not.

    3) Server.Transfer 
        
        ~\ASP.NET Preparation\ASP.NET Preparation\Response.Redirect Vs Server.Transfer.PNG

        This method is used to transfer user(client) from one page to another page but on the same server.

        It has 3 overloaded methods - Server.Transfer(string path), 
                                      Server.Transfer(string path, bool preserveChanges)
                                      Server.Transfer(IHttpHandler, bool preserveChanges)
                                      preserveChanges - preserves querystring & form Collection if set to true. Default true
        WebForm1.aspx

        server.Transfer("~/WebForm2.aspx");
        server.Transfer("~/WebForm2.aspx", false);

        WebForm2.aspx ( There are 2 ways to get values of previous page on new page)

            1) NameValueCollection nameVal = Request.Form;
               lblText.text = nameVal["txtname"];
               lblEmail.text = nameVal["txtEmail"];

            2) Page previousPage = Page.PreviousPage;
                if(previousPage != null) {
                    lblName.text = [(TextBox)previousPage.FindControls("txtName")].text;
                }

        Server.Transfer Vs Response.Redirect

        1) Response.Redirect() - can be used to navigate pages/websites on the same web server 
                                 OR on different Web server.
           Server.Transfer() - method is used to transfer user(client) from one page to another page but on the same server.
        
        2) Response.Redirect() - Changes URL in Address Bar.
           Server.Transfer() -  Do not change URL in address bar.

        3) Response.Redirect() - Slower than server.Transfer as redirection involves 2 requests.
           Server.Transfer() -  Faster as it involves 1 requests resposne cycle.
        
        4) Response.Redirect() - Form Variables can not be preserved but we can pass data using querystring from 
                                 one page to other page.
           Server.Transfer() -  Form Variables can be preserved using preserveChanges Parameter.

    4) Server.Execute() 

            This method is similar to server.Transfer method.
            Server.Transfer terminates execution of current page & starts the execution of new page WhereAs
            Server.Execute process the second web Form without leaving the first Web Form. 
            After execution of first web form control returns to the second web form.

    5) Coss Page PostBack - 
            
           1) Cross page posting allows to post one page to another page. ByDeafult, When we click a button 
              the webform posts itself. If we want to post another webform on button click, 
              set the PostBackURL()of the button to the page that you want to post to.
           2) Page.ISCrossPagePostBack property is used to indicate whether the page is involved in 
              a cross page postback.
           3) The problem with FindControl() method is that if we mis spell control Id we could get a 
              runtime NullReference Exceetion. 

            WebForm1.aspx

                PostBsackUrl(...);

            WebForm2.aspx
                Page previousPage = Page.PreviousPage;
                if(previousPage != null && previousPage.IsCrossPagePostback) {
                    lblName.text = (TextBox)previousPage.FindControls("txtName");
                }

            To Avoid NullReferenceException in FindControl() method
            1) Create Public Read Only properties.
            2) Obtain a Strongly type reference to the previous page which can avoid NullReference Exception.

            Ex. WebForm2.aspx
                Page previousPage = (WebForm1)this.PreviousPage;
                if(previousPage != null && previousPage.IsCrossPagePostback) {
                    lblName.text = previousPage.Name;   // Read Only public property.
                }

                To avoid casting and provide strongly typed reference - 
                In WebForm2.aspx, We can add <% @PreviousPageType VirtualPath="~/WebForm1.aspx" %>
                Now we do not need casting here - Page previousPage = this.PreviousPage;

        6) window.open()
            To open new window using Javascript code.

            window.open(url, name, feature, replace)
*/