$(document).ready(function(){
    // console.log("sanity check");
    // --------------------------------------
    // ----------MAIN FUNCTION VARS----------
    // --------------------------------------
    const freshDeck = createDeck();
    var theDeck = freshDeck;
    var playersHand = [];
    var dealersHand = [];

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
    }



    $(".deal-button").click(function(){
        console.log("User clicked deal");
        theDeck = shuffleDeck();
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
        console.log("User clicked hit");
        playersHand.push(theDeck.shift());
        placeCard("player",playersHand.length,playersHand[playersHand.length-1]);
        calculateTotal(playersHand,"player");
    });

    $(".stand-button").click(function(){
        console.log("Clicked stand");
        var dealerTotal = calculateTotal(dealersHand,"dealer");
        while(dealerTotal < 17){
            dealersHand.push(theDeck.shift());
            placeCard("dealer",dealersHand.length,dealersHand[dealersHand.length-1])
            dealerTotal = calculateTotal(dealersHand,"dealer");
        }
        checkWin();
    });


    function checkWin(){
        var playerTotal = calculateTotal(playersHand,"player");
        var dealerTotal = calculateTotal(dealersHand,"dealer");
        if (playerTotal > 21){
            console.log("Player busts and loses")
        } else if (dealerTotal > 21){
            console.log("Dealer busts, player wins")
        } else if (playerTotal > dealerTotal){
            console.log("Player wins")
        } else if (dealerTotal > playerTotal){
            console.log("Player loses")
        } else{
            console.log("It's a tie. Both of you lose.")
        }
    }

    function calculateTotal(hand,who){
        // console.log(hand);
        var total = 0;
        var thisCardValue = 0;
        for (let i=0;i<hand.length;i++){
            thisCardValue = Number(hand[i].slice(0,-1));
            total += thisCardValue;
        }
        var classSelector = "." +who+ "-total-count";
        $(classSelector).html(total);
        return total;
    }

    function placeCard(who,where,cardToPlace){
        var classSelector = "." +who+ "-cards .card-" +where;
        $(classSelector).html("<img src='images/" +cardToPlace+ ".png'>");
    }

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
    }
});