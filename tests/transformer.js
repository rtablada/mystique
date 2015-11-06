/* globals it, describe */

const expect = require('chai').expect;
const Transformer = require('../lib').Transformer;

const PostTransformer = new Transformer({
  resourceName: 'post',
  map(item) {
    return {
      'first-name': item.user.firstName,
      'last-name': item.user.lastName,
      title: item.post.title,
      year: item.meta.date,
    };
  },
});

const PersonTransformer = new Transformer({
  resourceName: 'person',
  pluralName: 'people',
  map(item) {
    return {
      'first-name': item.user.firstName,
      'last-name': item.user.lastName,
      title: item.post.title,
      year: item.meta.date,
    };
  },
});

describe('Transformer', () => {
  describe('Resource Names', () => {
    it('can determine singular resource names', () => {
      expect(PostTransformer.getSingularResourceName()).to.equal('post');
    });

    it('can determine plural resource names using pluralizer', () => {
      expect(PostTransformer.getPluralResourceName()).to.equal('posts');
    });

    it('can determine plural resource names using property', () => {
      expect(PersonTransformer.getPluralResourceName()).to.equal('people');
    });
  });
});
