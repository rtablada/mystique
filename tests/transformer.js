/* globals it, describe */

const expect = require('chai').expect;
const Transformer = require('../lib').Transformer;
const db = require('./dummies/db');

const PostTransformer = Transformer.extend({
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

const PersonTransformer = Transformer.extend({
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
  var postTransformer = new PostTransformer();
  var personTransformer = new PersonTransformer();

  describe('Resource Names', () => {
    it('can determine singular resource names', () => {
      console.log(postTransformer);
      expect(postTransformer.getSingularResourceName()).to.equal('post');
    });

    it('can determine plural resource names using pluralizer', () => {
      expect(postTransformer.getPluralResourceName()).to.equal('posts');
    });

    it('can determine plural resource names using property', () => {
      expect(personTransformer.getPluralResourceName()).to.equal('people');
    });
  });

  describe('Transform Items', () => {
    it('can transform a post', () => {
      expect(postTransformer.item(db.posts[0])).to.deep.equal({
        post: {
          'first-name': 'Ryan',
          'last-name': 'Tablada',
          title: 'Post 1',
          year: 2015,
        },
      });
    });

    it('can transform a person', () => {
      expect(personTransformer.item(db.people[0])).to.deep.equal({
        person: {
          'first-name': 'Ryan',
          'last-name': 'Tablada',
        },
      });
    });
  });

  describe('Transform Collections', () => {
    it('can transform a collection of posts', () => {
      expect(postTransformer.collection(db.posts)).to.deep.equal({
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
      expect(personTransformer.collection(db.people)).to.deep.equal({
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
