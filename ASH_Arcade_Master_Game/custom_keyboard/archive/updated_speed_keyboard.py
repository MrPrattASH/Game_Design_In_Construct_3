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

# Initialize the keyboard
sleep(1)  # Sleep for a bit to avoid a race condition on some systems
keyboard = Keyboard(usb_hid.devices)
keyboard_layout = KeyboardLayoutUS(keyboard) 

# The Keycode sent for each button, will be paired with a control key
keys_pressed = [Keycode.UP_ARROW, Keycode.DOWN_ARROW, Keycode.LEFT_ARROW, Keycode.RIGHT_ARROW, 
                Keycode.Q, Keycode.E, Keycode.Z, Keycode.C, 
                Keycode.W, Keycode.A, Keycode.S, Keycode.D, 
                Keycode.Y, Keycode.U, Keycode.I, Keycode.O,
                Keycode.ESCAPE]

#------------- BUTTONS ------------------

# Define button pins
joystick_pins = [
    DigitalInOut(board.D0),  # up
    DigitalInOut(board.D1),  # down
    DigitalInOut(board.D2),  # left
    DigitalInOut(board.D3),  # right
    DigitalInOut(board.D8),  # w_arrow
    DigitalInOut(board.D9),  # a_arrow
    DigitalInOut(board.D10),  # s_arrow
    DigitalInOut(board.D11),  # d_arrow
]

button_pins = [
    DigitalInOut(board.D4),  # p1_black
    DigitalInOut(board.D5),  # p1_pink
    DigitalInOut(board.D6),  # p1_blue
    DigitalInOut(board.D7),  # p1_yellow
    DigitalInOut(board.D12),  # p2_black
    DigitalInOut(board.D13),  # p2_pink
    DigitalInOut(board.D14),  # p2_blue
    DigitalInOut(board.D15),  # p2_yellow
    DigitalInOut(board.D16),  # esc
]

# Initialize buttons with pull-up resistors
buttons = []
button_states = []
for pin in button_pins:
    button = DigitalInOut(pin)
    button.direction = Direction.INPUT
    button.pull = Pull.UP
    buttons.append(button)
    button_states.append(button.value)

joysticks = []
joystick_states = []
for pin in joystick_pins:
    joystick = DigitalInOut(pin)
    joystick.direction = Direction.INPUT
    joystick.pull = Pull.UP
    joysticks.append(joystick)
    joystick_states.append(joystick.value)

# Define button callbacks
def joystick_callback(joysticks):
    for i, joystick in enumerate(joysticks):
        #check prev. button state against cur button state (in lists)
        if joystick_states[i] != joystick.value:  # button state changed
            keycode = None
            strip_state = joystick_neopixels_states[i] 

            #down
            if joystick == joysticks[0]:  
                keycode = keys_pressed[1]
                p1_joystick_lights.extend([11,12,13,14,15])
            #up
            if joystick == joysticks[1]:  
                keycode = keys_pressed[0]
                p1_joystick_lights.extend([3,4, 5, 6, 7])
            #right
            if joystick == joysticks[2]: 
                keycode = keys_pressed[3]
                p1_joystick_lights.extend([15,0,1,2,3])
            #left
            if joystick == joysticks[3]:  
                keycode = keys_pressed[2]
                p1_joystick_lights.extend([7,8,9,10,11])
         

            #S
            if joystick == joysticks[4]:  
                keycode = keys_pressed[10]
                p1_joystick_lights.extend([13,14,15,0,1])
            #D
            if joystick == joysticks[5]:  
                keycode = keys_pressed[11]
                p1_joystick_lights.extend([1,2,3,4,5])
            #W
            if joystick == joysticks[6]:  
                keycode = keys_pressed[8]
                p1_joystick_lights.extend([5,6,7,8,9])
            #A
            if joystick == joysticks[7]:  
                keycode = keys_pressed[9]
                p1_joystick_lights.extend([9,10,11,12,13])
            
            if keycode is not None:
                if button.value:  # button released
                    keyboard.release(keycode)
                else:  # button pressed
                    try: 
                        keyboard.press(keycode)
                    except:
                        pass
                
                strip_state = 1 #setup for updating neopixel strips

            #update global lists with current values
            joystick_states[i] = joystick.value
            joystick_neopixels_states[i] = strip_state

# Define button callbacks
def button_callback(button):
    for i, button in enumerate(buttons):
        #check prev. button state against cur button state (in lists)
        if button_states[i] != button.value:  # button state changed
            keycode = None
            strip = button_neopixels[i]
            strip_state = button_neopixels_states[i]

            #p1 black
            if button == buttons[0]:
                keycode = keys_pressed[4]

            #p1 pink
            if button == buttons[1]:
                keycode = keys_pressed[5]
            
            #p1 blue
            if button == buttons[2]:
                keycode = keys_pressed[6]
            
            #p1 yellow
            if button == buttons[3]:
                keycode = keys_pressed[7]
            
            #Player 2 black
            if button == buttons[4]:
                keycode = keys_pressed[12]

            #p2 pink
            if button == buttons[5]:
                keycode = keys_pressed[13]

            #p2 blue
            if button == buttons[6]:
                keycode = keys_pressed[14]

            #p2 yellow
            if button == buttons[7]:
                keycode = keys_pressed[15]
            
            #Escape Key
            if button == buttons[8]:
                keycode = keys_pressed[16]

            if keycode is not None:
                if button.value:  # button released
                    keyboard.release(keycode)
                    strip.brightness = 0.05
                else:  # button pressed
                    try: 
                        keyboard.press(keycode)
                    except:
                        pass
                    strip.brightness = 0.85
                strip_state = 1

            button_states[i] = button.value
            button_neopixels_states[i] = strip_state



# ---------------  JOYSTICKS ---------------
p1_joystick_lights = []
p2_joystick_lights = []

# used for player joystick events
def light_up_pixels(neopixels, indexes):
    num_pixels = 16

    # Turn on pixels at specified indexes with desired color
    for i in range(num_pixels):
        if i in indexes:
            neopixels[i] = (255, 0, 0)  # Red color
        else:
            neopixels[i] = (0, 0, 0)  # Turn off other pixels

# --------------------- NEOPIXELS -------------------------

# main brightness & num pixels
num_pixels = 16
neo_brightness = 0.05

# Define neopixel pin numbers for each neopixel strip
button_neopixels = []
button_neopixels_states = []
but_neopixel_pins = [
    board.D26,  # p1_black_neopixel
    board.D27,  # p1_pink_neopixel
    board.D28,  # p2_blue_neopixel
    board.D29,  # p2_yellow_neopixel
    board.D34,  # p2_black_neopixel
    board.D35,  # p2_pink_neopixel
    board.D36,  # p2_blue_neopixel
    board.D37,  # p2_yellow_neopixel
    board.D38,  # esc_neopixel
]

joystick_neopixels = []
joystick_neopixels_states = []

joy_neopixel_pins = [
    board.D22,  # p1_neopixel
    board.D30,  # p2_neopixel
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


# Main loop
while True:
    
    #press keycodes and setup joystick LED indexes to turn on.
    joystick_callback()
    button_callback()

    #update joystick neopixels to show correct pixels
    light_up_pixels(joystick_neopixels[0], p1_joystick_lights)
    light_up_pixels(joystick_neopixels[1], p2_joystick_lights)
    
    #show all neopixel changes
    for i, neopixel_strip in enumerate(joystick_neopixels):
        if joystick_neopixels_states[i] == 1: #strip was updated since last call
            neopixel_strip.show()
            joystick_neopixels_states[i] = 0 #reset strip state
    
    for i, neopixel_strip in enumerate(button_neopixels):
        if button_neopixels_states[i] == 1: #strip was updated
            neopixel_strip.show()
            button_neopixels_states[i] = 0 #reset strip state

    #update neopixel joystick lists back to null
    p1_joystick_lights = []
    p2_joystick_lights = []
   
    
