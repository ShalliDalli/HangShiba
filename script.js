const words = ["apple", "artist", "arrow", "afro", "apollo", "answer", "awesome", "anniversary", "appeal", "appoint","application", "approve","architect", "argue", "arise","assist","attractive","benefit", "behavior", "beehive", "bee", "beside", "beyond","better", "between", "bike", "billion", "bible", "blow", "board","card", "care", "catholic", "cast", "celebrate", "carbon", "cell", "ceremony", "chain", "champion", "channel","charity", "cold", "combination", "comfort", "conflict", "depot", "development", "devote", "dialogue", "diet", "different", "discover", "dominant", "double", "drop", "dust", "drink", "earth", "economic", "editor", "editon", "edge", "english", "environment", "entry", "exercise", "expect", "eye", "fade", "facade", "fall", "fail", "failure", "forest", "focus", "feelings", "fantasy", "fate", "father", "fault", "film", "first", "gain", "generate", "german", "go", "giant", "gifted", "girl", "guide", "guess", "great", "greatest", "hair", "hand", "headline", "hello", "highlight", "him", "hope", "hero", "heroic", "hold", "hot", "husband", "human", "ice", "ideal", "identify", "impact", "incentive", "income", "increase", "indian", "injury", "insurance", "intense", "into", "irish", "italian", "job", "jersey", "justice", "juice", "joke", "joy", "journey", "judge", "jury", "key", "know", "kitchen", "kid", "knock", "knowledge", "kind", "key", "keyring", "knife", "lab", "laboratory", "lack", "leak", "laugh", "launch", "lawn", "law", "lawyer", "lawsuit", "leader", "lead", "leadership", "leaf", "legislation", "lesson", "level", "library", "live", "life","mad", "mercy", "madman", "military", "manners", "manager", "mark", "market", "matter", "meaning", "measure", "meat", "mere", "metal", "method", "middle", "might", "minister", "minor", "miracle", "moon", "music", "myth", "name", "nation", "native", "natural", "nature", "negative", "news", "next", "net", "nerve", "nervous", "never", "new", "nice", "nobody", "nose", "nut", "observe", "obtain", "obvious", "occur", "occasion", "occupy", "ocean", "odd", "olympic", "online", "ongoing", "onto", "option", "origin", "other", "ourselves", "oven", "own", "owner", "painting", "paint", "palm", "pan", "panel", "paper", "passenger", "paper", "pool", "poor", "pay", "pause", "perform", "period", "pink", "planet", "player", "popular", "powder","protect", "rare", "raw", "real", "reality", "reason", "recall", "reduce", "refer", "regular", "regulate", "rely", "replace", "republican", "require", "resist", "resort", "rice", "risk", "roll", "role", "rush", "russian", "sales", "sand", "sauce", "save", "scared", "say", "scale", "scene", "scheme", "scream", "script", "season", "secret", "seek", "seize", "senior", "serve", "server", "set", "setting", "seven", "shade", "sharp", "sheet", "shoot", "shut", "shrug", "sight", "skill", "smoke", "tail", "tape", "target", "task", "taxpayer", "technology", "teenager", "telescope", "terrible", "terror", "thin", "thick", "thing", "thousand", "ticket", "tight", "tobacco", "tongue", "tool", "toward", "trail", "translate", "trust", "typical", "type", "ultimate", "uncle", "unique", "unusual", "upon", "urban", "usual", "valley", "vary", "vehicle", "vessel", "victim", "violate", "virtue", "virus", "vision", "vote", "vulnerable", "want", "wash", "waste", "water", "wave", "way", "weak", "welcome", "welfare", "wheel", "whisper", "white", "wild", "will", "willing", "winter", "wish", "within", "wonder", "wonderful", "world", "wound", "wrap",];
var letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];

const category = document.getElementById("category"); 
const livesleft = document.getElementById("lives");
const plives = document.getElementById("mylives");
const word = document.getElementById("word");
const canvas = document.getElementById('hangman'); 
const context = canvas.getContext("2d");
const reset = document.getElementById("restart");




let guesses;
let guess;
let positions = [];
let lines = []
let random;
let chosenWord;
let chosenLetter;
let alreadyChosenLetter = [0];
let isgameOverTriggered = false
let step;


play();

function play(){
guesses=9;
positions = [];
lines = [];
alreadyChosenLetter= [0];
isgameOverTriggered=false;
step=0;

canvas.width = canvas.width;

for(var i=0;i<26;i++){

  var element = document.getElementById(letter[i]);
  element.classList.remove('clicked');
}

plives.innerHTML="You have " + guesses + " lives left";
plives.style.color="white";

word.innerHTML="";
choseWord();

}

function choseWord(){
  random = Math.round(Math.random()* ((words.length-1) - 0)) + 0;    
  chosenWord = words[random];
  
  //Lines for the Word
  for(var i=1;i<=chosenWord.length;i++){
      lines[i]="_";
      word.innerHTML=word.innerHTML + " " + lines[i];
  }
}

console.log(chosenWord);

//Button Function
function onClick(letter){

chosenLetter = letter;
buttonGreyOut();

if(!alreadyChosenLetter.includes(chosenLetter)){
  alreadyChosenLetter.push(chosenLetter);
  Check();
}

}

//Guess
function Check(){

    if(chosenWord.includes(chosenLetter)){
        Correct(chosenLetter);
    }
    else{
      
      if(guesses>0){
        guesses--;
      }

        livesleft.innerHTML=guesses;
     
          updateLives();        

        Draw(draws[step++]);

        if(guesses===0){
            Gameover();
        }
    }
}

//Gameover
function Gameover(){
  isgameOverTriggered=true;
plives.innerHTML="Gameover, you dont have any lives left";
plives.style.color="red";

for(var i=0;i<26;i++){
  alreadyChosenLetter.push(letter[i]);
}

reset.classList.add('clicked');
}

//GuessRight
function Correct(Letter){

let letters = chosenWord.split("");


for(var i=0;i<=letters.length;i++){

if(Letter === letters[i]){
positions.push(i);          //wenn gewählter Buchstabe im Wort vorkommt kommt es ins Array
}}

for(var i=0;i<=positions.length;i++){

lines[positions[i]+1] = chosenLetter;

}

word.innerHTML="";
for(var i=1;i<=chosenWord.length;i++){

    word.innerHTML=word.innerHTML + " " + lines[i];
}
positions = [];
Won();

}

//Won
function Won(){
    if(!lines.includes("_")){
        plives.innerHTML="You've won!"
        plives.style.color="white";
        plives.style.fontsize="25pt";

        reset.classList.add('clicked');
    }
   
}

//Draw Hangman
Draw = (part) => {
  context.save();
    switch (part) {
       case 'gallows' :
         context.strokeStyle = 'white';
         context.lineWidth = 10; 
         context.beginPath();
         context.moveTo(175, 225);
         context.lineTo(5, 225);
         context.moveTo(40, 225);
         context.lineTo(25, 5);
         context.lineTo(100, 5);
         context.lineTo(100, 25);
         context.stroke();
         break;
 
       case 'head':
         context.lineWidth = 5;
         context.beginPath();
         context.arc(100, 50, 25, 0, Math.PI*2, true);
         context.closePath();
         context.stroke();
         break;
       
       case 'body':
         context.beginPath();
         context.moveTo(100, 75);
         context.lineTo(100, 140);
         context.stroke();
         break;
 
       case 'rightHarm':
         context.beginPath();
         context.moveTo(100, 85);
         context.lineTo(60, 100);
         context.stroke();
         break;
 
       case 'leftHarm':
         context.beginPath();
         context.moveTo(100, 85);
         context.lineTo(140, 100);
         context.stroke();
         break;
 
       case 'rightLeg':
         context.beginPath();
         context.moveTo(100, 140);
         context.lineTo(80, 190);
         context.stroke();
         break;
 
       case 'rightFoot':
          context.beginPath();
          context.moveTo(82, 190);
          context.lineTo(70, 185);
          context.stroke();
       break;
 
       case 'leftLeg':
         context.beginPath();
         context.moveTo(100, 140);
         context.lineTo(125, 190);
         context.stroke();
       break;
 
       case 'leftFoot':
          context.beginPath();
          context.moveTo(122, 190);
          context.lineTo(135, 185);
          context.stroke();
       break;
    } 
 }
 
 const draws = [
    'gallows', 
    'head', 
    'body', 
    'rightHarm', 
    'leftHarm',
    'rightLeg',
    'leftLeg',
    'rightFoot',
    'leftFoot',
 ]
 step = 0;

 //ButtonGreyOut
 function buttonGreyOut(){

  if(isgameOverTriggered === false){
    let clickedbutton = document.getElementById(chosenLetter);
  clickedbutton.classList.add('clicked');
}
}

 //Reset
 function onRestart(){
   reset.classList.remove('clicked');
  play();
 }

 //Update Lives
 function updateLives(){
     plives.innerHTML="You have" + " " + guesses + " " + "lives left";
 }