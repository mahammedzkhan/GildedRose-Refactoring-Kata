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

});
