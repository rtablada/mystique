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

  describe('Transform Raw Items', () => {
    beforeEach(() => {
      postTransformer = new PostTransformer(db.posts[0]);
      personTransformer = new PersonTransformer(db.people[0]);
    });

    it('can transform a post on constructed data', () => {
      expect(postTransformer.rawItem()).to.deep.equal({
        'first-name': 'Ryan',
        'last-name': 'Tablada',
        title: 'Post 1',
        year: 2015,
      });
    });

    it('can transform a person on constructed data', () => {
      expect(personTransformer.item()).to.deep.equal({
        person: {
          'first-name': 'Ryan',
          'last-name': 'Tablada',
        },
      });
    });

    it('can transform on passed in data', () => {
      expect(postTransformer.item(db.posts[1])).to.deep.equal({
        post: {
          'first-name': 'Ryan',
          'last-name': 'Tablada',
          title: 'Post 2',
          year: 2015,
        },
      });
    });
  });

  describe('Transform Items', () => {
    beforeEach(() => {
      postTransformer = new PostTransformer(db.posts[0]);
      personTransformer = new PersonTransformer(db.people[0]);
    });

    it('can transform a post on constructed data', () => {
      expect(postTransformer.item()).to.deep.equal({
        post: {
          'first-name': 'Ryan',
          'last-name': 'Tablada',
          title: 'Post 1',
          year: 2015,
        },
      });
    });

    it('can transform a person on constructed data', () => {
      expect(personTransformer.item()).to.deep.equal({
        person: {
          'first-name': 'Ryan',
          'last-name': 'Tablada',
        },
      });
    });

    it('can transform on passed in data', () => {
      expect(postTransformer.item(db.posts[1])).to.deep.equal({
        post: {
          'first-name': 'Ryan',
          'last-name': 'Tablada',
          title: 'Post 2',
          year: 2015,
        },
      });
    });
  });

  describe('Transform Raw Collections', () => {
    beforeEach(() => {
      postTransformer = new PostTransformer();
      personTransformer = new PersonTransformer();
    });

    it('can transform a collection of posts', () => {
      expect(postTransformer.rawCollection(db.posts)).to.deep.equal([
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
      ]);
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

  describe('Transform Collections', () => {
    beforeEach(() => {
      postTransformer = new PostTransformer();
      personTransformer = new PersonTransformer();
    });

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

  describe('Setting Data', () => {
    var postTransformer = new PostTransformer(db.posts[0]);

    it('can transform on passed in data', () => {
      postTransformer.setData(db.posts[1]);

      expect(postTransformer.item()).to.deep.equal({
        post: {
          'first-name': 'Ryan',
          'last-name': 'Tablada',
          title: 'Post 2',
          year: 2015,
        },
      });
    });
  });
});
