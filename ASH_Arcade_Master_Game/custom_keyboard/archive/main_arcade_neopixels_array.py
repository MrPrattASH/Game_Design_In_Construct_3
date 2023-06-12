import board
from digitalio import DigitalInOut, Direction, Pull
import neopixel
from rainbowio import colorwheel
from time import sleep, monotonic
import usb_hid
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS
from adafruit_hid.keycode import Keycode


# ------------------------ Init buttons ------------------------

button_pins = [
    DigitalInOut(board.D0),  # up
    DigitalInOut(board.D1),  # down
    DigitalInOut(board.D2),  # left
    DigitalInOut(board.D3),  # right
    DigitalInOut(board.D4),  # p1_black
    DigitalInOut(board.D5),  # p1_pink
    DigitalInOut(board.D6),  # p1_blue
    DigitalInOut(board.D7),  # p1_yellow
    DigitalInOut(board.D8),  # w_arrow
    DigitalInOut(board.D9),  # a_arrow
    DigitalInOut(board.D10),  # s_arrow
    DigitalInOut(board.D11),  # d_arrow
    DigitalInOut(board.D12),  # p2_black
    DigitalInOut(board.D13),  # p2_pink
    DigitalInOut(board.D14),  # p2_blue
    DigitalInOut(board.D15),  # p2_yellow
    DigitalInOut(board.D16),  # esc
]

# Set the direction and pull-up for each button pin
for button_pin in button_pins:
    button_pin.direction = Direction.INPUT
    button_pin.pull = Pull.UP

# --------------------- NEOPIXELS -------------------------
neopixels = []

# main brightness & num pixels
num_pixels = 16
neo_brightness = 0.05

# Define neopixel pin numbers for each neopixel strip
neopixel_pins = [
    board.D22,  # p1_neopixel
    board.D26,  # p1_black_neopixel
    board.D27,  # p1_pink_neopixel
    board.D28,  # p2_blue_neopixel
    board.D29,  # p2_yellow_neopixel
    board.D30,  # p2_neopixel
    board.D34,  # p2_black_neopixel
    board.D35,  # p2_pink_neopixel
    board.D36,  # p2_blue_neopixel
    board.D37,  # p2_yellow_neopixel
    board.D38,  # esc_neopixel
]

# Initialize each neopixel strip and add it to the neopixels list
for neopixel_pin in neopixel_pins:
    neopixel_strip = neopixel.NeoPixel(
        neopixel_pin, num_pixels, brightness=neo_brightness, auto_write=False
    )
    neopixels.append(neopixel_strip)

# ------------------- INIT Keyboard ----------------
'''
keyboard_pins = [
    DigitalInOut(board.D39),  # up
    DigitalInOut(board.D40),  # down
    DigitalInOut(board.D41),  # left
    DigitalInOut(board.D42),  # right
    DigitalInOut(board.D43),  # p1_black
    DigitalInOut(board.D44),  # p1_pink
    DigitalInOut(board.D45),  # p2_blue
    DigitalInOut(board.D46),  # p2_yellow
    DigitalInOut(board.D47),  # w_arrow
    DigitalInOut(board.D48),  # a_arrow
    DigitalInOut(board.D49),  # s_arrow
    DigitalInOut(board.D50),  # d_arrow
    DigitalInOut(board.D51),  # p2_black
    DigitalInOut(board.D52),  # p2_pink
    DigitalInOut(board.D53),  # p2_blue
    #BREAK THE CHAIN TO 21
    DigitalInOut(board.D31),  # p2_yellow
    DigitalInOut(board.D32),  # esc
]
'''
# Our array of key objects
keyboard_pin_array = []

# The Keycode sent for each button, will be paired with a control key
keys_pressed = [Keycode.UP_ARROW, Keycode.DOWN_ARROW, Keycode.LEFT_ARROW, Keycode.RIGHT_ARROW, 
                Keycode.Q, Keycode.E, Keycode.Z, Keycode.C, 
                Keycode.W, Keycode.A, Keycode.S, Keycode.D, 
                Keycode.Y, Keycode.U, Keycode.I, Keycode.O,
                Keycode.ESCAPE]

# The keyboard object!
sleep(1)  # Sleep for a bit to avoid a race condition on some systems
keyboard = Keyboard(usb_hid.devices)
keyboard_layout = KeyboardLayoutUS(keyboard)  # We're in the US :)

cur_keys_pressed = [0]

#pop list until we only have 6 keys pressed simultaneously
def release_keys(key):
    if len(cur_keys_pressed) > 0:
        while key in cur_keys_pressed:
            cur_keys_pressed.remove(key)
    #clear the key if not held down
    keyboard.release(key)

#remove key from double pressing into key list? 

# ------------------------- Init variables ------------------------------

# used for up arrow index calculations
p1_joystick_lights = []
p2_joystick_lights = []
button_states = []


# =--------------------- DEFINE FUNCTIONS ----------------------

# used for player joystick events
def light_up_pixels(neopixels, indexes):
    num_pixels = 16

    # Turn on pixels at specified indexes with desired color
    for i in range(num_pixels):
        if i in indexes:
            neopixels[i] = (255, 0, 0)  # Red color
        else:
            neopixels[i] = (0, 0, 0)  # Turn off other pixels

# -------------------- NEOPIXEL COLOURS INIT -------------------
#black buttons
neopixels[1].fill((255, 0, 0))
neopixels[6].fill((255, 0, 0))

#blue
neopixels[3].fill((0, 153, 255))
neopixels[8].fill((0, 153, 255))

#pink
neopixels[2].fill((255, 51, 85))
neopixels[7].fill((255, 51, 85))

#yellow
neopixels[4].fill((230,191,0))
#neopixels[9].fill((230,191,0))

#Escape Key Rainbow
for i in range(num_pixels):
    rc_index = (i * 256 // num_pixels)
    #check this
    neopixels[9][i] = colorwheel(rc_index & 255)

#Joysticks
neopixels[0].fill((255, 0, 0))
neopixels[5].fill((255, 0, 0))

while True:
    # ------------------- JOYSTICKS ----------------
    # p1 joystick setup
    now = monotonic()
    p1_joystick_lights = []
    p2_joystick_lights = []
    #down
    if not button_pins[0].value:
        p1_joystick_lights.extend([11,12,13,14,15])
        #keyboard.press(keys_pressed[0])
        cur_keys_pressed.append(keys_pressed[1])
    else:
        release_keys(keys_pressed[1])
        #keyboard.release(keys_pressed[0])
    #up
    if not button_pins[1].value:
        p1_joystick_lights.extend([3,4, 5, 6, 7])
        cur_keys_pressed.append(keys_pressed[0])
    else:
        release_keys(keys_pressed[0])
    #right
    if not button_pins[2].value:
        p1_joystick_lights.extend([15,0,1,2,3])
        cur_keys_pressed.append(keys_pressed[3])
    else:
        release_keys(keys_pressed[3])
    #left
    if not button_pins[3].value:
        p1_joystick_lights.extend([7,8,9,10,11])
        cur_keys_pressed.append(keys_pressed[2])
    else:
        release_keys(keys_pressed[2])
    
    # p2 joystick
    #s key
    if not button_pins[8].value:
        p2_joystick_lights.extend([13,14,15,0,1])
        cur_keys_pressed.append(keys_pressed[10])
    else:
        release_keys(keys_pressed[10])
    #d key
    if not button_pins[9].value:
        p2_joystick_lights.extend([1,2,3,4,5])
        cur_keys_pressed.append(keys_pressed[11])
    else:
        release_keys(keys_pressed[11])
    #w key
    if not button_pins[10].value:
        p2_joystick_lights.extend([5,6,7,8,9])
        cur_keys_pressed.append(keys_pressed[8])
    else:
        release_keys(keys_pressed[8])
    #a key
    if not button_pins[11].value:
        p2_joystick_lights.extend([9,10,11,12,13])
        cur_keys_pressed.append(keys_pressed[9])
    else:
        release_keys(keys_pressed[9])
    
    # --------------------------------------- BUTTONS ---------------------------------------
    #p1 black
    if not button_pins[4].value:
        neopixels[1].brightness = 0.85
        cur_keys_pressed.append(keys_pressed[4])
    else:
        release_keys(keys_pressed[4])
        neopixels[1].brightness = 0.05

    #p1 pink
    if not button_pins[5].value:
        neopixels[2].brightness = 0.85
        cur_keys_pressed.append(keys_pressed[5])
    else:
        neopixels[2].brightness = 0.05
        release_keys(keys_pressed[5])
    #p1 blue
    if not button_pins[6].value:
        neopixels[3].brightness = 0.85
        cur_keys_pressed.append(keys_pressed[6])
    else:
        release_keys(keys_pressed[6])
        neopixels[3].brightness= 0.05
    #p1 yellow
    if not button_pins[7].value:
        neopixels[4].brightness = 0.85
        cur_keys_pressed.append(keys_pressed[7])
    else:
        neopixels[4].brightness = 0.05
        release_keys(keys_pressed[7])
    
    #Player 2 black
    if not button_pins[12].value:
        neopixels[6].brightness = 0.85
        cur_keys_pressed.append(keys_pressed[12])
    else:
        neopixels[6].brightness = 0.05
        release_keys(keys_pressed[12])

    #p2 pink
    if not button_pins[13].value:
        neopixels[7].brightness = 0.85
        cur_keys_pressed.append(keys_pressed[13])
    else:
        release_keys(keys_pressed[13])
        neopixels[7].brightness = 0.85

    #p2 blue
    if not button_pins[14].value:
        neopixels[8].brightness = 0.85
        cur_keys_pressed.append(keys_pressed[14])
    else:
        release_keys(keys_pressed[14])
        neopixels[8].brightness = 0.85

    #p2 yellow
    if not button_pins[15].value:
        #neopixels[9].brightness = 0.85
        cur_keys_pressed.append(keys_pressed[15])
    else:
        release_keys(keys_pressed[15])
        #neopixels[9].brightness = 0.05
    
    #Escape Key
    if not button_pins[16].value:
        neopixels[9].brightness = 0.85
        cur_keys_pressed.append(keys_pressed[16])
    else:
        release_keys(keys_pressed[16])
        neopixels[9].brightness = 0.05
        
    for i in range(len(cur_keys_pressed)):
        try:
            keyboard.press(cur_keys_pressed[i])
        #stops more than 6 inputs...
        except:
            pass
        if i == 6:
            break
    
    #update all neopixels at once
    for neopixel_strip in neopixels:
        neopixel_strip.show()
    # light up specific indeces from p1 joystick
    light_up_pixels(neopixels[0], p1_joystick_lights)
     # light up specific indeces from p1 joystick
    light_up_pixels(neopixels[5], p2_joystick_lights)

    cur_keys_pressed= []

    print(monotonic()-now)
