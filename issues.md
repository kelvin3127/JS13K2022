1. Shooting
    a. Shoot timing feels off
        i. pressing M1 while within the recoil cycle will cause player to not fire (even at the very end of it)
        ii. this is because of the recoil/ firerate logic
        iii. we need some indication/ feedback for when the next bullet is available
        iii. we can either: have visual display for recoil/ bullet ready
        iv. or we can do sound effect (like pistol click noise)
    b. Shooting feels unresponsive, floaty
        i. when moving left to right, bullet seems to shoot diagnal from gun
        ii. shooting has no satisfaction to it
        iii. we can: add muzzle flash to cover the beginning bullet animation
        iv.  make bullet shoot faster to make it seem stronger
2. Movement
    a. Player movement doesn't have enough feedback
        i. if there is NOTHING on screen, player doesn't know if they are moving
        ii. we can add footsteps/ move animation + sound effect
3. Object Collision
    a. Bullet to Enemy
        i. when bullet hits enemy, no feedback
        ii. we can: add knockback, animation or sound effect when enemy is hit
        iii. knockback: get collision vector of enemy, then add (x,y) to them in opposite direction
    b. Enemy to Enemy
        i. when enemy hits enemy, no feedback
        ii. we can: push enemies back in opposite direction
    c. Player to Enemy
        i. when player is hit by enemy, no feedback
        ii. player should be knocked back, enemy should not be knocked back
    