// TODO write some proper tests
import EventEmitter from './event-emitter';
import Worm from './iris.worm';

describe('iris.worm', function () {

  var container, worm;

  beforeEach(function () {
    document.body.innerHTML = null;
    container = document.createElement('div');
    container.setAttribute('id', 'myDiv');
    document.body.appendChild(container);
    worm = new Worm(container);
  });

  describe('Worm()', function () {
    it('initializes a new event emitter', function () {
      expect(worm._eventEmitter).to.be.instanceOf(EventEmitter);
    });
  });

  describe("#setOption", function () {
    it('provides an interface for setting an option value', function () {
      var worm = new Worm(container, {
        displayHeight: 123
      });
      worm.setOption('height', 321);
      expect(worm.getOption('height')).to.equal(321);
    });
  });

  describe('#setValue', function () {
    it('sets the value', function () {
      worm.setValue(99);
      expect(worm._value).to.equal(99);
    });

    context('when the value is set higher than the maximum', function () {
      it('becomes the maxiumum', function () {
        worm.setOption('maxValue', 100);
        worm.setValue(101);
        expect(worm.getValue()).to.equal(100);
      });
    });

    it('emits an event', function () {
      var spy = sinon.spy();
      worm.on('valueChanged', spy);
      worm.setValue(123);
      expect(spy.called).to.be.true;
    });

    context('when the value is set to minimum', function () {
      it('emits a valueBecameMinimum event', function () {
        var spy = sinon.spy();
        worm.on('valueBecameMinimum', spy);
        worm.setValue(0);
        expect(spy.called).to.be.true;
      })
    })

    context('when the value is set to maximum', function () {
      it('emits a valueBecameMaximum event', function () {
        var spy = sinon.spy();
        worm.on('valueBecameMaximum', spy);
        worm.setValue(100);
        expect(spy.called).to.be.true;
      })
    })
  });

  describe('#getValue', function () {
    it('gets the value', function () {
      expect(worm.getValue()).to.equal(worm._value);
    });
  });



});