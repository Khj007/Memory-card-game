
// other themes to add ?
// bigger memory?

var library = {
    starwars: [
      'https://res.cloudinary.com/beumsk/image/upload/v1547980981/memory/starwars/anakin%20skywalker.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981009/memory/starwars/luke%20skywalker.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981022/memory/starwars/Obi%20wann.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981054/memory/starwars/Han%20solo.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981074/memory/starwars/chewbacca.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981095/memory/starwars/yoda.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981117/memory/starwars/dark%20sidious.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981141/memory/starwars/dark%20vador.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981165/memory/starwars/padme.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981190/memory/starwars/leia.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547980981/memory/starwars/anakin%20skywalker.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981009/memory/starwars/luke%20skywalker.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981022/memory/starwars/Obi%20wann.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981054/memory/starwars/Han%20solo.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981074/memory/starwars/chewbacca.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981095/memory/starwars/yoda.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981117/memory/starwars/dark%20sidious.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981141/memory/starwars/dark%20vador.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981165/memory/starwars/padme.jpg',
      'https://res.cloudinary.com/beumsk/image/upload/v1547981190/memory/starwars/leia.jpg'
    ],
  }
  
  var images = [];
  var tempElt1 = "";
  var tempElt2 = "";
  var click = -1;
  var win = 0;
  var score = 0;
  var time = 0;
  
  var preElt = document.querySelector("#pre");
  var themesElt = document.querySelector("#themes");
  var boxElts = document.getElementsByClassName("box");
  var mainElt = document.querySelector(".main");
  var timeElt = document.querySelector("#time");
  var scoreElt = document.querySelector("#score");
  var postElt = document.querySelector("#post");
  var finalElt = document.querySelector("#final");
  var againElt = document.querySelector("#again");
  
  
  // initiate the game with chosen theme
  themesElt.addEventListener("click", function(e) {
    if (e.target.classList.contains("themes")) {
      activateTheme(e.target.id);
      preElt.classList.add("hidden");
    }
  });
  
  
  function activateTheme(theme) {
    // insert theme in images array
    for (let i = 0; i < 20; i++) {images.push(library[theme][i]);}  
    // insert images in memory game
    for (let i = 0; i < 20; i++) {
      var rand = Math.floor(Math.random() * (images.length - 1));
      boxElts[i].innerHTML = "<img src='" + images[rand] + "' alt='image' class='hidden'>";
      images.splice(rand, 1);
    }
  }
  
  
  // Handle the play
  mainElt.addEventListener("click", gameLogic);
  
  function gameLogic(e) {
    // make sure the box is playable
    if (e.target.classList.contains("play")) {
      e.target.firstChild.classList.remove("hidden");
      // first of two click
      if (click < 1) {
        tempElt1 = e.target;
        // timer
        if (click === -1) {
          timer = setInterval(function() {
            time++;
            timeElt.innerHTML = time;
          }, 1000);
        }
        click = 1;
      }
  
      // second click
      else if (e.target !== tempElt1) {
        tempElt2 = e.target;
  
        // different images
        if (tempElt1.firstChild.src !== tempElt2.firstChild.src) {
          mainElt.removeEventListener("click", gameLogic);
          setTimeout( function() {
            tempElt1.firstChild.classList.add("hidden");
            tempElt2.firstChild.classList.add("hidden");
            mainElt.addEventListener("click", gameLogic);
          }, 400);
          if (score > 0) {
            score -= 2;
          }
          scoreElt.innerHTML = score;
        }
  
        // same images
        else {
          score += 10;
          win += 2;
          tempElt1.firstChild.classList.add("outlined");
          tempElt2.firstChild.classList.add("outlined");
          tempElt1.classList.remove("play");
          tempElt2.classList.remove("play");
          scoreElt.innerHTML = score;
  
          // game won
          if (win === 20) {
            clearInterval(timer);
            finalElt.innerHTML = "You won " + score + " points <br> in " + time + " seconds";
            postElt.classList.remove("hidden");
          }
        }
        click = 0;
      }
    }
  }
  
  againElt.addEventListener("click", resetGame);
  
  function resetGame() {
    // reset game
    tempElt1 = "";
    tempElt2 = "";
    click = -1;
    win = 0;
    score = 0;
    time = 0;
    postElt.classList.add("hidden");
    preElt.classList.remove("hidden");
    for (let i = 0; i < 20; i++) {
      boxElts[i].classList.add("play");
      boxElts[i].firstChild.classList.add("hidden");
    }
    timeElt.textContent = time;
    scoreElt.textContent = score;
  }
  