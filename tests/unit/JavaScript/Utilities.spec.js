import Utilities from '@/utilities/Utilities.js'

// Test date formatter:
test('test that date format is converted from yyyy-mm-dd to dd.mm.yyyy', () => {
  expect(Utilities.formatDate('2019-10-01')).toBe('01.10.2019')
})

// Test translate:
test('test that home is translated correctly', () => {
  expect(Utilities.translate('common', 'home')).toBe('Aloitus')
})

test('test that review author is translated correctly', () => {
  expect(Utilities.translate('review', 'author')).toBe('Arvostelija')
})

test('test that wine name is translated correctly', () => {
  expect(Utilities.translate('wine', 'name')).toBe('Nimi')
})

test('test that translate function is case insensitive', () => {
  expect(Utilities.translate('wine', 'nAMe')).toBe('Nimi')
})
