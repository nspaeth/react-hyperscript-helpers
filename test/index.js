import { createElement } from 'react';
import { expect } from 'chai';

import fns, { TAG_NAMES } from '../src/';

import * as c from './Component.js';
import { FuncComponent as f } from './Component.js';

var { div, ClassComponent, CreateClass, FuncComponent } = fns(c);

describe('DOM Component', function() {
  it('should be correct dom node', () =>
    expect(createElement('div').nodeName).to.equal(div().nodeName));

  it('should have the correct props', () => {
    const props = { a: 'b', c: 'd' };
    compareComponents(createElement('div', props), div(props));
  });

  it('should work with a single child', () =>
    compareComponents(createElement('div', null, 'hello'), div('hello')));

  it('should work with multiple children', () =>
    compareComponents(createElement('div', null, ['hello', 'world']), div(['hello', 'world'])));

  it('should have correct props and children', () => {
    const props = { a: 'b', c: 'd' };
    compareComponents(createElement('div', props, 'hello'), div(props, 'hello'));
  });

  describe('with selector', () => {
    it('should add the className prop', () => {
      const el = div('.foo');
      expect(el.props.className).to.equal('foo');
    });

    it('should append to the className prop', () => {
      const el = div('.foo', { className: 'bar' });
      expect(el.props.className).to.equal('foo bar');
    });

    it('should use the id in props if not in selector', () => {
      const el = div('.foo', { id: 'bar' });
      expect(el.props.id).to.equal('bar');
    });

    it('should add the id prop', () => {
      const el = div('#foo');
      expect(el.props.id).to.equal('foo');
    });

    it('should override the id provide in props', () => {
      const el = div('#foo', { id: 'bar' });
      expect(el.props.id).to.equal('foo');
    });

    it('should have the correct children when props are not provided', () => {
      const el1 = div('.foo', 'hello');
      const el2 = div('.foo', ['hello', 'world']);

      expect(el1.props.children).to.equal('hello');
      expect(el2.props.children).to.deep.equal(['hello', 'world']);
    });
  });

});

describe('Custom Components', () => {
  it('should handle class components',       () => compareComponents(createElement(c.ClassComponent), ClassComponent()));
  it('should handle function components',    () => compareComponents(createElement(c.FuncComponent), FuncComponent()));
  it('should handle createClass components', () => compareComponents(createElement(c.CreateClass), CreateClass()));
});

describe('Bootstrapping Function', () => {
  it('should accept an array of components', () => {
    const x = fns([c.ClassComponent, c.FuncComponent]);
    expect(x.ClassComponent).to.exist;
    expect(x.FuncComponent).to.exist;
  });

  it('should accept on object of components', () => {
    const x = fns(c);
    expect(x.ClassComponent).to.exist;
    expect(x.FuncComponent).to.exist;
  });

  it('should accept components as arguments', () => {
    const x = fns(c.ClassComponent, c.FuncComponent);
    expect(x.ClassComponent).to.exist;
    expect(x.FuncComponent).to.exist;
  });

  it('should behave correctly even if import is aliased', () => expect(fns(f).FuncComponent).to.exist);
});

const compareComponents = (a, b) => expect(a).to.deep.equal(b);
