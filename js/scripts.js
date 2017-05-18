$(document).ready(function(){
    // console.log("sanity check");
    const freshDeck = createDeck();
    var theDeck = freshDeck.slice();
    var playersHand = [];
    var dealersHand = [];
    var spade = "&#9824;";
    var club = "&#9827;";
    var heart = "&#9829;";
    var diamond = "&#9830;";
    var presentCards = [];


///////////////////////////////////////////////
///////////////////////////////////////////////
/////////////// BUTTON EVENTS /////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
    $(".deal-button").click(function(){
        reset();
        // Now that the deck is shuffled, update the player and dealer hands
        playersHand.push(theDeck.shift());
        dealersHand.push(theDeck.shift());
        playersHand.push(theDeck.shift());
        dealersHand.push(theDeck.shift());
        placeCard("player","1",playersHand[0]);
        placeCard("dealer","1",dealersHand[0]);
        placeCard("player","2",playersHand[1]);
        placeCard("dealer","2",dealersHand[1]);
        calculateTotal(playersHand,"player");
        calculateTotal(dealersHand,"dealer");
    });

    $(".hit-button").click(function(){
        if (calculateTotal(playersHand, "player") < 21){
            playersHand.push(theDeck.shift());
            placeCard("player",playersHand.length,playersHand[playersHand.length-1]);
            calculateTotal(playersHand,"player");
        }
    });

    $(".stand-button").click(function(){
        var dealerTotal = calculateTotal(dealersHand,"dealer");
        while(dealerTotal < 17){
            dealersHand.push(theDeck.shift());
            placeCard("dealer",dealersHand.length,dealersHand[dealersHand.length-1])
            dealerTotal = calculateTotal(dealersHand,"dealer");
        }
        checkWin();
    });


///////////////////////////////////////////////
///////////////////////////////////////////////
/////////// UTILITY FUNCTIONS /////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
    // function reset(){
    //     theDeck = freshDeck.slice();
    //     shuffleDeck();
    //     playersHand = [];
    //     dealersHand = [];
    //     $(".card").html("")
    //     $(".dealer-total-number").html("0");
    //     $(".dealer-total-number").html("0");
    //     $(".message").text("");
    // };

    function reset(){
        theDeck = freshDeck.slice();
        shuffleDeck();
        playersHand = [];
        dealersHand = [];
        presentCards = [];
        $(".card").html("")
        $(".dealer-total-number").html("0");
        $(".dealer-total-number").html("0");
        $(".message").text("");
        $(".card").removeClass("card-present");
    };

    function checkWin(){
        var playerTotal = calculateTotal(playersHand,"player");
        var dealerTotal = calculateTotal(dealersHand,"dealer");
        if (playerTotal > 21){
            winner = "Player busts and loses";
        } else if (dealerTotal > 21){
            winner = "Dealer busts, player wins";
        } else if (playerTotal > dealerTotal){
            winner = "Player wins";
        } else if (dealerTotal > playerTotal){
            winner = "Player loses"
        } else{
            winner = "It's a tie. Both of you lose.";
        }
        $(".message").text(winner);
    };

    function calculateTotal(hand,who){
        var total = 0;
        var thisCardValue = 0;
        var hasAce = false;
        var totalAces = 0;
        for (let i=0;i<hand.length;i++){
            thisCardValue = Number(hand[i].slice(0,-1));
            if (thisCardValue > 10){
                thisCardValue = 10;
            } else if(thisCardValue == 1){
                hasAce = true;
                totalAces++;
                thisCardValue = 11;
            }
            total += thisCardValue;
        }
        for (let i=0; i<totalAces; i++){
            if(total > 21){
                total -= 10
            }
        }
        var classSelector = "." +who+ "-total-count";
        $(classSelector).html(total);
        return total;
    };

    function placeCard(who,where,cardToPlace){
        var classSelector = "." +who+ "-cards .card-" +where;
        var thisCardValue = cardToPlace.slice(0,-1);
        if (thisCardValue === "1"){
            thisCardValue = "A"
        } else if(thisCardValue === "11"){
            thisCardValue = "J"
        } else if(thisCardValue === "12"){
            thisCardValue = "Q"
        } else if(thisCardValue === "13"){
            thisCardValue = "K"
        };
        var theSuit = cardToPlace.slice(-1);
        var theSymbol = "";
        if (theSuit === "s"){
            theSymbol = spade
        } else if (theSuit === "c"){
            theSymbol = club
        } else if (theSuit === "h"){
            theSymbol = heart
        } else{
            theSymbol = diamond
        };
        $(classSelector).html(thisCardValue +"<br>"+ theSymbol);
        $(classSelector).addClass("card-present");
        presentCards.push($(classSelector));
        $(classSelector).addClass("flicker");
        setTimeout(function(){ ($(classSelector).removeClass("flicker")); }, 250);
        setInterval(function(){
            for (let i=0; i<presentCards.length; i++){
                var specificCard = presentCards[i];
                var random = Math.floor(Math.random()*100)
                if (random >= 90){
                    $(specificCard).addClass("flicker");
                    setTimeout(function(){ ($(specificCard).removeClass("flicker")); }, 250);
                }else{
                    $(specificCard).removeClass("flicker");
                }
            }
        },1000);
        
        // $(classSelector).text(thisCardValue + theSymbol);
    };

    function shuffleDeck(){
        // loop a big number of times, each time through switch two elements in the array
        for (let i =0;i<5000;i++){
            var randomCard1 = Math.floor(Math.random()*theDeck.length);
            var randomCard2 = Math.floor(Math.random()*theDeck.length);
            var temp = theDeck[randomCard1];
            theDeck[randomCard1] = theDeck[randomCard2];
            theDeck[randomCard2] = temp;
        }
        return theDeck;
    };

    function createDeck(){
    // Local var, newDeck. No one knows about this but me
        var newDeck = [];
        // local var that WILL NOT be changed
        const suits = ["h","s","d","c"];
        // loop for suits(outer loop)
        for (let s=0; s<suits.length; s++){
            // loop for card values (inner loop)
            for (let c=1;c<=13;c++){
                newDeck.push(c + suits[s]);
            }
        }
        return newDeck;
    };
});