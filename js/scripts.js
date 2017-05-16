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
        // console.log(playersHand);
        // console.log(dealersHand);
        placeCard("player","1",playersHand[0]);
        placeCard("dealer","1",dealersHand[0]);
        placeCard("player","2",playersHand[1]);
        placeCard("dealer","2",dealersHand[1]);
    });

    function placeCard(who,where,cardToPlace){
        var classSelector = "." +who+ "-cards .card-" +where;
        $(classSelector).html("<img src='images/" +cardToPlace+ ".png'>");
    }

    function shuffleDeck(){
        // loop a big number of times
        // eacht ime through switch two elements in the array
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