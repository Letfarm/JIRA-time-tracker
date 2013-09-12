// ==UserScript==
// @name       JIRA time tracker
// @version    2
// @description  Adds time tracking buttons to the JIRA interface
// @match      https://letfarm.atlassian.net/*
// @downloadURL  https://raw.github.com/Letfarm/JIRA-time-tracker/master/tracker.js
// @updateURL  https://raw.github.com/Letfarm/JIRA-time-tracker/master/tracker.js
// ==/UserScript==

function workLog($) {
	this.issue = null;
	this.url = '';
	this.interval = null;
	
	function build_time_string() {
		var time_string = '';
		if(localStorage[this.issue]){
			var diff = Math.floor(Math.abs(new Date() - new Date(localStorage[issue])) / 1000);
			var hours = Math.floor(diff / 3600);
			diff -= hours*3600;
			var minutes = Math.ceil(diff / 60);
			time_string = (hours ? hours+'h ' : '') + (minutes ? minutes+'m' : '');
		}
		return time_string;		
	}

	function update_timer() {
		if(localStorage[this.issue]){
			$('#running-time').text(this.build_time_string());
			setTimeout(this.update_timer, 1000);
		}
	}

	function on_log_work_time_logged(callback) {
		if($('#log-work-time-logged').length) {
			callback();
		} else {
			setTimeout(function(){workLog.on_log_work_time_logged(callback);}, 50);
		}
	}

	function add_log_button() {
		$('#opsbar-time-tracking').append('<li class="toolbar-item"><a id="tracking-time" href="javascript:void(0)" class="toolbar-trigger"><span class="trigger-label">Log <span id="running-time"></span> work</span></a></li>');
		$('#tracking-time').on('click',function() {
			var time_string = this.build_time_string();
			localStorage.removeItem(this.issue);
			$('#tracking-time').parent().remove();
			this.add_start_button();
			$('#log-work').click();
			this.on_log_work_time_logged(function(){
				$('#log-work-time-logged').val(time_string);
			});

		});
		this.update_timer();
	}

	function add_start_button() {
		$('#opsbar-time-tracking').append('<li class="toolbar-item"><a id="start-time-tracker" href="javascript:void(0)" class="toolbar-trigger"><span class="trigger-label">Start time tracker</span></a></li>');
		$('#start-time-tracker').on('click', function() {
			localStorage[this.issue] = new Date();
			$('#start-time-tracker').parent().remove();
			this.add_log_button();
		});
	}

	function activate() {
        console.log('activating');
		if ($('#key-val').length && $('.command-bar .toolbar-split-left').length) {
			this.issue = $('#key-val').text();
			$('.command-bar .toolbar-split-left').append('<ul id="opsbar-time-tracking" class="toolbar-group pluggable-ops"></ul>');
			if (localStorage[this.issue]) {
				this.add_log_button();
			} else {
				this.add_start_button();
			}
		}
	}

	function on_url_change() {
		//Check for URL changes
		if (this.url != location.href) {
console.log('url changed');
            this.url = location.href;
			this.activate();
		}
	}

	function init() {
        console.log('init');
		this.interval = setInterval(this.on_url_change, 50);
	}

	this.init = init;
}

jQuery(function($){
	var log = new workLog($);
	log.init();
});
