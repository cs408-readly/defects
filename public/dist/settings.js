riot.tag2('settings', '<h1>Settings</h1> First name: <input type="text" id="first" riot-value="{this.opts.user.local.firstName}"><br> Last name: <input type="text" id="last" riot-value="{this.opts.user.local.lastName}"><br> email: <input type="text" id="email" riot-value="{this.opts.user.local.email}"><br> Password: <input type="password" id="password"><br> <button id="submit" type="button" onclick="{submit}">Submit changes</button>', 'settings input[type=text],[data-is="settings"] input[type=text],settings select,[data-is="settings"] select{ width: 80%; padding: 12px 20px; margin: 8px 0; display: inline-block; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; } settings input[type=password],[data-is="settings"] input[type=password],settings select,[data-is="settings"] select{ width: 80%; padding: 12px 20px; margin: 8px 0; display: inline-block; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }', '', function(opts) {
    this.submit = function() {
        console.log("submit pressed");

        var first = document.getElementById("first").value;
        var last = document.getElementById("last").value;
        var email = document.getElementById("email").value;
        var pass = document.getElementById("password").value;

        var newUser = {
            firstName: first,
            lastName: last,
            email: email,
            password: pass
        }

        var user = this.opts.user

        var oldUser = JSON.stringify(user);
        var newUserString = JSON.stringify(newUser);
        if(oldUser === newUserString) {
            console.log("no changes have been made");
        }
        else {

            var x = new XMLHttpRequest()

            x.open('POST', '/settings', true);
            x.setRequestHeader("Content-Type", "application/json");
            x.send(JSON.stringify({ user: newUser }));
            window.location.href = '/';
        }
    }.bind(this)
});
