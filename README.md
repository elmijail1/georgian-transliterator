# Georgian Transliterator

## ℹ️ Description

This web app helps you turn Latin script into Georgian. That is, characters like ABC to აბც.

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

I spent quite some time doing it manually. And it took too much time to just put up with it. So I decided to create an app that can do it for you. You pass a text written in Latin to it and it returns the same text in the Georgian script. Now you can safely pass it to the online translator of your choice to get a translation!

## 🚀 Quick start

Find Georgian Transliterator live by following this link:
https://effervescent-bonbon-a623d1.netlify.app/

## 📖 Usage

Using Georgian Transliterator is straightforward:

1. Copy a text in the Latin script
2. Paste it into the input window
3. Get the same text in the Georgian script in the output window
4. Copy it with the help of the button on the bottom right

However, if you're willing to spend some more time learning about how it works, you'll discover more cool features that will help you with _transliterating_ things from Latin to Georgian more effectively.

(By the way, _transliteration_ just means changing the text from one script to another. So despite being a formidable word, it describes a simple concept and is quite handy. So I'll use it more often below)

### Alternative options

Transliteration from Latin to Georgian has its issues. Most notably, some Latin characters can be transliterated to Georgian in several ways. That's why the transliteration you get in this app isn't 100% accurate. It offers you the most probable character (that is, more frequently used in the language as a whole, according to data) which might not always be the right one for the word.

For example, the Latin word "kartuli" is transliterated as კართული. The first character "k" gets transliterated as კ and there's nothing wrong about it. But "k" can also be transliterated as ქ and, while it's a less frequent letter in the language in general, it's the letter that this word actually has: ქართული (it translates as the adjective "Georgian").

So you can click the button "Show alternative options" and the letter კ in the word კართული will get highlighted. Click it and you'll see other options you can use. So if you know the right letter for the word, you can manually change the auomatically suggested one. Making it automatic is a dream... But that's a whole different story (for the contribution section).

### Alternative options don't go away!

You shouldn't worry about letters resetting after you've made changes and kept on typing. The chosen alternative options remain in their place even if you add more input!

🧑‍💻 Technical details: it was an interesting puzzle to make it work. I marked letters replaced with alternative options in the output state with a special property and created a new state to store all the changed letters there. Those 2 states seem to work well with each other.

### Digraphs

Another challenging part of transliterating Latin to Georgian is digraphs: combinations of 2 Latin letters that in Georgian are represented with just 1 character.

For example: sh is შ in Georgian (both read as "sh" in "shade"), kh is ხ (both read as "ch" in the Scottish word "loch"), and so on.

You won't have any issues with them in this transliterator as it treats digraphs as digraphs and correctly gives its the single-letter Georgian counterpart.

🧑‍💻 Technical details: to make it work I first created an array of characters that I called "digraph triggers". For example: in the digraph "sh" the character "s" is the trigger – that is, the program sees it and knows that if the following character is "h", it should treat the 2 Latin letters as a single unit and return just 1 Georgian letter. If it's followed by a character that does't form a digraph with "s", "s" is left alone and is rendered the regular way, as it should.

### Trigraphs

Fortunately for me, Latin-Georgian transliterator doesn't have to deal with many trigraphs (3 characters that form one entity and represent one sound). That is, there are almost no cases when it takes 3 Latin characters to represent 1 Georgian.

If you're struggling to think of an example of such things happening in any language, here are several examples: the word "watch" in English has the trigraph "tch" which represents one sound entity /tʃ/ (similar to "ch" in "chair"). Or a more consistent phenomenon: "sch" in the German word "schade" (too bad). "Sch" represents just 1 sound entity /ʃ/ (as "sh" in "shake").

Anyway, back to the transliterator. I've discovered only one occurrence when the transliterator has to assess 3 Latin characters as 1 entity. But it's not exactly a digraph as it is transliterated to a 2-character Georgian output. I believe that an example will make it more clear:

Here's the word "paketshi" which means "in the packet / bundle". Somewhere close to the end of the word you see this sequence of letters: "tsh". In most cases it should be treated as ts-h but not here, as it's much more likely to be t-sh.

That is, of these 3 letters 2 are parts of one digraph and since "ts" comes first, the transliterator thinks that it's a digraph. It's wrong, however, and in such cases I've changed the logic to check the whole 3-character sequence, not a 2-character one as with other digraphs and trigger letters. The default option you get after transliteration is: tsh –> ტშ (ტ for t, შ for sh). There are alternative options available if you want to change it somehow too.

## ➕ Contribution

- If you have any reliable data from a trustworthy source about letter frequency in Georgian, I'd be happy to use it over my current data source as I don't find it 100% trustworthy (simia.net/letters)
- Making manual alternative options automatic: I don't have any other ideas but to use some database with Georgian words to make more accurate transliteration. If you know an API that could solve it, let me know;
