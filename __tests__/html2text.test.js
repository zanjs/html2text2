'use strict';

const html2Text = require('..');

describe('html2text', () => {
    it('needs tests');

    it('strips html tags', function () {
        var expected = 'HELLO world';
        var observed = html2Text('<b>HELLO <blink>world</blink></b>');
    
        expect(expected).to.equal(observed);
      });
    
      it('treats whitespace like a browser - trim', function () {
        var expected = 'Hey there, Ted';
        var observed = html2Text('<b>Hey there, Ted</b>  \n');
    
        expect(expected).to.equal(observed);
      });
    
      it('parses ordered lists into enumerated lines', function () {
        var expected = '1. First there is this\n2. Then there is that';
        var observed = html2Text('<ol><li>First there is this</li><li>Then there is that</li></ol>');
    
        expect(expected).to.equal(observed);
      });
    
      it('parses unordered lists into ticked lines', function () {
        var expected = '- First there is this\n- Then there is that';
        var observed = html2Text('<ul><li>First there is this</li><li>Then there is that</li></ul>');
    
        expect(expected).to.equal(observed);
      });
    
      it('treats whitespace like a browser - collapse repeated space', function () {
        var expected = 'It is aa maaaa zzzzz ing!';
        var observed = html2Text('<h1>It is  aa maaaa   zzzzz       ing!</h1>');
    
        expect(expected).to.equal(observed);
      });
    
      it('strips html whitespace entities', function () {
        var expected = 'hi';
        var observed = html2Text('hi&nbsp;');
    
        expect(expected).to.equal(observed);
      });
    
      it('decodes all kinds of HTML entities', function () {
        var expected = 'Foo \xA9 bar \uD834\uDF06 baz \u2603 qux \u2A11';
        var observed = html2Text('Foo &copy; bar &#x1D306; baz &#9731; qux &awint;');
    
        expect(expected).to.equal(observed);
      });
    
      it('ignores linebreaks', function () {
        var expected = 'hi Ted';
        var observed = html2Text('hi\n\n\n\n<b>Ted</b>\n');
    
        expect(expected).to.equal(observed);
      });
    
      it('ignores single linebreaks', function () {
        var expected = 'hi Ted';
        var observed = html2Text('hi\nTed');
    
        expect(expected).to.equal(observed);
      });
    
      it('inserts 2 linebreaks after </p>', function () {
        var expected = 'it was the best of times\n\nit was the worst of times';
        var observed = html2Text('<p>it was the best of times</p><p>it was the worst of times</p>');
    
        expect(expected).to.equal(observed);
      });
    
      it('inserts 1 linebreak <br>', function () {
        var expected = 'hello\ngoodbye';
        var observed = html2Text('hello<br/>goodbye');
    
        expect(expected).to.equal(observed);
      });
    
      it('decodes html entities', function () {
        var expected = '<3 & </3';
        var observed = html2Text('&lt;3 &amp; &lt;/3');
      });
    
      it('calls toString on input', function () {
        var expected = '8675309';
        var observed = html2Text(8675309);
    
        expect(expected).to.equal(observed);
      });
    
      it('removes <style> tags including content', function () {
        var expected = 'Hello world';
        var observed = html2Text('<html><head><style>.foo {color: red;}</style><body>Hello world</body></head>');
    
        expect(expected).to.equal(observed);
      });
    
      it('removes <script> tags including content', function () {
        var expected = 'Hello world';
        var observed = html2Text('<html><head><script>const foo = "bar";</script><body>Hello world</body></head>');
    
        expect(expected).to.equal(observed);
      });
    
      it('is safe on null input', function () {
        var expected = '';
        var observed = html2Text(null);
    
        expect(expected).to.equal(observed);
      });
    
      it('is safe on undefined input', function () {
        var expected = '';
        var observed = html2Text(undefined);
    
        expect(expected).to.equal(observed);
      });
      
      it('remove CSS conditional comments', function() {
        var expected = '';
        var observed = html2Text('<!--[if !mso]>\nThis is a test\n<![endif]-->');
    
        expect(expected).to.equal(observed);
      });
});
