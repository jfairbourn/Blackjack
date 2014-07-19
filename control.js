/**
 * Implemented by James Fairbourn
 * 1/23/13
 * CS 4540
 * PS1
 */
var value;
var suits;
var used;
var usedCount;
var dealerFirstCard;
var dealerFirstValue;
var dealerSecondValue;
var aceBoolean = new Boolean();
var playerValue;
var columnCount;
var dealerColumn;
var winCount = 0;
var DealerAce = new Boolean();
/**
 * Matches buttons to functions.
 */
$(function (){
	//Match Hit to hit function
	$("[value='Hit']").click(hit);
	//Match Deal to deal function
	$("[value='Deal']").click(deal);
	//Match Stand to the stand function
	$("[value='Stand']").click(stand);
	
		});
/**
 * Gives the player another card.
 * @param button
 */
function hit(button)
{
	var card = value[randomValue()];	//choose card and suit randomly from an array.
	var chooseSuit = suits[randomSuit()];
	var s = getCard(card, chooseSuit);  //calls getCard to get the name of the card.
	if(used.indexOf(s)!=-1)				//if the card was already used, then find another one until one that hasn't
		{
			while(used.indexOf(s)!=-1)
				{
				card = value[randomValue()];
				chooseSuit = suits[randomSuit()];
				s = getCard(card, chooseSuit);
				}
			used[usedCount++] = s;
		}
	else								//otherwise place the new card into the array.
		{
		used[usedCount++] = s;
		}
	v = getValue(card);					//calls getValue to get the int value of card.
	placeCard(s);						//places the card on the board.
	if(v == 1)							//if the card is an Ace:
		{
			if(aceBoolean == true)		//if there already exists an Ace, the value is 1.
				{
					v = 1;
				}
			else if(parseInt(11)+parseInt(playerValue)<=21)	//if the Ace value of 11 does not exceed 21, then use 11.
				{
					v=11;
					aceBoolean = true;
				}
		}
	if(parseInt(v)+parseInt(playerValue)>21)	//if the value of the card and the player's current score exceeds 21:
		{
			if(aceBoolean==true)				//if there exists an Ace in the deck, subtract ten from score and test if it exceeds 21
				{								//if it does then stop.
					playerValue = parseInt(playerValue) - 10;	
					v = parseInt(v) + parseInt(playerValue);
					playerValue = v;
					$("[id='PlayerValue']").val(v);
					aceBoolean = false;
					if(parseInt(playerValue)>21)
						{
						stand();
						}
				}
			else								//otherwise you bust.
				{
					
				v = parseInt(v) + parseInt(playerValue);
				playerValue = v;
				$("[id='PlayerValue']").val(v);
					stand();
					return;
				}
		}
	else										//if it doesn't exceed 21, continue playing.
		{
			v = parseInt(v) + parseInt(playerValue);
			playerValue = v;
			$("[id='PlayerValue']").val(v);
		}
	
}
/**
 * This function deals the cards of the deck.
 * @param button
 */
function deal(button)
{
	$("[id='DealerCard1']").val("");   //Make sure all dealer spaces are clear.
	$("[id='DealerCard2']").val("");
	$("[id='DealerCard3']").val("");
	$("[id='DealerCard4']").val("");
	$("[id='DealerCard5']").val("");
	$("[id='DealerCard6']").val("");
	
	$("[id='PlayerCard1']").val("");	//Make sure all player spaces are clear.
	$("[id='PlayerCard2']").val("");
	$("[id='PlayerCard3']").val("");
	$("[id='PlayerCard4']").val("");
	$("[id='PlayerCard5']").val("");
	$("[id='PlayerCard6']").val("");
	
	$("[id='result']").val("");			//clear the result spot.
	dealerAce = false;
	aceBoolean = false;
	aceCount = 0;
	value = new Array("Ace", "2", "3", "4", "5", "6", "7", "8","9", "10", "Jack",
			"Queen", "King");														//create a new array of card faces.
	suits = new Array("Hearts", "Clubs", "Diamonds", "Spades");						//create a new array of suits.
	used = new Array();
	usedCount = 0;
	var card = value[randomValue()];						//grab a random card from the deck.
	var chooseSuit = suits[randomSuit()];					//select a random suit.
	var s = getCard(card, chooseSuit);						//Get the name of the card.
	var v = getValue(card);									//Get the value of the card.
	if(v==1)							//if it is an Ace, set the value to 11.
		{
			v = 11;
			dealerAce = true;
		}
	dealerFirstCard = s;				//store the value and card to be shown later.
	dealerFirstValue = v;
	used[usedCount++] = s;				//place card in the used array.
	card = value[randomValue()];		//repeat the above steps again to get another card.
	chooseSuit = suits[randomSuit()];
	s = getCard(card, chooseSuit);	
	if(used.indexOf(s)!=-1)				//make sure that the card is not already used.
		{
			while(used.indexOf(s)!=-1)
				{
				card = value[randomValue()];
				chooseSuit = suits[randomSuit()];
				s = getCard(card, chooseSuit);
				}
			used[usedCount++] = s;
		}
	else								//if it is not used, place it in the used array.
		{
			used[usedCount++] = s;
		}
	v = getValue(card);
	if(v==1 && dealerAce==false)
		{
			v = 11;
		}
	
	$("[id='DealerCard2']").val(s);
	$("[id='DealerValue']").val(v);
	dealerSecondValue = v;
	card = value[randomValue()];		//repeat steps for the player.
	chooseSuit = suits[randomSuit()];
	s = getCard(card, chooseSuit);
	if(used.indexOf(s)!=-1)
		{
			while(used.indexOf(s)!=-1)
				{
				card = value[randomValue()];
				chooseSuit = suits[randomSuit()];
				s = getCard(card, chooseSuit);
				}
			used[usedCount++] = s;
		}
	else
		{
			used[usedCount++] = s;
		}
	v = getValue(card);
	if(v == 1)
		{
			aceBoolean = true;
			v = 11;
			
		}
	$("[id='PlayerCard1']").val(s);
	$("[id='PlayerValue']").val(v);
	card = value[randomValue()];
	chooseSuit = suits[randomSuit()];
	s = getCard(card, chooseSuit);
	if(used.indexOf(s)!=-1)
		{
			while(used.indexOf(s)!=-1)
				{
				card = value[randomValue()];
				chooseSuit = suits[randomSuit()];
				s = getCard(card, chooseSuit);
				}
			used[usedCount++] = s;
		}
	v = getValue(card);
	if(v==1 && aceBoolean == false)
		{
			aceBoolean = true;
			v = 11;
		}
	
	v = parseInt(v) + parseInt(document.getElementById('PlayerValue').value);		//get the player's score
	playerValue = v;
	$("[id='PlayerCard2']").val(s);
	$("[id='PlayerValue']").val(v);
	columnCount = 3;
	dealerColumn = 3;
}
/**
 * The function occurs when the player selects the Stand button.
 * @param button
 */
function stand(button)
{
	$("[id='DealerCard1']").val(dealerFirstCard);		//reveal the dealer's first card
	if(dealerFirstValue ==1 && dealerAce == false)
		{
			dealerFirstValue = 11;
		}
	var d = parseInt(dealerFirstValue) + parseInt(dealerSecondValue);	//update the dealer's score.
	var p = parseInt(playerValue);
	$("[id='DealerValue']").val(d);
	if(parseInt(d)<17)					//if the dealer's score is less than 17, then select more cards until it is > or = to 17.
		{
			while(parseInt(d)<17)
				{
				var card = value[randomValue()];
				var chooseSuit = suits[randomSuit()];
				var s = getCard(card, chooseSuit);
				if(used.indexOf(s)!=-1)
				{
					while(used.indexOf(s)!=-1)
						{
						card = value[randomValue()];
						chooseSuit = suits[randomSuit()];
						s = getCard(card, chooseSuit);
						}
					used[usedCount++] = s;
				}
				else
					{
						used[usedCount++] = s;
					}
				var v = getValue(card);
				placeDealer(s);
				if(v==1)					//Check how the Ace effects things.
					{
						if(parseInt(d)+11>21)
							{
								v = 1;
							}
							else
							{
								v = 11;
							}
					}
				d = parseInt(d) + parseInt(v);
				$("[id='DealerValue']").val(d);
				}
		}
	if(d>21 && p>21)					//if both players bust, then it results in a tie.
		{
		$("[id='result']").val("Tie");
		}
	else if(d>21 && p<=21)				//if the dealer busts and the player doesn't, player wins.
		{
		winCount++;
		$("[id='result']").val("Player");
		$("[id='WinsCount']").val(winCount);
		
		}
	else if(d<=21 && p>21)				//if the player busts and the dealer doesn't, dealer wins.
		{
		$("[id='result']").val("Dealer");
		}
	else if(d<=21 && p<=21 && d>p)		//if the dealer is greater then the player, dealer wins.
		{
		$("[id='result']").val("Dealer");
		}
	else if(d<=21 && p<=21 && d<p)		//if the player is greater then the dealer, player wins.
	{
	winCount++;							//update win count.
	$("[id='result']").val("Player");
	$("[id='WinsCount']").val(winCount);
	
	}
	$("[id='DealerValue']").val(d);
}
/**
 * Returns a random value for the cards.
 * @returns
 */
function randomValue()
{
	return Math.floor(Math.random()*13);
}
/**
 * Returns a random value for the suits.
 * @returns
 */
function randomSuit()
{
	return Math.floor(Math.random()*4);
}
/**
 * Returns the name and suit of the current card and suit.
 * @param c card
 * @param s suit
 * @returns {String}
 */
function getCard(c, s)
{
	switch(c)
	{
	case "Ace":
		return "Ace of "+s;
	case "2":
		return "Two of "+s;
	case "3":
		return "Three of "+s;
	case "4":
		return "Four of "+s;
	case "5":
		return "Five of "+s;
	case "6":
		return "Six of "+s;
	case "7":
		return "Seven of "+s;
	case "8":
		return "Eight of "+s;
	case "9":
		return "Nine of "+s;
	case "10":
		return "Ten of "+s;
	case "Jack":
		return "Jack of "+s;
	case "Queen":
		return "Queen of "+s;
	case "King":
		return "King of "+s;
	}
}
/**
 * Gets the current integer value for the card.
 * @param c card
 * @returns {Number}
 */
function getValue(c)
{
	switch(c)
	{
	case "Ace":
		return 1;
	case "2":
		return 2;
	case "3":
		return 3;
	case "4":
		return 4;
	case "5":
		return 5;
	case "6":
		return 6;
	case "7":
		return 7;
	case "8":
		return 8;
	case "9":
		return 9;
	case "10":
		return 10;
	case "Jack":
		return 10;
	case "Queen":
		return 10;
	case "King":
		return 10;
	}
}
/**
 * Places the cards in the right spot on the board,
 * depending on the columnCount.
 * @param s
 */
function placeCard(s)
{
	if(columnCount == 3)
		{
			$("[id='PlayerCard3']").val(s);
			columnCount++;
		}
	else if(columnCount == 4)
		{
			$("[id='PlayerCard4']").val(s);
			columnCount++;
		}
	else if(columnCount == 5)
	{
		$("[id='PlayerCard5']").val(s);
		columnCount++;
	}
	else if(columnCount == 6)
	{
		$("[id='PlayerCard6']").val(s);
		columnCount++;
	}
}
/**
 * Places the dealers cards in the right columns.
 * @param s
 */
function placeDealer(s)
{
	if(dealerColumn == 3)
		{
			$("[id='DealerCard3']").val(s);
			dealerColumn++;
		}
	else if(dealerColumn == 4)
		{
			$("[id='DealerCard4']").val(s);
			dealerColumn++;
		}
	else if(dealerColumn == 5)
	{
		$("[id='DealerCard5']").val(s);
		dealerColumn++;
	}
	else if(dealerColumn == 6)
	{
		$("[id='DealerCard6']").val(s);
		dealerColumn++;
	}
}