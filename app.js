let move_speed = 3, gravity = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/die.mp3')

// getting bird element properties and determining the coordinates of the bird
let bird_props = bird.getBoundingClientRect();

// This method returns DOMReact -> top, right, bottom, left, x, y, width and height GETS THE COORDINATES OF THE BIRD
let background = document.querySelector('.background').getBoundingClientRect();

let score_value = document.querySelector('.score_value');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

//creates a function when enter is pressed starts the game
//When Enter is clicked the game state will be turned to 'Play'
document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && game_state != 'Play') {
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score: ';
        score_value.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play() {
    function move() {
        if (game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if (pipe_sprite_props.right <= 0) {
                element.remove();
            } else {
                if (bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width
                    && bird_props.left + bird_props.width > pipe_sprite_props.left &&
                    bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
                    bird_props.top + bird_props.height > pipe_sprite_props.top) {
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter to Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
                } else {
                    if (pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right
                        + move_speed >= bird_props.left && element.increase_score == '1') {
                        score_value.innerHTML = + score_value.innerHTML + 1;
                        sound_point.play();
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move); //animation method in js to update the animation
    }
    requestAnimationFrame(move); //animation method in js to update the animation

    //function that initiates switches the birds movements when the game starts
    let bird_dy = 0;
    function apply_gravity() {
        if (game_state != 'Play') return; //game will finish 
        bird_dy = bird_dy + gravity;
        document.addEventListener('keydown', (e) => {
            if (e.key == 'ArrowUp' || e.key == ' ') { //if arrow up is clicked or space is clicked switch to bird2.png
                img.src = 'img/bird2.png';
                bird_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key == 'ArrowUp' || e.key == ' ') { //if arrow up is clicked or space is clicked again switch to bird2.png
                img.src = 'img/bird.png';
            }
        });

        //if the bird falls down
        if (bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        //animation method in js to update the animation
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity); //animation method in js to update the animation

    let pipe_separation = 0;
    let pipe_gap = 35;

    //function to create random pipes
    function create_pipe() {
        if (game_state != 'Play') return;

        if (pipe_separation > 115) {
            pipe_separation = 0;
            //initializes random pipes and sizes
            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';
            //adding or creating pipes
            document.body.appendChild(pipe_sprite);
        }
        pipe_separation++;
        requestAnimationFrame(create_pipe); //animation method in js to update the animation
    }
    requestAnimationFrame(create_pipe); //animation method in js to update the animation
}
