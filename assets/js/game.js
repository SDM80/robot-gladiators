// Game States
// WIN - Player robot has defeated all enemy robots
//  * fight all enemy robots
//  * defeat each enemy robot
// LOSE - Player robot's health is zero or less


// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min +1) + min);

  return value;
};

var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
      this.health = 100;
      this.money = 10;
      this.attack = 10;
  },
  refillHealth: function() {
      if (this.money >= 7) {
          window.alert("refilling player's health by 20 for 7 dollars.");
          this.health += 20;
          this.money -= 7;
      } else {
          window.alert("You don't have enough money!");
      }
  },
  upgradeAttack: function() {
      if (this.money >=7) {
          window.alert("Upgrading player's attack by 6 for 7 dollars.")
          this.attack += 6;
          this.money -= 7;
      } else {
          window.alert("You don't have enough money!")
      }

  },
};

var enemyInfo = [
  {
      name: "Roborto",
      attack: randomNumber(10, 14)
  },
  {
      name: "Amy Android",
      attack: randomNumber(10, 14)
  },
  {
      name: "Robo Trumble",
      attack: randomNumber(10, 14)
  },
];

// create fight function 
var fight = function(enemy) {
  
  while (playerInfo.health > 0 && enemy.health > 0) {
      // ask user if they'd liked to fight or run
      var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

      // if user picks "skip" confirm and then stop the loop
      if (promptFight === "skip" || promptFight === "SKIP") {
          // confirm user wants to skip
          var confirmSkip = window.confirm("Are you sure you'd like to quit?");

          // if yes (true), leave fight
          if (confirmSkip) {
              window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
              // subtract money from playerMoney for skipping
              playerInfo.money = Math.max(0, playerInfo.money - 10);
              console.log("Player Money:", playerInfo.money)
              break;
          };
      } else {

          // remove enemy's health by subtracting the amount set in the playerAttack variable
          // randomize damage from max player atack to playeratack -3
          var damage = randomNumber(playerInfo.attack -3, playerInfo.attack)

          enemy.health = Math.max(0, enemy.health - damage);
          console.log(playerInfo.name + ' attacked ' + enemy.name + ' for ' + damage + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.');

          // check enemy's health
          if (enemy.health <= 0) {
          window.alert(enemy.name + ' has died!');

          // award player money for winning
          playerInfo.money = playerInfo.money + 20;

          // leave while() loop since enemy is dead
          break;
          } else {
          window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
          };

          // remove players's health by subtracting the amount set in the enemyAttack variable
          // randomize damage
          var damage = randomNumber(enemy.attack -3, enemy.attack)
          playerInfo.health = Math.max(0, playerInfo.health - damage);
          console.log(enemy.name + ' attacked ' + playerInfo.name + ' for ' + damage + ". " + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.');

          // check player's health
          if (playerInfo.health <= 0) {
              window.alert(playerInfo.name + ' has died!');
              // leave while() loop if player is dead
              break;
          } else {
              window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
          };
      };
  };
};


// function to start new game
var startGame = function() {
  // reset player stats 
  playerInfo.reset();

  // start fight
  for(var i= 0; i < enemyInfo.length; i++) {
      if (playerInfo.health > 0) {
          // let user know what round they are in
          window.alert("Welcome to Robot Gladiators! Round " + ( i + 1) );
          // pick a new enemy to fight 
          var pickedEnemyObj = enemyInfo[i];
          // reset enemyHealth
          pickedEnemyObj.health = randomNumber(40, 60);
          // call fight function with enemy robot
          fight(pickedEnemyObj);
          // if we're not at the last enemy in the array and player is still alive, go to shop
          if (i < enemyInfo.length -1 && playerInfo.health > 0) {
              // confirm if user wants to go to the shop
              var storeConfirm = window.confirm("The fight is over, would you like to visit the shop before the next round?")
              if (storeConfirm) {
                  shop();
              } else {
                  window.alert("The shop looks closed anyway.")
              };
          } else if (playerInfo.health > 0) {
              window.alert("The shop is closed")
          } else {
              window.alert(pickedEnemyObj.name + " has defeated your robot.");
              break;
          };
      };
  };
  // after the loop ends, player is either out of health or enemies to fight
  endGame();
};

// function to end the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
      window.alert("Great job, you've survived the game! You have " + playerInfo.health + " HP. You now have " + playerInfo.money + " dollars to take home.");
  } else {
      window.alert("You've lost your robot in battle. Try upgrading your robot next time.");
  };
  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
      // restart the game
      startGame();
  } else {
      window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  };
};

// shop for upgrades
var shop = function() {
  console.log("Player Money: ", playerInfo.money);
  var shopOptionPrompt = window.prompt(
      "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter one: 'REFIL', 'UPGRADE', or 'LEAVE' to make a choice."
  );
  // use switch to carry out action
  switch (shopOptionPrompt) {
      case "refill":
          playerInfo.refillHealth();
          break;
      case "REFILL":
          playerInfo.refillHealth();
          break;
      case "upgrade":
          playerInfo.upgradeAttack();
          break;
      case "UPGRADE":
          playerInfo.upgradeAttack();
          break;
      case "leave":
          window.alert("The shop keeper shakes his fist at you as you leave..");
          
          // do nothing, so function will end
          break;
      case "LEAVE":
          window.alert("The shop keeper shakes his fist at you as you leave..");
          
          // do nothing, so function will end
          break;
      default: 
          window.alert("You did not pick a valid option. Try again.")

          // call shop() again and force player to pick a valid option
          shop();
          break;
  };
};

// start game when page loads
startGame();
