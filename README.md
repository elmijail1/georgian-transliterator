# Georgian Transliterator

## ℹ️ Description

This web app helps you turn Latin script into Georgian. That is, characters like ABC to აბც.

![Translitearting "a b c"](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDNnZnA0ajE2czZvMTI3ZG9sa3VsMHR3Nno3dW5qcGhhZjA4dzV6OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KJ3K6ID7fHdEBbdJQ6/giphy.gif)

## 🤷‍♂️ Why do I need it?

First things first: this app is certainly not for everyone. There's a high chance that you'll find it useful, if you:

- Live in Georgia 🇬🇪
- Don't speak much Georgian
- Receive lots of promotional mobile messages
- Use lots of Georgia-based apps

If you don't tick even a single box, you still might find this app interesting if you:

- Care about languages (especially not very widespread ones)
- Like language-related apps and tools

If you live in Georgia but don't speak much Georgian, understanding texts in that language might be an issue. It has its own alphabet that differs a lot from the Latin one. Online translators help, of course, but they have limitations. This app helps you overcome one of them.

Sometimes you can find a text in Georgian written in Latin characters. It's quite common for mobile messages, for example. Pasting a text like that to most translators won't work as they don't treat the Latin text you pass to them as Georgian. That means that you first need to turn the Latin text into the special Georgian script.

I spent quite some time doing it manually. And it was just too much work to humbly put up with it. So I decided to create an app that can do it for you. You pass a text written in Latin to it and it returns the same text in the Georgian script. Now you can safely pass it to the online translator of your choice to get a translation!

## 🚀 Quick start

Find Georgian Transliterator live by following this link:
https://effervescent-bonbon-a623d1.netlify.app/

## 📖 Usage

Using Georgian Transliterator is straightforward:

1. Copy a text in the Latin script
2. Paste it into the input window
3. Get the same text in the Georgian script in the output window
4. Copy it with the help of the button on the bottom right

![Translitearting "mama da deda"](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjF3eTluM2xpNzk0YWRmbW81bTJmYzVjdG96aTl1OWt6dDJ3bHM4OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TDHvLO6tZayDI0ns9R/giphy.gif)

However, if you're willing to spend some more time learning about how it works, you'll discover more cool features that will help you with _transliterating_ things from Latin to Georgian more effectively.

(By the way, _transliteration_ just means changing the text from one script to another. So despite being a formidable word, it describes a simple concept and is quite handy. So I'll use it more often below)

### Alternative options

Transliteration from Latin to Georgian has its issues. Most notably, some Latin characters can be transliterated to Georgian in several ways. That's why the transliteration you get in this app isn't 100% accurate. It offers you the most probable character (that is, most frequently used in the language as a whole, according to data) which might not always be the right one for the word.

For example, the word "kartuli". It's a real Georgian word written in Latin and it's transliterated in this app as კართული. The first character "k" gets transliterated as კ and that's the most frequently used counterpart of "k" in Georgian indeed.

But "k" can also be transliterated as ქ. While it's a less frequent than კ in the language in general, it's the letter that this word actually has: ქართული (it translates as the adjective "Georgian").

So you can click the button "Show alternative options" and the letter კ in the word კართული will get highlighted. Click it and you'll see other options you can use. So if you know the right letter for the word, you can manually change the automatically suggested one.

![Translitearting "kartuli" and showing alternative options](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG5sMHBsMjhpZjJrNTJjamE4d2FzZjEwaW5sOTJrYjM0Z2E2NGVpYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wLhofVTXlP77T9lWwN/giphy.gif)

Please note that if a letter gets highlighted when you turn alternative options on, it doesn't mean that it's the wrong letter to use in the current word. It can be but it also can be the right one. For example, the same word ქართული will have the letter თ highlighted as well, but it's the letter that the word really has. What the highlight means is that there's another letter in the language that is the counterpart of the Latin "t" – and that's the letter ტ – but you don't need it in this particular case.

It would be so much easier if there was a database of Georgian words that I could use to show alternative options only for the letters that do require changing. In fact, I wouldn't even need to hihglight them – they can just get transliterated the right way by default. But that's a whole different story – learn more in the Contributing section.

### Alternative options don't go away!

You shouldn't worry about letters resetting after you've made changes and kept on typing. The chosen alternative options remain in their place even if you add more input!

![Translitearting "kartuli ena" and showing alternative options that don't go away after typing further](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2N4emVycTE1aHFmZ256ZHpldnp4eWY3MDRicWdmYXlleWJ1ZTEyNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QfBtM2LS81t7qTyma6/giphy.gif)

🧑‍💻 Technical details: it was an interesting puzzle to make it work. I marked letters replaced with alternative options in the output state with a special property and created a new state to store all the changed letters there. Those 2 states seem to work well with each other.

### Digraphs

Another challenging part of transliterating Latin to Georgian is digraphs: combinations of 2 Latin letters that in Georgian are represented with just 1 character.

For example: sh is შ in Georgian (they read as "sh" in "shade"), kh is ხ (they read as "ch" in the Scottish word "loch"), and so on.

You won't have any issues with them in this transliterator as it treats digraphs as digraphs and correctly outputs its single-letter Georgian counterpart.

![Translitearting "shen" and "khar"](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGY2dW42ZnRncTRnZjZsZ3l5b3NlOWhwdzZ3OWY1YTltNDJkOXFwNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AIohDiHTzBelHi7z60/giphy.gif)

🧑‍💻 Technical details: to make it work I first created an array of characters that I called "digraph triggers". For example: in the digraph "sh" the character "s" is the trigger – that is, the program sees it and knows that if the following character is "h", it should treat the 2 Latin letters as a single unit and return just 1 Georgian letter. If it's followed by a character that does't form a digraph with "s", "s" is left alone and is rendered the regular way, as it should.

### Trigraphs

Fortunately for me, Latin-Georgian transliterator doesn't have to deal with many trigraphs (3 characters that form one entity and represent one sound). That is, there are almost no cases when it takes 3 Latin characters to represent 1 Georgian.

If you're struggling to think of an example of such things happening in any language, here are several examples: the word "watch" in English has the trigraph "tch" which represents one sound entity /tʃ/ (similar to "ch" in "chair"). Or a more consistent phenomenon: "sch" in the German word "schade" (too bad). "Sch" represents just 1 sound entity /ʃ/ (as "sh" in "shake").

Anyway, back to the transliterator. I've discovered only one occurrence when the transliterator has to assess 3 Latin characters as 1 entity. But it's not exactly a trigraph as it is transliterated to a 2-character Georgian output. I believe that an example will make it more clear:

![Translitearting "paketshi"](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWExbG9vaXNyN2tydTY5bTRsNXU4NHhvMm43c3U5N2JxcHd3Nm51NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j2ISH1ZMbnFIWXXyzy/giphy.gif)

Here's the word "paketshi" which means "in the packet / bundle". Somewhere close to the end of the word you see this sequence of letters: "tsh". In most cases it should be treated as ts-h but not here, as it's much more likely to be t-sh.

That is, of these 3 letters 2 are parts of one digraph and since "ts" comes first, the transliterator thinks that it's a digraph. It's wrong, however, and in such cases I've changed the logic to check the whole 3-character sequence, not a 2-character one as with other digraphs and trigger letters. The default option you get after transliteration is: tsh –> ტშ (ტ for t, შ for sh). There are alternative options available if you want to change it somehow too.

## 🤝 Contributing

Clone this repo:

```
git clone https://github.com/chalupa-bazooka/georgian-transliterator.git
```

Here are things that can be improved:

- If you have any reliable data from a trustworthy source about letter frequency in Georgian, I'd be happy to use it over my current data source as I don't find it 100% trustworthy (simia.net/letters)
- Making manual alternative options automatic: I don't have any other ideas but to use some database with Georgian words to make more accurate transliteration. If you know an API that could solve it, let me know;
