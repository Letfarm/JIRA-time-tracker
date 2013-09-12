// ==UserScript==
// @name       JIRA time tracker
// @version    1
// @description  Adds time tracking buttons to the JIRA interface
// @match      https://letfarm.atlassian.net/*
// ==/UserScript==

jQuery(function($){
	var issue = $('#key-val').text();
	var build_time_string = function() {
		var time_string = '';
		if(localStorage[issue]){
			var diff = Math.floor(Math.abs(new Date() - new Date(localStorage[issue])) / 1000);
			var hours = Math.floor(diff / 3600);
			diff -= hours*3600;
			var minutes = Math.ceil(diff / 60);
			time_string = (hours ? hours+'h ' : '') + (minutes ? minutes+'m' : '');
		}
		return time_string;		
	};

	var update_timer = function() {
		if(localStorage[issue]){
			$('#running-time').text(build_time_string());
			setTimeout(update_timer, 1000);
		}
	};

	var on_log_work_time_logged = function(callback) {
		if($('#log-work-time-logged').length) {
			callback();
		} else {
			setTimeout(function(){on_log_work_time_logged(callback);}, 50);
		}
	};

	var add_log_button = function() {
		$('#opsbar-time-tracking').append('<li class="toolbar-item"><a id="tracking-time" href="javascript:void(0)" class="toolbar-trigger"><span class="trigger-label">Log <span id="running-time"></span> work</span></a></li>');
		$('#tracking-time').on('click',function() {
			var time_string = build_time_string();
			localStorage.removeItem(issue);
			$('#tracking-time').parent().remove();
			add_start_button();
			$('#log-work').click();
			on_log_work_time_logged(function(){
				$('#log-work-time-logged').val(time_string);
			});

		});
		update_timer();
	};

	var add_start_button = function() {
		$('#opsbar-time-tracking').append('<li class="toolbar-item"><a id="start-time-tracker" href="javascript:void(0)" class="toolbar-trigger"><span class="trigger-label">Start time tracker</span></a></li>');
		$('#start-time-tracker').on('click', function() {
			localStorage[issue] = new Date();
			$('#start-time-tracker').parent().remove();
			add_log_button();
		});
	};

	$('.command-bar .toolbar-split-left').append('<ul id="opsbar-time-tracking" class="toolbar-group pluggable-ops"></ul>');
	if (localStorage[issue]) {
		add_log_button();
	} else {
		add_start_button();
	}
});
