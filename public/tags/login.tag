<login id="login">
    <!-- LOGIN FORM -->
    Login
    <br>
    <form action="/login" method="post" id="login">
        <div class="form-group">
            <input placeholder="Email" type="text" name="email">
        </div>
        <div class="form-group">
            <input placeholder="Password" type="password" name="password">
        </div>

        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
  Login
</button>
    </form>
    <style type="text/css">
        .form-group {
            padding: 2px;
        }
    </style>
</login>

<signup id="sign">
<!-- LOGIN FORM -->
    Sign Up
    <br>
    <form action="/signup" method="post" if={!social}>

        <div class="form-group">
            <input type="text" placeholder="First Name" class="form-control" name="firstName">
        </div>
        <div class="form-group">
            <input type="text" placeholder="Last Name" class="form-control" name="lastName">
        </div>
        <div class="form-group">
            <input type="text" placeholder="Email" name="email">
        </div>
        <div class="form-group">
            <input type="password" placeholder="Password" name="password">
        </div>

        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
  SignUp
</button>

    </form>

    <div id="social" if={social}>
        test social
    </div>
    
    this.social = false;
    <style type="text/css">
        .form-group {
            padding: 2px;
        }
    </style>
</signup>

<auth id="auth">
    <div id="container">
        <div id="card">
            <signup class="flexitem"></signup>
            <login class = "flexitem"></login>
        </div>

        <a id ="facebook" href="/auth/facebook"> Login with Facebook </a>
    </div>
    <style type="text/css">
        #container {
            text-align: center;
        }
        #card {
            margin-right: auto;
            margin-left: auto;
            margin-top: 150px;
            width: 50%;
            background-color: white;
            color: black;
            resize: both;
            overflow: auto;
            display: flex;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 20px;
            padding-right: 20px;
            text-align: center;
            border: 1px solid #f1eff4;
            border-radius: 5px;
            margin-bottom: 50px;
        }
        #facebook {
            background-color: #3b5998;
            padding: 10px 6px;
            font-size: 16px;
            color: white;
            text-decoration: none;
        }
        input {
            width: 70%;
            padding: 12px 20px;
            margin: 8px 0;
            border: none;
            border-radius: 4px;
            background-color: #e1e5ed;
        }
        .flexitem {
            width: 100%;

        }
    </style>
</auth>