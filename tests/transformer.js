/* globals it, describe */

const expect = require('chai').expect;
const Transformer = require('../lib').Transformer;
const db = require('./dummies/db');

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
      'first-name': item.firstName,
      'last-name': item.lastName,
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

  describe('Transform Items', () => {
    it('can transform a post', () => {
      expect(PostTransformer.item(db.posts[0])).to.deep.equal({
        post: {
          'first-name': 'Ryan',
          'last-name': 'Tablada',
          title: 'Post 1',
          year: 2015,
        },
      });
    });

    it('can transform a person', () => {
      expect(PersonTransformer.item(db.people[0])).to.deep.equal({
        person: {
          'first-name': 'Ryan',
          'last-name': 'Tablada',
        },
      });
    });
  });

  describe('Transform Collections', () => {
    it('can transform a collection of posts', () => {
      expect(PostTransformer.collection(db.posts)).to.deep.equal({
        posts: [
          {
            'first-name': 'Ryan',
            'last-name': 'Tablada',
            title: 'Post 1',
            year: 2015,
          },
          {
            'first-name': 'Ryan',
            'last-name': 'Tablada',
            title: 'Post 2',
            year: 2015,
          },
        ],
      });
    });

    it('can transform a collection of people', () => {
      expect(PersonTransformer.collection(db.people)).to.deep.equal({
        people: [
          {
            'first-name': 'Ryan',
            'last-name': 'Tablada',
          },
        ],
      });
    });
  });
});
