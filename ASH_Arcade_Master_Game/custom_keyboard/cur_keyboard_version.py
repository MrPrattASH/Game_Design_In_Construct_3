import board
from digitalio import DigitalInOut, Direction, Pull
import usb_hid
import neopixel
from rainbowio import colorwheel
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS
from adafruit_hid.keycode import Keycode
from time import sleep, monotonic

# -------------- KEYBOARD ------------

MAX_KEY_PRESSES = 6

keycode_queue = []
cur_pressed_keys = []


# Initialize the keyboard
sleep(1)  # Sleep for a bit to avoid a race condition on some systems
keyboard = Keyboard(usb_hid.devices)
keyboard_layout = KeyboardLayoutUS(keyboard) 

# The Keycode sent for each button, will be paired with a control key
keys_pressed = [Keycode.DOWN_ARROW, Keycode.UP_ARROW, Keycode.RIGHT_ARROW, Keycode.LEFT_ARROW, 
                Keycode.S, Keycode.D, Keycode.W, Keycode.A,
                Keycode.Q, Keycode.E, Keycode.Z, Keycode.C, 
                Keycode.Y, Keycode.U, Keycode.I, Keycode.ESCAPE, Keycode.O,
                ]

# ------------- BUTTONS ------------------

# Define button pins
joystick_pins = [
    DigitalInOut(board.D0),  # up
    DigitalInOut(board.D1),  # down
    DigitalInOut(board.D2),  # left
    DigitalInOut(board.D3),  # right
    DigitalInOut(board.D8),  # w_arrow
    DigitalInOut(board.D9),  # a_arrow
    DigitalInOut(board.D10),  # s_arrow
    DigitalInOut(board.D11)  # d_arrow
]

button_pins = [
    DigitalInOut(board.D4),  # p1_black
    DigitalInOut(board.D5),  # p1_pink
    DigitalInOut(board.D6),  # p1_blue
    DigitalInOut(board.D7),  # p1_yellow
    DigitalInOut(board.D12),  # p2_black
    DigitalInOut(board.D17),  # p2_pink
    DigitalInOut(board.D14),  # p2_blue
    DigitalInOut(board.D16), #Esc
    DigitalInOut(board.D15)  # p2_yellow
      # esc
]

# Initialize buttons with pull-up resistors
buttons = []
button_states = []
for pin in button_pins:
    button = pin
    button.direction = Direction.INPUT
    button.pull = Pull.UP
    buttons.append(button)
    button_states.append(button.value)

joysticks = []
joystick_states = []
for pin in joystick_pins:
    joystick = pin
    joystick.direction = Direction.INPUT
    joystick.pull = Pull.UP
    joysticks.append(joystick)
    joystick_states.append(joystick.value)

def input_callback(input_device):
    if input_device in buttons:
        #its a button
        for i, button, in enumerate(buttons):
            if input_device == button and button_states[i] != button.value:
                keycode = keys_pressed[i+8]
                strip = button_neopixels[i]
                strip_state = button_neopixels_states[i]

                if keycode is not None:
                    if button.value:  # button released
                        keyboard.release(keycode)
                        strip.brightness = 0.1
                    else:  # button pressed
                        if len(keycode_queue) < MAX_KEY_PRESSES:
                            keycode_queue.append(keycode)
                        strip.brightness = 1.0
                    strip_state = 1

                button_states[i] = button.value
                button_neopixels_states[i] = strip_state

    elif input_device in joysticks:
        p1_joystick_lights.clear()
        p2_joystick_lights.clear()
        #its a joystick
        for i, joystick in enumerate(joysticks):
            if input_device == joystick and joystick_states[i] != joystick.value:
                keycode = keys_pressed[i]
                #P1 joystick
                if i < 4:
                    strip_state = joystick_neopixels_states[0] 
                    if joysticks[0].value == False:  # down
                        p1_joystick_lights.extend([11, 12, 13, 14, 15])
                    if joysticks[1].value == False:  # up
                        p1_joystick_lights.extend([3, 4, 5, 6, 7])
                    if joysticks[2].value == False:  # right
                        p1_joystick_lights.extend([15, 0, 1, 2, 3])
                    if joysticks[3].value == False:  # left
                        p1_joystick_lights.extend([7, 8, 9, 10, 11])
                #P2 Joystick
                else:
                    strip_state = joystick_neopixels_states[1]
                    if joysticks[4].value == False:  # S
                        p2_joystick_lights.extend([13, 14, 15, 0, 1])
                    if joysticks[5].value == False:  # D
                        p2_joystick_lights.extend([1, 2, 3, 4, 5])
                    if joysticks[6].value == False:  # W
                        p2_joystick_lights.extend([5, 6, 7, 8, 9])
                    if joysticks[7].value == False:  # A
                        p2_joystick_lights.extend([9, 10, 11, 12, 13])

                if keycode is not None:
                    if joystick.value:  # button released
                        #if keycode not in keycode_queue:
                        keyboard.release(keycode)
                        if keycode in cur_pressed_keys:
                            cur_pressed_keys.remove(keycode)
                    else:  # button pressed
                        
                        if len(keycode_queue) < MAX_KEY_PRESSES:
                            keycode_queue.append(keycode)
                            cur_pressed_keys.append(keycode)
                    
                    strip_state = 1 #setup for updating neopixel strips

                #update global lists with current values
                joystick_states[i] = joystick.value
                if i < 4:
                    joystick_neopixels_states[0] = strip_state 
                else:
                    joystick_neopixels_states[1] = strip_state

# ---------------  JOYSTICKS ---------------
p1_joystick_lights = []
p2_joystick_lights = []

# used for player joystick events
def light_up_pixels(neopixels, indexes):
    num_pixels = 16

    neopixels.fill((0,0,0))
    # Turn on pixels at specified indexes with desired color
    for i in indexes:
        if i<num_pixels:
            neopixels[i] = (255,0,0)
    neopixels.show()

# --------------------- NEOPIXELS -------------------------

# main brightness & num pixels
num_pixels = 16
neo_brightness = 0.05
neopixel_changed = False #flag for NO inputs on the arcade. 

# Define neopixel pin numbers for each neopixel strip
button_neopixels = []
button_neopixels_states = []
but_neopixel_pins = [
    board.D26,  # p1_black_neopixel
    board.D27,  # p1_pink_neopixel
    board.D28,  # p2_blue_neopixel
    board.D29,  # p2_yellow_neopixel
    board.D34,  # p2_black_neopixel
    board.D38,  # p2_pink_neopixel
    board.D36,  # p2_blue_neopixel
    board.D37,  # p2_yellow_neopixel
    board.D35  # esc_neopixel
]

joystick_neopixels = []
joystick_neopixels_states = []

joy_neopixel_pins = [
    board.D22,  # p1_neopixel
    board.D30  # p2_neopixel
]

# Initialize each neopixel strip and add it to the neopixels list
for neopixel_pin in but_neopixel_pins:
    neopixel_strip = neopixel.NeoPixel(
        neopixel_pin, num_pixels, brightness=neo_brightness, auto_write=False
    )
    button_neopixels.append(neopixel_strip)
    button_neopixels_states.append(0) # init state

for neopixel_pin in joy_neopixel_pins:
    neopixel_strip = neopixel.NeoPixel(
        neopixel_pin, num_pixels, brightness=neo_brightness, auto_write=False
    )
    joystick_neopixels.append(neopixel_strip)
    joystick_neopixels_states.append(0) # init state

# -------------------- NEOPIXEL COLOURS INIT -------------------
#black buttons
button_neopixels[0].fill((255, 0, 0))
button_neopixels[4].fill((255, 0, 0))

#blue
button_neopixels[2].fill((0, 153, 255))
button_neopixels[6].fill((0, 153, 255))

#pink
button_neopixels[1].fill((255, 51, 85))
button_neopixels[5].fill((255, 51, 85))

#yellow
button_neopixels[3].fill((230,191,0))
button_neopixels[8].fill((0,0,0))

#Escape Key Rainbow
for i in range(num_pixels):
    rc_index = (i * 256 // num_pixels)
    #check this
    button_neopixels[7][i] = colorwheel(rc_index & 255)

#Joysticks
joystick_neopixels[0].fill((255, 0, 0))
joystick_neopixels[1].fill((255, 0, 0))
#apparently a brightness value <1.0 adds significant input lag? 
joystick_neopixels[0].brightness = 1.0
joystick_neopixels[1].brightness = 1.0

#show init colours
all_neopixels = button_neopixels + joystick_neopixels
for i in range(len(all_neopixels)):
    all_neopixels[i].show()

last_key_input = monotonic()
time_for_press_right_key = 20
# ---------------------------- Main loop -----------------------------
while True:
    #check for button state changes
    now = monotonic()
    for i, button in enumerate(buttons):
        if button_states[i] != button.value:
            input_callback(button)
            button_states[i] = button.value
            neopixel_changed = True #set flag
    
    #check for joystick state changes
    for i, joystick in enumerate(joysticks):
        if joystick_states[i] != joystick.value:
            input_callback(joystick)
            joystick_states[i] = joystick.value
            neopixel_changed = True #set flag

    #double key bug protection
    if cur_pressed_keys:
        for key in cur_pressed_keys:
            if key not in keycode_queue:
                keycode_queue.append(key)

    #setup for a grouped call to keyboard   
    if keycode_queue:
        #print("There is a keyboard queue of: " + str(keycode_queue))
        last_key_input = monotonic()
        #clean duplicates from the queue
        cleaned_keycode_queue = list(set(keycode_queue))
        for i in range(len(cleaned_keycode_queue)):
            #process all key presses from the queue
            keycode = cleaned_keycode_queue.pop()
            
            #Stop the double press glitch with W>WA>W causing W to STOP releasing. 
            if keycode in cur_pressed_keys:
                keyboard.release(keycode)
            keyboard.press(keycode)
            
            #janky instant release button press. If a button was pressed, release it right away
            #prior to attempting to press more buttons
            instant_release_button = False
            for i in range(8,len(keys_pressed)):
                
                if keycode == keys_pressed[i]: #button was pressed 
                    instant_release_button = True
            if instant_release_button:        
                keyboard.release(keycode)
                instant_release_button = False
        #clear the queue
        keycode_queue =[]
        #is a key held for more tha 1s? 
    else:
        #release all keys if no queue exists
        keyboard.release_all()
        
        
        #10s idle
        #if we haven't pressed a key in 10 seconds, press a key
        #to stop screen from restarting. 
        if now > time_for_press_right_key + last_key_input:
            keyboard.press(Keycode.A)
            sleep(.1)
            keyboard.release(Keycode.A)
            last_key_input = monotonic()

    # Hold down button bug
    
    
    if neopixel_changed:
        
        #setup for a grouped call to i2c bus
        all_neopixels = button_neopixels
        all_neopixel_states = button_neopixels_states + joystick_neopixels_states

        #update joy/button lists for next button state check, but remove extra show call
        for i, neopixel_strip in enumerate(joystick_neopixels):
            if joystick_neopixels_states[i] == 1: #strip was updated since last call
                
                #update joystick neopixels to show correct pixels
                if i == 0:
                    light_up_pixels(joystick_neopixels[0], p1_joystick_lights)
                else:
                    light_up_pixels(joystick_neopixels[1], p2_joystick_lights)
                
                joystick_neopixels_states[i] = 0 #reset strip state
        
        for i, neopixel_strip in enumerate(button_neopixels):
            if button_neopixels_states[i] == 1: #strip was updated
                button_neopixels_states[i] = 0 #reset strip state

        #show all neopixel change
        for i in range(len(button_neopixels)):
            neopixel_strip = all_neopixels[i]
            neopixel_state = all_neopixel_states[i]
            
            #update changed strip
            if neopixel_state == 1:
                neopixel_strip.show()
        
        

        #update neopixel joystick lists back to null
        #reset NO INPUT flag
        neopixel_changed = False
    sleep(.1)
    
