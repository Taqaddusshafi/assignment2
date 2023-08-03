const { highlightHTMLContent } = require('./test');
test('Highlight a single word', () => {
  const htmlContent = `<p><span>This is a test sentence.</span></p>`;
  const plainText = 'This is a test sentence.';
  const plainTextPositions = [{ word: 'test', start: 10, end: 14 }];
  const expectedHighlightedContent = '<p><span>This is a <mark>test</mark> sentence.</span></p>';
  const highlightedContent = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
  expect(highlightedContent).toBe(expectedHighlightedContent);
});
test('Highlight multiple occurrences of the same word', () => {
  const htmlContent = `<p><span>Test test test test.</span></p>`;
  const plainText = 'Test test test test.';
  const plainTextPositions = [
    { word: 'Test', start: 0, end: 4 },
    { word: 'test', start: 5, end: 9 },
    { word: 'test', start: 10, end: 14 },
    { word: 'test', start: 15, end: 19 },
  ];
  const expectedHighlightedContent = '<p><span><mark>Test</mark> <mark>test</mark> <mark>test</mark> <mark>test</mark>.</span></p>';
  const highlightedContent = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
  expect(highlightedContent).toBe(expectedHighlightedContent);
});
test('Highlight overlapping words', () => {
  const htmlContent = `<p><span>This is a test sentence.</span></p>`;
  const plainText = 'This is a test sentence.';
  const plainTextPositions = [
    { word: 'test', start: 10, end: 14 },
    { word: 'sentence', start: 15, end: 23 },
  ];
  const expectedHighlightedContent = '<p><span>This is a <mark>test</mark> <mark>sentence</mark>.</span></p>';
  const highlightedContent = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
  expect(highlightedContent).toBe(expectedHighlightedContent);
});
test('Highlight words with special characters', () => {
  const htmlContent = `<p><span>This is a test, sentence.</span></p>`;
  const plainText = 'This is a test, sentence.';
  const plainTextPositions = [
    { word: 'test,', start: 10, end: 15 },
    { word: 'sentence', start: 16, end: 24 },
  ];
  const expectedHighlightedContent = '<p><span>This is a <mark>test,</mark> <mark>sentence</mark>.</span></p>';
  const highlightedContent = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
  expect(highlightedContent).toBe(expectedHighlightedContent);
});

test('Highlighting  my name from the sentence  ', () => {
  const htmlContent = `<p><span>My name is Taqaddus.</span></p>`;
  const plainText = 'My name is Taqaddus.';
  const plainTextPositions = [
    { word: 'name,', start: 3, end: 7 },
    { word: 'Taqaddus Shafi', start: 10, end: 18 },
  ];
  const expectedHighlightedContent = '<p><span>My <mark>name</mark> is <mark>Taqaddus</mark>.</span></p>';
  const highlightedContent = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
  expect(highlightedContent).toBe(expectedHighlightedContent);
});