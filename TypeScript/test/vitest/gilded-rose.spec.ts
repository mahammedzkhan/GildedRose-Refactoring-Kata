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

});
