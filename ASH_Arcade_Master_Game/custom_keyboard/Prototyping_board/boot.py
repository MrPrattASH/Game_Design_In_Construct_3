# Prototype ASHCADE Board Boot.py 
import storage
import board, digitalio
import usb_hid
import time

time.sleep(1)
# On the Macropad, pressing a key grounds it. You need to set a pull-up.
# If not pressed, the key will be ESC (due to the pull-up).
button = digitalio.DigitalInOut(board.D4)
button.pull = digitalio.Pull.UP

# Disable devices only if button is not pressed.
if button.value:
   storage.disable_usb_drive()
   usb_hid.enable((usb_hid.Device.KEYBOARD), boot_device=1)