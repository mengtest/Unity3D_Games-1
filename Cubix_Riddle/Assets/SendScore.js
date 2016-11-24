
#pragma strict
import UnityEngine.UI;

private var secretKey : String ="12345678"; // Edit this value and make sure it's the same as the one stored on the server
private var addScoreUrl : String ="http://dicetestserver.pixub.com/addscore.php?"; //be sure to add a ? to your url   

private var highScoreKey : String = "HighScore";    // To store previous high score.
private var highScore: int; 
private var playerNameKey : String = "PlayerName";    // To store previous high score.
private var playerName : String;

function Start() {
   // getScores();
    highScore = PlayerPrefs.GetInt(highScoreKey,0);
    playerName = PlayerPrefs.GetString(playerNameKey);
}

function Update(){
    if (Input.GetKeyDown(KeyCode.Escape)){
        postScore(playerName, highScore);
    }
}
 
function postScore(name : String, score) {
    //This connects to a server side php script that will add the name and score to a MySQL DB.
    // Supply it with a string representing the players name and the players score.
    var hash=Md5.Md5Sum(name + score + secretKey); 
 
    var highscore_url = addScoreUrl + "name=" + WWW.EscapeURL(name) + "&highscore=" + score + "&hash=" + hash;
    Debug.Log(highscore_url);
    // Post the URL to the site and create a download object to get the result.
    var hs_post : WWW = WWW(highscore_url);
    yield hs_post; // Wait until the download is done
    if(hs_post.error) {
        print("There was an error posting the high score: " + hs_post.error);
    }
}

/*function postScore(name : String, highscore : int) {
    //This connects to a server side php script that will add the name and score to a MySQL DB.
    // Supply it with a string representing the players name and the players score.

    var hash: String =Md5.Md5Sum(name + highscore + secretKey); 
 
    var highscore_url: String = addScoreUrl + "name=" +  WWW.EscapeURL(name) + "&highscore=" + highscore + "&hash=" + hash;
 
    // Post the URL to the site.
   var hs_post : WWW = WWW(highscore_url);
   yield hs_post; // Wait until the download is done
   Debug.Log(hs_post);
    if(hs_post.error) {
        print("There was an error posting the high score: " + hs_post.error);
    }
}*/
