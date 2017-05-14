var q1ButtonHide = true;
var q2ButtonHide = true;
var q3ButtonHide = true;
var q4ButtonHide = true;

//global variables
var MASS, K, TOTALE, AMP, DX, ANGFREQ, TimePeriod, WAVELENGTH, FREQ, OBSFreq;
var TENSION, VELOCITY, LMD, TEMP, DIST, DB, Smax, N;

//constants
var GRAVITY = 9.8;
var AIR = 1.2;
var V = 343;
var I0 = 1 * 10**(-12);

function revealQ1(){
	if(q1ButtonHide)
		$("#question1").removeClass('hidden'); //shows the datas
	else
		$("#question1").addClass('hidden');
	q1ButtonHide = !(q1ButtonHide);


}

function revealQ2(){
	if(q2ButtonHide)
		$("#question2").removeClass('hidden'); //shows the datas
	else
		$("#question2").addClass('hidden');
	q2ButtonHide = !(q2ButtonHide);
}
function revealQ3(){
	if(q3ButtonHide)
		$("#question3").removeClass('hidden'); //shows the datas
	else
		$("#question3").addClass('hidden');
	q3ButtonHide = !(q3ButtonHide);
}
function revealQ4()
{
	if(q4ButtonHide)
		$("#question4").removeClass('hidden'); //shows the datas
	else
		$("#question4").addClass('hidden');
	q4ButtonHide = !(q4ButtonHide);
}

//QUESTION 1
function question1a(){

	MASS = document.getElementById('massQ1').value;
	TOTALE = document.getElementById('totalEQ1').value;
	AMP = document.getElementById('amplitudeQ1').value;
	DX = document.getElementById('deltaXQ1').value;		
	
	//get the user's answer
	var userAnswer1 = document.getElementById('userAnswer1a').value;
	
	K = (2*TOTALE)/(AMP**2);
	var percentDiff = percentError(K,userAnswer1);
	check(percentDiff, K);
		
}
function question1b()
{
	var userAnswer = document.getElementById('userAnswer1b').value;
	ANGFREQ = Math.sqrt(K/MASS);
	var percentDiff = percentError(ANGFREQ, userAnswer);
	check(percentDiff, ANGFREQ);

}
function question1c(){
	var userAnswer = document.getElementById('userAnswer1c').value;
	TimePeriod = Math.PI * 2 * Math.sqrt(MASS/K);

	var percentDiff = percentError(TimePeriod, userAnswer);
	check(percentDiff, TimePeriod);

}

function question1d(){
	var userAnswer = document.getElementById('userAnswer1d').value;
	var KE = 0.3; //this number was gotten from the question
	//potential energy is 1/2*k*x^2 so find x
	var distance = Math.sqrt(2*(TOTALE - KE)/K);
	var percentDiff = percentError(distance, userAnswer);
	check(percentDiff, distance);


}

function question1e(){
	var userAnswer = document.getElementById('userAnswer1e').value;
	ANGFREQ = 1/2 * ANGFREQ;//because the new angular frequency is half the original
	var length = GRAVITY/(ANGFREQ**2);
	var percentDiff = percentError(length, userAnswer);
	check(percentDiff, length);

}

//END OF QUESTION 1

//START QUESTION 2

function question2a(){
	//find linear mass density of the string
	//need to set waveLengthQ2, freqQ2, amplitudeQ2, tensionQ2
	//var MASS, K, TOTALE, AMP, DX, ANGFREQ, TimePeriod, WAVELENGTH, FREQ, TENSION;
	var userAnswer = document.getElementById('userAnswer2a').value;
	WAVELENGTH = document.getElementById('waveLengthQ2').value;
	FREQ = document.getElementById('freqQ2').value;
	AMP = document.getElementById('amplitudeQ2').value;
	TENSION = document.getElementById('tensionQ2').value;
	VELOCITY = FREQ * WAVELENGTH;
	//LMD is linear mass density
	LMD = TENSION/(VELOCITY**2);
	var percentDiff = percentError(LMD,userAnswer);
	//alert(percentDiff);
	check(percentDiff, LMD);

}
function question2b(){ //NOT FINISHED
	var userAnswer = document.getElementById('userAnswer2b').value;
	ANGFREQ = 2*Math.PI*FREQ;
	var percent = document.getElementById('percentQ2').value;
	var t = 1.25;//given number of seconds
	percent /= 100;
	var vmax = AMP*(FREQ*2*Math.PI);
	vmax = (vmax*percent);//get the percent of Vmax, then make it a negative number
	K = Math.PI*2 / WAVELENGTH;

	//var x = (Math.acos(vmax/(AMP*WAVELENGTH)) + (WAVELENGTH * t)) /K;
	var x = (Math.acos(vmax/(AMP*ANGFREQ))) + ANGFREQ*t;
	x /= K;
	var percentDiff = percentError(x,userAnswer);
	check(percentDiff, x);
}
function question2c(){
	var userAnswer = document.getElementById('userAnswer2c').value;
	ANGFREQ = 2*Math.PI*FREQ;
	var Pave = 1/2*LMD*(ANGFREQ**2)*(AMP**2)*VELOCITY;

	var percentDiff = percentError(Pave,userAnswer);
	check(percentDiff, Pave);
}

//END QUESTION 2

//START QUESTION 3

function question3a(){
	var userAnswer = document.getElementById('userAnswer3a').value;
	FREQ = document.getElementById('freqQ3').value;
	OBSFreq = document.getElementById('observerF').value;
	if (FREQ > OBSFreq)
		alert("Invalid input: second frequency entered must be higher than the first! Please refresh the page");
	VELOCITY = document.getElementById('velocityQ3').value;
	
	var ObserverV = (OBSFreq / FREQ) * (V - VELOCITY) - V;
	
	var percentDiff = percentError(ObserverV, userAnswer);
	check(percentDiff, ObserverV);
	alert("Traveling towards the whistle!");
	

}
//END QUESTION 3

//START QUESTION 4


function question4a()
{
	var length = 2;
	var userAnswer = document.getElementById('userAnswer4a').value;
	N = document.getElementById('N').value;
	LMD = document.getElementById('lmdQ4').value;
	MASS= document.getElementById('massQ4').value;
	var tension = MASS*GRAVITY;

	VELOCITY = (tension/LMD)**(1/2);
	var freq = (N*VELOCITY) / (2 * length);
	var percentDiff = percentError(freq, userAnswer);
	check(percentDiff, freq);


}

function question4b()
{
	var dRate = -.0125;
	var ilength = 2;//initail string length
	var nInitial = document.getElementById('NQ').value;
	var nFinal = document.getElementById('NQ4').value;
	var userAnswer = document.getElementById('userAnswer4b').value;

	if(nFinal > nInitial)
		alert("ERROR: the second n value must be less than the first, please refresh the page");
	//find the length that nFinal occurs at 
	var initialF = nInitial*VELOCITY / (2 * ilength);

	var Flength; //final length
	Flength = nFinal*VELOCITY / (2 * initialF);

	var time = (Flength - ilength) / (dRate);
 
	var percentDiff = percentError(time, userAnswer);
	check(percentDiff, time);

}	

//CHECK ANSWER FUNCITON
//parameters: the claculated percent error, followed by the correct answer
function check(percentDiff, correctAnswer){


	if(percentDiff < 2)
			{
				alert("Correct!" + "\nCorrect Answer: " + correctAnswer);
			}
			else
			{
				alert("Incorrect!" + "\nCorrect Answer: " + correctAnswer);
			}
}

//percent error function
//enter correct answer as first parameter
function percentError(num1, num2){
	var pdiff;
	pdiff = (Math.abs(num1 - num2)/(num1)) * 100;
	return pdiff;
}