import board
from digitalio import DigitalInOut, Direction, Pull
import usb_hid
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
keys_pressed = [Keycode.UP_ARROW, Keycode.DOWN_ARROW, Keycode.LEFT_ARROW, Keycode.RIGHT_ARROW, 
                Keycode.W, Keycode.S, Keycode.A, Keycode.D,
                Keycode.Q, Keycode.E, Keycode.Z, Keycode.C, 
                Keycode.Y, Keycode.U, Keycode.I, Keycode.O,
                ]

# ------------- BUTTONS ------------------

# Define button pins
joystick_pins = [
    DigitalInOut(board.D0),  # up
    DigitalInOut(board.D1),  # down
    DigitalInOut(board.D2),  # left
    DigitalInOut(board.D3),  # right
    DigitalInOut(board.D9),  # w_arrow
    DigitalInOut(board.D10),  # s_arrow
    DigitalInOut(board.D11), # a_arrow
    DigitalInOut(board.D12)  # d_arrow
]

button_pins = [
    DigitalInOut(board.D4),  # p1_black
    DigitalInOut(board.D5),  # p1_pink
    DigitalInOut(board.D6),  # p1_blue
    DigitalInOut(board.D7),  # p1_yellow
    DigitalInOut(board.A3),  # p2_black
    DigitalInOut(board.A2),  # p2_pink
    DigitalInOut(board.A0),  # p2_blue
    DigitalInOut(board.A1)  # p2_yellow
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

                if keycode is not None:
                    if button.value:  # button released
                        keyboard.release(keycode)
                    else:  # button pressed
                        if len(keycode_queue) < MAX_KEY_PRESSES:
                            keycode_queue.append(keycode)

                button_states[i] = button.value

    elif input_device in joysticks:
        #its a joystick
        for i, joystick in enumerate(joysticks):
            if input_device == joystick and joystick_states[i] != joystick.value:
                keycode = keys_pressed[i]

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
                    
                #update global lists with current values
                joystick_states[i] = joystick.value


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
    
    #check for joystick state changes
    for i, joystick in enumerate(joysticks):
        if joystick_states[i] != joystick.value:
            input_callback(joystick)
            joystick_states[i] = joystick.value

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
        '''if now > time_for_press_right_key + last_key_input:
            keyboard.press(Keycode.A)
            sleep(.1)
            keyboard.release(Keycode.A)
            last_key_input = monotonic()'''

    # Hold down button bug
    
