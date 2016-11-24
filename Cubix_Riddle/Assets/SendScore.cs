using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class SendScore : MonoBehaviour {
        
       private string secretKey = "12345678"; // Edit this value and make sure it's the same as the one stored on the server
       public string addScoreUrl = "http://localhost/Score/AddScore3.php?"; //be sure to add a ? to your url

       private string highScoreKey= "HighScore";    // To store previous high score.
       private string playerNameKey = "PlayerName";    // To store previous high score.
       private int highScore;
       private string playerName;

       void Start()
       {
           //StartCoroutine(GetScores());
           highScore = PlayerPrefs.GetInt(highScoreKey, 0);
           playerName = "rtertr";
       }

       void Update()
       {
           if (Input.GetKeyDown(KeyCode.Escape))
           {
               PostScores(playerName, highScore);
           }
       }

       public string Md5Sum(string strToEncrypt)
       {
           System.Text.UTF8Encoding ue = new System.Text.UTF8Encoding();
           byte[] bytes = ue.GetBytes(strToEncrypt);

           // encrypt bytes
           System.Security.Cryptography.MD5CryptoServiceProvider md5 = new System.Security.Cryptography.MD5CryptoServiceProvider();
           byte[] hashBytes = md5.ComputeHash(bytes);

           // Convert the encrypted bytes back to a string (base 16)
           string hashString = "";

           for (int i = 0; i < hashBytes.Length; i++)
           {
               hashString += System.Convert.ToString(hashBytes[i], 16).PadLeft(2, '0');
           }

           return hashString.PadLeft(32, '0');
       }

       // remember to use StartCoroutine when calling this function!
       IEnumerator PostScores(string name, int highscore)
       {
           //This connects to a server side php script that will add the name and score to a MySQL DB.
           // Supply it with a string representing the players name and the players score.
           string hash = Md5Sum(name + highscore + secretKey);

           string post_url = addScoreUrl + "name=" + WWW.EscapeURL(name) + "&highscore=" + highscore + "&hash=" + hash;

           // Post the URL to the site and create a download object to get the result.
           WWW hs_post = new WWW(post_url);
           yield return hs_post; // Wait until the download is done

           if (hs_post.error != null)
           {
               print("There was an error posting the high score: " + hs_post.error);
           }
       }
}
