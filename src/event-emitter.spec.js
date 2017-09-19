import EventEmitter from './event-emitter';

describe('EventEmitter', () => {

  it('acts like the node event emitter', () => {
    let spy = sinon.spy();
    let emitter = new EventEmitter();

    emitter.on('foobar', spy);
    emitter.emit('foobar');

    expect(spy.calledOnce).to.be.true;
  })
});