/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'build-container',
  'Integration: BuildContainerComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#build-container}}
      //     template content
      //   {{/build-container}}
      // `);

      this.render(hbs`{{build-container}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
