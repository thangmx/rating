'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('rating', function() {

  beforeEach(function() {

    browser().navigateTo('/app/index.html');
    element('button:contains("Clear All")').click();
    element('button:contains("Add")').click();
    element('button:contains("Add")').click();
    element('button:contains("Add")').click();
  });
  
  it('should add a rating', function() {
      expect(repeater('.rates li').count()).toBe(3);
      element('button:contains("Add")').click();
      expect(repeater('.rates li').count()).toBe(4);
  });
  
  it('should remove a rating', function() {
      expect(repeater('.rates li').count()).toBe(3);
      element('button:contains("Clear"):eq(1)').click();
      expect(repeater('.rates li').count()).toBe(2);
  });
  
  it('should remove all ratings', function() {
      expect(repeater('.rates li').count()).toBe(3);
      element('button:contains("Clear All")').click();
      expect(repeater('.rates li').count()).toBe(0);
  });

   it('should update a rating', function() {
      expect(repeater('.rates li').count()).toBe(3);
      element("span[id='1'] > i:eq(5)").click();
      expect(repeater("span[id='1'] > i[class~='icon-star']").count()).toBe(6);
      expect(repeater("span[id='0'] > i[class~='icon-star']").count()).toBe(2);
      element("span[id='2'] > i:eq(4)").click();
      expect(repeater("span[id='2'] > i[class~='icon-star']").count()).toBe(5);
      expect(repeater("span[id='0'] > i[class~='icon-star']").count()).toBe(4);
      element("span[id='3'] > i:eq(7)").click();
      expect(repeater("span[id='3'] > i[class~='icon-star']").count()).toBe(8);
      expect(repeater("span[id='0'] > i[class~='icon-star']").count()).toBe(7);
  });
});
