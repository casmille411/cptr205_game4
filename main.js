window.addEventListener('DOMContentLoaded', DOMContentLoaded => {

    //Initialise the 2d canvas and define variables for render/resize to set canvas size. 
    const render = document.querySelector('canvas').getContext('2d');
    const resize = () => {
        render.canvas.width = render.canvas.clientWidth;
        render.canvas.height = render.canvas.clientHeight;
    };

    //Call function and add the event listener. 
    resize(); 
    window.addEventListener('resize', resize);

    //Apply physics. 
    //The goal is to control the circle with keyboard. 
    //Make player variables and radius to track it. 
    let player_x = -1, player_y = 0;
    let player_r = 0.2; 

    //Velocity variable. 
    let player_vx = 0.01, player_vy = 0; 
    
    //Acceleration variable (makes it more natural seeming). 
    let player_ax = 0, player_ay = 0

    //Should respond to keypress. 
    document.addEventListener('keydown', keydown => {
        if(keydown.key === 'ArrowRight') {
            //Makes the ball go right. 
            player_ax += 0.01
        }
        if(keydown.key === 'ArrowLeft') {
            //Makes the ball go left. 
            player_ax -= 0.01
        }
        if(keydown.key === 'ArrowUp') {
            //Ball go up. 
            player_ay += 0.01;
        }
    }); 

    //Animation loop. 
    // Timestamps can help with physics. 
    const animation = timestamp => {
        //Clear rectangle. 
        render.clearRect(0, 0, render.canvas.width, render.canvas.height)

        //Giving the rectangle colour. Hex values can be used, but normal names are easier to understand for me. 
        //The rectangle should cover the bottom half of the page. 
        render.fillStyle = 'mediumpurple';
        render.fillRect(0, render.canvas.height/2, render.canvas.width, render.canvas.height/2)

        //Another rectanlge but now on the top half of the screen. 
        render.fillStyle = 'lime'
        render.fillRect(0, 0, render.canvas.width, render.canvas.height/2);

        //Variables for the players which are circles.  
        render.fillStyle = 'darkblue';
        render.beginPath();
        const w = render.canvas.width, h = render.canvas.height
        
        //Allows movement of circle. 
        player_vx += player_ax; 
        player_x += player_vx; 
        player_ax = 0; 
        player_vx *= 0.98; 
        player_vy += player_ay;
        player_y += player_vy;
        
        //Apply gravity to the circle. 
        if(0 < player_y) {
            player_ay -= 0.00098; 
        } else {
            player_ay = 0; 
            player_vy = 0; 
            player_y = 0; 
        }
        //Draws players. 
        render.arc(player_x * w/2 + w/2, -player_y * h/2 + h/2, player_r * w/2, 0, 2 * Math.PI); 
        render.fill();



        window.requestAnimationFrame(animation)
    };
    window.requestAnimationFrame(animation)




}); 