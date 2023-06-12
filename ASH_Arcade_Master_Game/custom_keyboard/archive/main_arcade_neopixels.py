# Write your code here :-)
import board
from digitalio import DigitalInOut, Direction, Pull
import neopixel
from rainbowio import colorwheel


# ------------------------ Init buttons ------------------------

# up
up_arrow = DigitalInOut(board.D0)
up_arrow.direction = Direction.INPUT
up_arrow.pull = -Pull.UP

# down
down_arrow = DigitalInOut(board.D1)
down_arrow.direction = Direction.INPUT
down_arrow.pull = Pull.UP

# left
left_arrow = DigitalInOut(board.D2)
left_arrow.direction = Direction.INPUT
left_arrow.pull = Pull.UP

# right
right_arrow = DigitalInOut(board.D3)
right_arrow.direction = Direction.INPUT
right_arrow.pull = Pull.UP

# p1_black
p1_black = DigitalInOut(board.D4)
p1_black.direction = Direction.INPUT
p1_black.pull = Pull.UP

# p1_pink
p1_pink = DigitalInOut(board.D5)
p1_pink.direction = Direction.INPUT
p1_pink.pull = Pull.UP

# p2_blue
p2_blue = DigitalInOut(board.D6)
p2_blue.direction = Direction.INPUT
p2_blue.pull = Pull.UP

# p2_yellow
p2_yellow = DigitalInOut(board.D7)
p2_yellow.direction = Direction.INPUT
p2_yellow.pull = Pull.UP

# w_arrow
w_arrow = DigitalInOut(board.D8)
w_arrow.direction = Direction.INPUT
w_arrow.pull = Pull.UP

# a_arrow
a_arrow = DigitalInOut(board.D9)
a_arrow.direction = Direction.INPUT
a_arrow.pull = Pull.UP

# s_arrow
s_arrow = DigitalInOut(board.D10)
s_arrow.direction = Direction.INPUT
s_arrow.pull = Pull.UP

# d_arrow
d_arrow = DigitalInOut(board.D11)
d_arrow.direction = Direction.INPUT
d_arrow.pull = Pull.UP

# p2_black
p2_black = DigitalInOut(board.D12)
p2_black.direction = Direction.INPUT
p2_black.pull = Pull.UP

# p2_pink
p2_pink = DigitalInOut(board.D13)
p2_pink.direction = Direction.INPUT
p2_pink.pull = Pull.UP

# p2_blue
p2_blue = DigitalInOut(board.D14)
p2_blue.direction = Direction.INPUT
p2_blue.pull = Pull.UP

# p2_yellow
p2_yellow = DigitalInOut(board.D15)
p2_yellow.direction = Direction.INPUT
p2_yellow.pull = Pull.UP

# esc
esc = DigitalInOut(board.D16)
esc.direction = Direction.INPUT
esc.pull = Pull.UP

# ------------------------------ INIT NEOPIXELS -----------------------------
# main brightness & num pixels
num_pixels = 16
neo_brightness = 1.0

# p1 neopixel
p1_neopixel_pin = board.D22
p1_neopixel = neopixel.NeoPixel(
    p1_neopixel_pin, num_pixels, brightness=neo_brightness, auto_write=True
)

# p1_black neopixel
p1_black_neopixel_pin = board.D26
p1_black_neopixel = neopixel.NeoPixel(
    p1_black_neopixel_pin, num_pixels, brightness=neo_brightness, auto_write=True
)

# p1_pink neopixel
p1_pink_neopixel_pin = board.D27
p1_pink_neopixel = neopixel.NeoPixel(
    p1_pink_neopixel_pin, num_pixels, brightness=neo_brightness, auto_write=True
)

# p2_blue neopixel
p2_blue_neopixel_pin = board.D28
p2_blue_neopixel = neopixel.NeoPixel(
    p2_blue_neopixel_pin, num_pixels, brightness=neo_brightness, auto_write=True
)

# p2_yellow neopixel
p2_yellow_neopixel_pin = board.D29
p2_yellow_neopixel = neopixel.NeoPixel(
    p2_yellow_neopixel_pin, num_pixels, brightness=neo_brightness, auto_write=True
)

# player_2 neopixel
p2_neopixel_pin = board.D30
p2_neopixel = neopixel.NeoPixel(
    p2_neopixel_pin, num_pixels, brightness=neo_brightness, auto_write=True
)

# p2_black neopixel
p2_black_neopixel_pin = board.D34
p2_black_neopixel = neopixel.NeoPixel(
    p2_black_neopixel_pin, num_pixels, brightness=neo_brightness, auto_write=True
)

# p2_pink neopixel
p2_pink_neopixel_pin = board.D35
p2_pink_neopixel = neopixel.NeoPixel(
    p2_pink_neopixel_pin, num_pixels, brightness=neo_brightness, auto_write=True
)

# p2_blue neopixel
p2_blue_neopixel_pin = board.D36
p2_blue_neopixel = neopixel.NeoPixel(
    p2_blue_neopixel_pin, num_pixels, brightness=neo_brightness, auto_write=True
)

# p2_yellow neopixel
p2_yellow_neopixel_pin = board.D37
p2_yellow_neopixel = neopixel.NeoPixel(
    p2_yellow_neopixel_pin, num_pixels, brightness=neo_brightness, auto_write=True
)

# esc neopixel
esc_neopixel_pin = board.D37
esc_neopixel = neopixel.NeoPixel(
    esc_neopixel_pin, num_pixels, brightness=neo_brightness, auto_write=True
)

# ------------------------- Init variables ------------------------------

# used for up arrow index calculations
p1_joystick_lights = []
p2_joystick_lights = []

# =--------------------- DEFINE FUNCTIONS ----------------------

# used for player joystick events
def light_up_pixels(pixels, indexes):
    num_pixels = len(pixels)

    # Turn on pixels at specified indexes with desired color
    for i in range(num_pixels):
        if i in indexes:
            pixels[i] = (255, 0, 0)  # Red color
        else:
            pixels[i] = (0, 0, 0)  # Turn off other pixels

def rainbow_cycle(wait):
    for j in range(255):
        for i in range(num_pixels):
            rc_index = (i * 256 // num_pixels) + j
            pixels[i] = colorwheel(rc_index & 255)
        pixels.show()
        time.sleep(wait)

while True:

    # ------------------- JOYSTICKS ----------------
    # p1 joystick setup
    p1_joystick_lights = []
    if not up_arrow.value:
        p1_joystick_lights.append[0, 1, 2, 3]

    if not down_arrow.value:
        p1_joystick_lights.append[4, 5, 6, 7]

    if not left_arrow.value:
        p1_joystick_lights.append[8, 9, 10, 11]

    if not right_arrow.value:
        p1_joystick_lights.append[12, 13, 14, 15]

    # light up specific indeces from p1 joystick
    light_up_pixels(p1_neopixel, p1_joystick_lights)

    # p2 joystick
    p2_joystick_lights = []
    if not w_arrow.value:
        p2_joystick_lights.append[0, 1, 2, 3]

    if not s_arrow.value:
        p2_joystick_lights.append[4, 5, 6, 7]

    if not a_arrow.value:
        p2_joystick_lights.append[8, 9, 10, 11]

    if not d_arrow.value:
        p2_joystick_lights.append[12, 13, 14, 15]

    # light up specific indeces from p1 joystick
    light_up_pixels(p2_neopixel, p2_joystick_lights)

    # ------------------------- BUTTONS ---------------------------
    if not p1_black.value:
        p1_black_neopixel.fill((0, 0, 255))
    else:
        p1_black_neopixel.fill((0, 0, 0))

    if not p1_pink.value:
        p1_pink_neopixel.fill((255, 51, 153))
    else:
        p1_pink_neopixel.fill((0, 0, 0))

    if not p2_blue.value:
        p2_blue_neopixel.fill((0, 153, 255))
    else:
        p2_blue_neopixel.fill((0, 0, 0))

    if not p2_yellow.value:
        p2_yellow_neopixel.fill((255, 255, 0))
    else:
        p2_yellow_neopixel.fill((0, 0, 0))

    if not p2_black.value:
        p2_black_neopixel.fill((0, 0, 255))
    else:
        p2_black_neopixel.fill((0, 0, 0))

    if not p2_pink.value:
        p2_pink_neopixel.fill((255, 51, 153))
    else:
        p2_pink_neopixel.fill((0, 0, 0))

    if not p2_blue.value:
        p2_blue_neopixel.fill((0, 153, 255))
    else:
        p2_blue_neopixel.fill((0, 0, 0))

    if not p2_yellow.value:
        p2_yellow_neopixel.fill((255, 255, 0))
    else:
        p2_yellow_neopixel.fill((0, 0, 0))

    if not esc.value:
        esc_neopixel.fill((0, 0, 255))
    else:
        esc_neopixel.fill((0, 0, 0))

    # Call the neopixel show() method to update the colors
    """down_arrow_neopixel.show()
    left_arrow_neopixel.show()
    right_arrow_neopixel.show()
    p1_black_neopixel.show()
    p1_pink_neopixel.show()
    p2_blue_neopixel.show()
    p2_yellow_neopixel.show()
    w_arrow_neopixel.show()
    a_arrow_neopixel.show()
    s_arrow_neopixel.show()
    d_arrow_neopixel.show()
    p2_black_neopixel.show()
    p2_pink_neopixel.show()
    p2_blue_neopixel.show()
    p2_yellow_neopixel.show()
    esc_neopixel.show()"""

    # Add a small delay to avoid excessive loop iteration
    sleep(0.1)
