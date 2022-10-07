> “Code Tells You How, Comments Tell You Why.” 

## By the end of this tutorial you should know:
1. What is a comment?
2. Why are comments important to make when programming? 
3. What is the purpose of a good quality comment?
4. What are 7 "rules" for good code comments? 

# Tutorial
[This article](https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/) was originally written by Ellen Spertus of StackOverflow, and has been slightly modified to better fit the context of this course. 

Famed MIT professor Hal Abelson said:
> “Programs must be written for people to read and only incidentally for machines to execute.” 

While he may have purposely understated the importance of running code, he is spot on that programs have two very different audiences. Compilers and interpreters ignore comments and find all syntactically correct programs equally easy to understand. Human readers are very different. We find some programs harder to understand than others, and we look to comments to help us make sense of them. 

> Rule 1: Comments should not duplicate the code.
> Rule 2: Good comments do not excuse unclear code.
> Rule 3: If you can’t write a clear comment, there may be a problem with the code.
> Rule 4: Comments should dispel confusion, not cause it.
> Rule 5: Provide links to the original source of copied code.
> Rule 6: Add comments when fixing bugs.
> Rule 7: Use TODO: comments to mark incomplete implementations.

The rest of this article explains each of these rules, providing examples and explaining how and when to apply them.

## Rule 1: Comments should not duplicate the code
Many junior programmers write too many comments because they were trained to do so by their introductory instructors. This is an example of a duplicate code in comments: 

<img width="444" alt="Screen Shot 2022-05-20 at 10 26 32" src="https://user-images.githubusercontent.com/101632496/169487096-1204f747-4763-47f4-b701-59ea05fa342b.png">
Comments that add no information have negative value because they:

- add visual clutter
- take time to write and read
- can become out-of-date

*Note from Mr. Pratt: Throughout this course in tutorials, you will indeed see comments like this from me. However, they are there to point out to you exactly what a behaviour does, and how it is implemented. I am doing this because you may not be aware of how simple behaviours work yet. Understand this is bad practice, but good practice for tutorials. 

## Rule 2: Good comments do not excuse unclear code
Another misuse of comments is to provide information that should have been in the code. A simple example is when someone names a variable with a single letter (in this case, "s") and then adds a comment describing its purpose:

<img width="697" alt="Screen Shot 2022-05-20 at 10 29 59" src="https://user-images.githubusercontent.com/101632496/169487769-2727e2fd-6275-4882-b991-0abcc8d739f3.png">

The need for comments could be eliminated with better variable naming: s should have been score

## Rule 3: If you can’t write a clear comment, there may be a problem with the code
The most infamous comment in the Unix source code is “You are not expected to understand this,” which appeared before some hairy context-switching code. Dennis Ritchie later explained that it was intended “in the spirit of ‘This won’t be on the exam,’ rather than as an impudent challenge.” Unfortunately, it turned out that he and co-author Ken Thompson didn’t understand it themselves and later had to rewrite it.

This brings to mind Kernighan’s Law:

> Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.

Warning readers away from your code is like turning on your car’s hazard lights: an admission that you’re doing something you know is illegal. Instead, rewrite the code to something you understand well enough to explain or, better yet, that is straightforward.

## Rule 4: Comments should dispel confusion, not cause it
No discussion of bad comments would be complete without this story from Steven Levy’s Hackers: Heroes of the Computer Revolution:

> [Peter Samson] was particularly obscure in refusing to add comments to his source code explaining what he was doing at a given time. One well-distributed program Samson wrote went on for hundreds of assembly-language instructions, with only one comment beside an instruction that contained the number 1750. The comment was RIPJSB, and people racked their brains about its meaning until someone figured out that 1750 was the year Bach died, and that Samson had written an abbreviation for Rest In Peace Johann Sebastian Bach.

While I appreciate a good hack as much as the next person, this is not exemplary. If your comment causes confusion instead of dispelling it, remove it.

## Rule 5: Provide links to the original source of copied code
If you’re like most programmers, you sometimes use code that you find online. Including a reference to the source enables future readers to get the full context, such as:

- what problem was being solved
- who provided the code
- why the solution is recommended
- what commenters thought of it
- whether it still works
- how it can be improved

You can simply include a hyperlink inside your code comment to a tutorial or forum post you took the code from. Some programmers may be reluctant to indicate that they did not write code themselves, but reusing code can be a smart move, saving time and giving you the benefit of more eyeballs. Of course, **you should never paste in code that you don’t understand.**

## Rule 6: Add comments when fixing bugs
Comments should be added not just when initially writing code but also when modifying it, especially fixing bugs. Consider this comment:

<img width="556" alt="Screen Shot 2022-05-20 at 10 34 19" src="https://user-images.githubusercontent.com/101632496/169488561-ad785603-5aa2-4155-b209-fac44551bb49.png">

Not only does the comment help the reader understand the code in the current and referenced methods, it is helpful for determining whether the code is still needed and how to test it.

## Rule 7: Use TODO: comments to mark incomplete implementations
Sometimes it’s necessary to check in code even though it has known limitations. While it can be tempting not to share known deficiencies in one’s code, it is better to make these explicit, such as with a TODO comment:

<img width="552" alt="Screen Shot 2022-05-20 at 10 35 29" src="https://user-images.githubusercontent.com/101632496/169488750-7f58bbb6-8cc9-44f9-84b9-83e51bf894cd.png">

Using a standard format for such comments helps with measuring and addressing technical debt. Better yet, add an issue to your tracker via GitHub, and reference the issue in your comment.

## Conclusion
I hope the above examples have shown that comments don’t excuse or fix bad code; they complement good code by providing a different type of information. As Stack Overflow co-founder Jeff Atwood has written, 

> “Code Tells You How, Comments Tell You Why.” 

Following these rules should save you and your teammates time and frustration. 

That said, I’m sure these rules aren’t exhaustive and look forward to seeing suggested additions in (where else?) the comments.
>


# Adding Code Comments in Construct 3
How do we add comments? Right click on any individual event, code group, individual action, etc: 

<img width="558" alt="Screen Shot 2022-10-07 at 13 42 25" src="https://user-images.githubusercontent.com/101632496/194545667-c0664b6b-3135-4d3e-b89a-86acb759b9c4.png">

Then, select
>
> Add + Add Comment
>

<img width="671" alt="Screen Shot 2022-10-07 at 13 42 02" src="https://user-images.githubusercontent.com/101632496/194545742-0d613bde-d950-411d-b9b0-f55689f57f56.png">



## Self-Assessment Quiz:
Complete [this self-assessment quiz](https://docs.google.com/forms/d/e/1FAIpQLSe-gp2r-hO95swxyoS1-yOJksn329CtunUSjMo_qGqnv_30Fw/viewform?usp=sf_link) after completing the tutorial. If after completing the self-assessment form, you find you are still missing content knowledge, go back through that section of the tutorial to solidify that knowledge *before moving on to the next module*.  
