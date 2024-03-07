import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it("should degrade quality by 1 because sellIn hasn't passed", () => {
    const gildedRose = new GildedRose([new Item('Average Quality Cheese', 2, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(9);
    expect(items[0].sellIn).toBe(1);
  });

  it('should degrade quality by 2 because sellIn has passed', () => {
    const gildedRose = new GildedRose([new Item('Average Quality Cheese', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
    expect(items[0].sellIn).toBe(-1);
  });

  it('should never have negative quality', () => {
    const gildedRose = new GildedRose([new Item('Low Quality Cheese', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  it('should increase in quality when Item is Aged Brie', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
    expect(items[0].sellIn).toBe(-1);
  });

  it('should never increase over 50 in quality', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(-1);
  });

  it('should never decrease in quality & sellIn for legendary items such as Sulfuras', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(40);
    expect(items[0].sellIn).toBe(0);
  });

  it('should increase by 2 in quality when sellIn < 10 for backstage passes', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 9, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
    expect(items[0].sellIn).toBe(8);
  });

  it('should increase by 3 in quality when sellIn < 5 for backstage passes', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(13);
    expect(items[0].sellIn).toBe(4);
  });

  it('should drop quality to 0 for backstage passes after the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

});
