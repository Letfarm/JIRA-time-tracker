JIRA-time-tracker
=================

Letfarms JIRA time tracking

A script file used for adding time tracking buttons to the JIRA interface.

If you already have a version of this script set up, delete that, before setting up this one.

Installing in Chrome
---------------
To use this in Chrome, install Tampermonkey, add a new 'user script', copy the following into the editor, and save:

// ==UserScript==  
// @name       JIRA time tracker  
// @version    0.1  
// @description  Adds time tracking buttons to the JIRA interface  
// @match      https://letfarm.atlassian.net/*  
// @downloadURL  https://raw.github.com/Letfarm/JIRA-time-tracker/master/tracker.js  
// @updateURL  https://raw.github.com/Letfarm/JIRA-time-tracker/master/tracker.js  
// ==/UserScript==

Then go to TamperMonkeys dashbord, and trigger an update of the script 'JIRA time tracker'. Version should now change from 0.1 to whatever the latest version is, and your script should be up and running.

Installing in Firefox
----------------
In FireFox, GreaseMonkey should do the trick, though this hasn't been tested in GreaseMonkey.

Using
-----
Now you should be able to see a new 'Start tracking' button on the issue pages. If the button is not there, try to refresh the screen (this will hopefully be fixed in a later version)
