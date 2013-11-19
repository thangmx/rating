/**
 * Created by thang.mai on 11/18/13.
 */
describe('rating', function() {
    var rateList = element.all(by.repeater('rate in rates | orderBy:\'id\':number')),
        rateList2 = element(by.repeater('rate in rates | orderBy:\'id\':number')),
        addBtn = element(by.xpath("//button[text()='Add']")),
        clearAllBtn = element(by.xpath("//button[contains(text(),'Clear All')]")),
        max = 4,
        maxStar = 10,
        current;

    beforeEach(function() {
        browser.get('http://localhost:8000/app/index.html');
        console.log(rateList);
        console.log(rateList.get());
        console.log(rateList2);
        rateList.count().then(function(count){
            current = count;
        })
    });

    it('should add a rating', function() {
        console.log('rate list '); console.log(rateList.count());
        console.log('btn '); console.log(addBtn);
        for (var i=0; i < max; i++) {
            addBtn.click();
            expect(rateList.count()).toEqual(current+i+1);
        }
    });

    it('should remove a rating', function() {
        var clearList = element.all(by.xpath("//button[text()='Clear']"));

        for (var i=0; i<max; i++) {
            clearList.get(0).click();
            expect(rateList.count()).toEqual(current-i-1);
        }
    });

    it('should remove all ratings', function() {
        for (var i=0; i < max; i++) {
            addBtn.click();
        }
        clearAllBtn.click();
    });

    it('should update a rating', function() {
        addBtn.click();
        var stars = element.all(by.xpath("//span[@id='1']/i"));
        var emptyStars = element.all(by.xpath("//span[@id='1']/i[@class='ng-scope icon-star-empty']"));
        var filledStars = element.all(by.xpath("//span[@id='1']/i[@class='ng-scope icon-star']"));
        for (var i = 0; i < maxStar; i++) {
            stars.get(i).click();
            expect(emptyStars.count()).toEqual(maxStar-i-1);
            expect(filledStars.count()).toEqual(i+1);
        }
    });
});
