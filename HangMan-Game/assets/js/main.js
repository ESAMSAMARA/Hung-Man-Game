// Letters 
letters = "abcdefghijklmnopqrstuvwxyz"
// Generate All Letters
generateLetters(letters)

// Object of Words  + Categories 
const words = {
    programming:["php","javascript","go","scala","fortran","r","mysql","python"],
    movies:["Prestige","Inception","Parasite","Installer","Whiplash","Memento","Coco","Up"],
    people:["Albert Einstein","Hitchcock","Alexander","Cleopatra","Mahatma Ghandi"],
    countries:["Syria","Palestine","Yemen","Egypt","Bahain","Qatar"],
}

// Get Random Property 
let all_keys = Object.keys(words)
// Make Generate Random Keys Of Words 
let random_property_number = Math.floor(Math.random() * all_keys.length)
// Get Random category Of Categories   
let cateogry = all_keys[random_property_number]
// Get Random Array From Categories  
let category_array = words[cateogry]
// Get Length Array From Words 
let category_array_number = Math.floor(Math.random() * category_array.length)
// Get Random Word Of Words  
let chosen_word = category_array[category_array_number] 
// Select Letters Guess Element 
let letters_guess_container = document.querySelector(".letters-guess") 
// Convert Chosen Word To Array 
let letter_and_space = Array.from(chosen_word.toLowerCase())
// Set Category Info 
let category_span = document.querySelector(".game-info .category span")
// Write Category Name For Word   
category_span.innerHTML = `${cateogry} ` // Answer ( ${chosen_word} )`  // Deleted Answer Next Time 
// Generate Input Text 
generateInputText()
// Select Guesse Spans 
let letters_guess_span = document.querySelectorAll(".letters-guess span")
// Set The Chose Status
let the_status = false; 
// Set Wrongs Attempts 
let wrong_attempts = 0
// Select The Draw Element 
let hangman_draw = document.querySelector(".hangman-draw")
// Duration Time 
let duration = 1000
// Select Button Start Game
let start_game = document.querySelector("#start-game"),
the_timer = false;


start_game.onclick = function(){
    document.querySelector(".start-game").style.top = "-100%"
    setTimeout(()=>{
    document.querySelector(".start-game").remove()
    },duration)
    // Start Timer 
    timer(the_timer)
}

let answers = []

// Handle Clicking On Letters 
document.addEventListener("click",(e)=>{
    // Set The Chosen Status False 
    the_status = false
    // Check If The Click On The Letter 
    if(e.target.className === "letter-box"){
        // Add Class Clicked On Clicked Letter 
        e.target.classList.add("clicked")
        // Get CLicked Letter
        let the_clicked_letter = e.target.innerHTML.toLowerCase() 
        // Make ForLoop On The Chosen Word
        letter_and_space.forEach((word_letter,word_index)=> {
            // If The Clicked Letter == To One Of The Chosen Word Letter 
            if(the_clicked_letter === word_letter){
                // Set Status To Correct 
                the_status = true
                // Loop On All Guess Spans 
                letters_guess_span.forEach((span,span_index)=>{
               
                    if(word_index === span_index ){

                        span.innerHTML = the_clicked_letter        
                        
                        answers.push(word_index)
                    }   
                })
            }
        })
        // If Letter Is Wrong 
        if(the_status !== true){
            // Increase The Wrong Attempts 
            wrong_attempts++;
            // Add Class Wrong On Tge Draw Element 
            hangman_draw.classList.add(`wrong-${wrong_attempts}`);
            // Play Fail Sound 
            document.querySelector("#fail").play();

            if(wrong_attempts == 8){
                the_timer = true 

                timer(the_timer)

                showPopup("Game Over The Word Is : ","goodresult.mp3")
        
                let letters_container = document.querySelector(".letters") 

                letters_container.classList.add("finshed")

            }
        }else { 
            // Play Success Sound 
            document.querySelector("#success").play();
        }
  
        let letters_container = document.querySelector(".letters") 

        if(answers.length == letter_and_space.length){
              the_timer = true 

            timer(the_timer)
            
            showPopup("Congratulations","goodresult.mp3")

            letters_container.classList.add("finshed")

        }    
    }
})
// Generate Daynamic Letters 
function generateLetters(letters_array = fasle){
    // Get Array From Letters 
    letters_array = Array.from(letters)
    // Select Letters Container 
    let letters_container = document.querySelector(".letters") 
    // Generate Letters
    letters_array.forEach((letter) => {
        // Create Span 
        let span = document.createElement("span")
        // Add Class In Span Element 
        span.classList.add("letter-box")
        // Create Text Span 
        let span_text = document.createTextNode(letter)
        // Append Text Span In Span 
        span.append(span_text)
        // Append Span Element In Letters Container
        letters_container.appendChild(span)
    })
}

// Generate Daynamic Time 
function timer(timer_status){
    let mintes = 2,
        seconds = 10
    let the_timer = setInterval(()=>{
        seconds--
        if(seconds == 0 ){
            if(mintes === 0 && seconds === 0){
                clearInterval(the_timer)
            }else {
            mintes-- 
            seconds = 3
            }
        }
        if(timer_status == true){
            clearInterval(the_timer)
        }
        document.querySelector(".mintes").innerHTML = mintes < 10 ? `0 ${mintes}` : mintes
        document.querySelector(".seconds").innerHTML = seconds < 10 ? `0 ${seconds}` : seconds
    },1000)
}


// Generate Dynamic Input Text 
function generateInputText(){
    // Select Letters Guess Element 
    let letters_guess_container = document.querySelector(".letters-guess") 
    // Convert Chosen Word To Array 
    let letter_and_space = Array.from(chosen_word)
    // Create Span Depend On Word 
    letter_and_space.forEach((letter) =>{
        // Create Empty Span 
        span = document.createElement("span")
        // If Letter is Exsist Space 
        if(letter == ' '){
            // Add Class To The Span 
            span.className = "with-space"
        }
        // Append Span To The Letters Guess Container 
        letters_guess_container.append(span)
    })
}

// Create Popup In Success Or Game Over
function showPopup(text_popup,sound){
    // Create Audio 
    let audio = document.createElement("audio")
    // Set Attribute Src For Audio 
    audio.setAttribute("src",`assets/${sound}`)
    // Play Audio 
    audio.play()

    let letters_container = document.querySelector(".letters") 
    letters_container.classList.add("finshed")

    // Append Audio In Document Body 
    document.body.appendChild(audio)
    // Create Pop Div 
    let div = document.createElement("div")
    // Add Class On Div 
    div.classList.add("popup")
    // Create p Element 
    let p = document.createElement("p") 
    // Create Text p
    let text_p = document.createTextNode(`${chosen_word} `)
    // Create Text Div
    let text_div = document.createTextNode(`${text_popup}`)
    // Append Text Div In Div 
    div.append(text_div)
    // Append Text p In p 
    p.append(text_p)
    // Append p In Div 
    div.appendChild(p)
    // Create Button Agine Play 
    let button = document.createElement("button")
    // Create Text Button
    let text_button = document.createTextNode("Play Agin") 
    // Append Text Button In Button 
    button.appendChild(text_button)
    // Append Button In Div 
    div .appendChild(button)  
    // Append Div In Body 
    document.body.appendChild(div)
    setTimeout(()=>{
        div.style.top = "50%"
        button.onclick = function(){
            window.location.reload()
        }
    },duration)
}
