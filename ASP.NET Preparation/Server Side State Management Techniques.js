/*
    Application State 
        
       * Application state variables are avialable across all pages & across all sessions. 
         Application State variables are like multi user global data. 
       * Application State variables are stored on Web Server.
       * Application State Variables are cleared, Only when the process hosting the application is restarted, 
         that is when application ends.
       * Application state variables are not shared across a web farm or a web Garden. 
       * Application State variables are not threadsafe, Lock & Unlock  methods of the application class 
         must be used to protect against the race conditions of deadlocks & access violations.
            Ex.     Application.Lock();
                    Application["GloablVariable"] = (int) Application["GloablVAriable"] + 1;
                    Application.UnLock();
        Note : Here, we are using Application State Variables to send data from one web form to another.
               So, if we need to transfer data from one webform to another we can use other aletrnatives.

       * Use Application State Variables only when the variables needs to hae global access and when you 
         need them for entire time. During Lifetime of an application, Cache Object can be used 
         as an alternative, if we need to have gloabl access for certain duration.

        Practice Real Example for Applicatioon state.

    Session State

       * Session Variables are also used to send data from one webform to another webform
       
            WebForm1.aspx
                Session["Name"] = txtName.Text;
                Session["Email"] = txtEmail.Text;
                Response.Redirect("~/WebForm2.aspx");
            
            WebForm2.aspx
                lblName.Text = Session["Name"];
                lblEmail.Text = Session["Email"];
       * Session variables can store any type of data, complex data as well so it's return type is object.
       * Session State variables are stored on the server by deafult & are stored for the lifetime of session.
            Ex. In Web.config  
                <SessionState mode="InProc" timeout="20"/>
       * The default sessionState mode is InProc.
       * Lifetime of Session is determined by timeout variable value in web.config file, default is 20 minutes.
       * Session State variables arevailble across all pages, but only for a given single session. 
         Session variables are like single user global data.
       * It is always good practice to check session state variable is null before calling any of its methods
         such as ToString() otherwise it throws NullReferenceException.
         Ex.    if(Session["Name"] != null) {
                    lblName.Text = Session["Name"].ToString();
                }

       * Application performance can be improved by disabling session state, because Session state variables 
         consumed web sever memory.
       * Session State variables can be disabled at page or application.
         To Turn Off Session on Page Level. 
            Set EnableSessionState = "False" in page directive.
         To Turn OFf Session on Application Level 
            Set SessionMode = "OFF"; in Web.config file.

    Cookieless Sessions in ASP.NET:








*/