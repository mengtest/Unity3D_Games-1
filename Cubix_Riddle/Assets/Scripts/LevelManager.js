#pragma strict

import UnityEngine.UI;
import UnityEngine.SceneManagement;

public var volumeSlider: Slider;                            // Reference to the volume slider.
public var musicToggle : Toggle;                            // Toggle to on or off the souund.
public static var highScore : int;                          // Store the current high score.
public static var count : int;                              // Store the current high score.
public var highScoreKey : String = "HighScore";             // Store the previous high score.
public var countKey : String = "Count";                     // Store the previous high score.
public var playerNameKey : String = "PlayerName";           // Store the previous high score.
public var highScoreText: Text;                             // Show the high score.
public var mainMenu : GameObject;                           // Reference to the main menu.
public var highScoreMenu : GameObject;                      // Reference to the high score menu.
public var instructionMenu : GameObject;                    // Reference to the instruction menu.
public var creditsMenu : GameObject;                    // Reference to the instruction menu.
public var enterNameMenu : GameObject;                      // Reference to the  back button.
public var backButton : GameObject;                         // Reference to the  back button.
public var playerNameText : Text;

private var playerName : String;

function Start()
{
    // Setting up the references.
    mainMenu.SetActive (true);
    highScoreMenu.SetActive(false);
    instructionMenu.SetActive(false);
    backButton.SetActive(false);
    creditsMenu.SetActive(false);
    enterNameMenu.SetActive(true);
    highScore = PlayerPrefs.GetInt(highScoreKey,0);
    count = PlayerPrefs.GetInt(countKey,0);
    
    if(count == 0)
    {
        enterNameMenu.SetActive(true);
    }

    else
    {
       enterNameMenu.SetActive(false);
    }
}

function FixedUpdate()
{
    //If toggle box is checked...
    if(musicToggle.isOn)
    {
        // ... volume slider is active.
        volumeSlider.enabled = true;

        // ... volume of all the audio sources will be relative the value of the volume slider.
        AudioListener.volume = volumeSlider.value;  
    }
        
    // ... Otherwise
    else
    {
        // ... volume is 0.
        AudioListener.volume = 0;

        // ... volume slider is disabled.
        volumeSlider.enabled = false;
    }
       
}

function Update()
{
    // If escape key is pressed while main menu is being displayed...
    if (Input.GetKeyDown(KeyCode.Escape) && mainMenu.activeSelf)
    {
        // ... quit the game.
        Application.Quit();
    }

    if(Input.GetKeyDown(KeyCode.Return) && enterNameMenu.activeSelf)
    {
        Save();
    }
        
}

public function LoadScene(name: String)
{
    // Load the scene.
    SceneManager.LoadScene(name);
}

public function Quit()
{
    // Quit the game.
    Application.Quit();
}

public function HighScore()
{
        // Transition from main menu to high score menu.
        mainMenu.SetActive(false);
        highScoreMenu.SetActive(true);
        backButton.SetActive(true);

        // Display the high score on the leaderboard.
        highScoreText.text = "Player Name : " + PlayerPrefs.GetString(playerNameKey).ToString() + "\nHigh Score : " + highScore.ToString();
        

}

public function Instructions()
{
    // Transition from main menu to instructions menu.
    instructionMenu.SetActive(true);
    mainMenu.SetActive(false);
    backButton.SetActive(true);
}

public function Credits()
{
    // Transition from main menu to instructions menu.
    creditsMenu.SetActive(true);
    mainMenu.SetActive(false);
    backButton.SetActive(true);
}

public function Back()
{
    // Transition from instructions or high score menu to  main menu.
    highScoreMenu.SetActive(false);
    mainMenu.SetActive(true);
    backButton.SetActive(false);
    creditsMenu.SetActive(false);
    instructionMenu.SetActive(false);

}

public function Save()
{
    // Transition from instructions or high score menu to  main menu.
    playerName = playerNameText.text;
    PlayerPrefs.SetInt(countKey, 1);
    PlayerPrefs.SetString(playerNameKey, playerName);
    PlayerPrefs.Save();
    enterNameMenu.SetActive(false);
}
 