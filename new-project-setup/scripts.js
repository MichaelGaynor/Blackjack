$(document).ready(function(){

    ////////////////////
    // MAIN VARIABLES///
    ////////////////////
    const freshDeck = createDeck();
    var playersHand = [];
    var dealersHand = [];
    var theDeck = freshDeck.slice(); //Creates a new copy array of freshDeck

    ///////////////////////
    // EVENT HANDLERS//////
    ///////////////////////
    $(".deal-button").click(function(){
        // shuffleDeck();
        reset();
        playersHand.push(theDeck.shift());
        dealersHand.push(theDeck.shift());
        playersHand.push(theDeck.shift());
        dealersHand.push(theDeck.shift());
        placeCard("player", 1, playersHand[0]);
        placeCard("player", 2, playersHand[1]);
        placeCard("dealer", 1, dealersHand[0]);
        placeCard("dealer", 2, dealersHand[1]);
        calculateTotal(playersHand,"player");
        calculateTotal(dealersHand,"dealer");
    })

    $(".hit-button").click(function(){
        if (calculateTotal(playersHand, "player") < 21){
            playersHand.push(theDeck.shift());
            var lastCardIndex = playersHand.length - 1;
            var slotForNewCard = playersHand.length;
            placeCard("player", slotForNewCard, playersHand[lastCardIndex]);
            calculateTotal(playersHand,"player");
        }
    })

    $(".stand-button").click(function(){
        var dealerTotal = calculateTotal(dealersHand,"dealer");
        while(dealerTotal < 17){
            dealersHand.push(theDeck.shift());
            var lastCardIndex = dealersHand.length - 1;
            var slotForNewCard = dealersHand.length;
            placeCard("dealer", slotForNewCard, dealersHand[lastCardIndex]);
            dealerTotal = calculateTotal(dealersHand,"dealer");
        }
        checkWin();
    })

    ///////////////////////
    // UTILITY FUNCTIONS///
    ///////////////////////
    function reset(){
        theDeck = freshDeck.slice();
        shuffleDeck();
        playersHand = [];
        dealersHand = [];
        $(".card").html("")
        $(".dealer-total-number").html("0");
        $(".dealer-total-number").html("0");
        $(".message").text("");
    };

    function checkWin(){
        var playerTotal = calculateTotal(playersHand,"player");
        var dealerTotal = calculateTotal(dealersHand,"dealer");
        var winner = "";
        if (playerTotal > 21){
            winner = "Dealer wins, player busts"
        } else if(dealerTotal > 21){
            winner = "Player wins, dealer busts"
        } else{
            if (playerTotal > dealerTotal){
                winner = "You beat the dealer"
            } else if(playerTotal<dealerTotal){
                winner = "You got crushed"
            } else {
                winner = "It's a push"
            }
        }
        $(".message").text(winner);
    };

    function calculateTotal(hand,who){
        var totalHandValue = 0;
        var thisCardValue = 0;
        var hasAce = false;
        var totalAces = 0;
        for (let i=0; i<hand.length; i++){
            thisCardValue = Number(hand[i].slice(0,-1));
            if (thisCardValue > 10){
                thisCardValue = 10;
            } else if(thisCardValue == 1){
                hasAce = true;
                totalAces++;
                thisCardValue = 11;
            }
            totalHandValue += thisCardValue;
        }
        for (let i=0; i<totalAces; i++){
            if(totalHandValue > 21){
                totalHandValue -= 10
            }
        }
        var totalToUpdate = "." +who+ "-total-number";
        $(totalToUpdate).text(totalHandValue);
        return totalHandValue;
    };

    function placeCard(who,where,what){
        var slotForCard = "." +who+ "-cards .card-" +where;
        imgTag = "<img src='../images/" +what+ ".png'>";
        $(slotForCard).html(imgTag);
    };

    function createDeck(){
        var newDeck = [];
        var suits = ["h","s","d","c"];
        for (let s=0; s<suits.length; s++){
            for (let c=1; c<=13; c++){
                newDeck.push(c+suits[s]);
            }
        }
        return newDeck;
    };

    function shuffleDeck(){
        for (let i=0; i<14000; i++){
            var random1 = Math.floor(Math.random()*theDeck.length);
            var random2 = Math.floor(Math.random()*theDeck.length);
            var temp = theDeck[random1];
            theDeck[random1] = theDeck[random2];
            theDeck[random2] = temp;
        }
    };

});