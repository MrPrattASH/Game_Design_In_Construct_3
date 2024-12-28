import board
from digitalio import DigitalInOut, Direction, Pull
import usb_hid
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS
from adafruit_hid.keycode import Keycode
from time import sleep, monotonic

# Constants
MAX_KEY_PRESSES = 6
DEBOUNCE_DELAY = 0.01

# Initialize keyboard
keyboard = Keyboard(usb_hid.devices)
keyboard_layout = KeyboardLayoutUS(keyboard)

# Keycodes associated with each button
keys_pressed = [
    
    Keycode.Q, Keycode.E, Keycode.Z, Keycode.C,
    Keycode.Y, Keycode.U, Keycode.I, Keycode.O,
    Keycode.UP_ARROW, Keycode.DOWN_ARROW, Keycode.LEFT_ARROW, Keycode.RIGHT_ARROW,
    Keycode.W, Keycode.S, Keycode.A, Keycode.D,
]

# Define button and joystick pins
joystick_pins = [
    board.D0, board.D1, board.D2, board.D3,
    board.D9, board.D10, board.D11, board.D12
]
button_pins = [
    board.D4, board.D5, board.D6, board.D7,
    board.A3, board.A2, board.A0, board.A1
]

# Initialize input devices
devices = [
    DigitalInOut(pin) for pin in (button_pins + joystick_pins)
]
for device in devices:
    device.direction = Direction.INPUT
    device.pull = Pull.UP

# Track states and debounce
device_states = [True] * len(devices)
last_debounce_times = [0] * len(devices)
cur_pressed_keys = []

def handle_input(device_index):
    current_time = monotonic()
    current_device = devices[device_index]
    if current_time - last_debounce_times[device_index] > DEBOUNCE_DELAY:
        if current_device.value != device_states[device_index]:
            keycode = keys_pressed[device_index]
            if not current_device.value:  # Button or joystick pressed
                if len(cur_pressed_keys) < MAX_KEY_PRESSES and keycode not in cur_pressed_keys:
                    keyboard.press(keycode)
                    cur_pressed_keys.append(keycode)
            else:  # Button or joystick released
                if keycode in cur_pressed_keys:
                    keyboard.release(keycode)
                    cur_pressed_keys.remove(keycode)
            last_debounce_times[device_index] = current_time
            device_states[device_index] = current_device.value

# Main loop
while True:
    for i in range(len(devices)):
        handle_input(i)
    sleep(0.01)  # General loop delay to reduce CPU usage