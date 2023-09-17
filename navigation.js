let lastclick;
$(document).ready( function(){
	lastclick = $('#timeleft').attr('f')*1000 > +new Date() ? 99999999999999 : +new Date();
	// console.log( lastclick );
	var divmodal = document.getElementById('divmodal');
	window.onclick = function(event) {
		if (event.target == divmodal) {
			divmodal.style.display = "none";
		}
		lastclick = $('#timeleft').attr('f')*1000 > +new Date() ? 99999999999999 : +new Date();
	}

	let vtimeleft = Number($('#timeleft').attr('v'));

	$('#timeexpire').html( '<br>' + formatDate(new Date( Number(getCookie('t2')) * 1000 )) );
	if( Number(getCookie('t2')) * 1000 < +new Date() ) $('#timeexpire').addClass('w3-text-red');
	$('#timeleft').text( toHHMMSS(vtimeleft) );

	setCookie('t3',0,24*30);
	let t3 = getCookie('t3');
	if( $('title').text() != 'Scan page' && getCookie('t2') != 99999999999 ){
		setInterval( function(){
			if( getCookie('t2') * 1000 < +new Date() && vtimeleft > 0 ){
				t3 = getCookie('t3');
				t3++;
				vtimeleft = getCookie('t1');
				vtimeleft -= 1;
				
				$('#timeleft').attr( 'v' , vtimeleft );
				$('#timeleft').text( toHHMMSS(vtimeleft) );

				setCookie('t1', vtimeleft , 24*30);
				setCookie('t3', t3 , 24*30);
			}
		} , 1000 );
	}
});

///////////////////////////////////////////////////////////////////////

function formatDate(dateObj){
    var curr_date = dateObj.getDate();
    var curr_month = dateObj.getMonth();
    curr_month = curr_month + 1;
    var curr_year = dateObj.getFullYear();
    var curr_min = dateObj.getMinutes();
    var curr_hr= dateObj.getHours();
    var curr_sc= dateObj.getSeconds();
    if(curr_month.toString().length == 1)
    curr_month = '0' + curr_month;      
    if(curr_date.toString().length == 1)
    curr_date = '0' + curr_date;
    if(curr_hr.toString().length == 1)
    curr_hr = '0' + curr_hr;
    if(curr_min.toString().length == 1)
    curr_min = '0' + curr_min;
    if(curr_sc.toString().length == 1)
    curr_sc = '0' + curr_sc;

    return curr_year + "/"+curr_month+ "/"+curr_date+ " "+curr_hr+":"+curr_min+":"+curr_sc;       
}
function clicklogin(){
	divmodal.style.display = "none";
	document.getElementById('loginform').style.display='block';
}
function clickregis(){
	divmodal.style.display = "none";
	document.getElementById('regisform').style.display='block';
}
function clickinvite(){
	divmodal.style.display = "none";
	document.getElementById('inviteform').style.display='block';
}
function clickchangepass(){
	divmodal.style.display = "none";
	document.getElementById('changepassform').style.display='block';
}
function clicksetting(){
	divmodal.style.display = "none";
	document.getElementById('settingform').style.display='block';
}
function toHHMMSS(a) {
    var sec_num = parseInt(a, 10); // don't forget the second param
	var days   = Math.floor(sec_num / (3600*24));
    var hours   = Math.floor((sec_num - (days * 3600*24))/ 3600);
    var minutes = Math.floor((sec_num - (days * 3600*24) - (hours * 3600)) / 60);
    var seconds = sec_num - (days * 3600*24) - (hours * 3600) - (minutes * 60);

	days = days == 0 ? '' : days + 'D ';
    if (hours < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return days + hours + ':' + minutes + ':' + seconds;
}

function setCookie(cname, cvalue, exhours) {
  var d = new Date();
  d.setTime(d.getTime() + (exhours*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname){
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function converttime(){
	$('[onkeyup="caltime(this)"]').val('');
	$('[onclick="convert_time()"]').addClass('w3-disabled');
	$('#caltime').text(0);
	divmodal.style.display = "none";
	document.getElementById('convertform').style.display='block';
}

function clicklogout(){
	if( !confirm('Logout?') ) return;
	window.open('logout','_self');
}