### Tutorial
This tutorial does not actually require any coding. Instead, it sets you up with *critical* knowledge before making your own games with respect to optimization. This tutorial is tailored from the [main documentation]([https://www.construct.net/en/make-games/manuals/construct-3/tips-and-guides/performance-tips]), but I have highlighted the most important sections to know with respect to our course. 

# INGRAIN THESE METHODS INTO YOUR BRAIN. 

If you begin your game poorly optimized, these main system settings are *next to impossible to change without re-formatting and changing artwork on ALL GAME LAYOUTS.* Fail to take this advice to heart at your own peril. I would suggest you consistently refer back to these methods throughout the next projects. 

## By the end of this tutorial you should know:
1. Why testing your game on mobile devices (if you're making a mobile game) is important
2. What is "GPU Fill Rate" and how to optimize artwork to reduce Fill Rates 
3. Common causes of poor performance
4. Things that do not impact performance

## Mobile Performance
Generally the main problem with performance is getting your game to run well on mobile devices like phones and tablets. It's harder to get good performance on these devices because they often have much weaker hardware: slower CPUs, slower graphics chips, and less memory.

Modern desktop computers are very powerful, and most people develop on desktop devices. If you are developing a game for mobile, you must test on mobile from the start. Since your computer may be several times faster than your mobile device, you may inadvertently design a game that has no hope of running well on a mobile device and not find out until later. To avoid surprises, test regularly on the intended device to make sure it is still running fast enough. The [Remote Preview](https://www.construct.net/en/blogs/construct-official-blog-1/introducing-remote-preview-877_ feature can make this quick and easy.

Testing regularly on your target devices also allows you to quickly spot any changes which have a big performance impact and revise it to be faster. If you don't realise your game is slow until a long way in to development, it can be very difficult to identify what is making it slow. Being able to identify which change caused poor performance is essential to help you design a well-performing game. You may need to design simpler games for mobile devices to match their lower speed and resources.

## GPU Fill rate
The GPU is the Graphics Processing Unit, the chip responsible for rendering graphics on the display. Drawing pixels on the screen (also known as "filling in" pixels) requires writing them to memory. Drawing more images, and larger images, requires writing more pixels to memory. **The data rate of writing all this pixel data to memory is called the fill rate.** Once the fill rate exceeds the GPU memory bandwidth (the rate at which data can be written), the game will start to slow down as the GPU cannot keep up.

To fully understand fill rate, it's important to also know that Construct renders games back-to-front. This means it starts by drawing the background (the objects lowest down in Z order) and progressively drawing everything else on top until it reaches the front. Since the objects at the top of Z order are drawn last, they appear on top. However when objects overlap, this involves writing to the same pixels repeatedly. This is called overdraw and it still uses uses up fill rate, i.e. the object underneath still consumes memory bandwidth, even though it is later covered up by something on top. Therefore the worst-case scenario for fill rate is a stack of large overlapping images. Additionally, transparent areas of images still use up fill rate, that is, *transparent pixels are still rendered, they simply have no visual effect.*

Tips to reduce GPU fill rate:
- Avoid objects with large areas of transparency. Crop all images you use to remove wasteful transparent space. (Shift+Crop in the animation editor will crop the entire animation.) Split up large objects with large transparent areas in to a series of smaller objects. For example, adding a window border using a screen-sized transparent sprite with borders drawn at the edges will perform poorly as it still has to fill a large transparent area in the middle. Splitting it in to four separate objects for each edge is much more efficient since a smaller area is rendered.
- Avoid large areas of overlap between sprite objects. The overlapped area will have the pixels rendered to repeatedly, which wastes fill rate.
- Avoid too many layers which use their own texture. Enabling Force own texture, changing the opacity or blend mode, or adding an effect, all cause the layer to render to its own texture, which uses a lot of fill rate. While this is necessary in some cases to get the visual effect you want, avoid doing it too many times with layers in the same layout.

## Common causes of poor performance
- Improper viewport size. If your game is mobile, think if an HD 1920x1080 viewport is necessary. This will dramatically reduce performance and load times on slower machines. It's OK if your game is only intended for desktops however. (In reality, mobile games 1280x720 is *more* than sufficient)
- Creating too many objects. Creating thousands of objects will probably cause your game to slow down. Try to design your game to use fewer objects. The system expression objectcount can tell you how many objects you are using. 
- Too many objects using Physics. You should design your games to use a few large Physics objects rather than many small Physics objects.
- Using too many effects. Effects are visually impressive, but can slow down the game's performance if over-used. Some effects also have more performance impact than others: 
    - blurs and glows tend to be the slowest
    - distortion and background blends having a medium impact
    - color-changing effects like Grayscale, Tint and Adjust HSL being the easiest for the GPU to process.
- Unnecessary use of effects. Never use effects to process a static effect on an object, simply re-design the artwork before importing. 
- Using Sprites instead of Tiled Backgrounds. Creating too many objects can cause slowdowns, and a common mistake is to use grids of Sprite objects instead of Tiled Background objects. For example, a 20x20 grid of sprites has 400 objects, which is a significant impact on the object count. A single tiled background can replace the grid of sprites and it only counts as a single object. Tiled backgrounds are specially optimised for repeating their texture so they are far more efficient for this purpose. Always use Tiled Backgrounds instead of repeating Sprites wherever possible.
- Changing *large* Text objects every tick. Small text objects are generally OK, but it would be better to update the text when a relevant event happens (ie, losing health, gaining gold, etc.)

## Common misconceptions.
These are often *thought* to impact performance, but do not. 

- Off-screen objects are not still rendered. For example, if you have a GIANT layout, that is 10,000x10,000 pixels, only the viewport pixels are rendered, rather than all 10,000x10,000 pixels. The layout size also does not have any direct effect; larger layouts do not use more memory or require more processing, *unless you use more objects*.
- Number of layouts also is unlikely to have any effect other than the download size. 
- Image formats (e.g. JPEG or PNG) affect the download size (project file itself) but have no effect on runtime performance. Image *sizes* however, will affect performance, based on fill rate and pixels rendered above. (a 2000x2000 pixel sprite will render slower than a 500x500) 
- Audio formats also only affect the download size but have no effect on runtime performance. (.mp3 vs .wav)
- Number of layers usually has no effect. Caveat: Layers which use their own texture have a performance impact
- Angle or opacity of objects and floating-point positions (e.g. positioning a sprite at X = 10.5) generally has no effect

## Self-Assessment Quiz:
Complete [this self-assessment quiz](https://docs.google.com/forms/d/e/1FAIpQLSdMDAlezTs1ZEJwLTbP4UcH0aViCZ2wq64ybeVvtheBDsiMbQ/viewform?usp=sf_link) after completing the tutorial. If after completing the self-assessment form, you find you are still missing content knowledge, go back through that section of the tutorial to solidify that knowledge *before moving on to the next module*.  
