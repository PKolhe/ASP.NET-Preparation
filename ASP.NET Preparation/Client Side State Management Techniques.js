/*

    State Management Techniques - 

    1) Client Side State Management Techniques  
        1) QueryStrings
        2) HiddenFields
        3) ViewState
        4) ControlState
        5) Cookies 

    2) Server Side State Management Techniques 
        1) Application State
        2) Session State
        3) Caching


    1) QueryStrings - 
        
       * Querystrings are nma/value collection pairs.
       * Using querystrings is very common way to send data fron one webform to other webform.
       * Querystring are appended to URL.
       * ? indicates that begining of querystring & its value.
       * It is possible to use more than one querystring, '&' symbol is used to append other querystring in URL.
       * There is limit on querystring length. Hence, Querystring can not used to send long data.

       WebForm1.aspx

            Response.Redirect("~/WebForm2.aspx?UserName="+txtUser.Text"&Email="+txtEmail.Text");

       WebForm2.aspx
            
            lblUserName.Text = Request.QueryString["UserName"];
            lblEmail.Text = Request.QueryString["Email"];
        
       * QueryStrings are visible to user, so can not used to send sensitive information unless encrypted.
       * To Read QueryString value, we use Request objects QueryString Property.
       * '&' is used to concatenate QueryString, so if we want to send '&' as value for QueryString. 
          There are 2 ways - 
            1)Response.Redirect("~/WebForm2.aspx?UserName="+Server.UrlEncode(txtUSer.Text)+"&Email="+Server.UrlEncode(txtEmail.Text)");
            2)Response.Redirect("~/WebForm2.aspx?UserName="+txtUser.Text.Replace("&", '%26")+"&Email="+txtEmail.Text.Replace("&", '%26")");

    2) HiddenFields 

       * The HiddenField control is used to store a value that needs to persisted across posts to the server 
         but we do not want the control or its value visible to user.
         Ex. When editing or updating employee record, we do not want the user to see employee id. 
             So we will store employee id in hiddenfields, so that it can be used at server to update employee record.
       * Value property of HiddenField is used to get or set the value.
       * The value is stored as string.
       * ViewState uses HiddenField to maintain state across postback.
       * HiddenField is rendered as an ,<input type="hidden"/> element.

       Ex. <asp:HiddenField ID="HiddenField1" runat="server"/>
           HiddenField1.Value = 202.ToString();
           string empID = HiddenField.Value;

       Alternatives for HiddenField 
       
       * ViewState, QueryString, SessionState and Cookies
       * SessionState & Cookies are available for other pages as well untill their timeout reaches.
       * ViewState & HiddenFields data is available only on that page & data is lost when 
         we navigate away from the page.

       Advantages of HiddenField 
            1. HiddenField data is lost when we navigate away from the page. 
               Does not require any explicit clean up task.
            2. HiddenFields are accessible to client side scripts.
               <script type="text/javascript">
                function() {
                    alert(document.getElementById("HiddenField1").Value);
                }
               </script>
       
       Disadvantages of HiddenField 
            1. HiddenField data can be seen, by viewing the page source.
               Never use HiddenField to share confidential data.

    3) ViewState
        
       * Web Application works on http stateless protocol. Http protocol does not maaintain states between 
         user requests.
       * ViewState variable maintains state on a single page.
       * The ViewState data, travels with every request & response between client & webserver.
       * Without using ViewState if we use ASP.NET controls, these are server control which uses 
         viewstate internally to preserve data across postbacks.

                 Ex. int clickCount =1;
                 Page_load() {

                    if(!IsPostBack)  {
                        TextBox1.Text = "0";
                    }
                 }

                 Button_Click() {

                    if(ViewState["Clicks"] != null) {
                        clickCount = (int) ViewState["Clicks"] + 1;
                    }
                    TextBox1.Text = clickCount.ToString();
                    ViewState["Clicks"] = clickCount;
                 }
       * Because WebForms have short lifetimes, ASP.NET takes special steps to preseve the data entered in the 
         controls webForm.
            1)Data entered in control is sent with each request & restored to controls in Page_init() event.
            2) The data in these controls is then available in Page_Load(), Button_Click() 
               & inside many more events which occur after Page_init() event.

        * ViewState data is serialised into a Base64 encoded strings, and is stored in Hidden input Fields. 
          In View Source we can see -
          <input type="hidden" name="__VIEWSTATE" ID="__VIEWSTATE" value="/ab547hjfhfdgbnmfdgdf843nbgdgf"/>
    
    4) Control State 

        * ControlState is introduced in ASP.NET 2.0 which is similar to ViewState but functionally independent 
          of ViewState.
        * A Page developer can disable viewstate for page or for an individual control for performance.
          However, Contro;State can not be disabled.
        * Controlstate is designed for storing a controls essential data( such as Page controls Page no.) 
          that must be vailable on postback to enable the control to function even when ViewState has been disabled.
        * Bydefault ASP.NET page framework stores control state in the page in the same hidden element in which it 
          stores a view state.
        * Even when viewstate is disabled or when state is managed using session, Control State travels 
          to the client and back to the sever in the page.
        * On Postback ASP.NET deserialises the contents of hidden element and loads control state into each 
          control that is registered for control state.
        * ControlState is useful only for small amount of critical data that are essential for the 
          control across postbacks. Don't use ControlState as an alternative to ViewState.

    5) Cookies

        * Cookies stored small amount of information on the clients machine. 
          In General, Websites uses cookies to store user preferences or other information that is 
          client specific.
        * Useful to send data from one webform to another.

        WebForm1.aspx
            
                btn_click() {

                    HttpCookie cookie = new HttpCookie("userinfo");
                    cookie["Name"] = textName.Text;
                    cookie["Email"] = textEmail.Text;

                    // If we set, it is Persistent cookies Otherwise it is Non-Persistent cookies.
                    cookie.Expires = DateTime.Now.AddDays(30);  // Cookie will expire in 30 days.

                    Response.Cookies.Add(cookie);
                    Response.Redirect("WebForm2.aspx");

                }
        WebForm2.aspx

            Page_Load(...) {

                HttpCookie cookie = Request.Cookies["userinfo"];
                if(cookie != null) {
                    lblName.Text = cookie["Name"];
                    lblEmail.Text = cookie["Email"];
                }
            }

        There are 2 types of Cookies -
            
            1) Persistent Cookies - Remain on the client computer, even after the browser is closed. 
                                    We can configure how long the cookies remain using the expires property 
                                    of the HttpCookie object.
            2) Non-Persistent Cookies - If we do not set Expires property, then the cookies are called as Non-Persistent cookies.
                                        Non-Persistent cookies only remain in memory until the browser is closed.

        How to detect if Cookies are enabled or disabled in clients machine ?

            Most of the articles on internet, states that we can use Request.Browser.Cookies property to check,
            if the cookies are enabled or disabled. This is incorrect.

            Incorrect 
                if(Request.Browser.Cookies) {
                    // Cookies are Enabled
                }
                else {
                    //Cookies are Disabled
                }

            Correct
                if(Request.Browser.Cookies) {
                    // Browser Supports Cookies
                }
                else {
                    // Browser does not Supports Cookies
                }

        How to check if cookies are enabled or disabled ?

                Page_Load() {

                    if(!IsPostBack) {

                        if(Request.Browser.Cookies) {
                    
                            if(Request.QueryString["CheckCookie"] == null) {
                                HttpCookie cookie = new HttpCookie("test Cookie", "1");
                                Response.Cookies.Add(Cookie);
                                Response.Redirect("WebForm1.aspx?CheckCookie=1");
                            }
                            else {
                                HttpCookie cookie = Request.Cookies["TestCookies"];
                                if(cookie == null) 
                                    lblMsg.Text = "Cookies are disabled";
                            }
                        }
                        else
                            lblMsg.Text = "Browser does not supoprt cookies";
                    }
                }
        





*/